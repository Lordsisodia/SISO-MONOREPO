# Language & Region Settings

- **Route**: `/partner/settings/language`
- **Section**: Settings
- **Complexity**: Medium (has domain + application + ui layers)
- **Primary Objective**: Set locale preferences

## Content Modules & Components

### 1. Page Header & Introduction
**Location**: Top of page
**Component**: Standard settings page header with language-focused description

**Header Structure**:
```tsx
<div className="space-y-2 pb-6">
  <div className="flex items-center gap-3">
    <Globe className="h-6 w-6 text-siso-orange" />
    <h1 className="text-2xl font-bold text-siso-text-primary">Language & Region</h1>
  </div>
  <p className="text-siso-text-muted">
    Customize your language, timezone, and formatting preferences. 
    Ensure your partnership experience is displayed in your preferred language and time format.
  </p>
</div>
```

### 2. Language Selection Section
**Location**: Top section below header
**Component**: Language selector with search and preview

**Language Options Structure**:
```typescript
const languageOptions = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    description: "Default language for the partnership platform",
    preview: {
      greeting: "Hello, Partner!",
      settings: "Settings",
      dashboard: "Dashboard"
    }
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    description: "Idioma oficial para el programa de asociación",
    preview: {
      greeting: "¡Hola, Socio!",
      settings: "Configuración",
      dashboard: "Panel de control"
    }
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français", 
    flag: "🇫🇷",
    description: "Langue officielle du programme de partenariat",
    preview: {
      greeting: "Bonjour, Partenaire!",
      settings: "Paramètres",
      dashboard: "Tableau de bord"
    }
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    description: "Offizielle Sprache des Partnerschaftsprogramms",
    preview: {
      greeting: "Hallo, Partner!",
      settings: "Einstellungen",
      dashboard: "Dashboard"
    }
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    description: "Idioma oficial do programa de parceria",
    preview: {
      greeting: "Olá, Parceiro!",
      settings: "Configurações",
      dashboard: "Painel de controlo"
    }
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    description: "パートナーシッププログラムの公式言語",
    preview: {
      greeting: "こんにちは、パートナー！",
      settings: "設定",
      dashboard: "ダッシュボード"
    }
  }
];
```

**Language Selector Component**:
```tsx
<div className="space-y-4">
  <h2 className="text-lg font-semibold text-siso-text-primary">Display Language</h2>
  
  {/* Search Bar */}
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-siso-text-muted" />
    <input
      type="text"
      placeholder="Search languages..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-10 pr-4 py-3 rounded-xl border border-siso-border/60 bg-siso-bg-secondary/80 focus:border-siso-orange/60 focus:outline-none"
    />
  </div>

  {/* Language List */}
  <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
    {filteredLanguages.map((language) => (
      <button
        key={language.code}
        onClick={() => selectLanguage(language.code)}
        className={`p-4 rounded-xl border-2 transition-all ${
          currentLocale === language.code
            ? 'border-siso-orange bg-siso-orange/10'
            : 'border-siso-border/60 hover:border-siso-orange/40 bg-siso-bg-secondary/80'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{language.flag}</span>
            <div className="text-left">
              <div className="font-medium text-siso-text-primary">
                {language.nativeName}
                {language.nativeName !== language.name && (
                  <span className="text-siso-text-muted ml-2">({language.name})</span>
                )}
              </div>
              <div className="text-sm text-siso-text-muted">
                {language.description}
              </div>
            </div>
          </div>
          
          {currentLocale === language.code && (
            <Check className="h-5 w-5 text-siso-orange" />
          )}
        </div>

        {/* Preview */}
        <div className="mt-3 p-3 rounded-lg bg-siso-bg-tertiary/50 border border-siso-border/30">
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Preview:</span>
              <div className="space-y-1 mt-1">
                <p className="text-siso-text-primary">{language.preview.greeting}</p>
                <div className="flex gap-2 text-xs">
                  <span className="text-siso-text-muted">{language.preview.settings}</span>
                  <span className="text-siso-text-muted">•</span>
                  <span className="text-siso-text-muted">{language.preview.dashboard}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    ))}
  </div>
</div>
```

### 3. Timezone Selection Section
**Location**: Below language selection
**Component**: Timezone selector with search and current time preview

**Timezone Options Structure**:
```typescript
const timezoneOptions = [
  {
    value: "America/New_York",
    label: "Eastern Time (ET)",
    description: "New York, Toronto, Montreal",
    gmtOffset: -5,
    currentOffset: -5,
    hasDST: true,
    preview: {
      time: "10:30 AM",
      date: "Monday, January 15, 2024",
      offset: "GMT-5"
    }
  },
  {
    value: "America/Chicago",
    label: "Central Time (CT)",
    description: "Chicago, Dallas, Houston",
    gmtOffset: -6,
    currentOffset: -6,
    hasDST: true,
    preview: {
      time: "9:30 AM",
      date: "Monday, January 15, 2024",
      offset: "GMT-6"
    }
  },
  {
    value: "America/Denver",
    label: "Mountain Time (MT)",
    description: "Denver, Phoenix, Salt Lake City",
    gmtOffset: -7,
    currentOffset: -7,
    hasDST: true,
    preview: {
      time: "8:30 AM",
      date: "Monday, January 15, 2024",
      offset: "GMT-7"
    }
  },
  {
    value: "America/Los_Angeles",
    label: "Pacific Time (PT)",
    description: "Los Angeles, Seattle, San Francisco",
    gmtOffset: -8,
    currentOffset: -8,
    hasDST: true,
    preview: {
      time: "7:30 AM",
      date: "Monday, January 15, 2024",
      offset: "GMT-8"
    }
  },
  {
    value: "Europe/London",
    label: "Greenwich Mean Time (GMT)",
    description: "London, Dublin, Lisbon",
    gmtOffset: 0,
    currentOffset: 0,
    hasDST: true,
    preview: {
      time: "3:30 PM",
      date: "Monday, January 15, 2024",
      offset: "GMT+0"
    }
  },
  {
    value: "Europe/Paris",
    label: "Central European Time (CET)",
    description: "Paris, Rome, Berlin",
    gmtOffset: 1,
    currentOffset: 1,
    hasDST: true,
    preview: {
      time: "4:30 PM",
      date: "Monday, January 15, 2024",
      offset: "GMT+1"
    }
  },
  {
    value: "Asia/Tokyo",
    label: "Japan Standard Time (JST)",
    description: "Tokyo, Osaka, Seoul",
    gmtOffset: 9,
    currentOffset: 9,
    hasDST: false,
    preview: {
      time: "12:30 AM",
      date: "Tuesday, January 16, 2024",
      offset: "GMT+9"
    }
  },
  {
    value: "Australia/Sydney",
    label: "Australian Eastern Time (AET)",
    description: "Sydney, Melbourne, Brisbane",
    gmtOffset: 10,
    currentOffset: 11,
    hasDST: true,
    preview: {
      time: "1:30 AM",
      date: "Tuesday, January 16, 2024",
      currentTime: true,
      offset: "GMT+11 (DST)"
    }
  }
];
```

**Timezone Selector Component**:
```tsx
<div className="space-y-4">
  <h2 className="text-lg font-semibold text-siso-text-primary">Timezone</h2>
  
  {/* Current Time Display */}
  <div className="p-4 rounded-xl bg-siso-orange/10 border border-siso-orange/60">
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium text-siso-text-primary">Current Time</div>
        <div className="text-2xl font-bold text-siso-orange">
          {getCurrentTime(settings.timezone)}
        </div>
        <div className="text-sm text-siso-text-muted">
          {getCurrentDate(settings.timezone)} • {settings.timezone}
        </div>
      </div>
      <Clock className="h-8 w-8 text-siso-orange" />
    </div>
  </div>

  {/* Search Bar */}
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-siso-text-muted" />
    <input
      type="text"
      placeholder="Search timezones..."
      value={timezoneSearchQuery}
      onChange={(e) => setTimezoneSearchQuery(e.target.value)}
      className="w-full pl-10 pr-4 py-3 rounded-xl border border-siso-border/60 bg-siso-bg-secondary/80 focus:border-siso-orange/60 focus:outline-none"
    />
  </div>

  {/* Timezone List */}
  <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
    {filteredTimezones.map((timezone) => (
      <button
        key={timezone.value}
        onClick={() => selectTimezone(timezone.value)}
        className={`p-4 rounded-xl border-2 transition-all ${
          currentTimezone === timezone.value
            ? 'border-siso-orange bg-siso-orange/10'
            : 'border-siso-border/60 hover:border-siso-orange/40 bg-siso-bg-secondary/80'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="font-medium text-siso-text-primary">
              {timezone.label}
            </div>
            <div className="text-sm text-siso-text-muted">
              {timezone.description}
            </div>
            <div className="text-xs text-siso-text-muted mt-1">
              GMT{timezone.gmtOffset >= 0 ? '+' : ''}{timezone.gmtOffset}
              {timezone.hasDST ? ' (observes DST)' : ''}
            </div>
          </div>

          {currentTimezone === timezone.value && (
            <Check className="h-5 w-5 text-siso-orange" />
          )}
        </div>

        {/* Preview */}
        <div className="mt-3 p-3 rounded-lg bg-siso-bg-tertiary/50 border border-siso-border/30">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-siso-text-muted">Local Time:</span>
              <span className="font-medium text-siso-text-primary">{timezone.preview.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-siso-text-muted">Date:</span>
              <span className="font-medium text-siso-text-primary">{timezone.preview.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-siso-text-muted">Offset:</span>
              <span className="font-medium text-siso-text-primary">{timezone.preview.offset}</span>
            </div>
          </div>
        </div>
      </button>
    ))}
  </div>
</div>
```

### 4. Format Preferences Section
**Location**: Below timezone selection
**Component**: Date, time, number, and currency format selectors

**Format Preferences Component**:
```tsx
<div className="space-y-6">
  <h2 className="text-lg font-semibold text-siso-text-primary">Format Preferences</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Date Format */}
    <div className="space-y-3">
      <label className="text-sm font-medium text-siso-text-primary">Date Format</label>
      <Select
        value={settings.dateFormat}
        onValueChange={(value) => updateSetting('dateFormat', value as string)}
      >
        <option value="MM/DD/YYYY">MM/DD/YYYY (January 15, 2024)</option>
        <option value="DD/MM/YYYY">DD/MM/YYYY (15 January, 2024)</option>
        <option value="YYYY-MM-DD">YYYY-MM-DD (2024-01-15)</option>
        <option value="MMM D, YYYY">Jan 15, 2024</option>
        <option value="D MMMM YYYY">15 Jan 2024</option>
        <option value="MMMM D, YYYY">January 15, 2024</option>
        <option value="D MMMM, YYYY">15 January, 2024</option>
      </Select>
      
      <div className="mt-2 p-3 rounded-lg bg-siso-bg-tertiary/50 border border-siso-border/30">
        <p className="text-sm text-siso-text-primary">
          Example: {formatDate(new Date(), settings.dateFormat)}
        </p>
      </div>
    </div>

    {/* Time Format */}
    <div className="space-y-3">
      <label className="text-sm font-medium text-siso-text-primary">Time Format</label>
      <div className="flex gap-4">
        <button
          onClick={() => updateSetting('timeFormat', '12h')}
          className={`flex-1 p-3 rounded-xl border-2 transition-all ${
            settings.timeFormat === '12h'
              ? 'border-siso-orange bg-siso-orange/10'
              : 'border-siso-border/60 hover:border-siso-orange/40'
          }`}
        >
          <div className="text-center">
            <div className="font-medium text-siso-text-primary">12-hour</div>
            <div className="text-2xl font-bold text-siso-text-primary">3:30 PM</div>
            <div className="text-sm text-siso-text-muted">Example</div>
          </div>
        </button>
        
        <button
          onClick={() => updateSetting('timeFormat', '24h')}
          className={`flex-1 p-3 rounded-xl border-2 transition-all ${
            settings.timeFormat === '24h'
              ? 'border-siso-orange bg-siso-orange/10'
              : 'border-siso-border/60 hover:border-siso-orange/40'
          }`}
        >
          <div className="text-center">
            <div className="font-medium text-siso-text-primary">24-hour</div>
            <div className="text-2xl font-bold text-siso-text-primary">15:30</div>
            <div className="text-sm text-siso-text-muted">Example</div>
          </div>
        </button>
      </div>
    </div>

    {/* Number Format */}
    <div className="space-y-3">
      <label className="text-sm font-medium text-siso-text-primary">Number Format</label>
      <Select
        value={settings.numberFormat}
        onValueChange={(value) => updateSetting('numberFormat', value as string)}
      >
        <option value="en-US">1,234.56 (US)</option>
        <option value="en-GB">1,234.56 (UK)</option>
        <option value="de-DE">1.234,56 (German)</option>
        <option value="fr-FR">1 234,56 (French)</option>
        <option value="ja-JP">1,234.56 (Japanese)</option>
      </Select>
      
      <div className="mt-2 p-3 rounded-lg bg-siso-bg-teriary/50 border border-siso-border/30">
        <p className="text-sm text-siso-text-primary">
          Example: {formatNumber(1234.56, settings.numberFormat)}
        </p>
      </div>
    </div>

    {/* Currency Format */}
    <div className="space-y-3">
      <label className="text-sm font-medium text-siso-text-primary">Currency Format</label>
      <Select
        value={settings.currencyFormat}
        onValueChange={(value) => updateSetting('currencyFormat', value as string)}
      >
        <option value="USD">$1,234.56 (USD)</option>
        <option value="EUR">€1,234.56 (EUR)</option>
        <option value="GBP">£1,234.56 (GBP)</option>
        <option value="JPY">¥123,456 (JPY)</option>
        <option value="AUD">A$1,234.56 (AUD)</option>
        <option value="CAD">C$1,234.56 (CAD)</option>
      </Select>
      
      <div className="mt-2 p-3 rounded-lg bg-siso-bg-teriary/50 border border-siso-border/30">
        <p className="text-sm text-siso-text-primary">
          Example: {formatCurrency(1234.56, settings.currencyFormat)}
        </p>
      </div>
    </div>
  </div>
</div>
```

### 5. Save Actions Section
**Location**: Bottom of page
**Component**: Save, reset, and preview buttons

**Actions Component**:
```tsx
<div className="mt-8 space-y-4">
  {/* Preview Changes */}
  <div className="rounded-2xl border border-siso-border/60 bg-siso-bg-secondary/80 p-6">
    <h3 className="font-semibold text-siso-text-primary mb-4">Preview Your Changes</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div>
        <div className="text-siso-text-muted mb-2">Language & Region:</div>
        <div className="space-y-1">
          <p><strong>Language:</strong> {getLanguageName(settings.locale)}</p>
          <p><strong>Timezone:</strong> {settings.timezone}</p>
        </div>
      </div>
      
      <div>
        <div className="text-siso-text-muted mb-2">Formats:</div>
        <div className="space-y-1">
          <p><strong>Date:</strong> {formatDate(new Date(), settings.dateFormat)}</p>
          <p><strong>Time:</strong> {getCurrentTime(settings.timezone)} ({settings.timeFormat})</p>
          <p><strong>Currency:</strong> {formatCurrency(1000, settings.currencyFormat)}</p>
        </div>
      </div>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-3">
    <button
      onClick={resetToDefaults}
      className="px-6 py-3 border border-siso-border/60 text-siso-text-primary rounded-lg hover:border-siso-orange/60 transition-colors"
    >
      Reset to Defaults
    </button>
    
    <button
      onClick={saveSettings}
      className="flex-1 px-6 py-3 bg-siso-orange text-white rounded-lg hover:bg-siso-orange/90 transition-colors font-medium"
    >
      Save Changes
    </button>
  </div>
</div>
```

## Domain Types & Data Structure

### LanguageSettings Interface
```typescript
interface LanguageSettings {
  locale: string;                    // Language code (en, es, fr, etc.)
  timezone: string;                 // IANA timezone identifier
  dateFormat: string;                 // Date format pattern
  timeFormat: "12h" | "24h";         // Time format preference
  numberFormat: string;               // Number formatting locale
  currencyFormat: string;              // Currency code and format
}
```

### Language Option Interface
```typescript
interface LanguageOption {
  code: string;          // ISO language code
  name: string;          // English name
  nativeName: string;      // Native language name
  flag: string;           // Flag emoji
  description: string;    // Description in English
  preview: {
    greeting: string;      // Sample greeting
    settings: string;     // "Settings" translation
    dashboard: string;    // "Dashboard" translation
  };
}
```

### Timezone Option Interface
```typescript
interface TimezoneOption {
  value: string;           // IANA timezone identifier
  label: string;           // Human-readable name
  description: string;     // Cities/regions covered
  gmtOffset: number;        // Base GMT offset
  currentOffset: number;   // Current offset (accounts for DST)
  hasDST: boolean;        // Observes daylight saving
  preview: {
    time: string;           // Current time example
    date: string;           // Current date example
    offset: string;         // Offset display string
  };
}
```

## Application Hook: `useLanguageSettings`

**Purpose**: Manages language preferences and provides formatting utilities

**Hook Structure**:
```typescript
export function useLanguageSettings() {
  const [settings, setSettings] = useState<LanguageSettings>({
    locale: "en",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    numberFormat: "en-US",
    currencyFormat: "USD"
  });

  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Update individual setting
  const updateSetting = async (key: keyof LanguageSettings, value: string) => {
    try {
      setSettings(prev => ({ ...prev, [key]: value }));
      
      // TODO: Call API to save
      toast.success(`${getSettingName(key)} updated`);
    } catch (error) {
      toast.error(`Failed to update ${getSettingName(key)}`);
      // Revert change on error
      setSettings(prev => ({ ...prev, [key]: settings[key] }));
    }
  };

  // Save all settings
  const saveSettings = async () => {
    setLoading(true);
    try {
      // TODO: Call API to save all settings
      await api.put('/api/user/settings/language', settings);
      toast.success("Language settings saved successfully");
      
      // Trigger language reload
      if (settings.locale !== currentLocale) {
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to save language settings");
    } finally {
      setLoading(false);
    }
  };

  // Reset to defaults
  const resetToDefaults = () => {
    const defaults: LanguageSettings = {
      locale: "en",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
      numberFormat: "en-US",
      currencyFormat: "USD"
    };
    
    setSettings(defaults);
    toast.info("Reset to default settings");
  };

  // Formatting utilities
  const formatDate = (date: Date, format?: string) => {
    const dateFormat = format || settings.dateFormat;
    return new Intl.DateTimeFormat(getLocaleFromCode(settings.locale), {
      dateStyle: 'medium',
      timeZone: settings.timezone,
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date).replace(/\//g, '/'); // Replace slashes for consistency
  };

  const getCurrentTime = (timezone?: string) => {
    const tz = timezone || settings.timezone;
    return new Date().toLocaleTimeString('en-US', {
      timeZone: tz,
      hour12: settings.timeFormat === '12h',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number, locale?: string) => {
    const numLocale = locale || settings.numberFormat;
    return new Intl.NumberFormat(numLocale).format(num);
  };

  const formatCurrency = (amount: number, currency?: string) => {
    const curr = currency || settings.currencyFormat;
    return new Intl.NumberFormat(getLocaleFromCode(settings.locale), {
      style: 'currency',
      currency: curr
    }).format(amount);
  };

  return {
    settings,
    loading,
    showPreview,
    setShowPreview,
    updateSetting,
    saveSettings,
    resetToDefaults,
    formatDate,
    getCurrentTime,
    formatNumber,
    formatCurrency
  };
}
```

## Formatting Utilities

### Date Formatting
```typescript
const dateFormats = {
  "MM/DD/YYYY": (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  },
  "DD/MM/YYYY": (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },
  "YYYY-MM-DD": (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
};

const formatDate = (date: Date, format: string) => {
  const formatter = dateFormats[format as keyof typeof dateFormats];
  return formatter ? formatter(date) : date.toLocaleDateString();
};
```

### Time Formatting
```typescript
const formatTime = (date: Date, format: "12h" | "24h") => {
  if (format === "12h") {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit'
    });
  } else {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};
```

### Number Formatting
```typescript
const numberFormats = {
  "en-US": { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  "en-GB": { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  "de-DE": { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  "fr-FR": { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 },
  "ja-JP": { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }
};

const formatNumber = (num: number, locale: string) => {
  const options = numberFormats[locale as keyof typeof numberFormats];
  return new Intl.NumberFormat(locale, options).format(num);
};
```

## Visual Design System

### Component Styling
- **Language Cards**: `p-4 rounded-xl` with hover state changes
- **Timezone Cards**: Similar styling with preview sections
- **Format Selectors**: Consistent styling with example displays
- **Preview Section**: Nested containers for live formatting examples

### Color Coding
- **Primary Orange**: `#f6b75e` (siso-orange) for selected states
- **Success Green**: Used for checkmark indicators
- **Border Colors**: `border-siso-border/60` with orange hover states
- **Background Colors**: `bg-siso-bg-secondary/80` for card backgrounds

### Typography Scale
- **Section Headers**: 18px semibold, primary text color
- **Setting Labels**: 14px medium, primary text color
- **Example Text**: 12px regular, muted color
- **Preview Text**: Various sizes based on content type

### Spacing System
- **Section Spacing**: `space-y-4` (16px) between major sections
- **Card Padding**: `p-4` (16px) for consistent interior spacing
- **Item Spacing**: `gap-3` (12px) within card elements
- **Grid Gaps**: `gap-6` (24px) between format preference columns

## Integration Points

### Internationalization System
- **i18n Framework**: Integration with translation management system
- **Locale Detection**: Auto-detect user's preferred language
- **Fallback Language**: Default to English when preferred language unavailable
- **Dynamic Loading**: Load translations on-demand

### Date/Time Libraries
- **Date-fns**: Use for robust date manipulation and formatting
- **Intl API**: Leverage browser's built-in internationalization
- **Moment.js Alternative**: Consider lighter alternatives if needed
- **Timezone Database**: Use IANA timezone database

### Browser Storage
- **Settings Cache**: Cache user preferences in localStorage
- **Session Storage**: Temporary storage for preview states
- **Cookie Storage**: Store language preference for page loads
- **Sync Strategy**: Sync changes with backend API

## Data Requirements

### API Endpoints
```typescript
// Get current language settings
GET /api/user/settings/language

// Update language settings
PUT /api/user/settings/language
{
  locale: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  numberFormat: string;
  currencyFormat: string;
}

// Get available languages
GET /api/languages

// Get available timezones
GET /api/timezones

// Reset language settings to defaults
POST /api/user/settings/language/reset
```

### Translation Data
```typescript
interface TranslationData {
  [key: string]: {
    [locale: string]: string;
  };
}

// Translation files structure
interface TranslationFile {
  en: TranslationData;
  es: TranslationData;
  fr: TranslationData;
  // ... other languages
}
```

### Real-time Updates
- **WebSocket Events**: Live timezone updates and notifications
- **Push Notifications**: Language change confirmations
- **Status Updates**: Sync status and error handling
- **Preview Updates**: Real-time formatting preview updates

## Performance Considerations

### Lazy Loading
- **Translation Loading**: Load translations on-demand
- **Timezone Database**: Load timezone data incrementally
- **Format Functions**: Lazy load formatting utilities
- **Component Splitting**: Split large translation files

### Caching Strategy
- **Translation Cache**: Cache loaded translations in memory
- **Format Cache**: Cache formatting functions and configurations
- **Browser Storage**: Cache user preferences locally
- **API Response Caching**: Cache API responses to reduce calls

### Memory Management
- **Translation Unloading**: Unload unused translation files
- **Garbage Collection**: Clean up unused formatting objects
- **Component Unmounting**: Proper cleanup of event listeners
- **Bundle Splitting**: Separate language-specific bundles

## Accessibility Requirements

### Language Support
- **Screen Reader**: Proper language announcements for screen readers
- **Keyboard Navigation**: Full keyboard access to all language controls
- **Focus Management**: Clear focus indicators for interactive elements
- **ARIA Labels**: Proper ARIA labels for language selectors

### Visual Accessibility
- **Color Contrast**: Meet WCAG AA standards for all text and UI elements
- **Text Scaling**: Support 200% zoom without loss of functionality
- **Flag Accessibility**: Alternative text for flag emojis
- **High Contrast**: Support high contrast mode for better visibility

### Cultural Considerations
- **Date Formats**: Culturally appropriate date and time formats
- **Number Formatting**: Locale-appropriate number and currency formats
- **Text Direction**: Support for RTL languages if needed
- **Name Display**: Show native language names alongside English names

## Error Handling

### Validation Errors
- **Language Code Validation**: Validate language codes before applying
- **Timezone Validation**: Validate timezone identifiers
- **Format Validation**: Validate format patterns before use
- **Range Checking**: Ensure values are within acceptable ranges

### Loading Errors
- **Translation Loading**: Handle translation file loading failures
- **Timezone Detection**: Handle timezone detection failures
- **API Errors**: Handle API communication failures
- **Browser Compatibility**: Handle browser support issues

### User Experience
- **Error Messages**: Clear, actionable error descriptions
- **Recovery Options**: Provide retry and reset options
- **Status Indicators**: Clear indication of loading and error states
- **Progress Feedback**: Show progress during long-running operations

## Testing Strategy

### Unit Tests
- **Formatting Functions**: Test all formatting utilities with various inputs
- **Hook Testing**: `useLanguageSettings` state management and updates
- **Validation Logic**: Test input validation and error handling
- **Utility Functions**: Test individual utility functions

### Integration Tests
- **API Integration**: Mock API responses for settings operations
- **Translation Integration**: Test translation loading and application
- **Timezone Detection**: Test timezone detection and application
- **Browser Storage**: Test local storage caching mechanisms

### E2E Tests
- **Language Workflow**: Complete language selection and application process
- **Timezone Workflow**: Complete timezone selection and time display
- **Format Preview**: Test format preference changes and preview
- **Cross-browser**: Test across different browsers and devices

### Accessibility Tests
- **Screen Reader**: Test with screen reader software
- **Keyboard Navigation**: Test with keyboard-only navigation
- **High Contrast**: Test in high contrast mode
- **Text Scaling**: Test with 200% zoom level