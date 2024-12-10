<template>
  <div>
    <div v-if="loading">Loading products (GraphQL)...</div>
    <div v-else>
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @buy="handleBuy"
        @update-description="handleUpdateDescription"
      />
    </div>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS, DELETE_PRODUCT, UPDATE_DESCRIPTION } from '../graphql/operations.js';

export default {
  components: { ProductItem },
  setup() {
    // Query for fetching products
    const { loading, data, refetch } = useQuery(GET_PRODUCTS);

    // Mutations for deleting and updating
    const [deleteProduct] = useMutation(DELETE_PRODUCT);
    const [updateDescription] = useMutation(UPDATE_DESCRIPTION);

    // Handle delete mutation
    const handleBuy = async (productId) => {
      try {
        await deleteProduct({ variables: { id: productId } });
        await refetch(); // Refresh the list
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };

    // Handle updateDescription mutation
    const handleUpdateDescription = async ({ productId, description }) => {
      try {
        await updateDescription({ variables: { id: productId, description } });
      } catch (error) {
        console.error('Error updating description:', error);
      }
    };

    return {
      loading,
      products: data?.products || [],
      handleBuy,
      handleUpdateDescription,
    };
  },
};
</script>

