# Client Files Management

## Overview
The Client Files Management system provides secure document management and file sharing capabilities specifically tailored for client-related documents within the SISO partnership portal. This module handles confidential client information, contracts, proposals, and collaboration files with enterprise-grade security and access controls.

## Architecture

### Directory Structure
```
files/clients/
├── components/
│   ├── ClientFileCard.tsx
│   ├── ClientFileUploader.tsx
│   ├── ClientFolderView.tsx
│   ├── ClientSharingDialog.tsx
│   └── ClientPermissionsPanel.tsx
├── hooks/
│   ├── useClientFiles.ts
│   ├── useClientFileSharing.ts
│   └── useClientFilePermissions.ts
├── services/
│   ├── clientFileService.ts
│   ├── clientSecurityService.ts
│   └── clientCollaborationService.ts
├── types/
│   ├── client-files.types.ts
│   └── client-permissions.types.ts
└── utils/
    ├── clientFileValidation.ts
    └── clientAccessControl.ts
```

### Core Components

#### ClientFileCard Component
```typescript
interface ClientFileCardProps {
  file: ClientFile;
  client: Client;
  permissions: FilePermissions;
  onPreview: (file: ClientFile) => void;
  onShare: (file: ClientFile) => void;
  onDownload: (file: ClientFile) => void;
  onDelete: (file: ClientFile) => void;
  className?: string;
}

export const ClientFileCard: React.FC<ClientFileCardProps> = ({
  file,
  client,
  permissions,
  onPreview,
  onShare,
  onDownload,
  onDelete,
  className
}) => {
  return (
    <Card className={cn('client-file-card', className)}>
      <div className="client-file-header">
        <div className="client-file-icon">
          <FileIcon type={file.type} />
        </div>
        <div className="client-file-info">
          <h4 className="client-file-title">{file.title}</h4>
          <p className="client-file-client">{client.name}</p>
          <p className="client-file-meta">
            {formatFileSize(file.size)} • {formatDate(file.updatedAt)}
          </p>
        </div>
        <div className="client-file-security">
          <SecurityBadge level={file.securityLevel} />
        </div>
      </div>
      
      <div className="client-file-content">
        <p className="client-file-description">{file.description}</p>
        
        {file.tags.length > 0 && (
          <div className="client-file-tags">
            {file.tags.map(tag => (
              <Tag key={tag} variant="client">{tag}</Tag>
            ))}
          </div>
        )}
        
        {file.sharedWith.length > 0 && (
          <div className="client-file-sharing">
            <Users className="w-4 h-4" />
            <span>Shared with {file.sharedWith.length} people</span>
          </div>
        )}
      </div>
      
      <div className="client-file-actions">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPreview(file)}
          disabled={!permissions.canView}
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onShare(file)}
          disabled={!permissions.canShare}
        >
          <Share className="w-4 h-4" />
          Share
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDownload(file)}
          disabled={!permissions.canDownload}
        >
          <Download className="w-4 h-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" icon={<MoreVertical className="w-4 h-4" />} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {permissions.canEdit && (
              <DropdownMenuItem onClick={() => onEdit(file)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onMoveFile(file)}>
              <Folder className="w-4 h-4 mr-2" />
              Move
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicateFile(file)}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            {permissions.canDelete && (
              <DropdownMenuItem 
                onClick={() => onDelete(file)}
                className="text-destructive"
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
```

#### ClientFileUploader Component
```typescript
interface ClientFileUploaderProps {
  clientId: string;
  folderId?: string;
  securityLevel: SecurityLevel;
  allowedTypes: FileType[];
  maxSize: number;
  onUploadComplete: (files: ClientFile[]) => void;
  onUploadError: (error: UploadError) => void;
  className?: string;
}

export const ClientFileUploader: React.FC<ClientFileUploaderProps> = ({
  clientId,
  folderId,
  securityLevel,
  allowedTypes,
  maxSize,
  onUploadComplete,
  onUploadError,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const { uploadClientFile, isUploading } = useClientFileUpload();

  const handleFileSelect = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    try {
      const uploadPromises = fileArray.map(async (file) => {
        return uploadClientFile({
          file,
          clientId,
          folderId,
          securityLevel,
          onProgress: (progress) => {
            setUploadProgress(prev => ({
              ...prev,
              [file.name]: progress
            }));
          }
        });
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      onUploadComplete(uploadedFiles);
    } catch (error) {
      onUploadError(error as UploadError);
    }
  };

  return (
    <Card className={cn('client-file-uploader', isDragging && 'is-dragging', className)}>
      <div 
        className="uploader-drop-zone"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileSelect(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          multiple
          accept={allowedTypes.join(',')}
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
          id="client-file-input"
        />
        
        <div className="uploader-content">
          <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="uploader-title">Upload Client Files</h3>
          <p className="uploader-description">
            Drag and drop files here or click to browse
          </p>
          <p className="uploader-restrictions">
            Max size: {formatFileSize(maxSize)} • 
            Allowed: {allowedTypes.join(', ')}
          </p>
          
          <Button asChild>
            <label htmlFor="client-file-input">
              Select Files
            </label>
          </Button>
        </div>
        
        {isUploading && (
          <div className="uploader-progress">
            <div className="progress-header">
              <span className="progress-text">Uploading files...</span>
              <Button variant="ghost" size="sm" onClick={() => {/* Cancel upload */}}>
                Cancel
              </Button>
            </div>
            {Object.entries(uploadProgress).map(([filename, progress]) => (
              <div key={filename} className="progress-item">
                <span className="progress-filename">{filename}</span>
                <Progress value={progress} className="progress-bar" />
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
```

## Domain Types

### Client Files Types
```typescript
export interface ClientFile {
  id: string;
  clientId: string;
  folderId?: string;
  title: string;
  description?: string;
  type: FileType;
  size: number;
  url: string;
  thumbnailUrl?: string;
  securityLevel: SecurityLevel;
  tags: string[];
  sharedWith: FileShare[];
  permissions: FilePermissions;
  version: number;
  versions: ClientFileVersion[];
  metadata: ClientFileMetadata;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface ClientFileVersion {
  id: string;
  version: number;
  url: string;
  size: number;
  changelog?: string;
  createdAt: Date;
  createdBy: string;
}

export interface ClientFileMetadata {
  originalName: string;
  mimeType: string;
  checksum: string;
  encryptionEnabled: boolean;
  accessLog: FileAccessLog[];
  retentionPolicy?: RetentionPolicy;
  complianceFlags: ComplianceFlag[];
}

export interface FileShare {
  userId?: string;
  teamId?: string;
  clientId?: string;
  permissions: SharePermission[];
  expiresAt?: Date;
  createdAt: Date;
  createdBy: string;
}

export interface FilePermissions {
  canView: boolean;
  canEdit: boolean;
  canDownload: boolean;
  canShare: boolean;
  canDelete: boolean;
  canManagePermissions: boolean;
}

export type SecurityLevel = 'public' | 'internal' | 'confidential' | 'restricted';

export type FileType = 
  | 'document' 
  | 'spreadsheet' 
  | 'presentation' 
  | 'pdf' 
  | 'image' 
  | 'video' 
  | 'audio' 
  | 'archive' 
  | 'contract' 
  | 'proposal';

export interface RetentionPolicy {
  autoDelete: boolean;
  deleteAfterDays: number;
  notifyBeforeDays: number;
}

export interface ComplianceFlag {
  type: 'gdpr' | 'hipaa' | 'sox' | 'pci' | 'custom';
  status: 'compliant' | 'pending' | 'violation';
  lastChecked: Date;
}
```

## Application Hooks

### useClientFiles Hook
```typescript
export const useClientFiles = (clientId: string) => {
  const [files, setFiles] = useState<ClientFile[]>([]);
  const [folders, setFolders] = useState<ClientFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      const [filesData, foldersData] = await Promise.all([
        clientFileService.getClientFiles(clientId),
        clientFileService.getClientFolders(clientId)
      ]);
      
      setFiles(filesData);
      setFolders(foldersData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  const createFolder = useCallback(async (folderData: CreateClientFolderData) => {
    const newFolder = await clientFileService.createClientFolder({
      ...folderData,
      clientId
    });
    setFolders(prev => [...prev, newFolder]);
    return newFolder;
  }, [clientId]);

  const moveFiles = useCallback(async (fileIds: string[], targetFolderId?: string) => {
    await clientFileService.moveClientFiles(fileIds, targetFolderId);
    setFiles(prev => prev.map(file => 
      fileIds.includes(file.id) 
        ? { ...file, folderId: targetFolderId }
        : file
    ));
  }, []);

  const deleteFiles = useCallback(async (fileIds: string[]) => {
    await clientFileService.deleteClientFiles(fileIds);
    setFiles(prev => prev.filter(file => !fileIds.includes(file.id)));
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files,
    folders,
    loading,
    error,
    refetch: fetchFiles,
    createFolder,
    moveFiles,
    deleteFiles
  };
};
```

### useClientFileSharing Hook
```typescript
export const useClientFileSharing = () => {
  const [sharingState, setSharingState] = useState<Record<string, boolean>>({});

  const shareFile = useCallback(async (
    fileId: string, 
    shareData: CreateFileShareData
  ) => {
    setSharingState(prev => ({ ...prev, [fileId]: true }));
    
    try {
      const share = await clientFileService.shareFile(fileId, shareData);
      return share;
    } finally {
      setSharingState(prev => ({ ...prev, [fileId]: false }));
    }
  }, []);

  const updateSharePermissions = useCallback(async (
    shareId: string, 
    permissions: SharePermission[]
  ) => {
    return clientFileService.updateSharePermissions(shareId, permissions);
  }, []);

  const revokeShare = useCallback(async (shareId: string) => {
    return clientFileService.revokeShare(shareId);
  }, []);

  const generateShareLink = useCallback(async (
    fileId: string, 
    options: ShareLinkOptions
  ) => {
    return clientFileService.generateShareLink(fileId, options);
  }, []);

  return {
    sharingState,
    shareFile,
    updateSharePermissions,
    revokeShare,
    generateShareLink
  };
};
```

## Service Layer

### ClientFileService
```typescript
export class ClientFileService {
  private api: ApiClient;
  private security: ClientSecurityService;

  constructor() {
    this.api = new ApiClient();
    this.security = new ClientSecurityService();
  }

  async getClientFiles(clientId: string, folderId?: string): Promise<ClientFile[]> {
    const params = new URLSearchParams({ clientId });
    if (folderId) params.append('folderId', folderId);

    const response = await this.api.get(`/client-files?${params}`);
    return response.data.map(this.transformFileData);
  }

  async uploadClientFile(data: UploadClientFileData): Promise<ClientFile> {
    // Validate file security and compliance
    await this.security.validateFileUpload(data.file, data.securityLevel);

    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('clientId', data.clientId);
    formData.append('securityLevel', data.securityLevel);
    if (data.folderId) formData.append('folderId', data.folderId);
    if (data.description) formData.append('description', data.description);

    const response = await this.api.post('/client-files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: data.onProgress
    });

    return this.transformFileData(response.data);
  }

  async shareFile(fileId: string, shareData: CreateFileShareData): Promise<FileShare> {
    // Validate sharing permissions
    await this.security.validateShareRequest(fileId, shareData);

    const response = await this.api.post(`/client-files/${fileId}/share`, shareData);
    return response.data;
  }

  async generateShareLink(fileId: string, options: ShareLinkOptions): Promise<string> {
    const response = await this.api.post(`/client-files/${fileId}/share-link`, options);
    return response.data.shareLink;
  }

  private transformFileData(data: any): ClientFile {
    return {
      id: data.id,
      clientId: data.clientId,
      folderId: data.folderId,
      title: data.title,
      description: data.description,
      type: data.type,
      size: data.size,
      url: data.url,
      thumbnailUrl: data.thumbnailUrl,
      securityLevel: data.securityLevel,
      tags: data.tags || [],
      sharedWith: data.sharedWith || [],
      permissions: data.permissions,
      version: data.version,
      versions: data.versions || [],
      metadata: {
        originalName: data.metadata.originalName,
        mimeType: data.metadata.mimeType,
        checksum: data.metadata.checksum,
        encryptionEnabled: data.metadata.encryptionEnabled,
        accessLog: data.metadata.accessLog || [],
        retentionPolicy: data.metadata.retentionPolicy,
        complianceFlags: data.metadata.complianceFlags || []
      },
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      createdBy: data.createdBy,
      updatedBy: data.updatedBy
    };
  }
}
```

## Implementation Guidelines

### Security & Compliance
- Implement encryption for sensitive client files
- Role-based access control for file operations
- Audit logging for all file access and modifications
- GDPR and HIPAA compliance for personal data
- Data retention policies and automatic cleanup

### File Management
- Support for large file uploads with progress tracking
- Version control with changelog tracking
- Thumbnail generation for image and document previews
- Advanced search with filters and metadata
- Batch operations for multiple files

### Sharing & Collaboration
- Secure file sharing with expiration dates
- Permission-based access control
- External sharing with password protection
- Real-time collaboration features
- Integration with email and messaging

### Performance Optimization
- Lazy loading for large file lists
- Caching for frequently accessed files
- CDN integration for file delivery
- Compression for uploaded files
- Background processing for file operations

### Analytics & Monitoring
- File access analytics and usage patterns
- Storage usage monitoring and alerts
- Security breach detection and reporting
- Performance metrics for file operations
- User behavior analysis and insights

### Mobile Optimization
- Responsive file management interface
- Touch-friendly file operations
- Offline file access and sync
- Mobile file upload with camera integration
- Push notifications for shared file updates

## Testing Strategy
- Unit tests for file operations and security
- Integration tests for file sharing and permissions
- E2E tests for complete file management workflows
- Performance tests for large file handling
- Security penetration testing
- Compliance audit verification

## SISO Design System Integration
- Consistent orange color scheme (#f6b75e) for primary actions
- Security badges and status indicators
- File type icons and visual hierarchy
- Loading states and progress indicators
- Responsive grid layouts for file galleries
- Dark mode support for professional interface