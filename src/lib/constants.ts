// Program level options for universities
export const PROGRAM_LEVELS = [
  'Diploma',
  "Bachelor's",
  "Master's",
  'PhD',
  'Language',
  'Foundation',
  'Non-Degree'
] as const;

export type ProgramLevel = typeof PROGRAM_LEVELS[number];

// Destination to currency mapping
export const DESTINATION_CURRENCY_MAP = {
  'usa': { currency: 'USD', symbol: '$', name: 'US Dollar' },
  'uk': { currency: 'GBP', symbol: '£', name: 'British Pound' },
  'canada': { currency: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  'australia': { currency: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  'germany': { currency: 'EUR', symbol: '€', name: 'Euro' },
  'netherlands': { currency: 'EUR', symbol: '€', name: 'Euro' },
  'china': { currency: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  'south-korea': { currency: 'KRW', symbol: '₩', name: 'South Korean Won' },
  'hungary': { currency: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  'croatia': { currency: 'EUR', symbol: '€', name: 'Euro' },
  'cyprus': { currency: 'EUR', symbol: '€', name: 'Euro' },
  'georgia': { currency: 'GEL', symbol: '₾', name: 'Georgian Lari' },
  'finland': { currency: 'EUR', symbol: '€', name: 'Euro' }
} as const;

export type DestinationCurrency = typeof DESTINATION_CURRENCY_MAP[keyof typeof DESTINATION_CURRENCY_MAP];

// Helper function to get currency info by destination
export function getCurrencyByDestination(destination: string): DestinationCurrency {
  const normalizedDestination = destination.toLowerCase().replace(/\s+/g, '-');
  return DESTINATION_CURRENCY_MAP[normalizedDestination as keyof typeof DESTINATION_CURRENCY_MAP] || 
         { currency: 'USD', symbol: '$', name: 'US Dollar' };
}
