import { ChartInternalDataTypes } from '@/common/data';

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

/**
 * Generate aria label text for the given data point(s)
 * @param datapoint
 * @returns Aria Label
 */
export function getAriaLabel(datapoint) {
  const isArray = Array.isArray(datapoint);
  if (isArray) {
    return datapoint?.map((row) => getAriaLabel(row)).join(', ');
  } else {
    const key = datapoint?.key || datapoint?.x;
    // 'data' or 'y' will not be an array as the label is unique for each element
    const value = datapoint?.data || datapoint?.y;
    return `${key}: ${formatValue(value)}`;
  }
}
