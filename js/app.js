/* ============================================================
   MY DASHBOARD — app.js
   Vanilla JS | LocalStorage | No frameworks
   ============================================================ */

'use strict';

/* ============================================================
   STORAGE HELPERS
   ============================================================ */
const store = {
  get: (key, fallback = null) => {
    try {
      const v = localStorage.getItem(key);
      return v !== null ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  }
};

/* ============================================================
   THEME
   ============================================================ */
const themeToggle = document.getElementById('theme-toggle');
const html        = document.documentElement;

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeToggle.textContent = dark ? '☀️' : '🌙';
  store.set('theme_dark', dark);
}

(function initTheme() {
  const saved = store.get('theme_dark', false);
  applyTheme(saved);
})();

themeToggle.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') !== 'dark');
});

/* ============================================================
   CLOCK & GREETING
   ============================================================ */
const clockEl    = document.getElementById('clock');
const dateEl     = document.getElementById('date-display');
const greetingEl = document.getElementById('greeting-text');
const greetSubEl = document.querySelector('.greeting-sub');

const GREETINGS = [
  { start:  5, end: 12, text: 'Good morning',   sub: 'Rise and shine! Let\'s crush the day.' },
  { start: 12, end: 17, text: 'Good afternoon', sub: 'Keep the momentum going!' },
  { start: 17, end: 21, text: 'Good evening',   sub: 'Wrapping things up?' },
  { start: 21, end: 24, text: 'Good night',     sub: 'Almost done. You got this.' },
  { start:  0, end:  5, text: 'Burning midnight oil', sub: 'Remember to rest.' }
];

function getGreeting(h) {
  return GREETINGS.find(g => h >= g.start && h < g.end) || GREETINGS[0];
}

function updateClock() {
  const now  = new Date();
  const h    = now.getHours();
  const m    = now.getMinutes().toString().padStart(2, '0');
  const s    = now.getSeconds().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12  = (h % 12 || 12).toString().padStart(2, '0');

  clockEl.textContent = `${h12}:${m}:${s} ${ampm}`;

  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  const g = getGreeting(h);
  const name = store.get('user_name', '');
  greetingEl.textContent = `${g.text}${name ? ', ' + name : ''}!`;
  greetSubEl.textContent = g.sub;
}

updateClock();
setInterval(updateClock, 1000);

/* ============================================================
   CUSTOM NAME
   ============================================================ */
const nameDisplay    = document.getElementById('name-display');
const editNameBtn    = document.getElementById('edit-name-btn');
const nameModal      = document.getElementById('name-modal');
const nameInput      = document.getElementById('name-input');
const saveNameBtn    = document.getElementById('save-name-btn');
const cancelNameBtn  = document.getElementById('cancel-name-btn');

function renderName() {
  const n = store.get('user_name', '');
  nameDisplay.textContent = n ? `👋 ${n}` : 'Set your name';
  nameDisplay.style.color = n ? '' : 'var(--primary)';
  nameDisplay.style.cursor = 'pointer';
}

function openNameModal() {
  nameInput.value = store.get('user_name', '');
  nameModal.classList.remove('hidden');
  nameInput.focus();
}

function closeNameModal() {
  nameModal.classList.add('hidden');
}

renderName();
editNameBtn.addEventListener('click', openNameModal);
nameDisplay.addEventListener('click', openNameModal);

saveNameBtn.addEventListener('click', () => {
  const val = nameInput.value.trim();
  store.set('user_name', val);
  renderName();
  updateClock();
  closeNameModal();
});

cancelNameBtn.addEventListener('click', closeNameModal);

nameModal.addEventListener('click', e => {
  if (e.target === nameModal) closeNameModal();
});

nameInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') saveNameBtn.click();
  if (e.key === 'Escape') closeNameModal();
});

/* ============================================================
   FOCUS TIMER
   ============================================================ */
const timerDisplay = document.getElementById('timer-display');
const timerStart   = document.getElementById('timer-start');
const timerStop    = document.getElementById('timer-stop');
const timerReset   = document.getElementById('timer-reset');
const timerStatus  = document.getElementById('timer-status');

const TIMER_DURATION = 25 * 60; // seconds
let timerSeconds   = TIMER_DURATION;
let timerInterval  = null;
let timerRunning   = false;

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(timerSeconds);
}

function setTimerState(running) {
  timerRunning = running;
  timerStart.disabled = running;
  timerStop.disabled  = !running;
  if (running) {
    timerDisplay.classList.add('running');
    timerDisplay.classList.remove('finished');
    timerStatus.textContent = 'Focusing…';
  } else {
    timerDisplay.classList.remove('running');
  }
}

timerStart.addEventListener('click', () => {
  if (timerSeconds === 0) return;
  setTimerState(true);
  timerInterval = setInterval(() => {
    timerSeconds--;
    renderTimer();
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      timerStart.disabled = true;
      timerStop.disabled  = true;
      timerDisplay.classList.remove('running');
      timerDisplay.classList.add('finished');
      timerStatus.textContent = '🎉 Session complete!';
      // Browser notification
      if (Notification.permission === 'granted') {
        new Notification('Focus session done!', { body: 'Time to take a break.' });
      }
    }
  }, 1000);
});

timerStop.addEventListener('click', () => {
  clearInterval(timerInterval);
  setTimerState(false);
  timerStatus.textContent = 'Paused';
});

timerReset.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerSeconds = TIMER_DURATION;
  renderTimer();
  setTimerState(false);
  timerStart.disabled = false;
  timerDisplay.classList.remove('running', 'finished');
  timerStatus.textContent = 'Ready';
});

// Request notification permission on first interaction
document.addEventListener('click', () => {
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
}, { once: true });

renderTimer();

/* ============================================================
   QUICK LINKS
   ============================================================ */
const linksList     = document.getElementById('links-list');
const addLinkBtn    = document.getElementById('add-link-btn');
const linkForm      = document.getElementById('link-form');
const linkNameInput = document.getElementById('link-name-input');
const linkUrlInput  = document.getElementById('link-url-input');
const saveLinkBtn   = document.getElementById('save-link-btn');
const cancelLinkBtn = document.getElementById('cancel-link-btn');

function getLinks() {
  return store.get('quick_links', []);
}

function saveLinks(links) {
  store.set('quick_links', links);
}

function getFavicon(url) {
  try {
    const origin = new URL(url).origin;
    return `https://www.google.com/s2/favicons?sz=32&domain=${origin}`;
  } catch { return ''; }
}

function renderLinks() {
  const links = getLinks();
  linksList.innerHTML = '';

  if (!links.length) {
    linksList.innerHTML = '<p style="color:var(--text-muted);font-size:.85rem;">No links yet.</p>';
    return;
  }

  links.forEach((link, idx) => {
    const item = document.createElement('div');
    item.className = 'link-item';

    const favicon = getFavicon(link.url);
    item.innerHTML = `
      <a href="${escHtml(link.url)}" target="_blank" rel="noopener noreferrer">
        ${favicon ? `<img class="link-favicon" src="${escHtml(favicon)}" alt="" onerror="this.style.display='none'">` : ''}
        ${escHtml(link.name)}
      </a>
      <button class="btn-icon del-link" data-idx="${idx}" title="Delete">🗑️</button>
    `;
    linksList.appendChild(item);
  });

  linksList.querySelectorAll('.del-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const links = getLinks();
      links.splice(parseInt(btn.dataset.idx), 1);
      saveLinks(links);
      renderLinks();
    });
  });
}

addLinkBtn.addEventListener('click', () => {
  linkForm.classList.toggle('hidden');
  if (!linkForm.classList.contains('hidden')) {
    linkNameInput.focus();
  }
});

cancelLinkBtn.addEventListener('click', () => {
  linkForm.classList.add('hidden');
  linkNameInput.value = '';
  linkUrlInput.value  = '';
});

saveLinkBtn.addEventListener('click', () => {
  const name = linkNameInput.value.trim();
  let   url  = linkUrlInput.value.trim();

  if (!name || !url) return;
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  const links = getLinks();
  links.push({ name, url });
  saveLinks(links);
  renderLinks();
  linkNameInput.value = '';
  linkUrlInput.value  = '';
  linkForm.classList.add('hidden');
});

linkUrlInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') saveLinkBtn.click();
});

renderLinks();

/* ============================================================
   TO-DO LIST
   ============================================================ */
const todoInput   = document.getElementById('todo-input');
const todoAddBtn  = document.getElementById('todo-add-btn');
const todoList    = document.getElementById('todo-list');
const todoEmpty   = document.getElementById('todo-empty');
const sortSelect  = document.getElementById('sort-select');

function getTasks() {
  return store.get('tasks', []);
}

function saveTasks(tasks) {
  store.set('tasks', tasks);
}

function sortTasks(tasks, mode) {
  const copy = [...tasks];
  switch (mode) {
    case 'created':
      return copy.sort((a, b) => b.id - a.id);
    case 'created-asc':
      return copy.sort((a, b) => a.id - b.id);
    case 'alpha':
      return copy.sort((a, b) => a.text.localeCompare(b.text));
    case 'done':
      return copy.sort((a, b) => Number(a.done) - Number(b.done));
    default:
      return copy;
  }
}

function renderTasks() {
  const tasks   = getTasks();
  const mode    = sortSelect.value;
  const sorted  = sortTasks(tasks, mode);

  todoList.innerHTML = '';
  todoEmpty.classList.toggle('hidden', sorted.length > 0);

  sorted.forEach(task => {
    const li = document.createElement('li');
    li.className = `todo-item${task.done ? ' done' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${task.done ? 'checked' : ''} title="Mark done">
      <span class="todo-text">${escHtml(task.text)}</span>
      <div class="todo-actions">
        <button class="btn-icon edit-task" title="Edit">✏️</button>
        <button class="btn-icon del-task" title="Delete">🗑️</button>
      </div>
    `;

    // Toggle done
    li.querySelector('.todo-checkbox').addEventListener('change', e => {
      const tasks = getTasks();
      const t = tasks.find(t => t.id === task.id);
      if (t) { t.done = e.target.checked; saveTasks(tasks); renderTasks(); }
    });

    // Delete
    li.querySelector('.del-task').addEventListener('click', () => {
      const tasks = getTasks().filter(t => t.id !== task.id);
      saveTasks(tasks);
      renderTasks();
    });

    // Edit
    li.querySelector('.edit-task').addEventListener('click', () => {
      startEdit(li, task);
    });

    todoList.appendChild(li);
  });
}

function startEdit(li, task) {
  const textSpan   = li.querySelector('.todo-text');
  const actionsDiv = li.querySelector('.todo-actions');

  const input = document.createElement('input');
  input.type  = 'text';
  input.className = 'todo-edit-input';
  input.value = task.text;
  input.maxLength = 120;

  const saveBtn   = document.createElement('button');
  saveBtn.textContent = '✔';
  saveBtn.className   = 'btn-icon';
  saveBtn.title       = 'Save';
  saveBtn.style.color = 'var(--success)';

  const cancelBtn   = document.createElement('button');
  cancelBtn.textContent = '✖';
  cancelBtn.className   = 'btn-icon';
  cancelBtn.title       = 'Cancel';
  cancelBtn.style.color = 'var(--danger)';

  textSpan.replaceWith(input);
  actionsDiv.innerHTML = '';
  actionsDiv.appendChild(saveBtn);
  actionsDiv.appendChild(cancelBtn);
  input.focus();
  input.select();

  function commitEdit() {
    const val = input.value.trim();
    if (val) {
      const tasks = getTasks();
      const t = tasks.find(t => t.id === task.id);
      if (t) { t.text = val; saveTasks(tasks); }
    }
    renderTasks();
  }

  saveBtn.addEventListener('click', commitEdit);
  cancelBtn.addEventListener('click', renderTasks);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  commitEdit();
    if (e.key === 'Escape') renderTasks();
  });
}

function addTask() {
  const text = todoInput.value.trim();
  if (!text) return;
  const tasks = getTasks();
  tasks.push({ id: Date.now(), text, done: false });
  saveTasks(tasks);
  todoInput.value = '';
  renderTasks();
}

todoAddBtn.addEventListener('click', addTask);
todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

sortSelect.addEventListener('change', renderTasks);

renderTasks();

/* ============================================================
   HELPERS
   ============================================================ */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
