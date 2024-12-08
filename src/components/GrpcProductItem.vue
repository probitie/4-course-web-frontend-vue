<template>
  <div class="product-item">
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
    <p>Category: {{ product.category }}</p>
    <p>Added On: {{ product.addedOn }}</p>
    <button @click="buyProduct">Buy</button>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    buyProduct() {
      this.$emit('buy', this.product.id);
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

