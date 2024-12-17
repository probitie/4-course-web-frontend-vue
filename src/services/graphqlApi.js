/* eslint-disable */

import { gql } from "@apollo/client/core";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

// Apollo Client setup
const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql" }),
  cache: new InMemoryCache(),
});

// GraphQL Queries
const GET_ALL_TASKS = gql`
  query GetAllTasks {
    getAllTasks {
      id
      title
      completed
      deadline
    }
  }
`;

const GET_TASK = gql`
  query GetTask($id: Int!) {
    getTask(id: $id) {
      id
      title
      completed
      deadline
    }
  }
`;

// GraphQL Mutations
const ADD_TASK = gql`
  mutation AddTask($task: AddTaskInput!) {
    addTask(product: $task) {
      id
      title
      completed
      deadline
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $task: UpdateTaskInput!) {
    updateTask(id: $id, product: $task) {
      id
      title
      completed
      deadline
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

// CRUD Operations for GraphQL
export async function fetchTasks() {
  try {
    const { data } = await client.query({ query: GET_ALL_TASKS });
    return data.getAllTasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function addTask(newTask) {
  try {
    const { data } = await client.mutate({
      mutation: ADD_TASK,
      variables: {
        task: {
          id: newTask.id || null,
          title: newTask.title,
          completed: newTask.completed,
          deadline: newTask.deadline || null,
        },
      },
    });
    return data.addTask;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}

export async function updateTask(id, updatedTask) {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_TASK,
      variables: {
        id: id,
        task: {
          title: updatedTask.title || null,
          completed: updatedTask.completed,
          deadline: updatedTask.deadline || null,
        },
      },
    });
    return data.updateTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_TASK,
      variables: { id },
    });
    return data.deleteTask; // Returns a boolean
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

export async function deleteCompletedTasks(completedTasks) {
  try {
    for (const task of completedTasks) {
      await deleteTask(task.id);
    }
  } catch (error) {
    console.error("Error deleting completed tasks:", error);
    throw error;
  }
}
