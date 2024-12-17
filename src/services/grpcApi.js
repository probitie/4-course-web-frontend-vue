import { TaskServiceClient } from "../generated/TaskService_grpc_web_pb";
import {
  GetAllTasksRequest,
  AddTaskRequest,
  UpdateTaskRequest,
  DeleteTaskRequest,
  Task,
} from "../generated/TaskService_pb";

// Create a gRPC client instance
const client = new TaskServiceClient("http://localhost:8088", null, null);

/**
 * Fetch all tasks using the gRPC GetAllTasks method.
 * @returns {Promise<Array>} - List of tasks.
 */
export async function fetchTasks() {
  return new Promise((resolve, reject) => {
    const request = new GetAllTasksRequest();

    client.getAllTasks(request, {}, (err, response) => {
      if (err) {
        console.error("Error fetching tasks:", err);
        return reject(err);
      }
      const tasks = response.getTasksList().map((task) => ({
        id: task.getId(),
        title: task.getTitle(),
        completed: task.getCompleted(),
        deadline: task.getDeadline(),
      }));
      resolve(tasks);
    });
  });
}

/**
 * Add a new task using the gRPC AddTask method.
 * @param {Object} newTask - The task details.
 * @returns {Promise<Object>} - The added task.
 */
export async function addTask(newTask) {
  return new Promise((resolve, reject) => {
    const task = new Task();
    task.setTitle(newTask.title);
    task.setCompleted(newTask.completed);
    task.setDeadline(newTask.deadline);

    const request = new AddTaskRequest();
    request.setTask(task);

    client.addTask(request, {}, (err, response) => {
      if (err) {
        console.error("Error adding task:", err);
        return reject(err);
      }
      const addedTask = response.getTask();
      resolve({
        id: addedTask.getId(),
        title: addedTask.getTitle(),
        completed: addedTask.getCompleted(),
        deadline: addedTask.getDeadline(),
      });
    });
  });
}

/**
 * Update a task using the gRPC UpdateTask method.
 * @param {Number} id - The ID of the task to update.
 * @param {Object} updatedTask - Updated task details.
 * @returns {Promise<Object>} - The updated task.
 */
export async function updateTask(id, updatedTask) {
  return new Promise((resolve, reject) => {
    const task = new Task();
    task.setTitle(updatedTask.title);
    task.setCompleted(updatedTask.completed);
    task.setDeadline(updatedTask.deadline);

    const request = new UpdateTaskRequest();
    request.setId(id);
    request.setTask(task);

    client.updateTask(request, {}, (err, response) => {
      if (err) {
        console.error("Error updating task:", err);
        return reject(err);
      }
      const updated = response.getTask();
      resolve({
        id: updated.getId(),
        title: updated.getTitle(),
        completed: updated.getCompleted(),
        deadline: updated.getDeadline(),
      });
    });
  });
}

/**
 * Delete a task using the gRPC DeleteTask method.
 * @param {Number} id - The ID of the task to delete.
 * @returns {Promise<Boolean>} - True if deletion was successful.
 */
export async function deleteTask(id) {
  return new Promise((resolve, reject) => {
    const request = new DeleteTaskRequest();
    request.setId(id);

    client.deleteTask(request, {}, (err, response) => {
      if (err) {
        console.error("Error deleting task:", err);
        return reject(err);
      }
      resolve(response.getResp());
    });
  });
}

/**
 * Delete all completed tasks.
 * @param {Array} completedTasks - List of tasks to delete.
 */
export async function deleteCompletedTasks(completedTasks) {
  for (const task of completedTasks) {
    await deleteTask(task.id);
  }
}

