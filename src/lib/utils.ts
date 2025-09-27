import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency mapping based on country
const countryCurrencyMap: Record<string, string> = {
  'USA': 'USD',
  'United States': 'USD',
  'United States of America': 'USD',
  'Canada': 'CAD',
  'United Kingdom': 'GBP',
  'UK': 'GBP',
  'Australia': 'AUD',
  'Germany': 'EUR',
  'France': 'EUR',
  'Italy': 'EUR',
  'Spain': 'EUR',
  'Netherlands': 'EUR',
  'Belgium': 'EUR',
  'Austria': 'EUR',
  'Portugal': 'EUR',
  'Ireland': 'EUR',
  'Finland': 'EUR',
  'Luxembourg': 'EUR',
  'Japan': 'JPY',
  'South Korea': 'KRW',
  'China': 'CNY',
  'India': 'INR',
  'Singapore': 'SGD',
  'Malaysia': 'MYR',
  'Thailand': 'THB',
  'Philippines': 'PHP',
  'Indonesia': 'IDR',
  'Vietnam': 'VND',
  'Hong Kong': 'HKD',
  'Taiwan': 'TWD',
  'New Zealand': 'NZD',
  'South Africa': 'ZAR',
  'Brazil': 'BRL',
  'Mexico': 'MXN',
  'Argentina': 'ARS',
  'Chile': 'CLP',
  'Colombia': 'COP',
  'Peru': 'PEN',
  'Turkey': 'TRY',
  'Russia': 'RUB',
  'Poland': 'PLN',
  'Czech Republic': 'CZK',
  'Hungary': 'HUF',
  'Romania': 'RON',
  'Bulgaria': 'BGN',
  'Croatia': 'HRK',
  'Serbia': 'RSD',
  'Ukraine': 'UAH',
  'Belarus': 'BYN',
  'Kazakhstan': 'KZT',
  'Uzbekistan': 'UZS',
  'Georgia': 'GEL',
  'Armenia': 'AMD',
  'Azerbaijan': 'AZN',
  'Israel': 'ILS',
  'Saudi Arabia': 'SAR',
  'UAE': 'AED',
  'United Arab Emirates': 'AED',
  'Qatar': 'QAR',
  'Kuwait': 'KWD',
  'Bahrain': 'BHD',
  'Oman': 'OMR',
  'Jordan': 'JOD',
  'Lebanon': 'LBP',
  'Egypt': 'EGP',
  'Morocco': 'MAD',
  'Tunisia': 'TND',
  'Algeria': 'DZD',
  'Nigeria': 'NGN',
  'Kenya': 'KES',
  'Ghana': 'GHS',
  'Ethiopia': 'ETB',
  'Uganda': 'UGX',
  'Tanzania': 'TZS',
  'Rwanda': 'RWF',
  'Senegal': 'XOF',
  'Ivory Coast': 'XOF',
  'Mali': 'XOF',
  'Burkina Faso': 'XOF',
  'Niger': 'XOF',
  'Guinea': 'GNF',
  'Madagascar': 'MGA',
  'Mauritius': 'MUR',
  'Seychelles': 'SCR',
  'Botswana': 'BWP',
  'Namibia': 'NAD',
  'Zimbabwe': 'ZWL',
  'Zambia': 'ZMW',
  'Malawi': 'MWK',
  'Mozambique': 'MZN',
  'Angola': 'AOA',
  'Cameroon': 'XAF',
  'Central African Republic': 'XAF',
  'Chad': 'XAF',
  'Republic of the Congo': 'XAF',
  'Equatorial Guinea': 'XAF',
  'Gabon': 'XAF',
  'São Tomé and Príncipe': 'STN',
  'Guinea-Bissau': 'XOF',
  'Cape Verde': 'CVE',
  'Comoros': 'KMF',
  'Djibouti': 'DJF',
  'Eritrea': 'ERN',
  'Somalia': 'SOS',
  'South Sudan': 'SSP',
  'Sudan': 'SDG',
  'Libya': 'LYD',
  'Cyprus': 'EUR',
  'Malta': 'EUR',
  'Slovenia': 'EUR',
  'Slovakia': 'EUR',
  'Estonia': 'EUR',
  'Latvia': 'EUR',
  'Lithuania': 'EUR',
  'Iceland': 'ISK',
  'Norway': 'NOK',
  'Sweden': 'SEK',
  'Denmark': 'DKK',
  'Switzerland': 'CHF',
  'Liechtenstein': 'CHF',
  'Monaco': 'EUR',
  'San Marino': 'EUR',
  'Vatican City': 'EUR',
  'Andorra': 'EUR',
  'North Macedonia': 'MKD',
  'Albania': 'ALL',
  'Bosnia and Herzegovina': 'BAM',
  'Moldova': 'MDL',
  'Kosovo': 'EUR'
};

export function getCurrencyByCountry(country: string): string {
  if (!country) return 'USD'; // Default currency
  
  const normalizedCountry = country.trim();
  
  // Direct match
  if (countryCurrencyMap[normalizedCountry]) {
    return countryCurrencyMap[normalizedCountry];
  }
  
  // Case-insensitive match
  const lowerCountry = normalizedCountry.toLowerCase();
  for (const [key, value] of Object.entries(countryCurrencyMap)) {
    if (key.toLowerCase() === lowerCountry) {
      return value;
    }
  }
  
  // Partial match (for cases like "United States" matching "USA")
  for (const [key, value] of Object.entries(countryCurrencyMap)) {
    if (key.toLowerCase().includes(lowerCountry) || lowerCountry.includes(key.toLowerCase())) {
      return value;
    }
  }
  
  return 'USD'; // Default fallback
}
