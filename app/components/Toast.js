'use client';

import { useCart } from '../context/CartContext';
import { useEffect, useRef } from 'react';

export function Toast() {
  const { toastMessage } = useCart();
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (toastMessage) {
      ref.current.classList.add('show');
    } else {
      ref.current.classList.remove('show');
    }
  }, [toastMessage]);

  return (
    <div className="toast" ref={ref} role="status" aria-live="polite">
      {toastMessage}
    </div>
  );
}
