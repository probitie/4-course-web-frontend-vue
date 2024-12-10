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
import { ref, onMounted } from 'vue';
import client from '../apollo.js';
import { GET_ALL_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT } from '../graphql/operations.js';
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  setup() {
    const products = ref([]);
    const loading = ref(true);

    // Fetch all products
    const fetchProducts = async () => {
      try {
        const { data } = await client.query({ query: GET_ALL_PRODUCTS });
        products.value = data.getAllProducts;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        loading.value = false;
      }
    };

    // Handle product deletion
    const handleBuy = async (productId) => {
      try {
        await client.mutate({
          mutation: DELETE_PRODUCT,
          variables: { id: productId },
        });
        products.value = products.value.filter(p => p.id !== productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };

    // Handle description update
    const handleUpdateDescription = async ({ productId, description }) => {
      try {
        const { data } = await client.mutate({
          mutation: UPDATE_PRODUCT,
          variables: {
            id: productId,
            product: { description },
          },
        });
        const updatedProduct = products.value.find(p => p.id === data.updateProduct.id);
        if (updatedProduct) {
          updatedProduct.description = data.updateProduct.description;
        }
      } catch (error) {
        console.error('Error updating description:', error);
      }
    };

    onMounted(fetchProducts);

    return {
      products,
      loading,
      handleBuy,
      handleUpdateDescription,
    };
  },
};
</script>

<style scoped>
.product-list {
  padding: 16px;
}
</style>

