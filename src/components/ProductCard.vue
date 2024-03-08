<template>
  <div class="productCard">
    <div class="cardImg">
      <img :src="require(`@/assets/imgs/${product.id}.jpg`)" alt="">
    </div>
    <div class="titleCardsCont">
      <div class="cardTitle">{{ product.attributes.Name }}</div>
      <button class="cardButton" @click="addProduct(product)">Add to Cart</button>
      <button class="cardButton" :class="{ 'active': isFavorite(product) }" @click="toggleFavorite(product)">
        {{ isFavorite(product) ? 'Remove from Favorite' : 'Add to Favorite' }}
      </button>
    </div>
    <div>
      <hr>
      Price: {{ product.attributes.Price }}
    </div>
  </div>
</template>



<script>
import { useCartStore } from '@/CartStore';
import { storeToRefs } from 'pinia'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  setup() {
    const CartStore = useCartStore()
    const { items } = storeToRefs(CartStore)
    return { items }
  },
  computed: { // Use computed property for concise cart access
    cartItems() {
      return useCartStore().getCart();
    }
  },
  methods: {
    addProduct(product) {
      useCartStore().addToCart(product);
    },
    toggleFavorite(product) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const index = favorites.findIndex(item => item.id === product.id);

      if (index !== -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(product);
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.$emit('update-favorites', favorites);
      this.$forceUpdate();
    },
    isFavorite(product) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return favorites.some(item => item.id === product.id);
    },
  },
  watch: {
    items: {
      deep: true,
      handler(newItems) {
        localStorage.setItem('cart', JSON.stringify(newItems));
      }
    },
  },

}
</script>

<style>
  .active {
    color: mediumvioletred;
  }
  .titleCardsCont {
    display: grid;
    grid-template-columns: 2fr 50%;
    gap: 5px;
    margin-block-start: auto;
  }
  .cardImg  {
    text-align: center;
    max-height: 205px;
  }

  .cardImg > img {
    height: fit-content;
    max-height: 115px;
  }

  .cardButton {
    padding: 8px 10px;
    border-radius: 10px;

  }
  .cardTitle {
    font-size: 18px;
    font-weight: 600;
    grid-column: 1/-1;
  }
  .productCard {
      /* width: calc(50% - 10px); */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 15px;
      padding: 15px;
      border: 2px solid;

      box-sizing: border-box;
      /* Учитывать границу в расчете размеров */
  }
</style>