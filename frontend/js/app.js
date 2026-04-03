// Selectors
const taskInput      = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const addBtn         = document.getElementById('add-btn');
const taskList       = document.getElementById('task-list');
const errorMsg       = document.getElementById('error-msg');
const filterBtns     = document.querySelectorAll('.filter-btn');

// Task Data
let tasks         = [];
let currentFilter = 'all';

// ── LOAD tasks from backend when page opens ──
async function loadTasks() {
  try {
    tasks = await getAllTasks();  // calls api.js
    renderTasks();
  } catch (err) {
    // Backend not ready yet — use empty array for now
    console.log('Backend not connected yet:', err.message);
    tasks = [];
    renderTasks();
  }
}

// ── ADD Task ──
addBtn.addEventListener('click', async () => {
  const text = taskInput.value.trim();

  if (!text) {
    errorMsg.classList.add('show');
    taskInput.focus();
    return;
  }

  errorMsg.classList.remove('show');

  try {
    const newTask = await createTask(text, prioritySelect.value); // calls api.js
    tasks.push(newTask);
  } catch (err) {
    // Backend not ready — add locally for now
    tasks.push({
      id:        Date.now(),
      text:      text,
      priority:  prioritySelect.value,
      completed: false
    });
  }

  taskInput.value = '';
  renderTasks();
});

// Enter key to add
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

// Hide error when typing
taskInput.addEventListener('input', () => {
  errorMsg.classList.remove('show');
});

// ── TOGGLE Complete ──
async function toggleTask(id) {
  const task = tasks.find(t => t.id === id);

  try {
    await updateTask(id, !task.completed); // calls api.js
  } catch (err) {
    console.log('Backend not connected yet');
  }

  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  renderTasks();
}

// ── DELETE Task ──
async function deleteTask(id) {
  try {
    await deleteTaskFromDB(id); // calls api.js
  } catch (err) {
    console.log('Backend not connected yet');
  }

  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

// ── FILTER Buttons ──
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// ── RENDER Tasks ──
function renderTasks() {
  let filtered = tasks;

  if (currentFilter === 'pending')   filtered = tasks.filter(t => !t.completed);
  if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);
  if (currentFilter === 'high')      filtered = tasks.filter(t => t.priority === 'high');

  taskList.innerHTML = '';

  if (filtered.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <p>No tasks here yet!</p>
      </div>`;
  } else {
    filtered.forEach(task => {
      const card = document.createElement('div');
      card.className = `task-card ${task.completed ? 'completed' : ''}`;
      card.innerHTML = `
        <div class="task-check" onclick="toggleTask(${task.id})">
          ${task.completed ? '✓' : ''}
        </div>
        <span class="task-text">${task.text}</span>
        <span class="priority-badge ${task.priority}">${task.priority}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">✕</button>
      `;
      taskList.appendChild(card);
    });
  }

  updateStats();
}

// ── UPDATE Stats ──
function updateStats() {
  document.getElementById('total-count').textContent   = tasks.length;
  document.getElementById('done-count').textContent    = tasks.filter(t => t.completed).length;
  document.getElementById('pending-count').textContent = tasks.filter(t => !t.completed).length;
}

// ── Start the app ──
loadTasks();