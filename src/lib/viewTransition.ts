'use client'

/**
 * Navigate to a URL with View Transitions API support.
 * Falls back to regular navigation on unsupported browsers.
 * Respects prefers-reduced-motion.
 */
export function navigateWithViewTransition(url: string): void {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Check if View Transitions API is supported
  const supportsViewTransitions =
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    !prefersReducedMotion

  if (supportsViewTransitions) {
    // Use View Transitions API for smooth morphing animation
    document.startViewTransition(() => {
      window.location.href = url
    })
  } else {
    // Direct navigation for unsupported browsers or reduced motion preference
    window.location.href = url
  }
}

