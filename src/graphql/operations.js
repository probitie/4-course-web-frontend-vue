import { gql } from '@apollo/client/core';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      review
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $review: Int!) {
    updateReview(id: $id, review: $review) {
      id
      review
    }
  }
`;

