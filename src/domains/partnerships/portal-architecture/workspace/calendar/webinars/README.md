# Webinars Calendar Management

## Overview
The Webinars Calendar Management system provides a comprehensive platform for scheduling, managing, and delivering educational webinars within the SISO partnership portal. This module enables partners to create, promote, and host live training sessions, workshops, and presentations with integrated registration, attendance tracking, and post-event analytics.

## Architecture

### Directory Structure
```
calendar/webinars/
├── components/
│   ├── WebinarScheduler.tsx
│   ├── WebinarCard.tsx
│   ├── WebinarDetails.tsx
│   ├── RegistrationForm.tsx
│   ├── LiveWebinarRoom.tsx
│   ├── WebinarAnalytics.tsx
│   └── UpcomingWebinars.tsx
├── hooks/
│   ├── useWebinars.ts
│   ├── useWebinarRegistration.ts
│   ├── useLiveWebinar.ts
│   └── useWebinarAnalytics.ts
├── services/
│   ├── webinarService.ts
│   ├── webinarRegistrationService.ts
│   ├── liveStreamService.ts
│   └── webinarAnalyticsService.ts
├── types/
│   ├── webinars.types.ts
│   └── webinar-analytics.types.ts
└── utils/
    ├── webinarUtils.ts
    └── timeUtils.ts
```

### Core Components

#### WebinarScheduler Component
```typescript
interface WebinarSchedulerProps {
  webinar?: Webinar;
  onSave: (webinar: Webinar) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
  className?: string;
}

export const WebinarScheduler: React.FC<WebinarSchedulerProps> = ({
  webinar,
  onSave,
  onCancel,
  mode,
  className
}) => {
  const [formData, setFormData] = useState<WebinarFormData>({
    title: webinar?.title || '',
    description: webinar?.description || '',
    category: webinar?.category || '',
    speakerIds: webinar?.speakers?.map(s => s.id) || [],
    scheduledStartTime: webinar?.scheduledStartTime || new Date(),
    scheduledEndTime: webinar?.scheduledEndTime || new Date(),
    timezone: webinar?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    maxAttendees: webinar?.maxAttendees || 100,
    registrationDeadline: webinar?.registrationDeadline,
    isPaid: webinar?.isPaid || false,
    price: webinar?.price || 0,
    currency: webinar?.currency || 'USD',
    recordingEnabled: webinar?.recordingEnabled || true,
    chatEnabled: webinar?.chatEnabled || true,
    qAndAEnabled: webinar?.qAndAEnabled || true,
    allowReplays: webinar?.allowReplays || true,
    tags: webinar?.tags || [],
    thumbnailUrl: webinar?.thumbnailUrl || '',
    materials: webinar?.materials || []
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(webinar?.thumbnailUrl || null);

  const { availableSpeakers, loading: loadingSpeakers } = useWebinarSpeakers();
  const { uploadWebinarThumbnail } = useWebinarUploads();

  const handleSave = useCallback(async () => {
    if (!validateFormData(formData)) {
      return;
    }

    try {
      setIsSaving(true);
      const savedWebinar = await webinarService.saveWebinar(formData, webinar?.id);
      onSave(savedWebinar);
    } catch (error) {
      console.error('Failed to save webinar:', error);
    } finally {
      setIsSaving(false);
    }
  }, [formData, webinar?.id, onSave]);

  const handleThumbnailUpload = useCallback(async (file: File) => {
    try {
      const thumbnailUrl = await uploadWebinarThumbnail(file);
      setFormData(prev => ({ ...prev, thumbnailUrl }));
      setThumbnailPreview(thumbnailUrl);
    } catch (error) {
      console.error('Failed to upload thumbnail:', error);
    }
  }, [uploadWebinarThumbnail]);

  const addMaterial = useCallback((material: WebinarMaterial) => {
    setFormData(prev => ({
      ...prev,
      materials: [...prev.materials, { ...material, id: generateId() }]
    }));
  }, []);

  const removeMaterial = useCallback((materialId: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter(m => m.id !== materialId)
    }));
  }, []);

  return (
    <Card className={cn('webinar-scheduler', className)}>
      <CardHeader>
        <CardTitle>{mode === 'create' ? 'Schedule New Webinar' : 'Edit Webinar'}</CardTitle>
        <CardDescription>
          {mode === 'create' 
            ? 'Create and schedule a new webinar for the partnership community'
            : 'Update webinar details and settings'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="webinar-basic-info">
          <h3 className="section-title">Basic Information</h3>
          
          <div className="form-grid">
            <div className="form-field">
              <Label htmlFor="title">Webinar Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter webinar title"
                className={validationErrors.title ? 'border-red-500' : ''}
              />
              {validationErrors.title && (
                <p className="text-sm text-red-500">{validationErrors.title}</p>
              )}
            </div>

            <div className="form-field">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select webinar category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="product-launch">Product Launch</SelectItem>
                  <SelectItem value="industry-insights">Industry Insights</SelectItem>
                  <SelectItem value="partner-success">Partner Success</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="form-field">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what attendees will learn in this webinar"
              rows={4}
              className={validationErrors.description ? 'border-red-500' : ''}
            />
            {validationErrors.description && (
              <p className="text-sm text-red-500">{validationErrors.description}</p>
            )}
          </div>

          <div className="form-field">
            <Label htmlFor="tags">Tags</Label>
            <TagInput
              value={formData.tags}
              onChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
              placeholder="Add tags to help attendees find this webinar"
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="webinar-thumbnail">
          <h3 className="section-title">Webinar Thumbnail</h3>
          
          <div className="thumbnail-upload-section">
            {thumbnailPreview ? (
              <div className="thumbnail-preview">
                <img 
                  src={thumbnailPreview} 
                  alt="Webinar thumbnail" 
                  className="thumbnail-image"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setThumbnailPreview(null)}
                  className="remove-thumbnail"
                >
                  <Trash className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            ) : (
              <FileUpload
                accept="image/*"
                maxSize={5 * 1024 * 1024} // 5MB
                onFileSelect={handleThumbnailUpload}
                className="thumbnail-uploader"
              >
                <div className="upload-content">
                  <Image className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="upload-text">Upload webinar thumbnail</p>
                  <p className="upload-hint">Recommended: 1920x1080px, max 5MB</p>
                </div>
              </FileUpload>
            )}
          </div>
        </div>

        {/* Scheduling */}
        <div className="webinar-scheduling">
          <h3 className="section-title">Scheduling</h3>
          
          <div className="form-grid">
            <div className="form-field">
              <Label>Start Date & Time *</Label>
              <DateTimePicker
                value={formData.scheduledStartTime}
                onChange={(date) => setFormData(prev => ({ ...prev, scheduledStartTime: date }))}
                timezone={formData.timezone}
              />
            </div>

            <div className="form-field">
              <Label>End Date & Time *</Label>
              <DateTimePicker
                value={formData.scheduledEndTime}
                onChange={(date) => setFormData(prev => ({ ...prev, scheduledEndTime: date }))}
                timezone={formData.timezone}
                minDate={formData.scheduledStartTime}
              />
            </div>

            <div className="form-field">
              <Label htmlFor="timezone">Timezone</Label>
              <TimezoneSelect
                value={formData.timezone}
                onChange={(timezone) => setFormData(prev => ({ ...prev, timezone }))}
              />
            </div>

            <div className="form-field">
              <Label htmlFor="registrationDeadline">Registration Deadline</Label>
              <DateTimePicker
                value={formData.registrationDeadline}
                onChange={(date) => setFormData(prev => ({ ...prev, registrationDeadline: date }))}
                timezone={formData.timezone}
                maxDate={formData.scheduledStartTime}
                placeholder="Optional"
              />
            </div>

            <div className="form-field">
              <Label htmlFor="maxAttendees">Maximum Attendees</Label>
              <Input
                id="maxAttendees"
                type="number"
                value={formData.maxAttendees}
                onChange={(e) => setFormData(prev => ({ ...prev, maxAttendees: parseInt(e.target.value) || 100 }))}
                min="1"
                max="10000"
              />
            </div>
          </div>
        </div>

        {/* Speakers */}
        <div className="webinar-speakers">
          <h3 className="section-title">Speakers</h3>
          
          <MultiSelect
            value={formData.speakerIds}
            onChange={(speakerIds) => setFormData(prev => ({ ...prev, speakerIds }))}
            options={availableSpeakers.map(speaker => ({
              value: speaker.id,
              label: `${speaker.name} - ${speaker.title}`,
              data: speaker
            }))}
            placeholder="Select speakers for this webinar"
            searchable
            loading={loadingSpeakers}
          />

          {formData.speakerIds.length > 0 && (
            <div className="selected-speakers">
              <h4 className="speakers-title">Selected Speakers:</h4>
              <div className="speakers-list">
                {formData.speakerIds.map(speakerId => {
                  const speaker = availableSpeakers.find(s => s.id === speakerId);
                  return speaker ? (
                    <div key={speaker.id} className="speaker-chip">
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarImage src={speaker.avatar} />
                        <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="speaker-name">{speaker.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          speakerIds: prev.speakerIds.filter(id => id !== speakerId)
                        }))}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="webinar-pricing">
          <h3 className="section-title">Pricing</h3>
          
          <div className="pricing-toggle">
            <Switch
              checked={formData.isPaid}
              onCheckedChange={(isPaid) => setFormData(prev => ({ ...prev, isPaid }))}
            />
            <Label>This is a paid webinar</Label>
          </div>

          {formData.isPaid && (
            <div className="pricing-details">
              <div className="form-grid">
                <div className="form-field">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    min="0"
                    step="0.01"
                    prefix="$"
                  />
                </div>

                <div className="form-field">
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={formData.currency} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Webinar Settings */}
        <div className="webinar-settings">
          <h3 className="section-title">Webinar Settings</h3>
          
          <div className="settings-grid">
            <div className="setting-item">
              <Switch
                checked={formData.recordingEnabled}
                onCheckedChange={(recordingEnabled) => setFormData(prev => ({ ...prev, recordingEnabled }))}
              />
              <div className="setting-info">
                <Label>Enable Recording</Label>
                <p className="setting-description">
                  Record the webinar for attendees who couldn't join live
                </p>
              </div>
            </div>

            <div className="setting-item">
              <Switch
                checked={formData.chatEnabled}
                onCheckedChange={(chatEnabled) => setFormData(prev => ({ ...prev, chatEnabled }))}
              />
              <div className="setting-info">
                <Label>Enable Chat</Label>
                <p className="setting-description">
                  Allow attendees to chat during the webinar
                </p>
              </div>
            </div>

            <div className="setting-item">
              <Switch
                checked={formData.qAndAEnabled}
                onCheckedChange={(qAndAEnabled) => setFormData(prev => ({ ...prev, qAndAEnabled }))}
              />
              <div className="setting-info">
                <Label>Enable Q&A</Label>
                <p className="setting-description">
                  Allow attendees to ask questions during the webinar
                </p>
              </div>
            </div>

            <div className="setting-item">
              <Switch
                checked={formData.allowReplays}
                onCheckedChange={(allowReplays) => setFormData(prev => ({ ...prev, allowReplays }))}
              />
              <div className="setting-info">
                <Label>Allow Replays</Label>
                <p className="setting-description">
                  Make recorded webinar available for replay
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Materials */}
        <div className="webinar-materials">
          <div className="section-header">
            <h3 className="section-title">Materials</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addMaterial({
                title: '',
                type: 'document',
                url: '',
                description: ''
              })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Material
            </Button>
          </div>
          
          <div className="materials-list">
            {formData.materials.map((material, index) => (
              <WebinarMaterialEditor
                key={material.id}
                material={material}
                index={index}
                onUpdate={(updatedMaterial) => {
                  setFormData(prev => ({
                    ...prev,
                    materials: prev.materials.map(m => 
                      m.id === material.id ? updatedMaterial : m
                    )
                  }));
                }}
                onRemove={() => removeMaterial(material.id)}
              />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        
        <div className="action-buttons">
          <Button variant="outline" onClick={() {/* Save as draft */}}>
            Save as Draft
          </Button>
          
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {mode === 'create' ? 'Create Webinar' : 'Save Changes'}
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
```

#### LiveWebinarRoom Component
```typescript
interface LiveWebinarRoomProps {
  webinar: Webinar;
  attendeeId: string;
  onLeave: () => void;
  className?: string;
}

export const LiveWebinarRoom: React.FC<LiveWebinarRoomProps> = ({
  webinar,
  attendeeId,
  onLeave,
  className
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<WebinarSpeaker | null>(null);
  const [attendees, setAttendees] = useState<WebinarAttendee[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [raisedHand, setRaisedHand] = useState(false);

  const { 
    joinWebinar, 
    leaveWebinar, 
    toggleAudio, 
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    sendMessage,
    askQuestion,
    raiseHand,
    lowerHand
  } = useLiveWebinar(webinar.id, attendeeId);

  const videoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const initializeWebinar = async () => {
      try {
        await joinWebinar();
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to join webinar:', error);
      }
    };

    initializeWebinar();

    return () => {
      leaveWebinar();
    };
  }, [joinWebinar, leaveWebinar]);

  const handleToggleAudio = useCallback(async () => {
    try {
      await toggleAudio();
      setAudioEnabled(prev => !prev);
    } catch (error) {
      console.error('Failed to toggle audio:', error);
    }
  }, [toggleAudio]);

  const handleToggleVideo = useCallback(async () => {
    try {
      await toggleVideo();
      setVideoEnabled(prev => !prev);
    } catch (error) {
      console.error('Failed to toggle video:', error);
    }
  }, [toggleVideo]);

  const handleScreenShare = useCallback(async () => {
    if (screenSharing) {
      await stopScreenShare();
      setScreenSharing(false);
    } else {
      await startScreenShare();
      setScreenSharing(true);
    }
  }, [screenSharing, startScreenShare, stopScreenShare]);

  const handleSendMessage = useCallback(async (message: string) => {
    await sendMessage(message);
  }, [sendMessage]);

  const handleAskQuestion = useCallback(async (question: string) => {
    await askQuestion(question);
  }, [askQuestion]);

  const handleRaiseHand = useCallback(async () => {
    if (raisedHand) {
      await lowerHand();
      setRaisedHand(false);
    } else {
      await raiseHand();
      setRaisedHand(true);
    }
  }, [raisedHand, raiseHand, lowerHand]);

  return (
    <div className={cn('live-webinar-room', className)}>
      {/* Header */}
      <div className="webinar-header">
        <div className="header-info">
          <h1 className="webinar-title">{webinar.title}</h1>
          <div className="webinar-status">
            <Badge variant="default" className="live-badge">
              <Circle className="w-2 h-2 mr-1 animate-pulse" />
              LIVE
            </Badge>
            <span className="attendee-count">
              <Users className="w-4 h-4 mr-1" />
              {attendees.length} attendees
            </span>
            {isRecording && (
              <Badge variant="secondary" className="recording-badge">
                <Circle className="w-2 h-2 mr-1 fill-red-500 text-red-500" />
                Recording
              </Badge>
            )}
          </div>
        </div>
        
        <div className="header-actions">
          <Button variant="outline" onClick={onLeave}>
            <LogOut className="w-4 h-4 mr-2" />
            Leave Webinar
          </Button>
        </div>
      </div>

      <div className="webinar-content">
        {/* Main Video Area */}
        <div className="main-video-area">
          <div className="video-container">
            {currentSpeaker ? (
              <div className="speaker-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="speaker-video-stream"
                />
                <div className="speaker-overlay">
                  <div className="speaker-info">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src={currentSpeaker.avatar} />
                      <AvatarFallback>{currentSpeaker.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="speaker-details">
                      <p className="speaker-name">{currentSpeaker.name}</p>
                      <p className="speaker-title">{currentSpeaker.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="placeholder-video">
                <div className="placeholder-content">
                  <Users className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="placeholder-text">Waiting for presenter to join...</p>
                </div>
              </div>
            )}
            
            {screenSharing && (
              <video
                ref={screenShareRef}
                autoPlay
                playsInline
                className="screen-share-stream"
              />
            )}
          </div>

          {/* Webinar Controls */}
          <div className="webinar-controls">
            <div className="audio-video-controls">
              <Button
                variant={audioEnabled ? "default" : "destructive"}
                size="lg"
                onClick={handleToggleAudio}
                className="control-button"
              >
                {audioEnabled ? (
                  <Mic className="w-5 h-5" />
                ) : (
                  <MicOff className="w-5 h-5" />
                )}
              </Button>

              <Button
                variant={videoEnabled ? "default" : "destructive"}
                size="lg"
                onClick={handleToggleVideo}
                className="control-button"
              >
                {videoEnabled ? (
                  <Video className="w-5 h-5" />
                ) : (
                  <VideoOff className="w-5 h-5" />
                )}
              </Button>

              <Button
                variant={screenSharing ? "default" : "outline"}
                size="lg"
                onClick={handleScreenShare}
                className="control-button"
              >
                <Monitor className="w-5 h-5" />
              </Button>

              <Button
                variant={raisedHand ? "default" : "outline"}
                size="lg"
                onClick={handleRaiseHand}
                className="control-button"
              >
                <Hand className="w-5 h-5" />
              </Button>
            </div>

            <div className="additional-controls">
              {webinar.recordingEnabled && (
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-4 h-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="side-panel">
          <Tabs defaultValue="chat" className="side-panel-tabs">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat
                {chatMessages.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {chatMessages.length}
                  </Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger value="qa" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Q&A
                {questions.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {questions.length}
                  </Badge>
                )}
              </TabsTrigger>
              
              <TabsTrigger value="attendees" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Attendees
                <Badge variant="secondary" className="ml-1">
                  {attendees.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <WebinarChat
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                enabled={webinar.chatEnabled}
              />
            </TabsContent>

            <TabsContent value="qa" className="space-y-4">
              <WebinarQA
                questions={questions}
                onAskQuestion={handleAskQuestion}
                enabled={webinar.qAndAEnabled}
              />
            </TabsContent>

            <TabsContent value="attendees" className="space-y-4">
              <WebinarAttendees attendees={attendees} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
```

## Domain Types

### Webinars Types
```typescript
export interface Webinar {
  id: string;
  title: string;
  description: string;
  category: WebinarCategory;
  speakers: WebinarSpeaker[];
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  timezone: string;
  registrationDeadline?: Date;
  maxAttendees: number;
  currentAttendees: number;
  status: WebinarStatus;
  isPaid: boolean;
  price?: number;
  currency?: string;
  recordingEnabled: boolean;
  chatEnabled: boolean;
  qAndAEnabled: boolean;
  allowReplays: boolean;
  tags: string[];
  thumbnailUrl?: string;
  materials: WebinarMaterial[];
  registrationSettings: RegistrationSettings;
  webinarSettings: WebinarSettings;
  analytics: WebinarAnalytics;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface WebinarSpeaker {
  id: string;
  name: string;
  title: string;
  company?: string;
  bio: string;
  avatar?: string;
  email: string;
  phone?: string;
  expertise: string[];
  socialLinks?: SocialLink[];
  previousWebinars: string[];
  rating: number;
  reviewCount: number;
}

export interface WebinarAttendee {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt?: Date;
  leftAt?: Date;
  handRaised: boolean;
  questionsAsked: number;
  chatMessages: number;
  engagementScore: number;
  notes?: string;
}

export interface WebinarMaterial {
  id: string;
  title: string;
  type: MaterialType;
  url: string;
  description?: string;
  size?: number;
  downloadCount: number;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface ChatMessage {
  id: string;
  webinarId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  replyTo?: string;
  reactions: MessageReaction[];
  isModerator: boolean;
}

export interface Question {
  id: string;
  webinarId: string;
  attendeeId: string;
  attendeeName: string;
  question: string;
  timestamp: Date;
  upvotes: number;
  status: QuestionStatus;
  answer?: string;
  answeredBy?: string;
  answeredAt?: Date;
}

export interface RegistrationSettings {
  requireApproval: boolean;
  collectAdditionalInfo: boolean;
  customFields?: CustomField[];
  confirmationEmail: boolean;
  reminderEmails: boolean[];
  waitlistEnabled: boolean;
  cancelationPolicy?: string;
}

export interface WebinarSettings {
  allowHandRaise: boolean;
      allowScreenShare: boolean;
      enableBreakoutRooms: boolean;
      maxQuestionLength: number;
      moderateChat: boolean;
      moderateQuestions: boolean;
      enablePolls: boolean;
      enableWhiteboard: boolean;
    }

export interface WebinarAnalytics {
  totalRegistrations: number;
  confirmedAttendees: number;
  actualAttendees: number;
  attendanceRate: number;
  averageWatchTime: number;
  engagementScore: number;
  questionsAsked: number;
  chatMessages: number;
  replayViews: number;
  satisfactionScore: number;
  dropoffPoints: DropoffPoint[];
  deviceBreakdown: DeviceBreakdown;
  geographicDistribution: GeoData[];
}

export type WebinarCategory = 
  | 'training'
  | 'workshop'
  | 'product-launch'
  | 'industry-insights'
  | 'partner-success'
  | 'technical'
  | 'marketing'
  | 'sales';

export type WebinarStatus = 
  | 'draft'
  | 'scheduled'
  | 'registration-open'
  | 'registration-closed'
  | 'live'
  | 'ended'
  | 'cancelled';

export type MaterialType = 
  | 'document'
  | 'presentation'
  | 'spreadsheet'
  | 'video'
  | 'image'
  | 'link'
  | 'other';

export type QuestionStatus = 'pending' | 'answered' | 'dismissed';

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'dropdown' | 'checkbox';
  required: boolean;
  options?: string[];
  defaultValue?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface DropoffPoint {
  timestamp: Date;
  viewersCount: number;
  dropoffCount: number;
  dropoffReason?: string;
}

export interface DeviceBreakdown {
  desktop: number;
  mobile: number;
  tablet: number;
  other: number;
}
```

## Application Hooks

### useWebinars Hook
```typescript
export const useWebinars = (filters?: WebinarFilters) => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWebinars = useCallback(async () => {
    try {
      setLoading(true);
      const webinarsData = await webinarService.getWebinars(filters);
      setWebinars(webinarsData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createWebinar = useCallback(async (webinarData: CreateWebinarData) => {
    const newWebinar = await webinarService.createWebinar(webinarData);
    setWebinars(prev => [...prev, newWebinar]);
    return newWebinar;
  }, []);

  const updateWebinar = useCallback(async (webinarId: string, updates: Partial<Webinar>) => {
    const updatedWebinar = await webinarService.updateWebinar(webinarId, updates);
    setWebinars(prev => prev.map(webinar =>
      webinar.id === webinarId ? updatedWebinar : webinar
    ));
    return updatedWebinar;
  }, []);

  const deleteWebinar = useCallback(async (webinarId: string) => {
    await webinarService.deleteWebinar(webinarId);
    setWebinars(prev => prev.filter(webinar => webinar.id !== webinarId));
  }, []);

  useEffect(() => {
    fetchWebinars();
  }, [fetchWebinars]);

  return {
    webinars,
    loading,
    error,
    refetch: fetchWebinars,
    createWebinar,
    updateWebinar,
    deleteWebinar
  };
};
```

### useWebinarRegistration Hook
```typescript
export const useWebinarRegistration = (webinarId: string) => {
  const [registration, setRegistration] = useState<WebinarRegistration | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const checkRegistrationStatus = useCallback(async () => {
    if (!user) return;
    
    try {
      const status = await webinarRegistrationService.getRegistrationStatus(webinarId, user.id);
      setRegistration(status);
      setIsRegistered(!!status);
    } catch (error) {
      // User is not registered
      setIsRegistered(false);
    }
  }, [webinarId, user]);

  const registerForWebinar = useCallback(async (registrationData: RegistrationData) => {
    if (!user) throw new Error('User must be logged in to register');
    
    try {
      setLoading(true);
      const newRegistration = await webinarRegistrationService.register(webinarId, {
        userId: user.id,
        ...registrationData
      });
      
      setRegistration(newRegistration);
      setIsRegistered(true);
      return newRegistration;
    } finally {
      setLoading(false);
    }
  }, [webinarId, user]);

  const cancelRegistration = useCallback(async () => {
    if (!registration) return;
    
    try {
      setLoading(true);
      await webinarRegistrationService.cancelRegistration(registration.id);
      setRegistration(null);
      setIsRegistered(false);
    } finally {
      setLoading(false);
    }
  }, [registration]);

  const updateRegistration = useCallback(async (updates: Partial<RegistrationData>) => {
    if (!registration) return;
    
    try {
      setLoading(true);
      const updatedRegistration = await webinarRegistrationService.updateRegistration(registration.id, updates);
      setRegistration(updatedRegistration);
    } finally {
      setLoading(false);
    }
  }, [registration]);

  useEffect(() => {
    checkRegistrationStatus();
  }, [checkRegistrationStatus]);

  return {
    registration,
    isRegistered,
    loading,
    registerForWebinar,
    cancelRegistration,
    updateRegistration,
    refetch: checkRegistrationStatus
  };
};
```

## Service Layer

### WebinarService
```typescript
export class WebinarService {
  private api: ApiClient;
  private registration: WebinarRegistrationService;
  private liveStream: LiveStreamService;

  constructor() {
    this.api = new ApiClient();
    this.registration = new WebinarRegistrationService();
    this.liveStream = new LiveStreamService();
  }

  async getWebinars(filters?: WebinarFilters): Promise<Webinar[]> {
    const params = new URLSearchParams();
    
    if (filters?.category) {
      params.append('category', filters.category);
    }
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.dateRange) {
      params.append('dateFrom', filters.dateRange.from.toISOString());
      params.append('dateTo', filters.dateRange.to.toISOString());
    }
    if (filters?.tags?.length) {
      params.append('tags', filters.tags.join(','));
    }
    if (filters?.speakerId) {
      params.append('speakerId', filters.speakerId);
    }

    const response = await this.api.get(`/webinars?${params}`);
    return response.data.map(this.transformWebinarData);
  }

  async createWebinar(webinarData: CreateWebinarData): Promise<Webinar> {
    const response = await this.api.post('/webinars', webinarData);
    return this.transformWebinarData(response.data);
  }

  async updateWebinar(webinarId: string, updates: Partial<Webinar>): Promise<Webinar> {
    const response = await this.api.put(`/webinars/${webinarId}`, updates);
    return this.transformWebinarData(response.data);
  }

  async deleteWebinar(webinarId: string): Promise<void> {
    await this.api.delete(`/webinars/${webinarId}`);
  }

  async getWebinarAnalytics(webinarId: string): Promise<WebinarAnalytics> {
    const response = await this.api.get(`/webinars/${webinarId}/analytics`);
    return response.data;
  }

  async startWebinar(webinarId: string): Promise<string> {
    const response = await this.api.post(`/webinars/${webinarId}/start`);
    return response.data.streamKey;
  }

  async endWebinar(webinarId: string): Promise<void> {
    await this.api.post(`/webinars/${webinarId}/end`);
  }

  private transformWebinarData(data: any): Webinar {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      speakers: data.speakers || [],
      scheduledStartTime: new Date(data.scheduledStartTime),
      scheduledEndTime: new Date(data.scheduledEndTime),
      timezone: data.timezone,
      registrationDeadline: data.registrationDeadline ? new Date(data.registrationDeadline) : undefined,
      maxAttendees: data.maxAttendees,
      currentAttendees: data.currentAttendees || 0,
      status: data.status,
      isPaid: data.isPaid,
      price: data.price,
      currency: data.currency,
      recordingEnabled: data.recordingEnabled,
      chatEnabled: data.chatEnabled,
      qAndAEnabled: data.qAndAEnabled,
      allowReplays: data.allowReplays,
      tags: data.tags || [],
      thumbnailUrl: data.thumbnailUrl,
      materials: data.materials || [],
      registrationSettings: data.registrationSettings,
      webinarSettings: data.webinarSettings,
      analytics: data.analytics,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      createdBy: data.createdBy,
      updatedBy: data.updatedBy
    };
  }
}
```

## Implementation Guidelines

### Webinar Creation & Management
- Intuitive webinar scheduler with timezone support
- Automated email confirmations and reminders
- Speaker management and coordination tools
- Material upload and distribution system
- Registration management with approval workflows

### Live Streaming Features
- High-quality video streaming with adaptive bitrate
- Real-time chat and Q&A functionality
- Screen sharing and presentation tools
- Interactive polls and engagement features
- Recording and playback capabilities

### User Experience
- Responsive design for all devices
- One-click registration and calendar integration
- Real-time notifications and updates
- Interactive engagement tools
- Seamless joining experience with minimal friction

### Analytics & Insights
- Comprehensive attendance analytics
- Engagement tracking and metrics
- Question and sentiment analysis
- Performance optimization recommendations
- ROI and conversion tracking

### Integration Features
- Calendar integration (Google, Outlook, Apple)
- CRM integration for lead tracking
- Email marketing integration
- Social media sharing capabilities
- Payment processing for paid webinars

### Technical Performance
- Scalable streaming infrastructure
- Low-latency video and audio
- Automatic quality adjustment
- Redundancy and failover mechanisms
- Global CDN distribution

### Mobile Optimization
- Mobile-optimized webinar viewer
- Push notifications for live events
- Offline material access
- Touch-friendly interface
- Progressive Web App features

## Testing Strategy
- Unit tests for webinar creation and management
- Integration tests for registration and payment flows
- E2E tests for complete webinar experience
- Load testing for streaming performance
- Cross-browser and device compatibility testing
- Accessibility testing for inclusive design

## SISO Design System Integration
- Consistent orange color scheme (#f6b75e) for primary actions
- Professional webinar interface with dark mode support
- Live streaming controls and status indicators
- Engagement tools with intuitive interactions
- Responsive layouts for all screen sizes
- Loading states and error handling