<template>
  <div>
    <div v-if="loading">Loading products...</div>
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

export default {
  components: { ProductItem },
  data() {
    return {
      products: [],
      loading: true,
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:8080/api/v1/products');
	console.log("XXXX resp is ", response);
        this.products = await response.json();
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    async handleBuy(productId) {
      try {
        await fetch(`http://localhost:8080/api/v1/products/${productId}`, {
          method: 'DELETE',
        });
        this.products = this.products.filter(p => p.id !== productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    async handleUpdateDescription({ productId, description }) {
      try {
        await fetch(`http://localhost:8080/api/v1/products/${productId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description }),
        });
        const updatedProduct = this.products.find(p => p.id === productId);
        if (updatedProduct) {
          updatedProduct.description = description;
        }
      } catch (error) {
        console.error('Error updating description:', error);
      }
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

