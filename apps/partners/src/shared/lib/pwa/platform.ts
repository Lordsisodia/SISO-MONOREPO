/**
 * Platform Detection Utilities
 * Detects iOS, Android, PWA mode, and capabilities
 */

/**
 * Detect iOS devices
 */
export const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

/**
 * Detect Android devices
 */
export const isAndroid = /Android/.test(navigator.userAgent)

/**
 * Detect if running as installed PWA
 */
export const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as any).standalone === true // iOS Safari

/**
 * Detect if running in browser
 */
export const isBrowser = !isStandalone

/**
 * Check if Push API is supported
 * Note: iOS Safari doesn't support Web Push even in PWA mode!
 */
export const supportsPushNotifications = 'Notification' in window &&
  'PushManager' in window &&
  !isIOS // Explicitly exclude iOS

/**
 * Check if Background Sync is supported
 * Note: iOS Safari doesn't support Background Sync!
 */
export const supportsBackgroundSync = 'serviceWorker' in navigator &&
  'SyncManager' in window &&
  !isIOS // Explicitly exclude iOS

/**
 * Check if service workers are supported
 */
export const supportsServiceWorker = 'serviceWorker' in navigator

/**
 * Get storage quota (iOS has 50MB limit)
 */
export const getStorageQuota = (): number => {
  return isIOS ? 50 * 1024 * 1024 : 500 * 1024 * 1024
}

/**
 * Detect safe area insets support (iPhone notch)
 */
export const supportsSafeArea = CSS.supports('padding-top: env(safe-area-inset-top)')

/**
 * Get device info
 */
export const getDeviceInfo = () => {
  return {
    platform: isIOS ? 'ios' : isAndroid ? 'android' : 'desktop',
    isInstalled: isStandalone,
    capabilities: {
      push: supportsPushNotifications,
      backgroundSync: supportsBackgroundSync,
      serviceWorker: supportsServiceWorker,
      safeArea: supportsSafeArea,
    },
    storage: {
      quota: getStorageQuota(),
    },
  }
}
