// audio.js — optional Web Audio SFX for MagneticButton / NavLoginPill.
// Import once at app root:  import './audio.js';   (attaches window.SFX)
// Skip importing if you don't want sound — components degrade gracefully.

let _ctx = null;
function ctx() {
  if (!_ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    _ctx = new AC();
  }
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function blip({ freq = 880, dur = 0.08, type = 'sine', vol = 0.08, sweep = 0, filter = null }) {
  const c = ctx(); if (!c) return;
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (sweep) osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq + sweep), now + dur);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(vol, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  let node = osc;
  if (filter) {
    const f = c.createBiquadFilter();
    f.type = filter.type || 'lowpass';
    f.frequency.value = filter.freq || 1200;
    f.Q.value = filter.q || 1;
    node.connect(f); node = f;
  }
  node.connect(gain);
  gain.connect(c.destination);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}

window.SFX = {
  hover: () => blip({ freq: 1400, dur: 0.05, type: 'sine', vol: 0.04, sweep: 200, filter: { type: 'lowpass', freq: 4000 } }),
  click: () => {
    blip({ freq: 660, dur: 0.08, type: 'triangle', vol: 0.1, sweep: -300 });
    setTimeout(() => blip({ freq: 330, dur: 0.12, type: 'sine', vol: 0.06, sweep: -100 }), 20);
  },
  success: () => {
    blip({ freq: 880, dur: 0.09, type: 'sine', vol: 0.06 });
    setTimeout(() => blip({ freq: 1320, dur: 0.14, type: 'sine', vol: 0.06 }), 60);
  },
};
