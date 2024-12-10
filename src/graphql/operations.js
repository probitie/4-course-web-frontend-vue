import { gql } from '@apollo/client/core';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      description
      price
      category
      addedOn
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const UPDATE_DESCRIPTION = gql`
  mutation UpdateDescription($id: ID!, $description: String!) {
    updateProduct(id: $id, description: $description) {
      id
      description
    }
  }
`;

