<template>
  <div id="app">
    <h1>Smartphone Store</h1>
    <ProductList />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';

export default {
  components: {
    ProductList,
  },
};
</script>
