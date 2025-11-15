# Files Management

Comprehensive file management system with cloud storage integration, organization, sharing, and collaboration features.

## Overview

The Files Management module provides a unified file storage and management solution for the SISO partnership ecosystem. It supports file uploads, organization, versioning, sharing, and collaboration with integration to major cloud storage providers. This module enables partners to store, organize, and share documents, media, and other files related to their partnership activities.

## Domain Types

```typescript
interface File {
  id: string;
  name: string;
  type: FileType;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  previewUrl?: string;
  downloadUrl: string;
  folderId?: string;
  ownerId: string;
  owner: FileOwner;
  collaborators: FileCollaborator[];
  permissions: FilePermissions;
  metadata: FileMetadata;
  version: FileVersion;
  tags: FileTag[];
  checksum: string;
  createdAt: Date;
  updatedAt: Date;
  accessedAt: Date;
  isPinned: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  sharing: FileSharing;
}

interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  path: string;
  ownerId: string;
  owner: FolderOwner;
  children: Folder[];
  files: File[];
  collaborators: FolderCollaborator[];
  permissions: FolderPermissions;
  metadata: FolderMetadata;
  color: string;
  icon: string;
  isShared: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface FileMetadata {
  dimensions?: FileDimensions;
  duration?: number;
  pageCount?: number;
  wordCount?: number;
  lineCount?: number;
  extractedText?: string;
  language?: string;
  encoding?: string;
  exif?: EXIFData;
  customFields?: Record<string, any>;
  processingStatus: ProcessingStatus;
  virusScanStatus: VirusScanStatus;
}

interface FileCollaborator {
  id: string;
  userId: string;
  email: string;
  name: string;
  avatar?: string;
  role: CollaborationRole;
  permissions: Permission[];
  invitedAt: Date;
  lastAccessed?: Date;
}

interface FileVersion {
  id: string;
  fileId: string;
  version: number;
  size: number;
  checksum: string;
  url: string;
  changeDescription?: string;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
}

enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  SPREADSHEET = 'spreadsheet',
  PRESENTATION = 'presentation',
  PDF = 'pdf',
  ARCHIVE = 'archive',
  CODE = 'code',
  TEXT = 'text',
  OTHER = 'other'
}

enum ProcessingStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

enum VirusScanStatus {
  NOT_SCANNED = 'not_scanned',
  SCANNING = 'scanning',
  CLEAN = 'clean',
  INFECTED = 'infected',
  ERROR = 'error'
}
```

## Application Hooks

```typescript
// Files Management
export const useFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<FileViewMode>('grid');
  const [sortBy, setSortBy] = useState<FileSortOption>('name');
  const [isLoading, setIsLoading] = useState(false);

  const loadFiles = useCallback(async (folderId?: string) => {
    setIsLoading(true);
    try {
      const response = await filesService.getFiles({
        folderId,
        includeArchived: false,
        includeDeleted: false,
        limit: 100,
        sortBy,
        sortOrder: 'asc'
      });
      
      setFiles(response.data);
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setIsLoading(false);
    }
  }, [sortBy]);

  const loadFolders = useCallback(async (parentId?: string) => {
    try {
      const response = await filesService.getFolders({
        parentId,
        includeArchived: false,
        limit: 100
      });
      
      setFolders(response.data);
    } catch (error) {
      console.error('Failed to load folders:', error);
    }
  }, []);

  const uploadFile = useCallback(async (file: File, folderId?: string, onProgress?: (progress: number) => void): Promise<File> => {
    const uploadedFile = await filesService.uploadFile(file, {
      folderId,
      onProgress,
      generateThumbnail: true,
      generatePreview: shouldGeneratePreview(file.type),
      virusScan: true
    });
    
    setFiles(prev => [uploadedFile, ...prev]);
    
    // Track file upload
    analytics.track('file_uploaded', {
      file_id: uploadedFile.id,
      file_type: uploadedFile.type,
      file_size: uploadedFile.size,
      folder_id: folderId,
      timestamp: new Date().toISOString()
    });
    
    return uploadedFile;
  }, []);

  const createFolder = useCallback(async (folderData: CreateFolderData): Promise<Folder> => {
    const folder = await filesService.createFolder({
      ...folderData,
      parentId: currentFolder?.id,
      path: currentFolder ? `${currentFolder.path}/${folderData.name}` : `/${folderData.name}`,
      ownerId: getCurrentUserId()
    });
    
    setFolders(prev => [folder, ...prev]);
    return folder;
  }, [currentFolder]);

  const deleteFile = useCallback(async (fileId: string) => {
    await filesService.deleteFile(fileId);
    
    setFiles(prev => prev.filter(file => file.id !== fileId));
    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      newSet.delete(fileId);
      return newSet;
    });
  }, []);

  return {
    files,
    folders,
    currentFolder,
    selectedFiles,
    viewMode,
    sortBy,
    isLoading,
    loadFiles,
    loadFolders,
    uploadFile,
    createFolder,
    deleteFile,
    setCurrentFolder,
    setSelectedFiles,
    setViewMode,
    setSortBy
  };
};

// File Collaboration
export const useFileCollaboration = () => {
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);
  const [linkShares, setLinkShares] = useState<LinkShare[]>([]);

  const shareFile = useCallback(async (fileId: string, shareData: ShareFileData): Promise<ShareResult> => {
    const shareResult = await filesService.shareFile(fileId, shareData);
    
    setSharedFiles(prev => [...prev, shareResult.share]);
    
    if (shareResult.linkShare) {
      setLinkShares(prev => [...prev, shareResult.linkShare]);
    }
    
    return shareResult;
  }, []);

  const updatePermissions = useCallback(async (fileId: string, userId: string, permissions: Permission[]) => {
    const updatedFile = await filesService.updatePermissions(fileId, userId, permissions);
    
    setFiles(prev => prev.map(file =>
      file.id === fileId
        ? {
            ...file,
            collaborators: file.collaborators.map(collaborator =>
              collaborator.userId === userId
                ? { ...collaborator, permissions }
                : collaborator
            )
          }
        : file
    ));
    
    return updatedFile;
  }, []);

  const generateShareLink = useCallback(async (fileId: string, options: ShareLinkOptions) => {
    const linkShare = await filesService.generateShareLink(fileId, options);
    
    setLinkShares(prev => [...prev, linkShare]);
    return linkShare;
  }, []);

  return {
    sharedFiles,
    linkShares,
    shareFile,
    updatePermissions,
    generateShareLink
  };
};

// File Search and Organization
export const useFileSearch = () => {
  const [searchResults, setSearchResults] = useState<File[]>([]);
  const [recentFiles, setRecentFiles] = useState<File[]>([]);
  const [pinnedFiles, setPinnedFiles] = useState<File[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchFiles = useCallback(async (query: string, options?: FileSearchOptions) => {
    setIsSearching(true);
    try {
      const response = await filesService.searchFiles({
        query,
        options: {
          includeContent: true,
          includeTags: true,
          includeMetadata: true,
          fuzzySearch: true,
          ...options
        }
      });
      
      setSearchResults(response.data);
      return response.data;
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    } finally {
      setIsSearching(false);
    }
  }, []);

  const loadRecentFiles = useCallback(async () => {
    const response = await filesService.getRecentFiles({ limit: 20 });
    setRecentFiles(response.data);
  }, []);

  const loadPinnedFiles = useCallback(async () => {
    const response = await filesService.getPinnedFiles();
    setPinnedFiles(response.data);
  }, []);

  const organizeFiles = useCallback(async (fileIds: string[], organization: FileOrganization) => {
    const result = await filesService.organizeFiles(fileIds, organization);
    
    // Update local state with organized files
    if (organization.type === 'folder') {
      setFiles(prev => prev.map(file => {
        if (fileIds.includes(file.id)) {
          return { ...file, folderId: organization.folderId, updatedAt: new Date() };
        }
        return file;
      }));
    } else if (organization.type === 'tags') {
      setFiles(prev => prev.map(file => {
        if (fileIds.includes(file.id)) {
          return { ...file, tags: organization.tags, updatedAt: new Date() };
        }
        return file;
      }));
    }
    
    return result;
  }, []);

  return {
    searchResults,
    recentFiles,
    pinnedFiles,
    isSearching,
    searchFiles,
    loadRecentFiles,
    loadPinnedFiles,
    organizeFiles
  };
};
```

## Component Architecture

### FilesContainer

```typescript
interface FilesContainerProps {
  initialFolderId?: string;
  initialView?: FileViewMode;
}

export const FilesContainer: React.FC<FilesContainerProps> = ({
  initialFolderId,
  initialView = 'grid'
}) => {
  const {
    files,
    folders,
    currentFolder,
    selectedFiles,
    viewMode,
    sortBy,
    isLoading,
    loadFiles,
    loadFolders,
    uploadFile,
    createFolder,
    deleteFile,
    setCurrentFolder,
    setSelectedFiles,
    setViewMode,
    setSortBy
  } = useFiles();

  const { shareFile, generateShareLink } = useFileCollaboration();
  const { searchResults, recentFiles, pinnedFiles, searchFiles, organizeFiles } = useFileSearch();

  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showCreateFolderDialog, setShowCreateFolderDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialFolderId) {
      loadFolder(initialFolderId);
    } else {
      loadRootFolder();
    }
  }, [initialFolderId]);

  const handleFolderNavigation = useCallback((folder: Folder) => {
    setCurrentFolder(folder);
    loadFiles(folder.id);
  }, [loadFiles]);

  const handleFileUpload = useCallback(async (files: FileList) => {
    const uploadPromises = Array.from(files).map(file => 
      uploadFile(file, currentFolder?.id)
    );
    
    await Promise.all(uploadPromises);
  }, [uploadFile, currentFolder]);

  const handleFileSelect = useCallback((fileId: string, isSelected: boolean) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(fileId);
      } else {
        newSet.delete(fileId);
      }
      return newSet;
    });
  }, [setSelectedFiles]);

  const handleFileShare = useCallback(async () => {
    const fileIds = Array.from(selectedFiles);
    if (fileIds.length === 0) return;
    
    const shareResults = await Promise.all(
      fileIds.map(fileId => shareFile(fileId, { type: 'direct' }))
    );
    
    setShowShareDialog(true);
  }, [selectedFiles, shareFile]);

  const handleFileOrganize = useCallback(async () => {
    const fileIds = Array.from(selectedFiles);
    if (fileIds.length === 0) return;
    
    await organizeFiles(fileIds, {
      type: 'folder',
      folderId: currentFolder?.id || 'root'
    });
  }, [selectedFiles, organizeFiles, currentFolder]);

  const displayItems = useMemo(() => {
    let items: FileSystemItem[] = [];
    
    if (currentFolder) {
      items.push(...folders.filter(folder => folder.parentId === currentFolder.id));
    } else {
      items.push(...folders.filter(folder => !folder.parentId));
    }
    
    items.push(...files);
    
    return items.sort((a, b) => {
      if (a.type === 'folder' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'folder') return 1;
      return a.name.localeCompare(b.name);
    });
  }, [files, folders, currentFolder]);

  return (
    <FilesLayout>
      <FilesHeader>
        <HeaderLeft>
          <BreadcrumbNavigation
            folders={folders}
            currentFolder={currentFolder}
            onFolderNavigate={handleFolderNavigation}
          />
        </HeaderLeft>
        
        <HeaderCenter>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={searchFiles}
            placeholder="Search files and folders..."
            isLoading={isSearching}
          />
        </HeaderCenter>
        
        <HeaderRight>
          <ViewModeToggle
            mode={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'grid', label: 'Grid', icon: ViewModuleIcon },
              { value: 'list', label: 'List', icon: ViewListIcon },
              { value: 'tree', label: 'Tree', icon: AccountTreeIcon }
            ]}
          />
          <SortMenu
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: 'name', label: 'Name' },
              { value: 'date', label: 'Date' },
              { value: 'size', label: 'Size' },
              { value: 'type', label: 'Type' }
            ]}
          />
          <UploadButton onClick={() => setShowUploadDialog(true)} />
          <CreateFolderButton onClick={() => setShowCreateFolderDialog(true)} />
        </HeaderRight>
      </FilesHeader>

      <FilesToolbar>
        <BulkActions
          selectedCount={selectedFiles.size}
          onShare={handleFileShare}
          onOrganize={handleFileOrganize}
          onDelete={handleBulkDelete}
          onDownload={handleBulkDownload}
        />
        
        <QuickAccess>
          <RecentFiles files={recentFiles} onFileSelect={(file) => navigateToFile(file)} />
          <PinnedFiles files={pinnedFiles} onFileSelect={(file) => navigateToFile(file)} />
        </QuickAccess>
      </FilesToolbar>

      <FilesContent>
        {viewMode === 'tree' ? (
          <FilesTreeView
            folders={folders}
            files={files}
            currentFolder={currentFolder}
            onFolderSelect={handleFolderNavigation}
            onFileSelect={setSelectedFiles}
          />
        ) : viewMode === 'list' ? (
          <FilesListView
            items={displayItems}
            selectedFiles={selectedFiles}
            onFileSelect={handleFileSelect}
            onFolderSelect={handleFolderNavigation}
            onFileDelete={deleteFile}
            onFileShare={(fileId) => shareFile(fileId, { type: 'direct' })}
          />
        ) : (
          <FilesGridView
            items={displayItems}
            selectedFiles={selectedFiles}
            onFileSelect={handleFileSelect}
            onFolderSelect={handleFolderNavigation}
            onFileDelete={deleteFile}
            onFileShare={(fileId) => shareFile(fileId, { type: 'direct' })}
          />
        )}
      </FilesContent>

      <FilesSidebar>
        <StorageUsage
          used={storageStats.used}
          total={storageStats.total}
          usageByType={storageStats.byType}
        />
        
        <FileTags
          onTagSelect={(tagId) => filterByTag(tagId)}
        />
        
        <SharedLinks links={linkShares} />
      </FilesSidebar>

      {showUploadDialog && (
        <UploadDialog
          folderId={currentFolder?.id}
          onClose={() => setShowUploadDialog(false)}
          onUpload={handleFileUpload}
        />
      )}

      {showCreateFolderDialog && (
        <CreateFolderDialog
          parentId={currentFolder?.id}
          onClose={() => setShowCreateFolderDialog(false)}
          onCreate={createFolder}
        />
      )}

      {showShareDialog && (
        <ShareDialog
          files={Array.from(selectedFiles).map(id => files.find(f => f.id === id)).filter(Boolean)}
          onClose={() => setShowShareDialog(false)}
          onShare={shareFile}
          onGenerateLink={generateShareLink}
        />
      )}
    </FilesLayout>
  );
};
```

### FilePreviewDialog

```typescript
interface FilePreviewDialogProps {
  file: File;
  open: boolean;
  onClose: () => void;
}

export const FilePreviewDialog: React.FC<FilePreviewDialogProps> = ({
  file,
  open,
  onClose
}) => {
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (file && open) {
      loadPreviewContent(file);
    }
  }, [file, open]);

  const loadPreviewContent = useCallback(async (file: File) => {
    try {
      let content: PreviewContent;

      switch (file.type) {
        case 'image':
          content = {
            type: 'image',
            url: file.previewUrl || file.url,
            dimensions: file.metadata.dimensions,
            exif: file.metadata.exif
          };
          break;
        
        case 'video':
          content = {
            type: 'video',
            url: file.url,
            thumbnailUrl: file.thumbnailUrl,
            duration: file.metadata.duration
          };
          break;
        
        case 'audio':
          content = {
            type: 'audio',
            url: file.url,
            duration: file.metadata.duration
          };
          break;
        
        case 'pdf':
        case 'document':
          content = {
            type: 'document',
            url: file.previewUrl || file.url,
            pageCount: file.metadata.pageCount
          };
          break;
        
        case 'code':
          content = {
            type: 'code',
            content: await fetchFileContent(file.url),
            language: file.metadata.language,
            lineCount: file.metadata.lineCount
          };
          break;
        
        default:
          content = {
            type: 'file',
            url: file.url,
            mimeType: file.mimeType
          };
      }

      setPreviewContent(content);
    } catch (error) {
      console.error('Failed to load preview:', error);
      setPreviewContent(null);
    }
  }, []);

  const handleDownload = useCallback(() => {
    window.open(file.downloadUrl, '_blank');
  }, [file.downloadUrl]);

  const handleShare = useCallback(() => {
    // Implement share functionality
  }, []);

  const renderPreview = useCallback(() => {
    if (!previewContent) return null;

    switch (previewContent.type) {
      case 'image':
        return (
          <ImagePreview
            src={previewContent.url}
            alt={file.name}
            dimensions={previewContent.dimensions}
            exif={previewContent.exif}
            isFullscreen={isFullscreen}
            onFullscreenToggle={setIsFullscreen}
          />
        );
      
      case 'video':
        return (
          <VideoPreview
              src={previewContent.url}
              thumbnailUrl={previewContent.thumbnailUrl}
              title={file.name}
              duration={previewContent.duration}
              isFullscreen={isFullscreen}
              onFullscreenToggle={setIsFullscreen}
          />
        );
      
      case 'audio':
        return (
          <AudioPreview
            src={previewContent.url}
            title={file.name}
            duration={previewContent.duration}
          />
        );
      
      case 'document':
        return (
          <DocumentPreview
            url={previewContent.url}
            title={file.name}
            pageCount={previewContent.pageCount}
          />
        );
      
      case 'code':
        return (
          <CodePreview
            content={previewContent.content}
            language={previewContent.language}
            lineCount={previewContent.lineCount}
            filename={file.name}
          />
        );
      
      default:
        return (
          <FilePreview
            url={previewContent.url}
            mimeType={previewContent.mimeType}
            filename={file.name}
            size={file.size}
          />
        );
    }
  }, [previewContent, file, isFullscreen]);

  return (
    <PreviewDialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <PreviewHeader>
        <FileInfo>
          <FileName>{file.name}</FileName>
          <FileSize>{formatFileSize(file.size)}</FileSize>
          <FileModifiedDate>
            Modified: {formatDate(file.updatedAt)}
          </FileModifiedDate>
        </FileInfo>
        
        <PreviewActions>
          <ActionButton onClick={handleDownload}>
            <DownloadIcon />
            Download
          </ActionButton>
          <ActionButton onClick={handleShare}>
            <ShareIcon />
            Share
          </ActionButton>
          <ActionButton onClick={() => setIsFullscreen(!isFullscreen)}>
            <FullscreenIcon />
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </ActionButton>
        </PreviewActions>
      </PreviewHeader>

      <PreviewContentContainer isFullscreen={isFullscreen}>
        {renderPreview()}
      </PreviewContentContainer>
    </PreviewDialog>
  );
};
```

### UploadDialog

```Interface UploadDialogProps {
  folderId?: string;
  onClose: () => void;
  onUpload: (files: FileList) => Promise<void>;
}

export const UploadDialog: React.FC<UploadDialogProps> = ({
  folderId,
  onClose,
  onUpload
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    const uploadFiles = Array.from(selectedFiles).map(file => ({
      file,
      id: generateId(),
      status: 'pending',
      progress: 0,
      error: null
    }));
    
    setFiles(prev => [...prev, ...uploadFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    if (e.dataTransfer.files) {
      handleFilesSelected(e.dataTransfer.files);
    }
  }, [handleFilesSelected]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFilesSelected(e.target.files);
    }
  }, [handleFilesSelected]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  }, []);

  const uploadAllFiles = useCallback(async () => {
    setIsUploading(true);
    
    try {
      await Promise.all(
        files.map(async (uploadFile) => {
          setUploadProgress(prev => ({
            ...prev,
            [uploadFile.id]: 0
          }));
          
          setFiles(prev => prev.map(f =>
            f.id === uploadFile.id
              ? { ...f, status: 'uploading' }
              : f
          ));
          
          try {
            await onUpload([uploadFile.file]);
            
            setFiles(prev => prev.map(f =>
              f.id === uploadFile.id
                ? { ...f, status: 'completed', progress: 100 }
                : f
            ));
          } catch (error) {
            setFiles(prev => prev.map(f =>
              f.id === uploadFile.id
                ? { ...f, status: 'error', error: error.message }
                : f
            ));
          }
        })
      );
      
      // Clear successful uploads
      setFiles(prev => prev.filter(f => f.status === 'completed'));
      onClose();
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  }, [files, onUpload, onClose]);

  return (
    <UploadDialogContainer>
      <DropZone
        ref={dropzoneRef}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <UploadIcon />
        <UploadText>
          Drag and drop files here, or click to select
        </UploadText>
        
        <UploadInput
          id="file-input"
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </DropZone>

      {files.length > 0 && (
        <FileList>
          <FileListHeader>
            <FileCount>{files.length} file{files.length !== 1 ? 's' : ''}</FileCount>
            <UploadAllButton
              onClick={uploadAllFiles}
              disabled={isUploading || files.some(f => f.status === 'error')}
            >
              {isUploading ? 'Uploading...' : 'Upload All'}
            </UploadAllButton>
          </FileListHeader>
          
          <FileItems>
            {files.map(file => (
              <FileItem key={file.id}>
                <FileIcon>
                  <FileTypeIcon type={getFileIconType(file.file.type)} />
                </FileIcon>
                
                <FileInfo>
                  <FileName>{file.file.name}</FileName>
                  <FileSize>{formatFileSize(file.file.size)}</FileSize>
                  
                  {file.status === 'uploading' && uploadProgress[file.id] !== undefined && (
                    <ProgressBar value={uploadProgress[file.id]} />
                  )}
                  
                  {file.status === 'error' && (
                    <ErrorMessage>{file.error}</ErrorMessage>
                  )}
                </FileInfo>
                
                <FileActions>
                  {file.status === 'completed' ? (
                    <SuccessIcon />
                  ) : file.status === 'error' ? (
                    <RetryIcon
                      onClick={() => retryUpload(file)}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : file.status === 'uploading' ? (
                    <CircularProgress size={20} value={uploadProgress[file.id] || 0} />
                  ) : (
                    <RemoveIcon
                      onClick={() => removeFile(file.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </FileActions>
              </FileItem>
            ))}
          </FileItems>
        </FileList>
      )}

      <DialogActions>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </DialogActions>
    </UploadDialogContainer>
  );
};
```

## Implementation Guidelines

### File Storage Configuration

```typescript
export const fileStorageConfig: FileStorageConfiguration = {
  providers: {
    cloudinary: {
      name: 'Cloudinary',
      uploadPreset: 'siso_files',
      folder: 'partnership-workspace',
      allowedTypes: ['image', 'video', 'audio', 'document'],
      maxFileSize: 100 * 1024 * 1024, // 100MB
      transformations: {
        image: [
          { quality: 'auto', fetch_format: 'auto' },
          { resize: { width: 2000, height: 2000, crop: 'limit' } },
          { fetch_format: 'auto' }
        ],
        video: [
          { quality: 'auto', fetch_format: 'mp4' }
        ]
      }
    },
    
    aws_s3: {
      name: 'AWS S3',
      bucket: 'siso-partnership-files',
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      maxFileSize: 500 * 1024 * 1024 // 500MB
    }
  },
  
  security: {
    virusScanning: {
      enabled: true,
      provider: 'clamav',
      quarantineInfected: true,
      allowedFileTypes: [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/msword',
        'text/plain'
      ]
    },
    
    encryption: {
      enabled: true,
      algorithm: 'AES-256-GCM',
      keyRotation: 'monthly'
    }
  },
  
  processing: {
    thumbnailGeneration: {
      enabled: true,
      sizes: [150, 300, 600, 1200],
      quality: 80
    },
    
    contentExtraction: {
      enabled: true,
      languages: ['en', 'es', 'fr', 'de', 'it'],
      maxFileSize: 10 * 1024 * 1024 // 10MB
    },
    
    ocr: {
      enabled: true,
      languages: ['eng', 'spa', 'fra', 'deu', 'ita'],
      confidence: 0.8
    }
  }
};
```

### File Organization Rules

```typescript
export const organizationRules: OrganizationRule[] = [
  {
    name: 'automatic_folder_creation',
    condition: 'upload_count > 10',
    action: 'create_monthly_folders',
    description: 'Create monthly folders when upload count exceeds 10'
  },
  
  {
    name: 'file_type_organization',
    condition: 'file_type in ["image", "video", "document"]',
    action: 'organize_by_type',
    description: 'Organize files into type-specific folders'
  },
  
  {
    name: 'date_based_organization',
    condition: 'no_existing_organization',
    action: 'organize_by_date',
    description: 'Organize files by creation date if no other organization exists'
  }
];
```

## Features

### File Management
- Drag-and-drop file upload
- Multiple file upload support
- File type validation and security scanning
- Thumbnail and preview generation
- Version control and history

### Cloud Storage Integration
- Support for multiple storage providers
- Automatic backup and sync
- CDN integration for fast access
- Secure file sharing links

### Organization & Search
- Folder-based organization
- Tag and metadata support
- Full-text search across files
- Smart file suggestions

### Collaboration Features
- File sharing with granular permissions
- Real-time collaboration indicators
- Comment and annotation support
- Access control and audit logs

## Security Considerations

- Virus scanning for all uploaded files
- File type and size validation
- Access control based on permissions
- Encrypted storage for sensitive files
- Audit logging for file operations

## Accessibility

- Screen reader support for file navigation
- Keyboard shortcuts for file operations
- High contrast mode support
- Clear visual indicators for file types and status