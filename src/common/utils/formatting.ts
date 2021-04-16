import { ChartInternalDataTypes } from '../data';

// https://stackoverflow.com/questions/673905/best-way-to-determine-users-locale-within-browser
const getNavigatorLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  }

  if (
    (navigator as any).userLanguage ||
    navigator.language ||
    (navigator as any).browserLanguage
  ) {
    return 'en';
  }
};

const locale = getNavigatorLanguage();

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour12: true,
  formatMatcher: 'best fit'
};

/**
 * Format a value based on type.
 */
export function formatValue(value: ChartInternalDataTypes): string {
  if (value !== undefined) {
    if (value instanceof Date) {
      return (value as Date).toLocaleDateString(locale, options as any);
    } else if (typeof value === 'number') {
      return value.toLocaleString();
    }

    return value as string;
  }

  return 'No value';
}
