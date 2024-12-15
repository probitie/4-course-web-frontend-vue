<template>
  <div id="app" class="todo-app">
    <h1>TODO App</h1>

    <!-- Task Input Section -->
    <div class="todo-input">
      <input
        v-model="newTask"
        placeholder="Add a new task"
        @keyup.enter="addTask"
      />
      <input
        type="datetime-local"
        v-model="newDeadline"
        placeholder="Set deadline"
      />
      <button @click="addTask">Add</button>
    </div>

    <!-- Filter Buttons -->
    <div class="todo-filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
      <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">Completed</button>
    </div>

    <!-- Task List -->
    <ul class="todo-list">
      <li v-for="task in filteredTasks" :key="task.id">
        <div>
          <span :class="{ completed: task.completed }" @click="toggleTask(task)">
            {{ task.title }}
          </span>
          <div v-if="task.deadline" class="deadline">
            <small>Deadline: {{ formatDeadline(task.deadline) }}</small>
          </div>
        </div>
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>

    <!-- Clear Completed Button -->
    <div class="clear-completed">
      <button @click="deleteCompletedTasks" :disabled="!hasCompletedTasks">
        Delete All Completed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoApp",
  data() {
    return {
      tasks: [], // Holds tasks fetched from API
      newTask: "", // For adding a new task
      newDeadline: "", // For setting a deadline
      filter: "all", // Current filter: all, active, completed
      idCounter: 1, // Temporary ID counter
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === "active") {
        return this.tasks.filter((task) => !task.completed);
      } else if (this.filter === "completed") {
        return this.tasks.filter((task) => task.completed);
      }
      return this.tasks; // Default to all tasks
    },
    hasCompletedTasks() {
      return this.tasks.some((task) => task.completed);
    },
  },
  methods: {
    formatDeadline(deadline) {
      const date = new Date(deadline);
      return date.toLocaleString(); // Format as local date and time
    },
    async fetchTasks() {
      try {
        const response = await fetch("/api/v1/tasks"); // Replace with your API endpoint
        this.tasks = await response.json();
        // Set idCounter to max existing ID + 1
        this.idCounter = this.tasks.length
          ? Math.max(...this.tasks.map((task) => task.id)) + 1
          : 1;
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },
    async addTask() {
      if (!this.newTask.trim()) return;
      const newTask = {
        title: this.newTask,
        completed: false,
        deadline: this.newDeadline || null, // Add the deadline, or null if not provided
      };
      try {
        const response = await fetch("/api/v1/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
        const addedTask = await response.json();
        this.tasks.push(addedTask);
        this.newTask = ""; // Clear input field
        this.newDeadline = ""; // Clear deadline input field
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
    async toggleTask(task) {
      try {
        const updatedTask = { ...task, completed: !task.completed };
        await fetch(`/api/v1/tasks/${task.id}`, {
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
        await fetch(`/api/v1/tasks/${id}`, { method: "DELETE" });
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
    async deleteCompletedTasks() {
      const completedTasks = this.tasks.filter((task) => task.completed);
      try {
        for (const task of completedTasks) {
          await fetch(`/api/v1/tasks/${task.id}`, { method: "DELETE" });
        }
        this.tasks = this.tasks.filter((task) => !task.completed);
      } catch (error) {
        console.error("Error deleting completed tasks:", error);
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
.todo-filters {
  margin-bottom: 20px;
}
.todo-filters button {
  margin: 0 5px;
  padding: 10px 15px;
  font-size: 16px;
}
.todo-filters button.active {
  background-color: #007bff;
  color: white;
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
.deadline {
  font-size: 0.8rem;
  color: gray;
  margin-top: 5px;
}
.clear-completed {
  margin-top: 20px;
}
.clear-completed button {
  background: red;
  color: white;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
.clear-completed button:disabled {
  background: gray;
  cursor: not-allowed;
}
</style>

