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
      <VueDatePicker
        v-model="newDeadline"
        placeholder="Set deadline"
        :enable-time="true"
        format="yyyy-MM-dd HH:mm"
      />
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
        <div class="task-details" @click="toggleTask(task)">
          <span :class="{ completed: task.completed }">{{ task.title }}</span>
          <div v-if="task.deadline" class="deadline">
            <small>Deadline: {{ formatDeadline(task.deadline) }}</small>
          </div>
        </div>
        <button @click="deleteTask(task.id)" class="delete-btn">Delete</button>
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "TodoApp",
  components: {
    VueDatePicker,
  },
  data() {
    return {
      tasks: [],
      newTask: "",
      newDeadline: null, // Updated to align with VueDatePicker format
      filter: "all",
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === "active") return this.tasks.filter((t) => !t.completed);
      if (this.filter === "completed") return this.tasks.filter((t) => t.completed);
      return this.tasks;
    },
    hasCompletedTasks() {
      return this.tasks.some((t) => t.completed);
    },
  },
  methods: {
    formatDeadline(deadline) {
      return new Date(deadline).toLocaleString();
    },
    async fetchTasks() {
      try {
        const response = await fetch("/api/v1/tasks");
        this.tasks = await response.json();
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    },
    async addTask() {
      if (!this.newTask.trim()) return;
      const newTask = {
        title: this.newTask,
        completed: false,
        deadline: this.newDeadline || null,
      };
      try {
        const response = await fetch("/api/v1/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
        const addedTask = await response.json();
        this.tasks.push(addedTask);
        this.newTask = "";
        this.newDeadline = null;
      } catch (err) {
        console.error("Error adding task:", err);
      }
    },
    async toggleTask(task) {
      try {
        const updatedTask = { completed: !task.completed };
        await fetch(`/api/v1/tasks/${task.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });
        task.completed = !task.completed;
      } catch (err) {
        console.error("Error toggling task:", err);
      }
    },
    async deleteTask(id) {
      try {
        await fetch(`/api/v1/tasks/${id}`, { method: "DELETE" });
        this.tasks = this.tasks.filter((t) => t.id !== id);
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    },
    async deleteCompletedTasks() {
      const completedTasks = this.tasks.filter((t) => t.completed);
      try {
        for (const task of completedTasks) {
          await fetch(`/api/v1/tasks/${task.id}`, { method: "DELETE" });
        }
        this.tasks = this.tasks.filter((t) => !t.completed);
      } catch (err) {
        console.error("Error deleting completed tasks:", err);
      }
    },
  },
  mounted() {
    this.fetchTasks();
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

.todo-input input {
  margin: 10px 5px;
  padding: 10px;
  font-size: 16px;
  width: 100%; /* Makes the task input field full width */
  max-width: 600px; /* Adjust this value to make it visually bigger */
  box-sizing: border-box;
}

.todo-filters button {
  margin: 5px;
  padding: 10px;
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
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
.task-details {
  text-align: center;
  flex: 1;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
.delete-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.clear-completed button {
  background-color: gray;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.clear-completed button:disabled {
  background-color: lightgray;
  cursor: not-allowed;
}
.deadline {
  margin-top: 5px;
  font-size: 0.8rem;
  color: gray;
}
</style>

