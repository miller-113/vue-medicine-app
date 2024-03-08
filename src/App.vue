<template>
  <HeaderSectionVue></HeaderSectionVue>
  <keep-alive>
    <CartSectionVue v-if="activeSection == 'cart'" />
  </keep-alive>

  <keep-alive>
    <MainProductBox v-if="activeSection == 'shop'" />
  </keep-alive>
  <!-- <CartSectionVue v-if="activeSection == 'cart'" />
  <MainProductBox v-if="activeSection == 'shop'" /> -->
</template>

<script>

import HeaderSectionVue from './components/HeaderSection.vue';
import CartSectionVue from './components/CartSection.vue';
import MainProductBox from './components/MainProductBox.vue';


import axios from 'axios';

export default {
  name: 'App',

  components: {

    CartSectionVue,
    MainProductBox,
    HeaderSectionVue
  },
  data() {
    return {
      products: [],
      shop: undefined,
      activeSection: window.location.hash.substr(1) || 'shop'
    };
  },
  created() {
    this.getProducts();
    window.addEventListener('hashchange', () => this.activeSection = window.location.hash.substr(1));
  },
  computed: {
    filteredProducts(){
      return this.shop ? this.products.filter(el => el.attributes.ShopId == this.shop.id) : this.products;
    },

  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get("https://vue-medicine-app.onrender.com/api/products");
        this.products = response.data.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    onShopSelected(shop) {
      this.shop = shop;
    }
  }
}
</script>

<style scoped>


.mainContent {
  display: flex;
}
</style>
