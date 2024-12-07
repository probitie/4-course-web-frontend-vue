import { gql } from '@apollo/client/core';

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

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Long!) {
    deleteProduct(id: $id)
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: Long!, $review: Int!) {
    updateProduct(id: $id, product: { review: $review }) {
      id
      review
    }
  }
`;

