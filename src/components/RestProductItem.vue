<template>
  <div class="product-item">
    <h2>{{ product.title }}</h2>
    <p>Category: {{ product.category }}</p>
    <p>Price: ${{ product.price }}</p>
    <p>Added On: {{ formattedDate }}</p>
    <p>
      Description:
      <input 
        type="text"
        v-model="localDescription"
        @blur="updateDescription"
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
      localDescription: this.product.description,
    };
  },
  computed: {
    formattedDate() {
      return new Date(this.product.addedOn).toLocaleDateString();
    },
  },
  methods: {
    buyProduct() {
      this.$emit('buy', this.product.id);
    },
    updateDescription() {
      if (this.localDescription !== this.product.description) {
        this.$emit('update-description', {
          productId: this.product.id,
          description: this.localDescription,
        });
      }
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

