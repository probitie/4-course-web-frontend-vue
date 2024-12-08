<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="{ own: msg.own }"
        class="message"
      >
        <strong>{{ msg.own ? "You" : "Other" }}:</strong> {{ msg.text }}
      </div>
    </div>
    <div class="chat-input">
      <input
        type="text"
        v-model="messageInput"
        placeholder="Type a message..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null, // WebSocket instance
      messages: [], // Array to hold chat messages
      messageInput: "", // Current message input
    };
  },
  methods: {
    connectToWebSocket() {
      // Connect to the existing WebSocket server
      this.socket = new WebSocket("ws://localhost:8080/chat");

      // Handle incoming messages
      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.messages.push({ text: message.text, own: false });
      };

      // Handle errors
      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      // Handle connection closure
      this.socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };
    },
    sendMessage() {
      if (this.messageInput.trim() !== "") {
        // Send message to the server
        this.socket.send(JSON.stringify({ text: this.messageInput }));
        // Add the message to the chat
        this.messages.push({ text: this.messageInput, own: true });
        // Clear the input field
        this.messageInput = "";
      }
    },
  },
  mounted() {
    // Connect to WebSocket server when component mounts
    this.connectToWebSocket();
  },
  beforeUnmount() {
    // Close WebSocket connection when component unmounts
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 16px auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  padding: 16px;
  background: #f9f9f9;
  overflow-y: auto;
  max-height: 200px;
}

.message {
  margin-bottom: 12px;
}

.message.own {
  text-align: right;
}

.chat-input {
  display: flex;
  border-top: 1px solid #ccc;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: none;
  outline: none;
}

.chat-input button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.chat-input button:hover {
  background: #0056b3;
}
</style>

