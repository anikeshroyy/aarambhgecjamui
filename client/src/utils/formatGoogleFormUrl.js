/**
 * Converts a standard Google Form URL to an embeddable URL.
 * Input:  https://docs.google.com/forms/d/FORM_ID/viewform
 * Output: https://docs.google.com/forms/d/FORM_ID/viewform?embedded=true
 */
export function formatGoogleFormUrl(url) {
  if (!url) return '';
  if (url.includes('embedded=true')) return url;
  
  if (url.includes('?')) {
    return url + '&embedded=true';
  }
  return url + '?embedded=true';
}
