<template>
  <div class="product-item">
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
    <p>Category: {{ product.category }}</p>
    <p>Added On: {{ new Date(product.addedOn).toLocaleDateString() }}</p>
    <p>
      Review: 
      <input 
        type="number" 
        min="1" 
        max="10" 
        v-model.number="localReview"
        @change="updateReview"
      />
    </p>
    <button @click="buyProduct">Buy</button>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      localReview: this.product.review || 5,
    };
  },
  methods: {
    buyProduct() {
      this.$emit('buy', this.product.id);
    },
    updateReview() {
      this.$emit('update-review', {
        productId: this.product.id,
        review: this.localReview,
      });
    },
  },
};
</script>

<style scoped>
.product-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 8px;
}
</style>

