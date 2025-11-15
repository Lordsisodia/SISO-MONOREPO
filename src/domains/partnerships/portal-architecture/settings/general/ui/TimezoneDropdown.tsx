"use client";

import { CustomDropdown } from "./CustomDropdown";

interface TimezoneDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

// Comprehensive list of major timezones organized by region
const timezoneOptions = [
  // Major US Timezones
  { value: "America/New_York", label: "Eastern Time (ET)", description: "UTC-5/-4 (New York, Toronto, Boston)" },
  { value: "America/Chicago", label: "Central Time (CT)", description: "UTC-6/-5 (Chicago, Dallas, Houston)" },
  { value: "America/Denver", label: "Mountain Time (MT)", description: "UTC-7/-6 (Denver, Phoenix, Salt Lake City)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)", description: "UTC-8/-7 (Los Angeles, San Francisco, Seattle)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)", description: "UTC-9/-8 (Anchorage, Fairbanks)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)", description: "UTC-10 (Honolulu, Honolulu)" },

  // European Timezones
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)", description: "UTC+0/+1 (London, Dublin, Lisbon)" },
  { value: "Europe/Paris", label: "Central European Time (CET)", description: "UTC+1/+2 (Paris, Berlin, Rome, Madrid)" },
  { value: "Europe/Berlin", label: "Central European Time (CET)", description: "UTC+1/+2 (Berlin, Amsterdam, Brussels)" },
  { value: "Europe/Moscow", label: "Moscow Time (MSK)", description: "UTC+3 (Moscow, St. Petersburg)" },
  { value: "Europe/Stockholm", label: "Central European Time (CET)", description: "UTC+1/+2 (Stockholm, Copenhagen, Oslo)" },
  { value: "Europe/Athens", label: "Eastern European Time (EET)", description: "UTC+2/+3 (Athens, Helsinki, Sofia)" },

  // Asian Timezones
  { value: "Asia/Dubai", label: "Gulf Standard Time (GST)", description: "UTC+4 (Dubai, Abu Dhabi)" },
  { value: "Asia/Karachi", label: "Pakistan Standard Time (PKT)", description: "UTC+5 (Karachi, Islamabad)" },
  { value: "Asia/Kolkata", label: "India Standard Time (IST)", description: "UTC+5:30 (Mumbai, Delhi, Bangalore)" },
  { value: "Asia/Dhaka", label: "Bangladesh Standard Time (BST)", description: "UTC+6 (Dhaka, Chittagong)" },
  { value: "Asia/Bangkok", label: "Indochina Time (ICT)", description: "UTC+7 (Bangkok, Ho Chi Minh City)" },
  { value: "Asia/Shanghai", label: "China Standard Time (CST)", description: "UTC+8 (Shanghai, Beijing, Hong Kong)" },
  { value: "Asia/Singapore", label: "Singapore Time (SGT)", description: "UTC+8 (Singapore, Kuala Lumpur)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)", description: "UTC+9 (Tokyo, Osaka)" },
  { value: "Asia/Seoul", label: "Korea Standard Time (KST)", description: "UTC+9 (Seoul, Busan)" },

  // Oceanian Timezones
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET)", description: "UTC+10/+11 (Sydney, Melbourne)" },
  { value: "Australia/Perth", label: "Australian Western Time (AWT)", description: "UTC+8 (Perth, Western Australia)" },
  { value: "Pacific/Auckland", label: "New Zealand Time (NZT)", description: "UTC+12/+13 (Auckland, Wellington)" },

  // African Timezones
  { value: "Africa/Cairo", label: "Eastern European Time (EET)", description: "UTC+2 (Cairo, Alexandria)" },
  { value: "Africa/Lagos", label: "West Africa Time (WAT)", description: "UTC+1 (Lagos, Abuja)" },
  { value: "Africa/Johannesburg", label: "South Africa Time (SAT)", description: "UTC+2 (Johannesburg, Cape Town)" },

  // South American Timezones
  { value: "America/Sao_Paulo", label: "Brasília Time (BRT)", description: "UTC-3/-2 (São Paulo, Rio de Janeiro)" },
  { value: "America/Buenos_Aires", label: "Argentina Time (ART)", description: "UTC-3 (Buenos Aires, Cordoba)" },
  { value: "America/Santiago", label: "Chile Time (CLT)", description: "UTC-4/-3 (Santiago, Valparaiso)" },
  { value: "America/Mexico_City", label: "Central Time (CT)", description: "UTC-6/-5 (Mexico City, Monterrey)" },
  { value: "America/Bogota", label: "Colombia Time (COT)", description: "UTC-5 (Bogota, Medellin)" },
  { value: "America/Lima", label: "Peru Time (PET)", description: "UTC-5 (Lima, Arequipa)" },
  { value: "America/Caracas", label: "Venezuela Time (VET)", description: "UTC-4 (Caracas, Maracaibo)" },

  // Additional Major Cities
  { value: "America/Toronto", label: "Eastern Time (ET)", description: "UTC-5/-4 (Toronto, Montreal)" },
  { value: "America/Vancouver", label: "Pacific Time (PT)", description: "UTC-8/-7 (Vancouver, Calgary)" },
  { value: "Europe/Madrid", label: "Central European Time (CET)", description: "UTC+1/+2 (Madrid, Barcelona)" },
  { value: "Europe/Amsterdam", label: "Central European Time (CET)", description: "UTC+1/+2 (Amsterdam, Rotterdam)" },
  { value: "Europe/Rome", label: "Central European Time (CET)", description: "UTC+1/+2 (Rome, Milan)" },
  { value: "Europe/Vienna", label: "Central European Time (CET)", description: "UTC+1/+2 (Vienna, Prague)" },
  { value: "Europe/Warsaw", label: "Central European Time (CET)", description: "UTC+1/+2 (Warsaw, Budapest)" },
  { value: "Europe/Istanbul", label: "Turkey Time (TRT)", description: "UTC+3 (Istanbul, Ankara)" },
  { value: "Asia/Jakarta", label: "Western Indonesia Time (WIB)", description: "UTC+7 (Jakarta, Bandung)" },
  { value: "Asia/Manila", label: "Philippines Time (PHT)", description: "UTC+8 (Manila, Cebu)" },
  { value: "Asia/Taipei", label: "Taiwan Time (CST)", description: "UTC+8 (Taipei, Kaohsiung)" },
  { value: "Asia/Hong_Kong", label: "Hong Kong Time (HKT)", description: "UTC+8 (Hong Kong, Macau)" },
  { value: "Pacific/Fiji", label: "Fiji Time (FJT)", description: "UTC+12/+13 (Suva, Nadi)" },

  // UTC-based options
  { value: "UTC", label: "Coordinated Universal Time (UTC)", description: "UTC+0 (Universal Time)" },
  { value: "GMT", label: "Greenwich Mean Time (GMT)", description: "UTC+0 (Greenwich Mean Time)" },
];

export function TimezoneDropdown({ value, onChange, className = "", disabled = false }: TimezoneDropdownProps) {
  return (
    <CustomDropdown
      options={timezoneOptions}
      value={value}
      onChange={onChange}
      placeholder="Select timezone"
      searchable={true}
      maxVisible={20}
      className={className}
      disabled={disabled}
    />
  );
}