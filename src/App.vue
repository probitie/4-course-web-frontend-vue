<template>
  <div id="app">
    <h1>Smartphone Store Demo</h1>
    <div>
      <label for="api-select">Select API Type:</label>
      <select id="api-select" v-model="selectedApi">
        <option value="rest">REST</option>
        <option value="grpc">gRPC</option>
        <option value="graphql">GraphQL</option>
      </select>
    </div>
    <h2>VueChat</h2>
    <VueChat />
    <component :is="currentProductList" />
  </div>
</template>

<script>
import RestProductList from './components/RestProductList.vue';
import GrpcProductList from './components/GrpcProductList.vue';
import GraphqlProductList from './components/GraphqlProductList.vue';
import VueChat from './components/VueChat.vue';

export default {
  data() {
    return {
      selectedApi: 'rest',
    };
  },
  computed: {
    currentProductList() {
      switch (this.selectedApi) {
        case 'grpc':
          return GrpcProductList;
        case 'graphql':
          return GraphqlProductList;
        default:
          return RestProductList;
      }
    },
  },
  components: {
    VueChat,
  }
};
</script>

