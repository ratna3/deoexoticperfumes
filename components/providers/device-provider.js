'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { computeMotionScale } from '@/lib/motion/tokens';

const DeviceContext = createContext({
  breakpoint: 'desktop',
  input: 'pointer',
  isTV: false,
  posture: 'continuous',
  reducedMotion: false,
  lowPower: false,
  motionScale: 1.0,
});

export function DeviceProvider({ children }) {
  const [deviceProfile, setDeviceProfile] = useState({
    breakpoint: 'desktop',
    input: 'pointer',
    isTV: false,
    posture: 'continuous',
    reducedMotion: false,
    lowPower: false,
    motionScale: 1.0,
  });

  const activeFocusElementRef = useRef(null);

  // Measure capabilities
  const updateProfile = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Capability-based TV detection (coarse or no pointer, 16:9 large display, TV user agent or TV media)
    const isTVMedia = window.matchMedia('(hover: none) and (pointer: none)').matches;
    const isLargeScreenNoPointer = width >= 1280 && window.matchMedia('(hover: none)').matches && !('ontouchstart' in window);
    const isTV = isTVMedia || isLargeScreenNoPointer;

    // Breakpoint determination
    let breakpoint = 'desktop';
    if (isTV) {
      breakpoint = 'tv';
    } else if (width < 768) {
      breakpoint = 'phone';
    } else if (width < 1024) {
      breakpoint = 'tablet';
    } else if (width > 1600) {
      breakpoint = 'wide';
    } else {
      breakpoint = 'desktop';
    }

    // Input modality detection
    let input = 'pointer';
    if (window.matchMedia('(pointer: coarse)').matches) {
      input = 'touch';
    }

    // Foldable posture detection via dual-screen media query or aspect ratio
    let posture = 'continuous';
    const isDualScreen = window.matchMedia('(screen-spanning: single-fold-vertical), (screen-spanning: single-fold-horizontal)').matches;
    if (isDualScreen) {
      posture = 'folded';
    }

    // Reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Motion scale
    const motionScale = reducedMotion ? 0 : computeMotionScale(width, isTV);

    setDeviceProfile(prev => ({
      ...prev,
      breakpoint,
      input: prev.input === 'keyboard' ? 'keyboard' : input,
      isTV,
      posture,
      reducedMotion,
      motionScale,
    }));
  }, []);

  // Track live input modality (touch vs pointer vs keyboard)
  useEffect(() => {
    const handleTouch = () => {
      setDeviceProfile(prev => (prev.input !== 'touch' ? { ...prev, input: 'touch' } : prev));
    };

    const handlePointerMove = (e) => {
      if (e.pointerType === 'mouse') {
        setDeviceProfile(prev => (prev.input !== 'pointer' ? { ...prev, input: 'pointer' } : prev));
      }
    };

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'].includes(e.key)) {
        setDeviceProfile(prev => (prev.input !== 'keyboard' ? { ...prev, input: 'keyboard' } : prev));
      }
    };

    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Battery / Low power mode detection
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        const checkBattery = () => {
          const isLow = !battery.charging && battery.level < 0.2;
          setDeviceProfile(prev => ({ ...prev, lowPower: isLow }));
        };
        checkBattery();
        battery.addEventListener('levelchange', checkBattery);
        battery.addEventListener('chargingchange', checkBattery);
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
      setDeviceProfile(prev => ({ ...prev, lowPower: true }));
    }
  }, []);

  // Listen to resize, orientation changes, and foldable events
  useEffect(() => {
    updateProfile();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // If an element was focused or in view, maintain anchoring
        if (document.activeElement && document.activeElement !== document.body) {
          document.activeElement.scrollIntoView?.({ block: 'nearest', behavior: 'instant' });
        }
        updateProfile();
        // Notify Lenis if present
        if (typeof window !== 'undefined' && window.__lenis) {
          window.__lenis.resize();
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      setDeviceProfile(prev => ({
        ...prev,
        reducedMotion: e.matches,
        motionScale: e.matches ? 0 : computeMotionScale(window.innerWidth, prev.isTV),
      }));
    };
    motionMedia.addEventListener('change', handleMotionChange);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      motionMedia.removeEventListener('change', handleMotionChange);
    };
  }, [updateProfile]);

  // Spatial TV navigation (D-pad ArrowUp/Down/Left/Right and Enter)
  useEffect(() => {
    const handleSpatialKey = (e) => {
      if (!deviceProfile.isTV && deviceProfile.input !== 'keyboard') return;
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

      const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusable = Array.from(document.querySelectorAll(focusableSelector)).filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
      });

      if (focusable.length === 0) return;

      const current = document.activeElement;
      const currentIndex = focusable.indexOf(current);

      let nextIndex = 0;
      if (currentIndex === -1) {
        nextIndex = 0;
      } else {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % focusable.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + focusable.length) % focusable.length;
        }
      }

      e.preventDefault();
      const nextTarget = focusable[nextIndex];
      nextTarget.focus();
      nextTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    window.addEventListener('keydown', handleSpatialKey);
    return () => window.removeEventListener('keydown', handleSpatialKey);
  }, [deviceProfile.isTV, deviceProfile.input]);

  return (
    <DeviceContext.Provider value={deviceProfile}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDeviceProfile() {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceProfile must be used within a DeviceProvider');
  }
  return context;
}
