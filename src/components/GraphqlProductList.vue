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
import { GET_PRODUCTS, DELETE_PRODUCT, UPDATE_DESCRIPTION } from '../graphql/operations.js';
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  setup() {
    const products = ref([]);
    const loading = ref(true);

    const fetchProducts = async () => {
      try {
        const { data } = await client.query({ query: GET_PRODUCTS });
        products.value = data.products;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        loading.value = false;
      }
    };

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

    const handleUpdateDescription = async ({ productId, description }) => {
      try {
        const { data } = await client.mutate({
          mutation: UPDATE_DESCRIPTION,
          variables: { id: productId, description },
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

