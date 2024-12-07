<template>
  <div>
    <div v-if="loading">Loading products...</div>
    <div v-else-if="error">Error loading products: {{ error.message }}</div>
    <div v-else>
      <ProductItem
        v-for="product in data.getAllProducts"
        :key="product.id"
        :product="product"
        @buy="handleBuy"
        @update-review="handleUpdateReview"
      />
    </div>
  </div>
</template>

<script>
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_ALL_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT } from '../graphql/operations';
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  setup() {
    const { result: data, loading, error, refetch } = useQuery(GET_ALL_PRODUCTS);

    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
      update(cache, { data: { deleteProduct } }) {
        if (deleteProduct) {
          cache.modify({
            fields: {
              getAllProducts(existingProducts = []) {
                return existingProducts.filter(product => product.id !== deleteProduct.id);
              },
            },
          });
        }
      },
    });

    const [updateProduct] = useMutation(UPDATE_PRODUCT);

    const handleBuy = async id => {
      try {
        await deleteProduct({ variables: { id } });
        await refetch();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    };

    const handleUpdateReview = async ({ productId, review }) => {
      try {
        await updateProduct({ variables: { id: productId, review } });
        await refetch();
      } catch (err) {
        console.error('Error updating review:', err);
      }
    };

    return { data, loading, error, handleBuy, handleUpdateReview };
  },
};
</script>

