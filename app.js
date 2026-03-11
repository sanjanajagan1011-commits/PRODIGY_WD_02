let running = false;
let startTime = 0;
let elapsed = 0;
let rafId = null;
let laps = [];
let lastLapTime = 0;

const timeDisplay = document.getElementById('timeDisplay');
const msDisplay = document.getElementById('msDisplay');
const statusDot = document.getElementById('statusDot');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');
const lapCount = document.getElementById('lapCount');
const ring = document.getElementById('ringProgress');
const CIRCUMFERENCE = 2 * Math.PI * 130;

function format(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
}

function formatMs(ms) {
  return '.' + String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
}

function updateRing(ms) {
  const secs = (ms / 1000) % 60;
  const fraction = secs / 60;
  const offset = CIRCUMFERENCE * (1 - fraction);
  ring.style.strokeDashoffset = offset;
}

function tick() {
  elapsed = Date.now() - startTime;
  timeDisplay.textContent = format(elapsed);
  msDisplay.textContent = formatMs(elapsed);
  updateRing(elapsed);
  rafId = requestAnimationFrame(tick);
}

function startStop() {
  if (!running) {
    startTime = Date.now() - elapsed;
    running = true;
    rafId = requestAnimationFrame(tick);
    startBtn.textContent = 'PAUSE';
    startBtn.className = 'btn btn-pause';
    statusDot.className = 'status-dot running';
    lapBtn.disabled = false;
    resetBtn.disabled = false;
  } else {
    running = false;
    cancelAnimationFrame(rafId);
    startBtn.textContent = 'RESUME';
    startBtn.className = 'btn btn-start';
    statusDot.className = 'status-dot';
  }
}

function recordLap() {
  if (!running) return;
  const lapTime = elapsed - lastLapTime;
  laps.unshift({ n: laps.length + 1, total: elapsed, lap: lapTime });
  lastLapTime = elapsed;
  renderLaps();
}

function reset() {
  running = false;
  cancelAnimationFrame(rafId);
  elapsed = 0;
  lastLapTime = 0;
  laps = [];
  timeDisplay.textContent = '00:00:00';
  msDisplay.textContent = '.00';
  ring.style.strokeDashoffset = CIRCUMFERENCE;
  statusDot.className = 'status-dot';
  startBtn.textContent = 'START';
  startBtn.className = 'btn btn-start';
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  lapsList.innerHTML = '';
  lapCount.textContent = '0 LAPS';
}

function renderLaps() {
  lapCount.textContent = laps.length + ' LAP' + (laps.length !== 1 ? 'S' : '');
  if (laps.length < 2) {
    lapsList.innerHTML = '';
    buildLapItem(laps[0], false, false);
    return;
  }
  const times = laps.map(l => l.lap);
  const fastest = Math.min(...times);
  const slowest = Math.max(...times);
  lapsList.innerHTML = '';
  laps.forEach(l => buildLapItem(l, l.lap === fastest, l.lap === slowest && laps.length > 1));
}

function buildLapItem(l, isFast, isSlow) {
  if (!l) return;
  const div = document.createElement('div');
  div.className = 'lap-item' + (isFast ? ' fastest' : isSlow ? ' slowest' : '');
  const t = l.lap;
  const lapStr = format(t) + formatMs(t);
  let badge = '';
  if (isFast && laps.length > 1) badge = '<span class="lap-badge badge-fast">Best</span>';
  else if (isSlow) badge = '<span class="lap-badge badge-slow">Slow</span>';
  div.innerHTML = `
    <span class="lap-num">LAP ${String(l.n).padStart(2, '0')}</span>
    <span class="lap-time">${lapStr}</span>
    <span class="lap-delta">${badge}</span>
  `;
  lapsList.appendChild(div);
}

// Init ring
ring.style.strokeDashoffset = CIRCUMFERENCE;
