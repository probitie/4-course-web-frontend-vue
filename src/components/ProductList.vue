<template>
  <div>
    <div v-if="loading">Loading products...</div>
    <div v-else>
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        @buy="handleBuy"
        @update-review="handleUpdateReview"
      />
    </div>
  </div>
</template>

<script>
import { ProductServiceClient } from '@/grpc/product_grpc_web_pb';
import { DeleteProductRequest, GetProductRequest } from '@/grpc/product_pb';
import ProductItem from './ProductItem.vue';

const client = new ProductServiceClient('http://localhost:9090');

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
      // Simulating fetching all products since the proto only has `GetProduct`.
      const productIds = [1, 2]; // Replace with dynamic IDs.
      const promises = productIds.map(id => {
        const request = new GetProductRequest();
        request.setId(id);
        return new Promise((resolve, reject) => {
          client.getProduct(request, {}, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response.getProduct());
            }
          });
        });
      });

      try {
        const results = await Promise.all(promises);
        this.products = results.map(product => ({
          id: product.getId(),
          title: product.getTitle(),
          description: product.getDescription(),
          price: product.getPrice(),
          category: product.getCategory(),
          addedOn: product.getAddedon(),
        }));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    async handleBuy(productId) {
      const request = new DeleteProductRequest();
      request.setId(productId);
      client.deleteProduct(request, {}, (err, response) => {
        if (err || !response.getResp()) {
          console.error('Error deleting product:', err);
          return;
        }
        this.products = this.products.filter(p => p.id !== productId);
      });
    },
// eslint-disable-next-line
    async handleUpdateReview({ productId, review }) {
      console.warn('Review updates are not supported in this proto structure');
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

