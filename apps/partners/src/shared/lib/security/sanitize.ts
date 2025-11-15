/**
 * XSS Sanitization Utilities
 * Prevents malicious script injection in user-generated content
 */

import DOMPurify from 'dompurify'

/**
 * Sanitize chat messages - allows markdown formatting
 * Use for: Chat messages, comments, rich text content
 */
export const sanitizeMessage = (text: string): string => {
  if (!text) return ''

  // Configure DOMPurify for safe markdown
  const clean = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'code', 'pre', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'title', 'target'],
    ALLOWED_URI_REGEXP: /^(?:https?|mailto):/,
    ALLOW_DATA_ATTR: false,
  })

  return clean
}

/**
 * Sanitize plain text input - strips ALL HTML
 * Use for: Names, emails, phone numbers, plain text fields
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return ''

  const clean = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML allowed
    KEEP_CONTENT: true, // Keep text content
  })

  return clean.trim()
}

/**
 * Sanitize HTML content - allows safe HTML subset
 * Use for: Email templates, formatted descriptions
 */
export const sanitizeHTML = (html: string): string => {
  if (!html) return ''

  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'div', 'span', 'strong', 'em', 'u', 'h1', 'h2', 'h3',
      'ul', 'ol', 'li', 'a', 'img', 'code', 'pre', 'blockquote',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target'],
    ALLOWED_URI_REGEXP: /^(?:https?|mailto):/,
  })

  return clean
}

/**
 * Sanitize URL - prevents javascript: and data: URLs
 * Use for: Link validation, redirect URLs
 */
export const sanitizeURL = (url: string): string => {
  if (!url) return ''

  // Block javascript: and data: URLs
  if (/^(javascript|data):/i.test(url)) {
    return ''
  }

  // Allow only http(s) and mailto
  if (!/^(https?|mailto):/i.test(url)) {
    return ''
  }

  return url
}

/**
 * Escape for use in SQL LIKE queries
 * Prevents SQL injection in search queries
 */
export const escapeLike = (value: string): string => {
  return value.replace(/[%_\\]/g, '\\$&')
}
