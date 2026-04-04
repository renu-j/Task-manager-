const BASE_URL = 'http://localhost:3000';

async function getAllTasks() {
  const res  = await fetch(`${BASE_URL}/tasks`);
  const data = await res.json();
  return data;
}

async function createTask(text, priority) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ text, priority })
  });
  const data = await res.json();
  return data;
}

async function updateTask(id, completed) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ completed })
  });
  const data = await res.json();
  return data;
}

async function deleteTaskFromDB(id) {
  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  });
}