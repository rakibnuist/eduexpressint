// Utility functions for consistent date formatting across server and client

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Use a consistent format that doesn't depend on locale
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  } catch (error) {
    return 'Invalid Date';
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Use a consistent format
    return date.toISOString().replace('T', ' ').split('.')[0]; // YYYY-MM-DD HH:MM:SS format
  } catch (error) {
    return 'Invalid Date';
  }
}

export function formatDateReadable(dateString: string): string {
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    return 'Invalid Date';
  }
}
