const API_BASE_URL = "/api/v1/tasks";

export async function fetchTasks() {
  const response = await fetch(API_BASE_URL);
const resp = await response.json();
console.log("rest fetch tasks ",  resp);
  return resp;
}

export async function addTask(newTask) {
console.log("XXXX rest add task ", newTask);
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  return await response.json();
}

export async function updateTask(id, updatedTask) {
  await fetch(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
}

export async function deleteTask(id) {
  await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
}

export async function deleteCompletedTasks(completedTasks) {
  for (const task of completedTasks) {
    await fetch(`${API_BASE_URL}/${task.id}`, { method: "DELETE" });
  }
}
