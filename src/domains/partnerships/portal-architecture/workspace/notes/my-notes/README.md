# My Notes Management

## Overview
The My Notes Management system provides a comprehensive personal note-taking and knowledge management solution within the SISO partnership portal. This module enables partners to create, organize, and sync notes across devices with rich formatting, collaborative features, and intelligent search capabilities.

## Architecture

### Directory Structure
```
notes/my-notes/
├── components/
│   ├── NotesDashboard.tsx
│   ├── NoteEditor.tsx
│   ├── NoteViewer.tsx
│   ├── NoteCard.tsx
│   ├── FolderView.tsx
│   ├── TagsManager.tsx
│   └── SearchNotes.tsx
├── hooks/
│   ├── useNotes.ts
│   ├── useNoteEditor.ts
│   ├── useNoteSync.ts
│   └── useNoteSearch.ts
├── services/
│   ├── notesService.ts
│   ├── noteSyncService.ts
│   ├── noteSearchService.ts
│   └── noteCollaborationService.ts
├── types/
│   ├── notes.types.ts
│   └── note-editor.types.ts
└── utils/
    ├── noteUtils.ts
    ├── markdownUtils.ts
    └── exportUtils.ts
```

### Core Components

#### NotesDashboard Component
```typescript
interface NotesDashboardProps {
  viewMode: 'grid' | 'list' | 'kanban';
  sortBy: SortOption;
  filters: NotesFilters;
  onViewModeChange: (mode: 'grid' | 'list' | 'kanban') => void;
  onSortChange: (sort: SortOption) => void;
  onFiltersChange: (filters: NotesFilters) => void;
  onNoteCreate: () => void;
  className?: string;
}

export const NotesDashboard: React.FC<NotesDashboardProps> = ({
  viewMode,
  sortBy,
  filters,
  onViewModeChange,
  onSortChange,
  onFiltersChange,
  onNoteCreate,
  className
}) => {
  const { notes, folders, tags, loading, searchNotes, createFolder } = useNotes(filters, sortBy);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    searchNotes(query);
  }, [searchNotes]);

  const handleNoteSelect = useCallback((noteId: string, selected: boolean) => {
    setSelectedNotes(prev => 
      selected 
        ? [...prev, noteId]
        : prev.filter(id => id !== noteId)
    );
  }, []);

  const handleNoteOpen = useCallback((note: Note) => {
    setEditingNote(note);
    setShowNoteEditor(true);
  }, []);

  const handleBulkOperations = useCallback(async (operation: BulkOperation) => {
    switch (operation) {
      case 'delete':
        await deleteNotes(selectedNotes);
        setSelectedNotes([]);
        break;
      case 'archive':
        await archiveNotes(selectedNotes);
        break;
      case 'move':
        await moveNotes(selectedNotes);
        break;
      case 'tag':
        await addTagsToNotes(selectedNotes);
        break;
      case 'export':
        await exportNotes(selectedNotes);
        break;
    }
  }, [selectedNotes]);

  const handleCreateNote = useCallback((template?: NoteTemplate) => {
    const newNote = createNoteFromTemplate(template);
    setEditingNote(newNote);
    setShowNoteEditor(true);
  }, []);

  const handleDragAndDrop = useCallback(async (files: FileList, targetFolder?: string) => {
    for (const file of files) {
      if (file.type.startsWith('text/') || file.type === 'application/json') {
        const content = await file.text();
        await createNote({
          title: file.name.replace(/\.[^/.]+$/, ""),
          content,
          folderId: targetFolder,
          importSource: 'file-upload'
        });
      }
    }
  }, []);

  return (
    <div className="notes-dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <h1>My Notes</h1>
          <p className="text-muted-foreground">
            {notes.length} notes • {folders.length} folders
          </p>
        </div>
        
        <div className="header-actions">
          <div className="search-section">
            <SearchNotes
              value={searchQuery}
              onSearch={handleSearch}
              onFiltersChange={onFiltersChange}
            />
          </div>
          
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
              <ToggleGroupItem value="kanban" aria-label="Kanban view">
                <Layout className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SortAsc className="w-4 h-4 mr-2" />
                  {sortBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onSortChange('title')}>
                  Sort by Title
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortChange('modified')}>
                  Sort by Modified
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortChange('created')}>
                  Sort by Created
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortChange('tags')}>
                  Sort by Tags
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleCreateNote()}>
                <FileText className="w-4 h-4 mr-2" />
                Blank Note
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateNote(NoteTemplates.Meeting)}>
                <Users className="w-4 h-4 mr-2" />
                Meeting Notes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateNote(NoteTemplates.Task)}>
                <CheckSquare className="w-4 h-4 mr-2" />
                Task List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateNote(NoteTemplates.Project)}>
                <Folder className="w-4 h-4 mr-2" />
                Project Plan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateNote(NoteTemplates.Journal)}>
                <Book className="w-4 h-4 mr-2" />
                Journal Entry
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onNoteCreate}>
                <FolderPlus className="w-4 h-4 mr-2" />
                New Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {selectedNotes.length > 0 && (
        <div className="bulk-operations-bar">
          <div className="selection-info">
            <span>{selectedNotes.length} notes selected</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedNotes([])}>
              Clear selection
            </Button>
          </div>
          
          <div className="bulk-actions">
            <Button variant="outline" size="sm" onClick={() => handleBulkOperations('tag')}>
              <Tag className="w-4 h-4 mr-1" />
              Add Tags
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkOperations('move')}>
              <Folder className="w-4 h-4 mr-1" />
              Move
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkOperations('archive')}>
              <Archive className="w-4 h-4 mr-1" />
              Archive
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkOperations('export')}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkOperations('delete')}>
              <Trash className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}
      
      <div className="dashboard-content">
        <DragAndDropContainer
          onDrop={handleDragAndDrop}
          className="notes-drop-zone"
          accept="text/*,.json,.md,.txt"
        >
          {viewMode === 'grid' ? (
            <NotesGridView
              notes={notes}
              folders={folders}
              selectedNotes={selectedNotes}
              onNoteSelect={handleNoteSelect}
              onNoteOpen={handleNoteOpen}
              onFolderOpen={handleFolderOpen}
            />
          ) : viewMode === 'list' ? (
            <NotesListView
              notes={notes}
              folders={folders}
              selectedNotes={selectedNotes}
              onNoteSelect={handleNoteSelect}
              onNoteOpen={handleNoteOpen}
              onFolderOpen={handleFolderOpen}
            />
          ) : (
            <NotesKanbanView
              notes={notes}
              onNoteSelect={handleNoteSelect}
              onNoteOpen={handleNoteOpen}
              onNoteMove={handleNoteMove}
            />
          )}
        </DragAndDropContainer>
      </div>
      
      {showNoteEditor && (
        <NoteEditor
          note={editingNote}
          isOpen={showNoteEditor}
          onClose={() => {
            setShowNoteEditor(false);
            setEditingNote(null);
          }}
          onSave={handleNoteSave}
        />
      )}
    </div>
  );
};
```

#### NoteEditor Component
```typescript
interface NoteEditorProps {
  note?: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
  className?: string;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  isOpen,
  onClose,
  onSave,
  className
}) => {
  const [editorState, setEditorState] = useState<EditorState>(() => 
    EditorState.createEmpty()
  );
  const [noteData, setNoteData] = useState<NoteData>({
    title: note?.title || '',
    content: note?.content || '',
    folderId: note?.folderId || null,
    tags: note?.tags || [],
    isPinned: note?.isPinned || false,
    isArchived: note?.isArchived || false,
    color: note?.color || null,
    reminder: note?.reminder || null
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(note?.updatedAt || null);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  const { saveNote, autoSave } = useNoteEditor();
  const { availableTags, createTag } = useTags();

  // Initialize editor with note content
  useEffect(() => {
    if (note?.content) {
      const contentState = ContentState.createFromText(note.content);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [note]);

  // Auto-save functionality
  useEffect(() => {
    if (!isOpen || !note?.id) return;

    const autoSaveInterval = setInterval(async () => {
      if (hasUnsavedChanges()) {
        try {
          await autoSave({
            ...noteData,
            content: editorState.getCurrentContent().getPlainText()
          });
          setLastSaved(new Date());
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [isOpen, note?.id, noteData, editorState, hasUnsavedChanges]);

  // Update word and character count
  useEffect(() => {
    const content = editorState.getCurrentContent().getPlainText();
    setWordCount(content.trim().split(/\s+/).filter(word => word.length > 0).length);
    setCharacterCount(content.length);
  }, [editorState]);

  const handleSave = useCallback(async () => {
    if (!noteData.title.trim()) {
      toast.error('Note title is required');
      return;
    }

    try {
      setIsSaving(true);
      const content = editorState.getCurrentContent().getPlainText();
      
      const savedNote = await saveNote({
        ...noteData,
        content,
        wordCount,
        characterCount
      });
      
      setLastSaved(new Date());
      onSave(savedNote);
      toast.success('Note saved successfully');
    } catch (error) {
      console.error('Failed to save note:', error);
      toast.error('Failed to save note');
    } finally {
      setIsSaving(false);
    }
  }, [noteData, editorState, wordCount, characterCount, saveNote, onSave]);

  const handleTagAdd = useCallback(async (tagName: string) => {
    let tag = availableTags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
    
    if (!tag) {
      tag = await createTag(tagName);
    }
    
    setNoteData(prev => ({
      ...prev,
      tags: [...prev.tags, tag]
    }));
  }, [availableTags, createTag]);

  const handleTagRemove = useCallback((tagId: string) => {
    setNoteData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t.id !== tagId)
    }));
  }, []);

  const hasUnsavedChanges = useCallback(() => {
    if (!note) return noteData.title.trim().length > 0;
    
    const currentContent = editorState.getCurrentContent().getPlainText();
    return (
      noteData.title !== note.title ||
      currentContent !== note.content ||
      JSON.stringify(noteData.tags) !== JSON.stringify(note.tags) ||
      noteData.folderId !== note.folderId ||
      noteData.isPinned !== note.isPinned
    );
  }, [note, noteData, editorState]);

  const insertText = useCallback((text: string) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const contentWithText = Modifier.replaceText(currentContent, selection, text);
    const newEditorState = EditorState.push(
      editorState,
      contentWithText,
      'insert-text'
    );
    setEditorState(EditorState.forceSelection(newEditorState, contentWithText.getSelectionAfter()));
  }, [editorState]);

  const insertFormatting = useCallback((type: 'bold' | 'italic' | 'underline' | 'code') => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, type.toUpperCase());
    setEditorState(newEditorState);
  }, [editorState]);

  const insertBlock = useCallback((type: 'unordered-list-item' | 'ordered-list-item' | 'code-block' | 'blockquote') => {
    const newEditorState = RichUtils.toggleBlockType(editorState, type);
    setEditorState(newEditorState);
  }, [editorState]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className={cn('note-editor', className)}>
        <SheetHeader className="editor-header">
          <div className="header-left">
            <SheetTitle className="editor-title">
              <Input
                value={noteData.title}
                onChange={(e) => setNoteData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Note title..."
                className="title-input border-none p-0 text-lg font-semibold"
              />
            </SheetTitle>
          </div>
          
          <div className="header-right">
            <div className="editor-status">
              {lastSaved && (
                <span className="last-saved text-sm text-muted-foreground">
                  Saved {formatRelativeTime(lastSaved)}
                </span>
              )}
              {wordCount > 0 && (
                <span className="word-count text-sm text-muted-foreground">
                  {wordCount} words
                </span>
              )}
            </div>
            
            <div className="editor-actions">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNoteData(prev => ({ ...prev, isPinned: !prev.isPinned }))}
                className={noteData.isPinned ? 'text-primary' : ''}
              >
                <Pin className={cn("w-4 h-4", noteData.isPinned && "fill-current")} />
              </Button>
              
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>
        
        <div className="editor-toolbar">
          <div className="toolbar-section">
            <ToggleGroup type="multiple">
              <ToggleGroupItem
                value="bold"
                onClick={() => insertFormatting('bold')}
                aria-label="Bold"
              >
                <Bold className="w-4 h-4" />
              </ToggleGroupItem>
              
              <ToggleGroupItem
                value="italic"
                onClick={() => insertFormatting('italic')}
                aria-label="Italic"
              >
                <Italic className="w-4 h-4" />
              </ToggleGroupItem>
              
              <ToggleGroupItem
                value="underline"
                onClick={() => insertFormatting('underline')}
                aria-label="Underline"
              >
                <Underline className="w-4 h-4" />
              </ToggleGroupItem>
              
              <ToggleGroupItem
                value="code"
                onClick={() => insertFormatting('code')}
                aria-label="Code"
              >
                <Code className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="toolbar-section">
            <ToggleGroup type="multiple">
              <ToggleGroupItem
                value="unordered-list"
                onClick={() => insertBlock('unordered-list-item')}
                aria-label="Bullet list"
              >
                <List className="w-4 h-4" />
              </ToggleGroupItem>
              
              <ToggleGroupItem
                value="ordered-list"
                onClick={() => insertBlock('ordered-list-item')}
                aria-label="Numbered list"
              >
                <ListOrdered className="w-4 h-4" />
              </ToggleGroupItem>
              
              <ToggleGroupItem
                value="blockquote"
                onClick={() => insertBlock('blockquote')}
                aria-label="Quote"
              >
                <Quote className="w-4 h-4" />
              </ToggleGroupItem>
              
              <ToggleGroupItem
                value="code-block"
                onClick={() => insertBlock('code-block')}
                aria-label="Code block"
              >
                <Code2 className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="toolbar-section">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Link className="w-4 h-4 mr-1" />
                  Insert
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => insertText('---')}>
                  <Minus className="w-4 h-4 mr-2" />
                  Horizontal Rule
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertText('[]()')}>
                  <Image className="w-4 h-4 mr-2" />
                  Image
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertText('[]()')}>
                  <Link className="w-4 h-4 mr-2" />
                  Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertText('```')}>
                  <Code2 className="w-4 h-4 mr-2" />
                  Code Block
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => insertText('> ')}>
                  <Quote className="w-4 h-4 mr-2" />
                  Quote
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="editor-content">
          <div className="content-editor">
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              placeholder="Start typing your note..."
              className="note-text-editor"
            />
          </div>
        </div>
        
        <div className="editor-sidebar">
          <div className="sidebar-section">
            <h4 className="sidebar-title">Folder</h4>
            <FolderSelector
              value={noteData.folderId}
              onChange={(folderId) => setNoteData(prev => ({ ...prev, folderId }))}
              allowCreate
            />
          </div>
          
          <div className="sidebar-section">
            <h4 className="sidebar-title">Tags</h4>
            <TagInput
              value={noteData.tags}
              onChange={(tags) => setNoteData(prev => ({ ...prev, tags }))}
              onAddTag={handleTagAdd}
              onRemoveTag={handleTagRemove}
              placeholder="Add tags..."
            />
          </div>
          
          <div className="sidebar-section">
            <h4 className="sidebar-title">Color</h4>
            <div className="color-picker">
              {NOTE_COLORS.map((color) => (
                <Button
                  key={color.value}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "color-option",
                    noteData.color === color.value && "selected"
                  )}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setNoteData(prev => ({ 
                    ...prev, 
                    color: prev.color === color.value ? null : color.value 
                  }))}
                >
                  {color.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="sidebar-section">
            <h4 className="sidebar-title">Reminder</h4>
            <ReminderPicker
              value={noteData.reminder}
              onChange={(reminder) => setNoteData(prev => ({ ...prev, reminder }))}
            />
          </div>
        </div>
        
        <SheetFooter className="editor-footer">
          <div className="footer-left">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
            
            {hasUnsavedChanges() && (
              <span className="unsaved-indicator text-sm text-orange-500">
                Unsaved changes
              </span>
            )}
          </div>
          
          <div className="footer-right">
            <Button 
              variant="outline" 
              onClick={() => {/* Export note */}}
              disabled={!noteData.content}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button 
              onClick={handleSave} 
              disabled={!noteData.title.trim() || isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
```

## Domain Types

### Notes Types
```typescript
export interface Note {
  id: string;
  title: string;
  content: string;
  folderId?: string;
  tags: NoteTag[];
  isPinned: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  color?: string;
  reminder?: NoteReminder;
  attachments: NoteAttachment[];
  version: number;
  wordCount: number;
  characterCount: number;
  readingTime: number;
  metadata: NoteMetadata;
  collaboration: NoteCollaboration;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface NoteFolder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  path: string;
  color?: string;
  icon?: string;
  isDefault: boolean;
  isArchived: boolean;
  childFolders: NoteFolder[];
  childNotes: Note[];
  noteCount: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface NoteTag {
  id: string;
  name: string;
  color?: string;
  description?: string;
  noteCount: number;
  createdAt: Date;
}

export interface NoteReminder {
  id: string;
  remindAt: Date;
  message?: string;
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  isActive: boolean;
  notificationSent: boolean;
}

export interface NoteAttachment {
  id: string;
  name: string;
  type: AttachmentType;
  size: number;
  url: string;
  thumbnailUrl?: string;
  metadata: AttachmentMetadata;
  createdAt: Date;
}

export interface NoteMetadata {
  originalSource?: string;
  importDate?: Date;
  lastViewed?: Date;
  viewCount: number;
  editCount: number;
  shareCount: number;
  checksum: string;
  syncStatus: SyncStatus;
  searchIndex: SearchIndexData;
  extractedLinks: string[];
  mentionedUsers: string[];
  aiSummary?: string;
  aiTags?: string[];
}

export interface NoteCollaboration {
  isShared: boolean;
  sharedWith: NoteShare[];
  permissions: CollaborationPermissions;
  editHistory: EditHistory[];
  comments: NoteComment[];
  conflicts?: NoteConflict[];
}

export interface NoteShare {
  id: string;
  userId?: string;
  email?: string;
  permission: SharePermission;
  expiresAt?: Date;
  createdAt: Date;
  createdBy: string;
}

export interface EditHistory {
  id: string;
  version: number;
  changes: ChangeRecord[];
  author: string;
  timestamp: Date;
  message?: string;
  wordCount: number;
  characterCount: number;
}

export interface NoteComment {
  id: string;
  content: string;
  author: string;
  position?: CommentPosition;
  replies: NoteComment[];
  resolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentPosition {
  start: number;
  end: number;
  selectedText?: string;
}

export interface ChangeRecord {
  type: 'insert' | 'delete' | 'replace';
  position: number;
  length?: number;
  content?: string;
  oldContent?: string;
}

export type AttachmentType = 
  | 'image' 
  | 'document' 
  | 'video' 
  | 'audio' 
  | 'archive' 
  | 'link' 
  | 'other';

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'conflict';

export type SharePermission = 'view' | 'comment' | 'edit' | 'manage';

export type SortOption = 'title' | 'modified' | 'created' | 'tags' | 'folder';

export interface SearchIndexData {
  tokens: string[];
  entities: NamedEntity[];
  topics: string[];
  sentiment?: SentimentScore;
  keywords: string[];
}

export interface NamedEntity {
  text: string;
  type: 'person' | 'organization' | 'location' | 'date' | 'money' | 'other';
  confidence: number;
}

export interface SentimentScore {
  positive: number;
  negative: number;
  neutral: number;
  overall: 'positive' | 'negative' | 'neutral';
}

export const NOTE_COLORS = [
  { name: 'Default', value: null },
  { name: 'Yellow', value: '#fef3c7' },
  { name: 'Orange', value: '#fed7aa' },
  { name: 'Red', value: '#fecaca' },
  { name: 'Green', value: '#d1fae5' },
  { name: 'Blue', value: '#dbeafe' },
  { name: 'Purple', value: '#e9d5ff' },
  { name: 'Pink', value: '#fce7f3' }
];

export enum NoteTemplates {
  Blank = 'blank',
  Meeting = 'meeting',
  Task = 'task',
  Project = 'project',
  Journal = 'journal',
  Research = 'research',
  Ideas = 'ideas'
}

export interface NoteTemplate {
  id: NoteTemplates;
  name: string;
  description: string;
  content: string;
  tags: string[];
  color?: string;
}
```

## Application Hooks

### useNotes Hook
```typescript
export const useNotes = (filters?: NotesFilters, sortBy?: SortOption) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<NoteFolder[]>([]);
  const [tags, setTags] = useState<NoteTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const [notesData, foldersData, tagsData] = await Promise.all([
        notesService.getNotes(filters, sortBy),
        notesService.getFolders(),
        notesService.getTags()
      ]);
      
      setNotes(notesData);
      setFolders(foldersData);
      setTags(tagsData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy]);

  const createNote = useCallback(async (noteData: CreateNoteData) => {
    const newNote = await notesService.createNote(noteData);
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback(async (noteId: string, updates: Partial<Note>) => {
    const updatedNote = await notesService.updateNote(noteId, updates);
    setNotes(prev => prev.map(note =>
      note.id === noteId ? updatedNote : note
    ));
    return updatedNote;
  }, []);

  const deleteNotes = useCallback(async (noteIds: string[]) => {
    await notesService.deleteNotes(noteIds);
    setNotes(prev => prev.filter(note => !noteIds.includes(note.id)));
  }, []);

  const searchNotes = useCallback(async (query: string) => {
    if (!query.trim()) {
      fetchNotes();
      return;
    }

    try {
      const searchResults = await noteSearchService.searchNotes(query, filters);
      setNotes(searchResults);
    } catch (err) {
      console.error('Search failed:', err);
    }
  }, [filters, fetchNotes]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    notes,
    folders,
    tags,
    loading,
    error,
    refetch: fetchNotes,
    createNote,
    updateNote,
    deleteNotes,
    searchNotes
  };
};
```

### useNoteEditor Hook
```typescript
export const useNoteEditor = () => {
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [collaborativeMode, setCollaborativeMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const saveNote = useCallback(async (noteData: CreateNoteData | UpdateNoteData) => {
    try {
      if ('id' in noteData && noteData.id) {
        return await notesService.updateNote(noteData.id, noteData);
      } else {
        return await notesService.createNote(noteData);
      }
    } catch (error) {
      if (offlineMode) {
        // Queue for sync when back online
        await noteSyncService.queueForSync(noteData);
        return noteData as Note;
      }
      throw error;
    }
  }, [offlineMode]);

  const autoSave = useCallback(async (noteData: UpdateNoteData) => {
    if (!autoSaveEnabled || offlineMode) return;

    try {
      return await notesService.autoSave(noteData);
    } catch (error) {
      console.warn('Auto-save failed:', error);
      // Continue without throwing error
    }
  }, [autoSaveEnabled, offlineMode]);

  const startCollaboration = useCallback(async (noteId: string) => {
    try {
      setCollaborativeMode(true);
      return await noteCollaborationService.startSession(noteId);
    } catch (error) {
      console.error('Failed to start collaboration:', error);
      setCollaborativeMode(false);
    }
  }, []);

  const stopCollaboration = useCallback(async () => {
    try {
      await noteCollaborationService.endSession();
      setCollaborativeMode(false);
    } catch (error) {
      console.error('Failed to stop collaboration:', error);
    }
  }, []);

  return {
    autoSaveEnabled,
    collaborativeMode,
    offlineMode,
    saveNote,
    autoSave,
    startCollaboration,
    stopCollaboration,
    setAutoSaveEnabled,
    setOfflineMode
  };
};
```

## Service Layer

### NotesService
```typescript
export class NotesService {
  private api: ApiClient;
  private sync: NoteSyncService;
  private search: NoteSearchService;
  private collaboration: NoteCollaborationService;

  constructor() {
    this.api = new ApiClient();
    this.sync = new NoteSyncService();
    this.search = new NoteSearchService();
    this.collaboration = new NoteCollaborationService();
  }

  async getNotes(filters?: NotesFilters, sortBy?: SortOption): Promise<Note[]> {
    const params = new URLSearchParams();
    
    if (filters?.folderId) {
      params.append('folderId', filters.folderId);
    }
    if (filters?.tags?.length) {
      params.append('tags', filters.tags.join(','));
    }
    if (filters?.isPinned !== undefined) {
      params.append('isPinned', filters.isPinned.toString());
    }
    if (filters?.isArchived !== undefined) {
      params.append('isArchived', filters.isArchived.toString());
    }
    if (filters?.dateRange) {
      params.append('dateFrom', filters.dateRange.from.toISOString());
      params.append('dateTo', filters.dateRange.to.toISOString());
    }
    if (sortBy) {
      params.append('sortBy', sortBy);
    }

    const response = await this.api.get(`/notes?${params}`);
    return response.data.map(this.transformNoteData);
  }

  async createNote(noteData: CreateNoteData): Promise<Note> {
    const response = await this.api.post('/notes', {
      ...noteData,
      content: noteData.content || '',
      wordCount: noteData.content?.split(/\s+/).filter(word => word.length > 0).length || 0,
      characterCount: noteData.content?.length || 0
    });
    
    const note = this.transformNoteData(response.data);
    
    // Index for search
    await this.search.indexNote(note);
    
    return note;
  }

  async updateNote(noteId: string, updates: UpdateNoteData): Promise<Note> {
    const response = await this.api.put(`/notes/${noteId}`, updates);
    
    const note = this.transformNoteData(response.data);
    
    // Re-index for search
    await this.search.indexNote(note);
    
    return note;
  }

  async autoSave(noteData: UpdateNoteData): Promise<Note> {
    const response = await this.api.post(`/notes/${noteData.id}/autosave`, noteData);
    return this.transformNoteData(response.data);
  }

  async deleteNotes(noteIds: string[]): Promise<void> {
    await this.api.post('/notes/batch-delete', { noteIds });
    
    // Remove from search index
    for (const noteId of noteIds) {
      await this.search.removeFromIndex(noteId);
    }
  }

  async searchNotes(query: string, filters?: NotesFilters): Promise<Note[]> {
    const searchResults = await this.search.searchNotes(query, filters);
    return searchNotes.map(result => result.note);
  }

  async getFolders(): Promise<NoteFolder[]> {
    const response = await this.api.get('/notes/folders');
    return response.data.map(this.transformFolderData);
  }

  async createFolder(folderData: CreateFolderData): Promise<NoteFolder> {
    const response = await this.api.post('/notes/folders', folderData);
    return this.transformFolderData(response.data);
  }

  async getTags(): Promise<NoteTag[]> {
    const response = await this.api.get('/notes/tags');
    return response.data.map(this.transformTagData);
  }

  async createTag(tagName: string): Promise<NoteTag> {
    const response = await this.api.post('/notes/tags', { name: tagName });
    return this.transformTagData(response.data);
  }

  async exportNote(noteId: string, format: 'markdown' | 'html' | 'pdf' | 'docx'): Promise<string> {
    const response = await this.api.get(`/notes/${noteId}/export?format=${format}`);
    return response.data.downloadUrl;
  }

  private transformNoteData(data: any): Note {
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      folderId: data.folderId,
      tags: data.tags || [],
      isPinned: data.isPinned,
      isArchived: data.isArchived,
      isDeleted: data.isDeleted,
      color: data.color,
      reminder: data.reminder,
      attachments: data.attachments || [],
      version: data.version,
      wordCount: data.wordCount,
      characterCount: data.characterCount,
      readingTime: data.readingTime || Math.ceil(data.wordCount / 200), // 200 WPM average
      metadata: {
        originalSource: data.metadata?.originalSource,
        importDate: data.metadata?.importDate ? new Date(data.metadata.importDate) : undefined,
        lastViewed: data.metadata?.lastViewed ? new Date(data.metadata.lastViewed) : undefined,
        viewCount: data.metadata?.viewCount || 0,
        editCount: data.metadata?.editCount || 0,
        shareCount: data.metadata?.shareCount || 0,
        checksum: data.metadata?.checksum,
        syncStatus: data.metadata?.syncStatus || 'synced',
        searchIndex: data.metadata?.searchIndex,
        extractedLinks: data.metadata?.extractedLinks || [],
        mentionedUsers: data.metadata?.mentionedUsers || [],
        aiSummary: data.metadata?.aiSummary,
        aiTags: data.metadata?.aiTags
      },
      collaboration: {
        isShared: data.collaboration?.isShared || false,
        sharedWith: data.collaboration?.sharedWith || [],
        permissions: data.collaboration?.permissions || {
          canView: true,
          canEdit: true,
          canComment: true,
          canShare: false
        },
        editHistory: data.collaboration?.editHistory || [],
        comments: data.collaboration?.comments || [],
        conflicts: data.collaboration?.conflicts
      },
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      createdBy: data.createdBy,
      updatedBy: data.updatedBy
    };
  }

  private transformFolderData(data: any): NoteFolder {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      parentId: data.parentId,
      path: data.path,
      color: data.color,
      icon: data.icon,
      isDefault: data.isDefault,
      isArchived: data.isArchived,
      childFolders: data.childFolders || [],
      childNotes: data.childNotes || [],
      noteCount: data.noteCount,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      createdBy: data.createdBy
    };
  }

  private transformTagData(data: any): NoteTag {
    return {
      id: data.id,
      name: data.name,
      color: data.color,
      description: data.description,
      noteCount: data.noteCount,
      createdAt: new Date(data.createdAt)
    };
  }
}
```

## Implementation Guidelines

### Note Creation & Editing
- Rich text editor with formatting options
- Markdown support for technical notes
- Auto-save functionality with version history
- Templates for common note types
- Keyboard shortcuts for power users

### Organization & Structure
- Hierarchical folder system
- Flexible tagging with auto-completion
- Color-coding and visual organization
- Smart folders and auto-categorization
- Advanced search with filters

### Collaboration Features
- Real-time collaborative editing
- Comments and mentions
- Sharing with granular permissions
- Version control and change tracking
- Conflict resolution mechanisms

### Synchronization & Storage
- Cross-device synchronization
- Offline mode with conflict resolution
- Cloud storage integration
- Backup and recovery options
- Data export in multiple formats

### Search & Discovery
- Full-text search across content
- Semantic search and AI-powered recommendations
- Advanced filtering and sorting
- Saved searches and alerts
- Content analysis and insights

### Productivity Features
- Task management integration
- Reminder and notification system
- Quick capture and voice notes
- Image and file attachments
- Link previews and web clips

### Mobile Optimization
- Touch-optimized editing interface
- Voice-to-text dictation
- Camera integration for photo notes
- Offline access and sync
- Progressive Web App features

### AI & Automation
- Smart content suggestions
- Automatic tagging and categorization
- Content summarization
- Insight extraction
- Personalized recommendations

## Testing Strategy
- Unit tests for note operations and search
- Integration tests for synchronization
- E2E tests for complete note workflows
- Performance tests for large note collections
- Offline mode and conflict resolution tests
- Cross-platform compatibility tests

## SISO Design System Integration
- Consistent orange color scheme (#f6b75e) for primary actions
- Clean, distraction-free writing interface
- Intuitive folder and tag management
- Loading states and sync indicators
- Responsive layouts for all devices
- Dark mode support for reduced eye strain