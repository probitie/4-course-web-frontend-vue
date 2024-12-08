<template>
  <div id="app">
    <h1>Smartphone Store</h1>
    <ProductList />
    <h2>VueChat</h2>
    <VueChat />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';
import VueChat from './components/VueChat.vue';

export default {
  components: {
    ProductList,
    VueChat,
  },
};
</script>
