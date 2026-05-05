import { useState, useCallback, useRef } from 'react';

interface RateLimitConfig {
  maxAttempts?: number;      // Maximum number of attempts
  windowMs?: number;         // Time window in milliseconds
  cooldownMs?: number;       // Cooldown period after max attempts
  storageKey?: string;       // Key for localStorage persistence
}

interface RateLimitState {
  attempts: number;
  isBlocked: boolean;
  remainingAttempts: number;
  resetTime: number | null;
  canSubmit: boolean;
}

/**
 * Custom hook for rate limiting form submissions
 * Prevents spam and abuse by limiting submission frequency
 *
 * @param config - Rate limit configuration
 * @returns Rate limit state and submit function
 *
 * @example
 * const { canSubmit, remainingAttempts, rateLimitedSubmit } = useRateLimit({
 *   maxAttempts: 3,
 *   windowMs: 60000,        // 1 minute
 *   cooldownMs: 300000,     // 5 minutes cooldown
 *   storageKey: 'contact-form-rate-limit'
 * });
 */
export const useRateLimit = (config: RateLimitConfig = {}) => {
  const {
    maxAttempts = 3,
    windowMs = 60000,        // 1 minute default
    cooldownMs = 300000,     // 5 minutes cooldown default
    storageKey = 'rate-limit'
  } = config;

  const [state, setState] = useState<RateLimitState>(() => {
    // Load from localStorage on mount
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        const now = Date.now();

        // Check if cooldown has expired
        if (data.blockedUntil && data.blockedUntil > now) {
          return {
            attempts: data.attempts,
            isBlocked: true,
            remainingAttempts: 0,
            resetTime: data.blockedUntil,
            canSubmit: false
          };
        }

        // Reset if window has passed
        if (data.lastAttempt && now - data.lastAttempt > windowMs) {
          localStorage.removeItem(storageKey);
          return {
            attempts: 0,
            isBlocked: false,
            remainingAttempts: maxAttempts,
            resetTime: null,
            canSubmit: true
          };
        }

        return {
          attempts: data.attempts,
          isBlocked: false,
          remainingAttempts: Math.max(0, maxAttempts - data.attempts),
          resetTime: data.lastAttempt ? data.lastAttempt + windowMs : null,
          canSubmit: data.attempts < maxAttempts
        };
      }
    }

    return {
      attempts: 0,
      isBlocked: false,
      remainingAttempts: maxAttempts,
      resetTime: null,
      canSubmit: true
    };
  });

  const timeoutRef = useRef<NodeJS.Timeout>();

  const recordAttempt = useCallback(() => {
    const now = Date.now();
    const newAttempts = state.attempts + 1;

    let newState: RateLimitState;

    if (newAttempts >= maxAttempts) {
      // Block submissions
      const blockedUntil = now + cooldownMs;
      newState = {
        attempts: newAttempts,
        isBlocked: true,
        remainingAttempts: 0,
        resetTime: blockedUntil,
        canSubmit: false
      };

      // Auto-unblock after cooldown
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setState({
          attempts: 0,
          isBlocked: false,
          remainingAttempts: maxAttempts,
          resetTime: null,
          canSubmit: true
        });
        if (typeof window !== 'undefined') {
          localStorage.removeItem(storageKey);
        }
      }, cooldownMs);
    } else {
      newState = {
        attempts: newAttempts,
        isBlocked: false,
        remainingAttempts: maxAttempts - newAttempts,
        resetTime: now + windowMs,
        canSubmit: true
      };
    }

    setState(newState);

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify({
        attempts: newAttempts,
        lastAttempt: now,
        blockedUntil: newState.isBlocked ? newState.resetTime : undefined
      }));
    }

    return newState.canSubmit;
  }, [state.attempts, maxAttempts, windowMs, cooldownMs, storageKey]);

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setState({
      attempts: 0,
      isBlocked: false,
      remainingAttempts: maxAttempts,
      resetTime: null,
      canSubmit: true
    });
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }, [maxAttempts, storageKey]);

  return {
    ...state,
    recordAttempt,
    reset
  };
};
