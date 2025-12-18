export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  timezone: string;
  rtl: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', region: 'US', timezone: 'America/New_York', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', region: 'ES', timezone: 'Europe/Madrid', rtl: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', region: 'BR', timezone: 'America/Sao_Paulo', rtl: false },
  { code: 'fr', name: 'French', nativeName: 'Français', region: 'FR', timezone: 'Europe/Paris', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', region: 'DE', timezone: 'Europe/Berlin', rtl: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', region: 'IT', timezone: 'Europe/Rome', rtl: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', region: 'RU', timezone: 'Europe/Moscow', rtl: false },
  { code: 'uz', name: 'Uzbek', nativeName: "O'zbekcha", region: 'UZ', timezone: 'Asia/Tashkent', rtl: false },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', region: 'TR', timezone: 'Europe/Istanbul', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', region: 'SA', timezone: 'Asia/Riyadh', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'IN', timezone: 'Asia/Kolkata', rtl: false },
  { code: 'zh', name: 'Chinese', nativeName: '中文', region: 'CN', timezone: 'Asia/Shanghai', rtl: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', region: 'JP', timezone: 'Asia/Tokyo', rtl: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', region: 'KR', timezone: 'Asia/Seoul', rtl: false },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', region: 'ID', timezone: 'Asia/Jakarta', rtl: false },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', region: 'VN', timezone: 'Asia/Ho_Chi_Minh', rtl: false },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', region: 'TH', timezone: 'Asia/Bangkok', rtl: false },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', region: 'PL', timezone: 'Europe/Warsaw', rtl: false },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', region: 'NL', timezone: 'Europe/Amsterdam', rtl: false },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', region: 'UA', timezone: 'Europe/Kiev', rtl: false }
];

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

export function getLanguageByCode(code: string): LanguageConfig | undefined {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
}

export function isValidLanguage(code: string): boolean {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === code);
}

export function getLanguageTimezone(code: string): string {
  const lang = getLanguageByCode(code);
  return lang?.timezone || 'UTC';
}

export function getLanguageRegion(code: string): string {
  const lang = getLanguageByCode(code);
  return lang?.region || 'US';
}
