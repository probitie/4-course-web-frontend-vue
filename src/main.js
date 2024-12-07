import { createApp, provide, h } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';
import apolloClient from './apollo';
import App from './App.vue';

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
});

app.mount('#app');

