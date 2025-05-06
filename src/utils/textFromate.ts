export const capitalizeFirstLetterOnly = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeEachWord = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .filter(word => word.trim() !== '') // Remove extra spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const removeDotsAndZero = (text: string) => {
    // Remove all non-digit and non-dot characters
    const cleaned = text.replace(/[^0-9.]/g, '');
  
    // Keep only the first dot
    const dotIndex = cleaned.indexOf('.');
    const withSingleDot =
      dotIndex !== -1
        ? cleaned.slice(0, dotIndex + 1) +
          cleaned.slice(dotIndex + 1).replace(/\./g, '')
        : cleaned;
  
    // Remove leading zeros only if there's no dot (i.e., integer input)
    const finalText = withSingleDot.replace(/^0+(?=\d)/, '');
  
    return finalText;
  };
  
  
