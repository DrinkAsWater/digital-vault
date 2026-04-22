// MagneticButton.jsx
// DigitalVault hero CTA — cyan primary / outline secondary with
// cursor-magnetic tilt + concentric pulse rings + press/success states.
//
// Props
//   label         string             required — button text
//   primary       boolean            default false — cyan filled vs outline
//   onActivate    (e) => void        your click handler (open modal, route, etc)
//   sound         boolean            default true — hover/click SFX via window.SFX
//   magnetic      boolean            default true — cursor tilt; auto-disabled for prefers-reduced-motion
//   disabled      boolean            default false
//   as            'button' | 'a'     default 'button'
//   href          string             when as='a'
//   className     string             extra classes if you need host-side styling
//
// Zero external deps. Assumes CSS variables from tokens below — or override
// via inline style / className.

import React, { useRef, useState, useEffect } from 'react';

const CYAN = '#22e4e7';
const CYAN_HOVER = '#3fffff';
const BG = '#050a10';

// prefers-reduced-motion respect — disables magnet + pulse.
function useReducedMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setRm(mq.matches);
    on(); mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return rm;
}

export default function MagneticButton({
  label,
  primary = false,
  onActivate,
  sound = true,
  magnetic = true,
  disabled = false,
  as = 'button',
  href,
  className = '',
  style = {},
}) {
  const [state, setState] = useState('idle'); // idle | press | success
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const rm = useReducedMotion();
  const canMagnet = magnetic && !rm && !disabled;

  const fx = sound ? window.SFX : null;

  const handleEnter = () => {
    if (disabled) return;
    setHover(true);
    fx?.hover?.();
  };
  const handleLeave = () => {
    setHover(false);
    setPos({ x: 0, y: 0 });
  };
  const handleMove = (e) => {
    if (!canMagnet || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / r.width;
    const dy = (e.clientY - r.top - r.height / 2) / r.height;
    setPos({ x: dx * 6, y: dy * 5 });
  };

  const handleClick = (e) => {
    if (disabled) { e.preventDefault(); return; }
    fx?.click?.();
    setState('press');
    setTimeout(() => {
      setState('success');
      fx?.success?.();
      setTimeout(() => setState('idle'), 600);
    }, 120);
    onActivate?.(e);
  };

  const Tag = as === 'a' ? 'a' : 'button';
  const pressScale = state === 'press' ? 0.94 : hover ? 1.03 : 1;

  const btnStyle = {
    position: 'relative',
    padding: '13px 34px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: primary ? (hover ? CYAN_HOVER : CYAN) : 'transparent',
    border: primary ? 'none' : `1.5px solid ${hover ? CYAN : 'rgba(34,228,231,0.55)'}`,
    borderRadius: 6,
    color: primary ? BG : CYAN,
    fontFamily: '"Noto Sans TC", sans-serif',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1.5,
    opacity: disabled ? 0.5 : 1,
    transform: `translate(${pos.x}px, ${pos.y}px) scale(${pressScale})`,
    transition: state === 'press'
      ? 'transform .1s'
      : 'transform .18s cubic-bezier(.2,.9,.3,1.4), background .15s, border-color .15s, box-shadow .2s',
    boxShadow: hover && !disabled
      ? (primary
        ? '0 0 0 3px rgba(34,228,231,0.2), 0 0 32px rgba(34,228,231,0.55)'
        : '0 0 0 2px rgba(34,228,231,0.12), 0 0 20px rgba(34,228,231,0.35)')
      : (primary ? '0 2px 8px rgba(34,228,231,0.25)' : 'none'),
    textDecoration: 'none',
    display: 'inline-block',
    ...style,
  };

  return (
    <span className={`mp-wrap ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
      {hover && !disabled && !rm && [0, 1, 2].map(i => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '100%', height: '100%',
            transform: 'translate(-50%,-50%)',
            borderRadius: 6,
            border: `1px solid ${CYAN}`,
            animation: 'mp-pulse 1.8s ease-out infinite',
            animationDelay: `${i * 0.55}s`,
            pointerEvents: 'none',
            opacity: 0,
          }}
        />
      ))}
      <Tag
        ref={ref}
        href={as === 'a' ? href : undefined}
        disabled={as === 'button' ? disabled : undefined}
        aria-disabled={disabled || undefined}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
        onClick={handleClick}
        style={btnStyle}
      >
        {state === 'success' ? '✓' : label}
      </Tag>
      <style>{`
        @keyframes mp-pulse {
          0% { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
          100% { transform: translate(-50%,-50%) scale(1.45); opacity: 0; }
        }
      `}</style>
    </span>
  );
}
