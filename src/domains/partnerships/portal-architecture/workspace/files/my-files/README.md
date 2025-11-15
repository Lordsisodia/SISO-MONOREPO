# My Files Management

## Overview
The My Files Management system provides a personal file storage and organization solution within the SISO partnership portal. This module offers partners a secure space to store, organize, and manage their personal documents, templates, and resources with advanced search capabilities and integration with other partnership tools.

## Architecture

### Directory Structure
```
files/my-files/
├── components/
│   ├── MyFilesDashboard.tsx
│   ├── FileCard.tsx
│   ├── FolderView.tsx
│   ├── FileUploader.tsx
│   ├── SearchAndFilter.tsx
│   └── FileOperations.tsx
├── hooks/
│   ├── useMyFiles.ts
│   ├── useFileUpload.ts
│   ├── useFileSearch.ts
│   └── useFileOrganization.ts
├── services/
│   ├── myFilesService.ts
│   ├── fileUploadService.ts
│   └── fileSearchService.ts
├── types/
│   ├── my-files.types.ts
│   └── file-organization.types.ts
└── utils/
    ├── fileUtils.ts
    └── searchUtils.ts
```

### Core Components

#### MyFilesDashboard Component
```typescript
interface MyFilesDashboardProps {
  viewMode: 'grid' | 'list';
  sortBy: SortOption;
  filters: FileFilters;
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onSortChange: (sort: SortOption) => void;
  onFiltersChange: (filters: FileFilters) => void;
}

export const MyFilesDashboard: React.FC<MyFilesDashboardProps> = ({
  viewMode,
  sortBy,
  filters,
  onViewModeChange,
  onSortChange,
  onFiltersChange
}) => {
  const { files, folders, loading, searchFiles, createFolder } = useMyFiles(filters, sortBy);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    searchFiles(query);
  }, [searchFiles]);

  const handleBulkOperations = useCallback(async (operation: BulkOperation) => {
    switch (operation) {
      case 'download':
        await downloadFiles(selectedFiles);
        break;
      case 'move':
        await moveFiles(selectedFiles);
        break;
      case 'delete':
        await deleteFiles(selectedFiles);
        setSelectedFiles([]);
        break;
      case 'share':
        await shareFiles(selectedFiles);
        break;
    }
  }, [selectedFiles]);

  const handleDragAndDrop = useCallback(async (files: FileList, targetFolder?: string) => {
    const uploadPromises = Array.from(files).map(file => 
      uploadFile(file, targetFolder)
    );
    
    await Promise.all(uploadPromises);
  }, []);

  return (
    <div className="my-files-dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <h1>My Files</h1>
          <p className="text-muted-foreground">
            {files.length} files • {folders.length} folders
          </p>
        </div>
        
        <div className="header-actions">
          <SearchAndFilter
            value={searchQuery}
            onSearch={handleSearch}
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
          
          <div className="view-controls">
            <ToggleGroup 
              type="single" 
              value={viewMode} 
              onValueChange={onViewModeChange}
            >
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <Grid className="w-4 h-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date Modified</SelectItem>
                <SelectItem value="size">Size</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={() => setShowUploadDialog(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="bulk-operations-bar">
          <div className="selection-info">
            <span>{selectedFiles.length} files selected</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedFiles([])}>
              Clear selection
            </Button>
          </div>
          
          <div className="bulk-actions">
            <Button variant="outline" size="sm" onClick={() => handleBulkOperations('share')}>
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkOperations('move')}>
              <Folder className="w-4 h-4 mr-1" />
              Move
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkOperations('download')}>
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkOperations('delete')}>
              <Trash className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}
      
      <div className="dashboard-content">
        <DragAndDropContainer onDrop={handleDragAndDrop}>
          {viewMode === 'grid' ? (
            <FileGridView
              files={files}
              folders={folders}
              selectedFiles={selectedFiles}
              onFileSelect={(fileId) => setSelectedFiles(prev => 
                prev.includes(fileId) 
                  ? prev.filter(id => id !== fileId)
                  : [...prev, fileId]
              )}
              onFileOpen={handleFileOpen}
              onFolderOpen={handleFolderOpen}
            />
          ) : (
            <FileListView
              files={files}
              folders={folders}
              selectedFiles={selectedFiles}
              onFileSelect={(fileId) => setSelectedFiles(prev => 
                prev.includes(fileId) 
                  ? prev.filter(id => id !== fileId)
                  : [...prev, fileId]
              )}
              onFileOpen={handleFileOpen}
              onFolderOpen={handleFolderOpen}
            />
          )}
        </DragAndDropContainer>
      </div>
      
      <FileUploader
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
};
```

#### FileCard Component
```typescript
interface FileCardProps {
  file: PersonalFile;
  isSelected: boolean;
  onSelect: (fileId: string, selected: boolean) => void;
  onOpen: (file: PersonalFile) => void;
  onPreview: (file: PersonalFile) => void;
  onDownload: (file: PersonalFile) => void;
  onShare: (file: PersonalFile) => void;
  onDelete: (file: PersonalFile) => void;
  onRename: (file: PersonalFile) => void;
  onMove: (file: PersonalFile) => void;
  onDuplicate: (file: PersonalFile) => void;
  className?: string;
}

export const FileCard: React.FC<FileCardProps> = ({
  file,
  isSelected,
  onSelect,
  onOpen,
  onPreview,
  onDownload,
  onShare,
  onDelete,
  onRename,
  onMove,
  onDuplicate,
  className
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const handleRename = useCallback(async () => {
    if (newName.trim() && newName !== file.name) {
      await onRename({ ...file, name: newName.trim() });
    }
    setIsRenaming(false);
  }, [file, newName, onRename]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setNewName(file.name);
      setIsRenaming(false);
    }
  }, [handleRename, file.name]);

  return (
    <Card 
      className={cn(
        'file-card',
        isSelected && 'selected',
        isRenaming && 'renaming',
        className
      )}
      onClick={() => onSelect(file.id, !isSelected)}
    >
      <div className="file-card-header">
        <div className="file-icon-section">
          <FileIcon type={file.type} size="large" />
          {file.isFavorite && (
            <Star className="favorite-icon w-4 h-4 text-yellow-500 fill-current" />
          )}
        </div>
        
        <div className="file-info-section">
          {isRenaming ? (
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyDown}
              className="rename-input"
              autoFocus
            />
          ) : (
            <h3 className="file-name" title={file.name}>
              {file.name}
            </h3>
          )}
          
          <p className="file-meta">
            {formatFileSize(file.size)} • {formatDate(file.updatedAt)}
          </p>
          
          {file.tags.length > 0 && (
            <div className="file-tags">
              {file.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {file.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{file.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <div className="file-actions-section">
          <div className="quick-actions">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onPreview(file);
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDownload(file);
              }}
            >
              <Download className="w-4 h-4" />
            </Button>
            
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onOpen(file)}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => onShare(file)}>
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => {
                  setIsRenaming(true);
                  setIsMenuOpen(false);
                }}>
                  <Edit className="w-4 h-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => onMove(file)}>
                  <Folder className="w-4 h-4 mr-2" />
                  Move
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={() => onDuplicate(file)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={() => onToggleFavorite(file)}>
                  <Star className={cn(
                    "w-4 h-4 mr-2",
                    file.isFavorite && "fill-current text-yellow-500"
                  )} />
                  {file.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => onDelete(file)}
                  className="text-destructive"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {file.description && (
        <div className="file-description">
          <p className="text-sm text-muted-foreground">{file.description}</p>
        </div>
      )}
      
      {file.sharingInfo && (
        <div className="file-sharing-info">
          <div className="sharing-indicator">
            <Users className="w-3 h-3 mr-1" />
            <span className="text-xs">Shared with {file.sharingInfo.sharedWithCount}</span>
          </div>
          
          {file.sharingInfo.isPublic && (
            <Badge variant="outline" className="text-xs">
              <Globe className="w-3 h-3 mr-1" />
              Public
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
};
```

## Domain Types

### My Files Types
```typescript
export interface PersonalFile {
  id: string;
  name: string;
  description?: string;
  type: FileType;
  size: number;
  url: string;
  thumbnailUrl?: string;
  folderId?: string;
  tags: string[];
  metadata: PersonalFileMetadata;
  sharingInfo?: SharingInfo;
  isFavorite: boolean;
  isArchived: boolean;
  isTrashed: boolean;
  version: number;
  versions: FileVersion[];
  accessLevel: AccessLevel;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface PersonalFolder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  path: string;
  color?: string;
  icon?: string;
  isFavorite: boolean;
  isArchived: boolean;
  isTrashed: boolean;
  childFolders: PersonalFolder[];
  childFiles: PersonalFile[];
  sharingInfo?: FolderSharingInfo;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface PersonalFileMetadata {
  originalName: string;
  mimeType: string;
  checksum: string;
  dimensions?: { width: number; height: number };
  duration?: number;
  pages?: number;
  encoding?: string;
  compressionRatio?: number;
  extractedText?: string;
  extractedMetadata: Record<string, any>;
  storageLocation: StorageLocation;
  backupLocations: StorageLocation[];
  accessLog: FileAccessLog[];
  searchIndex: SearchIndexData;
}

export interface SharingInfo {
  isPublic: boolean;
  publicLink?: string;
  publicLinkExpiry?: Date;
  sharedWithCount: number;
  sharedWith: FileShare[];
  permissions: SharePermissions;
  allowComments: boolean;
  allowDownload: boolean;
  requireSignIn: boolean;
  passwordProtected?: string;
  downloadLimit?: number;
  viewCount: number;
  lastAccessed?: Date;
}

export interface FileSearchResult {
  file: PersonalFile;
  relevanceScore: number;
  matchedContent: MatchedContent[];
  highlightedContent: string;
  matchType: 'name' | 'content' | 'metadata' | 'tags';
}

export interface FileFilters {
  fileTypes?: FileType[];
  tags?: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  sizeRange?: {
    min: number;
    max: number;
  };
  sharingStatus?: 'private' | 'shared' | 'public';
  favorite?: boolean;
  archived?: boolean;
  trashed?: boolean;
  folderId?: string;
}

export type SortOption = 'name' | 'date' | 'size' | 'type' | 'modified';
export type FileType = 'document' | 'image' | 'video' | 'audio' | 'archive' | 'spreadsheet' | 'presentation' | 'pdf' | 'code' | 'other';
export type AccessLevel = 'private' | 'shared' | 'public';
export type BulkOperation = 'download' | 'move' | 'delete' | 'share' | 'duplicate' | 'archive' | 'restore';

export interface StorageLocation {
  provider: 'local' | 's3' | 'google-drive' | 'dropbox' | 'onedrive';
  path: string;
  region?: string;
  isEncrypted: boolean;
  isPrimary: boolean;
}
```

## Application Hooks

### useMyFiles Hook
```typescript
export const useMyFiles = (filters?: FileFilters, sortBy?: SortOption) => {
  const [files, setFiles] = useState<PersonalFile[]>([]);
  const [folders, setFolders] = useState<PersonalFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      const [filesData, foldersData] = await Promise.all([
        myFilesService.getPersonalFiles(filters, sortBy),
        myFilesService.getPersonalFolders(filters?.folderId)
      ]);
      
      setFiles(filesData);
      setFolders(foldersData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy]);

  const uploadFile = useCallback(async (file: File, folderId?: string) => {
    const uploadedFile = await myFilesService.uploadFile(file, folderId);
    setFiles(prev => [...prev, uploadedFile]);
    return uploadedFile;
  }, []);

  const createFolder = useCallback(async (folderData: CreateFolderData) => {
    const newFolder = await myFilesService.createFolder(folderData);
    setFolders(prev => [...prev, newFolder]);
    return newFolder;
  }, []);

  const moveFiles = useCallback(async (fileIds: string[], targetFolderId?: string) => {
    await myFilesService.moveFiles(fileIds, targetFolderId);
    setFiles(prev => prev.map(file => 
      fileIds.includes(file.id) 
        ? { ...file, folderId: targetFolderId }
        : file
    ));
  }, []);

  const deleteFiles = useCallback(async (fileIds: string[]) => {
    await myFilesService.deleteFiles(fileIds);
    setFiles(prev => prev.filter(file => !fileIds.includes(file.id)));
  }, []);

  const toggleFavorite = useCallback(async (fileId: string) => {
    const updatedFile = await myFilesService.toggleFavorite(fileId);
    setFiles(prev => prev.map(file =>
      file.id === fileId ? updatedFile : file
    ));
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
    uploadFile,
    createFolder,
    moveFiles,
    deleteFiles,
    toggleFavorite
  };
};
```

### useFileSearch Hook
```typescript
export const useFileSearch = () => {
  const [searchResults, setSearchResults] = useState<FileSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const searchFiles = useCallback(async (query: string, filters?: FileFilters) => {
    if (!query.trim()) {
      setSearchResults([]);
      return [];
    }

    try {
      setIsSearching(true);
      const results = await fileSearchService.searchFiles(query, filters);
      setSearchResults(results);
      
      // Update search history
      setSearchHistory(prev => {
        const updated = [query, ...prev.filter(q => q !== query)];
        return updated.slice(0, 10); // Keep last 10 searches
      });
      
      return results;
    } catch (err) {
      console.error('Search failed:', err);
      return [];
    } finally {
      setIsSearching(false);
    }
  }, []);

  const searchByContent = useCallback(async (query: string) => {
    try {
      setIsSearching(true);
      const results = await fileSearchService.searchByContent(query);
      setSearchResults(results);
      return results;
    } finally {
      setIsSearching(false);
    }
  }, []);

  const searchBySimilarity = useCallback(async (fileId: string) => {
    try {
      setIsSearching(true);
      const results = await fileSearchService.findSimilarFiles(fileId);
      setSearchResults(results);
      return results;
    } finally {
      setIsSearching(false);
    }
  }, []);

  return {
    searchResults,
    isSearching,
    searchHistory,
    searchFiles,
    searchByContent,
    searchBySimilarity
  };
};
```

## Service Layer

### MyFilesService
```typescript
export class MyFilesService {
  private api: ApiClient;
  private upload: FileUploadService;
  private search: FileSearchService;

  constructor() {
    this.api = new ApiClient();
    this.upload = new FileUploadService();
    this.search = new FileSearchService();
  }

  async getPersonalFiles(filters?: FileFilters, sortBy?: SortOption): Promise<PersonalFile[]> {
    const params = new URLSearchParams();
    
    if (filters?.fileTypes?.length) {
      params.append('fileTypes', filters.fileTypes.join(','));
    }
    if (filters?.tags?.length) {
      params.append('tags', filters.tags.join(','));
    }
    if (filters?.dateRange) {
      params.append('dateFrom', filters.dateRange.from.toISOString());
      params.append('dateTo', filters.dateRange.to.toISOString());
    }
    if (filters?.folderId) {
      params.append('folderId', filters.folderId);
    }
    if (filters?.favorite !== undefined) {
      params.append('favorite', filters.favorite.toString());
    }
    if (filters?.archived !== undefined) {
      params.append('archived', filters.archived.toString());
    }
    if (sortBy) {
      params.append('sortBy', sortBy);
    }

    const response = await this.api.get(`/my-files?${params}`);
    return response.data.map(this.transformPersonalFileData);
  }

  async uploadFile(file: File, folderId?: string): Promise<PersonalFile> {
    const uploadResult = await this.upload.uploadFile({
      file,
      folderId,
      metadata: {
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
        lastModified: new Date(file.lastModified)
      }
    });

    return this.transformPersonalFileData(uploadResult.file);
  }

  async createFolder(folderData: CreateFolderData): Promise<PersonalFolder> {
    const response = await this.api.post('/my-files/folders', folderData);
    return this.transformFolderData(response.data);
  }

  async toggleFavorite(fileId: string): Promise<PersonalFile> {
    const response = await this.api.post(`/my-files/${fileId}/toggle-favorite`);
    return this.transformPersonalFileData(response.data);
  }

  async moveFiles(fileIds: string[], targetFolderId?: string): Promise<void> {
    await this.api.post('/my-files/move', {
      fileIds,
      targetFolderId
    });
  }

  async duplicateFile(fileId: string, newName?: string): Promise<PersonalFile> {
    const response = await this.api.post(`/my-files/${fileId}/duplicate`, {
      newName
    });
    return this.transformPersonalFileData(response.data);
  }

  private transformPersonalFileData(data: any): PersonalFile {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      type: data.type,
      size: data.size,
      url: data.url,
      thumbnailUrl: data.thumbnailUrl,
      folderId: data.folderId,
      tags: data.tags || [],
      metadata: {
        originalName: data.metadata.originalName,
        mimeType: data.metadata.mimeType,
        checksum: data.metadata.checksum,
        dimensions: data.metadata.dimensions,
        duration: data.metadata.duration,
        pages: data.metadata.pages,
        encoding: data.metadata.encoding,
        compressionRatio: data.metadata.compressionRatio,
        extractedText: data.metadata.extractedText,
        extractedMetadata: data.metadata.extractedMetadata || {},
        storageLocation: data.metadata.storageLocation,
        backupLocations: data.metadata.backupLocations || [],
        accessLog: data.metadata.accessLog || [],
        searchIndex: data.metadata.searchIndex
      },
      sharingInfo: data.sharingInfo,
      isFavorite: data.isFavorite,
      isArchived: data.isArchived,
      isTrashed: data.isTrashed,
      version: data.version,
      versions: data.versions || [],
      accessLevel: data.accessLevel,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      createdBy: data.createdBy,
      updatedBy: data.updatedBy
    };
  }
}
```

## Implementation Guidelines

### File Organization
- Nested folder structure with drag-and-drop organization
- Smart folder suggestions based on file patterns
- Color-coded folders with custom icons
- Advanced tagging and metadata management
- Automatic file categorization

### Search & Discovery
- Full-text search across file content and metadata
- Advanced filtering by type, date, size, and tags
- Visual search for similar images and documents
- Recent files and frequently accessed items
- Smart suggestions based on usage patterns

### File Operations
- Bulk operations with progress tracking
- Drag-and-drop file upload and organization
- Version control with automatic backups
- File preview for common formats
- Batch rename and organization tools

### Sharing & Collaboration
- Secure file sharing with granular permissions
- Public and private sharing options
- Password protection and expiry dates
- Integration with partnership messaging
- Real-time collaboration features

### Performance & Storage
- Efficient file compression and optimization
- Cloud storage integration with multiple providers
- Automatic backup and sync across devices
- Lazy loading for large file collections
- Caching for frequently accessed files

### Security & Privacy
- End-to-end encryption for sensitive files
- Access control and authentication
- Audit logging for file operations
- Data retention and privacy controls
- Secure sharing with temporary links

### Mobile Optimization
- Touch-friendly interface for file management
- Mobile file upload with camera integration
- Offline access with automatic sync
- Responsive design for all screen sizes
- Progressive Web App capabilities

## Testing Strategy
- Unit tests for file operations and search
- Integration tests for upload and sharing
- E2E tests for complete file management workflows
- Performance tests for large file operations
- Security testing for access controls
- Cross-browser and mobile compatibility tests

## SISO Design System Integration
- Consistent orange color scheme (#f6b75e) for primary actions
- File type icons and visual indicators
- Loading states and progress bars
- Responsive grid layouts
- Dark mode support
- Accessibility features for screen readers