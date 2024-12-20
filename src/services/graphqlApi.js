/* eslint-disable */


const GRAPHQL_ENDPOINT = "/graphql";

/**
 * Utility function to send GraphQL queries or mutations.
 * @param {String} query - The GraphQL query string.
 * @param {Object} variables - Variables for the query or mutation.
 * @returns {Promise<any>} - The response data.
 */
async function graphqlRequest(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error("GraphQL Error: " + result.errors.map((e) => e.message).join(", "));
    }

    return result.data;
  } catch (error) {
    console.error("Error in GraphQL request:", error);
    throw error;
  }
}

/**
 * Fetch all tasks using the "getAllTasks" query.
 * @returns {Promise<Array>} - List of tasks.
 */
export async function fetchTasks() {
  const query = `
    query GetAllTasks {
      getAllTasks {
        id
        title
        completed
        deadline
      }
    }
  `;

  const data = await graphqlRequest(query);
  return data.getAllTasks;
}


/**
 * Add a new task using the "addTask" mutation.
 * @param {Object} newTask - The task details.
 * @returns {Promise<Object>} - The added task.
 */

export async function addTask(newTask) {
  const mutation = `
    mutation AddTask($task: AddTaskInput!) {
      addTask(product: $task) {
        id
        title
        completed
        deadline
      }
    }
  `;

// Format the deadline to "Tue Dec 17 14:30:00 UTC 2024"
const formatDeadline = (deadline) => {
  if (!deadline) return null;

  const date = new Date(deadline);

  // Extract date parts
  const options = { weekday: "short", month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC" };
  const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

  // Add "UTC" manually since Intl.DateTimeFormat doesn't include it in output
  return formatted.replace(/,\s+/g, " ") + " UTC";
};
  const variables = {
    task: {
      title: newTask.title,
      completed: newTask.completed,
      deadline: newTask.deadline ? formatDeadline(new Date(newTask.deadline)) : null,
    },
  };

  const data = await graphqlRequest(mutation, variables);
  return data.addTask;
}

/**
 * Update a task using the "updateTask" mutation.
 * @param {String} id - The ID of the task to update.
 * @param {Object} updatedTask - Updated task fields.
 * @returns {Promise<Object>} - The updated task.
 */
export async function updateTask(id, updatedTask) {
  const mutation = `
    mutation UpdateTask($id: ID!, $updates: UpdateTaskInput!) {
      updateTask(id: $id, product: $updates) {
        id
        title
        completed
        deadline
      }
    }
  `;

  const variables = {
    id,
    updates: {
      completed: updatedTask.completed,
      title: updatedTask.title || null,
      deadline: updatedTask.deadline || null,
    },
  };

  const data = await graphqlRequest(mutation, variables);
  return data.updateTask;
}

/**
 * Delete a task using the "deleteTask" mutation.
 * @param {String} id - The ID of the task to delete.
 * @returns {Promise<Boolean>} - True if deletion was successful.
 */
export async function deleteTask(id) {
  const mutation = `
    mutation DeleteTask($id: ID!) {
      deleteTask(id: $id)
    }
  `;

  const variables = { id };
  const data = await graphqlRequest(mutation, variables);
  return data.deleteTask;
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




