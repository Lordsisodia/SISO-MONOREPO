/**
 * Offline Queue - IndexedDB-based queue for offline actions
 * Handles mutations and file uploads when network is unavailable
 */

import Dexie, { Table } from 'dexie'

export interface QueueAction {
  id: string
  type: 'CREATE_LEAD' | 'UPDATE_LEAD' | 'SEND_MESSAGE' | 'UPDATE_PROFILE'
  payload: any
  createdAt: Date
  retryCount: number
}

export interface FileUpload {
  id: string
  file: ArrayBuffer
  filename: string
  type: string
  metadata: {
    leadId?: string
    messageId?: string
    type: string
  }
  createdAt: Date
  retryCount: number
}

class OfflineQueueDB extends Dexie {
  actions!: Table<QueueAction, string>
  files!: Table<FileUpload, string>

  constructor() {
    super('SISOPartnershipsOfflineQueue')
    this.version(1).stores({
      actions: 'id, type, createdAt',
      files: 'id, createdAt, metadata.leadId',
    })
  }
}

const db = new OfflineQueueDB()

export class OfflineQueue {
  private processing = false

  /**
   * Add action to offline queue
   */
  async addAction(action: Omit<QueueAction, 'id' | 'createdAt' | 'retryCount'>) {
    const queueAction: QueueAction = {
      ...action,
      id: `action-${Date.now()}-${Math.random()}`,
      createdAt: new Date(),
      retryCount: 0,
    }

    await db.actions.add(queueAction)

    // Auto-process if online
    if (navigator.onLine && !this.processing) {
      this.processActions()
    }

    return queueAction.id
  }

  /**
   * Add file upload to offline queue
   */
  async addFile(file: File, metadata: FileUpload['metadata']) {
    const arrayBuffer = await file.arrayBuffer()

    const fileUpload: FileUpload = {
      id: `file-${Date.now()}-${Math.random()}`,
      file: arrayBuffer,
      filename: file.name,
      type: file.type,
      metadata,
      createdAt: new Date(),
      retryCount: 0,
    }

    await db.files.add(fileUpload)

    // Auto-process if online
    if (navigator.onLine && !this.processing) {
      this.processFiles()
    }

    return fileUpload.id
  }

  /**
   * Process all queued actions
   */
  async processActions() {
    if (this.processing) return
    this.processing = true

    try {
      const actions = await db.actions.orderBy('createdAt').toArray()

      for (const action of actions) {
        try {
          await this.executeAction(action)
          await db.actions.delete(action.id)
        } catch (error) {
          console.error('Action execution failed:', error)

          // Increment retry count
          await db.actions.update(action.id, {
            retryCount: action.retryCount + 1,
          })

          // Remove if too many retries (> 10)
          if (action.retryCount > 10) {
            console.error('Action abandoned after 10 retries:', action)
            await db.actions.delete(action.id)
          }
        }
      }
    } finally {
      this.processing = false
    }
  }

  /**
   * Process all queued file uploads
   */
  async processFiles() {
    if (this.processing) return
    this.processing = true

    try {
      const files = await db.files.orderBy('createdAt').toArray()

      for (const fileEntry of files) {
        try {
          await this.executeFileUpload(fileEntry)
          await db.files.delete(fileEntry.id)
        } catch (error) {
          console.error('File upload failed:', error)

          // Increment retry count
          await db.files.update(fileEntry.id, {
            retryCount: fileEntry.retryCount + 1,
          })

          // Remove if too many retries or file too old (> 7 days)
          const age = Date.now() - fileEntry.createdAt.getTime()
          const sevenDays = 7 * 24 * 60 * 60 * 1000

          if (fileEntry.retryCount > 5 || age > sevenDays) {
            console.error('File upload abandoned:', fileEntry.filename)
            await db.files.delete(fileEntry.id)
          }
        }
      }
    } finally {
      this.processing = false
    }
  }

  /**
   * Execute a queued action
   */
  private async executeAction(action: QueueAction) {
    // Import services dynamically to avoid circular dependencies
    const { leadService } = await import('@features/leads/api/leadService')
    const { chatService } = await import('@features/chat/api/chatService')

    switch (action.type) {
      case 'CREATE_LEAD':
        return leadService.createLead(action.payload)

      case 'UPDATE_LEAD':
        return leadService.updateLead(action.payload.id, action.payload.data)

      case 'SEND_MESSAGE':
        return chatService.sendMessage(action.payload.channelId, action.payload.text)

      case 'UPDATE_PROFILE':
        const { partnerService } = await import('@entities/partner/api/partnerService')
        return partnerService.updateProfile(action.payload)

      default:
        throw new Error(`Unknown action type: ${action.type}`)
    }
  }

  /**
   * Execute a file upload
   */
  private async executeFileUpload(fileEntry: FileUpload) {
    const { supabase } = await import('@/lib/supabase')

    const blob = new Blob([fileEntry.file], { type: fileEntry.type })
    const file = new File([blob], fileEntry.filename, { type: fileEntry.type })

    // Determine storage bucket and path
    const bucket = 'partner-files'
    const path = fileEntry.metadata.leadId
      ? `leads/${fileEntry.metadata.leadId}/${fileEntry.filename}`
      : `general/${fileEntry.filename}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      upsert: false,
      contentType: fileEntry.type,
    })

    if (error) throw error

    return data
  }

  /**
   * Get queue status
   */
  async getQueueStatus() {
    const actionCount = await db.actions.count()
    const fileCount = await db.files.count()

    return {
      actions: actionCount,
      files: fileCount,
      total: actionCount + fileCount,
    }
  }

  /**
   * Clear all queues (use on logout)
   */
  async clear() {
    await db.actions.clear()
    await db.files.clear()
  }
}

// Singleton instance
export const offlineQueue = new OfflineQueue()

// Auto-process queues when online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    offlineQueue.processActions()
    offlineQueue.processFiles()
  })
}
