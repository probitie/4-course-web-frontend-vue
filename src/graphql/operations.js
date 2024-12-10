import { gql } from '@apollo/client/core';

// Query to fetch all products
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      title
      description
      price
      category
      addedOn
    }
  }
`;

// Mutation to delete a product
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// Mutation to update a product
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $product: UpdateProductInput!) {
    updateProduct(id: $id, product: $product) {
      id
      description
    }
  }
`;

