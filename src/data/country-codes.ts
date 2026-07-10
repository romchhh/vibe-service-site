export type CountryCode = {
  iso: string
  name: string
  dial: string
  flag: string
}

/** Common dial codes for international UK-bound leads. UK first as default. */
export const COUNTRY_CODES: CountryCode[] = [
  { iso: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { iso: 'UA', name: 'Ukraine', dial: '+380', flag: '🇺🇦' },
  { iso: 'PL', name: 'Poland', dial: '+48', flag: '🇵🇱' },
  { iso: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
  { iso: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
  { iso: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { iso: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
  { iso: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪' },
  { iso: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
  { iso: 'BE', name: 'Belgium', dial: '+32', flag: '🇧🇪' },
  { iso: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
  { iso: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
  { iso: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
  { iso: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭' },
  { iso: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹' },
  { iso: 'CZ', name: 'Czech Republic', dial: '+420', flag: '🇨🇿' },
  { iso: 'SK', name: 'Slovakia', dial: '+421', flag: '🇸🇰' },
  { iso: 'RO', name: 'Romania', dial: '+40', flag: '🇷🇴' },
  { iso: 'HU', name: 'Hungary', dial: '+36', flag: '🇭🇺' },
  { iso: 'BG', name: 'Bulgaria', dial: '+359', flag: '🇧🇬' },
  { iso: 'LT', name: 'Lithuania', dial: '+370', flag: '🇱🇹' },
  { iso: 'LV', name: 'Latvia', dial: '+371', flag: '🇱🇻' },
  { iso: 'EE', name: 'Estonia', dial: '+372', flag: '🇪🇪' },
  { iso: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
  { iso: 'NO', name: 'Norway', dial: '+47', flag: '🇳🇴' },
  { iso: 'DK', name: 'Denmark', dial: '+45', flag: '🇩🇰' },
  { iso: 'FI', name: 'Finland', dial: '+358', flag: '🇫🇮' },
  { iso: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷' },
  { iso: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
  { iso: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱' },
  { iso: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { iso: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
  { iso: 'HK', name: 'Hong Kong', dial: '+852', flag: '🇭🇰' },
  { iso: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
  { iso: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
  { iso: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷' },
  { iso: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
  { iso: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
  { iso: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
  { iso: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
  { iso: 'KZ', name: 'Kazakhstan', dial: '+7', flag: '🇰🇿' },
  { iso: 'GE', name: 'Georgia', dial: '+995', flag: '🇬🇪' },
  { iso: 'AM', name: 'Armenia', dial: '+374', flag: '🇦🇲' },
  { iso: 'AZ', name: 'Azerbaijan', dial: '+994', flag: '🇦🇿' },
  { iso: 'MD', name: 'Moldova', dial: '+373', flag: '🇲🇩' },
  { iso: 'CY', name: 'Cyprus', dial: '+357', flag: '🇨🇾' },
  { iso: 'MT', name: 'Malta', dial: '+356', flag: '🇲🇹' },
  { iso: 'LU', name: 'Luxembourg', dial: '+352', flag: '🇱🇺' },
  { iso: 'GR', name: 'Greece', dial: '+30', flag: '🇬🇷' },
  { iso: 'HR', name: 'Croatia', dial: '+385', flag: '🇭🇷' },
  { iso: 'SI', name: 'Slovenia', dial: '+386', flag: '🇸🇮' },
  { iso: 'RS', name: 'Serbia', dial: '+381', flag: '🇷🇸' },
  { iso: 'BA', name: 'Bosnia and Herzegovina', dial: '+387', flag: '🇧🇦' },
  { iso: 'MK', name: 'North Macedonia', dial: '+389', flag: '🇲🇰' },
  { iso: 'AL', name: 'Albania', dial: '+355', flag: '🇦🇱' },
  { iso: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' },
  { iso: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
  { iso: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
  { iso: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪' },
  { iso: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭' },
  { iso: 'TH', name: 'Thailand', dial: '+66', flag: '🇹🇭' },
  { iso: 'VN', name: 'Vietnam', dial: '+84', flag: '🇻🇳' },
  { iso: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
  { iso: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
  { iso: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
  { iso: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
  { iso: 'BY', name: 'Belarus', dial: '+375', flag: '🇧🇾' },
]

export const DEFAULT_COUNTRY_ISO = 'GB'

export function getCountryByIso(iso: string): CountryCode {
  return COUNTRY_CODES.find((c) => c.iso === iso) ?? COUNTRY_CODES[0]
}

export function buildFullPhone(dial: string, nationalNumber: string): string {
  const digits = nationalNumber.replace(/[^\d]/g, '')
  if (!digits) return ''
  return `${dial}${digits}`
}
