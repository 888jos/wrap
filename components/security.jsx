/* Security utilities for input sanitization */

const Security = {
  /**
   * Validates if a URL is safe for use as image src
   * Prevents javascript: and data: URLs (except data:image/)
   */
  isValidImageUrl(url) {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim().toLowerCase();

    // Allow data URLs only for images
    if (trimmed.startsWith('data:')) {
      return trimmed.startsWith('data:image/');
    }

    // Allow HTTP(S) URLs
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return true;
    }

    // Allow relative URLs
    if (trimmed.startsWith('/') || trimmed.startsWith('./')) {
      return true;
    }

    // Reject javascript:, vbscript:, and other dangerous protocols
    if (trimmed.includes(':')) {
      return false;
    }

    return true;
  },

  /**
   * Sanitizes user text input to prevent XSS
   * Escapes HTML special characters
   */
  sanitizeText(text) {
    if (!text || typeof text !== 'string') return '';

    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  /**
   * Validates localStorage data structure
   * Returns validated data or default if corrupted
   */
  validateWorkspaceData(data, defaultValue) {
    try {
      if (!data || typeof data !== 'object') return defaultValue;

      // Check required workspace structure
      const required = ['account', 'apps', 'projects', 'generations', 'exports'];
      for (const key of required) {
        if (!(key in data)) return defaultValue;
      }

      // Validate arrays
      if (!Array.isArray(data.apps)) data.apps = [];
      if (!Array.isArray(data.projects)) data.projects = [];
      if (!Array.isArray(data.generations)) data.generations = [];
      if (!Array.isArray(data.exports)) data.exports = [];

      return data;
    } catch (error) {
      console.error('Workspace validation error:', error);
      return defaultValue;
    }
  },

  /**
   * Safely parses JSON with fallback
   */
  safeJsonParse(json, defaultValue = null) {
    try {
      if (!json) return defaultValue;
      return JSON.parse(json);
    } catch (error) {
      console.warn('JSON parse error:', error);
      return defaultValue;
    }
  },

  /**
   * Validates and sanitizes decoration media source
   */
  sanitizeMediaSrc(src) {
    if (!src) return '';
    if (!this.isValidImageUrl(src)) {
      console.warn('Invalid image URL rejected:', src);
      return '';
    }
    return src;
  },

  /**
   * Validates postMessage origin
   */
  isValidMessageOrigin(eventOrigin, allowedOrigin = window.location.origin) {
    return eventOrigin === allowedOrigin;
  },

  /**
   * Sanitizes filename for download
   */
  sanitizeFilename(filename) {
    if (!filename || typeof filename !== 'string') return 'download';

    return filename
      .replace(/[^a-z0-9._-]/gi, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 255);
  },

  /**
   * Validates CSS color value
   */
  isValidColor(color) {
    if (!color || typeof color !== 'string') return false;

    // Allow hex colors
    if (/^#[0-9A-Fa-f]{3,8}$/.test(color)) return true;

    // Allow rgb/rgba
    if (/^rgba?\([\d\s,./]+\)$/.test(color)) return true;

    // Allow oklch and other CSS color functions
    if (/^(oklch|hsl|hsla|lab|lch)\([^)]+\)$/.test(color)) return true;

    // Allow CSS color keywords
    const keywords = ['transparent', 'currentColor', 'inherit', 'initial', 'unset'];
    if (keywords.includes(color.toLowerCase())) return true;

    return false;
  },

  /**
   * Sanitizes color value
   */
  sanitizeColor(color, fallback = '#000000') {
    if (!this.isValidColor(color)) {
      console.warn('Invalid color rejected:', color);
      return fallback;
    }
    return color;
  }
};

// Export to global namespace
Object.assign(window, { Security });
