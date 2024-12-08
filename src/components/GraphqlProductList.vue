<template>
  <div>
    <div v-if="loading">Loading products...</div>
    <div v-else-if="error">Error loading products: {{ error.message }}</div>
    <div v-else>
      <ProductItem
        v-for="product in data.getAllProducts"
        :key="product.id"
        :product="product"
        @buy="handleBuy"
        @update-review="handleUpdateReview"
      />
    </div>
  </div>
</template>

<script>
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_ALL_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT } from '../graphql/operations';
import ProductItem from './GraphqlProductItem.vue';

export default {
  components: { ProductItem },
  setup() {
    // Query for fetching all products
    const { result: data, loading, error, refetch } = useQuery(GET_ALL_PRODUCTS);

    // Mutations for deleting and updating products
    const { mutate: deleteProduct } = useMutation(DELETE_PRODUCT);
    const { mutate: updateProduct } = useMutation(UPDATE_PRODUCT);

    // Handle product deletion
    const handleBuy = async (id) => {
      try {
        await deleteProduct({ id });
        await refetch();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    };

    // Handle review update
    const handleUpdateReview = async ({ productId, review }) => {
      try {
        await updateProduct({ id: productId, product: { review } });
        await refetch();
      } catch (err) {
        console.error('Error updating review:', err);
      }
    };

    return { data, loading, error, handleBuy, handleUpdateReview };
  },
};
</script>

