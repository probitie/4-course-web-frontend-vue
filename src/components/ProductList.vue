<template>
  <div>
    <div v-if="loading">Loading products...</div>
    <div v-else-if="error">Error loading products: {{ error.message }}</div>
    <div v-else>
      <ProductItem
        v-for="product in data.products"
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
import { GET_PRODUCTS, DELETE_PRODUCT, UPDATE_REVIEW } from '../graphql/operations';
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  setup() {
// eslint-disable-next-line
	  const { result: data, loading, error, refetch } = useQuery(GET_PRODUCTS);
    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
      update(cache, { data: { deleteProduct } }) {
        cache.modify({
          fields: {
            products(existingProducts = []) {
              return existingProducts.filter(
                product => product.__ref !== `Product:${deleteProduct.id}`
              );
            },
          },
        });
      },
    });

    const [updateReview] = useMutation(UPDATE_REVIEW);

    const handleBuy = async id => {
      try {
        await deleteProduct({ variables: { id } });
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    };

    const handleUpdateReview = async ({ productId, review }) => {
      try {
        await updateReview({ variables: { id: productId, review } });
      } catch (err) {
        console.error('Error updating review:', err);
      }
    };

    return { data, loading, error, handleBuy, handleUpdateReview };
  },
};
</script>

