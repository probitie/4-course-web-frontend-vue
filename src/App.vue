<template>
  <div id="app" class="todo-app">
    <h1>TODO App</h1>

    <!-- API Selection -->
    <div class="api-selection">
      <label for="api-select">Select API:</label>
      <select id="api-select" v-model="selectedApi" @change="changeApi">
        <option value="REST">REST</option>
        <option value="GraphQL">GraphQL</option>
        <option value="gRPC">gRPC</option>
      </select>
    </div>

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
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
        All
      </button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">
        Active
      </button>
      <button
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Completed
      </button>
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
    <!-- Notification Section -->
    <div class="notifications">
      <div
        class="notification"
        v-for="(notification, index) in notifications"
        :key="index"
      >
        <p>{{ notification }}</p>
        <button class="close-btn" @click="removeNotification(index)">X</button>
      </div>
    </div>

  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// Import API Services
import * as restApi from "./services/restApi";

export default {
  name: "TodoApp",
  components: { VueDatePicker },
  data() {
    return {
      tasks: [],
      newTask: "",
      newDeadline: null,
      filter: "all",
      selectedApi: "REST",
      apiService: restApi, // Default to REST
      notifications: [], // For storing notifications
      socket: null, // WebSocket connection
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
        this.tasks = await this.apiService.fetchTasks();
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
        const addedTask = await this.apiService.addTask(newTask);
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
        await this.apiService.updateTask(task.id, updatedTask);
        task.completed = !task.completed;
      } catch (err) {
        console.error("Error toggling task:", err);
      }
    },
    async deleteTask(id) {
      try {
        await this.apiService.deleteTask(id);
        this.tasks = this.tasks.filter((t) => t.id !== id);
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    },
    async deleteCompletedTasks() {
      const completedTasks = this.tasks.filter((t) => t.completed);
      try {
        await this.apiService.deleteCompletedTasks(completedTasks);
        this.tasks = this.tasks.filter((t) => !t.completed);
      } catch (err) {
        console.error("Error deleting completed tasks:", err);
      }
    },
    removeNotification(index) {
      this.notifications.splice(index, 1);
    },
    changeApi() {
      // Dynamically set the API service
      if (this.selectedApi === "REST") {
        this.apiService = require("./services/restApi");
      } else if (this.selectedApi === "GraphQL") {
        this.apiService = require("./services/graphqlApi");
      } else if (this.selectedApi === "gRPC") {
        this.apiService = require("./services/grpcApi");
      }
      this.fetchTasks(); // Re-fetch tasks with the new API
    },
  },
  mounted() {
    this.fetchTasks();

    // WebSocket connection
    this.socket = new WebSocket("ws://localhost:8080/chat");
    this.socket.onmessage = (event) => {
      if (this.notifications === undefined || this.notifications.length == 0) {
          this.notifications.push(event.data); // Push new message to notifications
      }
    };
    this.socket.onclose = () => {
      console.warn("WebSocket connection closed.");
    };
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.close(); // Ensure WebSocket connection is closed
    }
  },
};
</script>

<style scoped>
/* Add styling for API select dropdown */
.api-selection {
  margin: 10px 0;
}

.api-selection select {
  padding: 5px 10px;
  font-size: 16px;
}

/* Existing styles */
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
  width: 100%;
  max-width: 600px;
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

/* Notifications styling */
.notifications {
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notification {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

</style>

