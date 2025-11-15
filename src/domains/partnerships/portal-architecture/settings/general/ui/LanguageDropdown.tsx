"use client";

import { CustomDropdown } from "./CustomDropdown";

interface LanguageDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

// Top 20+ most spoken languages worldwide with business relevance
const languageOptions = [
  { value: "en", label: "English", description: "Global business language, 1.5B speakers" },
  { value: "zh-CN", label: "Chinese (Simplified)", description: "Mandarin, 1.1B speakers" },
  { value: "zh-TW", label: "Chinese (Traditional)", description: "Traditional Chinese, 20M+ speakers" },
  { value: "es", label: "Spanish", description: "Español, 559M speakers" },
  { value: "hi", label: "Hindi", description: "हिन्दी, 637M speakers" },
  { value: "ar", label: "Arabic", description: "العربية, 274M speakers" },
  { value: "bn", label: "Bengali", description: "বাংলা, 272M speakers" },
  { value: "pt", label: "Portuguese", description: "Português, 264M speakers" },
  { value: "ru", label: "Russian", description: "Русский, 255M speakers" },
  { value: "ja", label: "Japanese", description: "日本語, 125M speakers" },
  { value: "de", label: "German", description: "Deutsch, 132M speakers" },
  { value: "fr", label: "French", description: "Français, 280M speakers" },
  { value: "tr", label: "Turkish", description: "Türkçe, 88M speakers" },
  { value: "it", label: "Italian", description: "Italiano, 67M speakers" },
  { value: "ko", label: "Korean", description: "한국어, 80M speakers" },
  { value: "pl", label: "Polish", description: "Polski, 50M speakers" },
  { value: "nl", label: "Dutch", description: "Nederlands, 24M speakers" },
  { value: "sv", label: "Swedish", description: "Svenska, 10M speakers" },
  { value: "da", label: "Danish", description: "Dansk, 6M speakers" },
  { value: "no", label: "Norwegian", description: "Norsk, 5M speakers" },
  { value: "fi", label: "Finnish", description: "Suomi, 5M speakers" },
  { value: "el", label: "Greek", description: "Ελληνικά, 13M speakers" },
  { value: "he", label: "Hebrew", description: "עברית, 9M speakers" },
  { value: "th", label: "Thai", description: "ไทย, 61M speakers" },
  { value: "vi", label: "Vietnamese", description: "Tiếng Việt, 77M speakers" },
  { value: "id", label: "Indonesian", description: "Bahasa Indonesia, 199M speakers" },
  { value: "ms", label: "Malay", description: "Bahasa Melayu, 290M speakers" },
  { value: "tl", label: "Filipino", description: "Filipino, 45M speakers" },
  { value: "ta", label: "Tamil", description: "தமிழ், 87M speakers" },
  { value: "te", label: "Telugu", description: "తెలుగు, 82M speakers" },
  { value: "mr", label: "Marathi", description: "मराठी, 83M speakers" },
  { value: "gu", label: "Gujarati", description: "ગુજરાતી, 56M speakers" },
  { value: "kn", label: "Kannada", description: "ಕನ್ನಡ, 44M speakers" },
  { value: "pa", label: "Punjabi", description: "ਪੰਜਾਬੀ, 150M speakers" },
  { value: "ur", label: "Urdu", description: "اردو, 231M speakers" },
  { value: "fa", label: "Persian", description: "فارسی, 110M speakers" },
  { value: "sw", label: "Swahili", description: "Kiswahili, 16M speakers" },
  { value: "cs", label: "Czech", description: "Čeština, 10M speakers" },
  { value: "hu", label: "Hungarian", description: "Magyar, 13M speakers" },
  { value: "ro", label: "Romanian", description: "Română, 24M speakers" },
  { value: "bg", label: "Bulgarian", description: "Български, 9M speakers" },
  { value: "hr", label: "Croatian", description: "Hrvatski, 5M speakers" },
  { value: "sk", label: "Slovak", description: "Slovenčina, 5M speakers" },
  { value: "sl", label: "Slovenian", description: "Slovenščina, 2.5M speakers" },
  { value: "et", label: "Estonian", description: "Eesti, 1.1M speakers" },
  { value: "lv", label: "Latvian", description: "Latviešu, 1.8M speakers" },
  { value: "lt", label: "Lithuanian", description: "Lietuvių, 2.8M speakers" },
  { value: "uk", label: "Ukrainian", description: "Українська, 33M speakers" },
  { value: "ka", label: "Georgian", description: "ქართული, 3.7M speakers" },
  { value: "am", label: "Amharic", description: "አማርኛ, 57M speakers" },
  { value: "ne", label: "Nepali", description: "नेपाली, 30M speakers" },
  { value: "si", label: "Sinhala", description: "සිංහල, 17M speakers" },
  { value: "my", label: "Myanmar (Burmese)", description: "မြန်မာ, 33M speakers" },
  { value: "km", label: "Khmer", description: "ខ្មែរ, 16M speakers" },
  { value: "lo", label: "Lao", description: "ລາວ, 7M speakers" },
  { value: "mn", label: "Mongolian", description: "Монгол, 5M speakers" },
  { value: "hy", label: "Armenian", description: "Հայերեն, 6.7M speakers" },
  { value: "az", label: "Azerbaijani", description: "Azərbaycan, 23M speakers" },
  { value: "kk", label: "Kazakh", description: "Қазақша, 13M speakers" },
  { value: "ky", label: "Kyrgyz", description: "Кыргызча, 4.5M speakers" },
  { value: "uz", label: "Uzbek", description: "Oʻzbekcha, 27M speakers" },
  { value: "tg", label: "Tajik", description: "Тоҷикӣ, 8.4M speakers" },
  { value: "tk", label: "Turkmen", description: "Türkmençe, 7M speakers" },
  { value: "ku", label: "Kurdish", description: "Kurdî, 30M speakers" },
  { value: "ps", label: "Pashto", description: "پښتو, 40M speakers" },
  { value: "sd", label: "Sindhi", description: "سنڌي, 68M speakers" },
  { value: "dv", label: "Dhivehi", description: "ދިވެހި, 400K speakers" },
];

export function LanguageDropdown({ value, onChange, className = "", disabled = false }: LanguageDropdownProps) {
  return (
    <CustomDropdown
      options={languageOptions}
      value={value}
      onChange={onChange}
      placeholder="Select language"
      searchable={true}
      maxVisible={20}
      className={className}
      disabled={disabled}
    />
  );
}