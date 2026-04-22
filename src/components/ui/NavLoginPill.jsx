// NavLoginPill.jsx
// DigitalVault navbar "登入 / 註冊" cyan pill. Companion to MagneticButton
// for the logged-out state.
//
// Props
//   label         string              default '登入 / 註冊'
//   onActivate    (e) => void         your click handler
//   sound         boolean             default true
//   disabled      boolean             default false
//   as            'button' | 'a'      default 'button'
//   href          string              when as='a'

import React, { useRef, useState } from 'react';

const CYAN = '#22e4e7';
const CYAN_HOVER = '#3fffff';
const BG = '#050a10';

export default function NavLoginPill({
  label = '登入 / 註冊',
  onActivate,
  sound = true,
  disabled = false,
  as = 'button',
  href,
  style = {},
  className = '',
}) {
  const [state, setState] = useState('idle');
  const [hover, setHover] = useState(false);
  const fx = sound ? window.SFX : null;

  const handleClick = (e) => {
    if (disabled) { e.preventDefault(); return; }
    fx?.click?.();
    setState('press');
    setTimeout(() => {
      setState('success');
      setTimeout(() => setState('idle'), 500);
    }, 100);
    onActivate?.(e);
  };

  const Tag = as === 'a' ? 'a' : 'button';

  const pillStyle = {
    padding: '6px 14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    background: hover ? CYAN_HOVER : CYAN,
    border: 'none',
    borderRadius: 4,
    color: BG,
    fontFamily: '"Noto Sans TC", sans-serif',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    opacity: disabled ? 0.5 : 1,
    transform: state === 'press' ? 'scale(0.94)' : hover ? 'translateY(-1px)' : 'none',
    boxShadow: hover
      ? '0 0 16px rgba(34,228,231,0.6)'
      : '0 1px 4px rgba(34,228,231,0.3)',
    transition: 'transform .12s, box-shadow .2s, background .15s',
    textDecoration: 'none',
    display: 'inline-block',
    ...style,
  };

  return (
    <Tag
      href={as === 'a' ? href : undefined}
      disabled={as === 'button' ? disabled : undefined}
      aria-disabled={disabled || undefined}
      onMouseEnter={() => { if (!disabled) { setHover(true); fx?.hover?.(); } }}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      className={className}
      style={pillStyle}
    >
      {state === 'success' ? '✓' : label}
    </Tag>
  );
}
