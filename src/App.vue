<template>
  <div id="app" class="todo-app">
    <h1>TODO App</h1>
    <div class="todo-input">
      <input
        v-model="newTask"
        placeholder="Add a new task"
        @keyup.enter="addTask"
      />
      <button @click="addTask">Add</button>
    </div>
    <ul class="todo-list">
      <li v-for="task in tasks" :key="task.id">
        <span :class="{ completed: task.completed }" @click="toggleTask(task)">
          {{ task.title }}
        </span>
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoApp",
  data() {
    return {
      tasks: [], // Holds tasks fetched from API
      newTask: "", // For adding a new task
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await fetch("http://localhost:8080/api/v1/tasks"); // Replace with your API endpoint
        this.tasks = await response.json();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async addTask() {
      if (!this.newTask.trim()) return;
      try {
        const response = await fetch("http://localhost:8080/api/v1/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: this.newTask, completed: false }),
        });
        const task = await response.json();
        this.tasks.push(task);
        this.newTask = ""; // Clear input field
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    async toggleTask(task) {
      try {
        const updatedTask = { ...task, completed: !task.completed };
        await fetch(`http://localhost:8080/api/v1/tasks/${task.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });
        task.completed = !task.completed; // Optimistic update
      } catch (error) {
        console.error("Error toggling task:", error);
      }
    },
    async deleteTask(id) {
      try {
        await fetch(`http://localhost:8080/api/v1/tasks/${id}`, { method: "DELETE" });
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
  },
  mounted() {
    this.fetchTasks(); // Fetch tasks on component mount
  },
};
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
  text-align: center;
}
.todo-input {
  margin-bottom: 20px;
}
.todo-input input {
  width: 70%;
  padding: 10px;
  font-size: 16px;
}
.todo-input button {
  padding: 10px 15px;
  font-size: 16px;
}
.todo-list {
  list-style: none;
  padding: 0;
}
.todo-list li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.todo-list li span {
  flex: 1;
  cursor: pointer;
}
.todo-list li span.completed {
  text-decoration: line-through;
  color: gray;
}
.todo-list li button {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

