<template>
    <div class="mainContent">
        <NavigationSectionVue @shopSelected="onShopSelected" />
        <section class="main">
            <div class="cardBox">
                <select v-model="sortOption" name="sort-option">
                    <option value="">-- Please choose a sort option --</option>
                    <option value="price_desc">Price⬇️</option>
                    <option value="price_asc">Price⬆️</option>
                    <option value="date_added_desc">Date added⬇️</option>
                    <option value="date_added_asc">Date added⬆️</option>
                </select>
                <ProductCardVue v-for="product in sortedProducts"
                :key="product.id"
                :product="product"
                @update-favorites="updateFavorites"
                 />
            </div>
        </section>
    </div>
</template>


<script>

import axios from 'axios';
import ProductCardVue from './ProductCard.vue';
import NavigationSectionVue from './NavigationSection.vue';

export default {
    name: 'MainSection',
    components: {
        ProductCardVue,
        NavigationSectionVue,
    },
    data() {
        return {
            products: [],
            shop: undefined,
            sortOption: '',
            favorites: JSON.parse(localStorage.getItem('favorites')) || []
        };
    },
    created() {
        this.getProducts();
    },
    computed: {
        filteredProducts() {
            return this.shop ? this.products.filter(el => el.attributes.ShopId == this.shop.id) : this.products;
        },
        sortedProducts() {
            let sorted = [...this.filteredProducts];

            if (this.sortOption.includes('price')) {
                sorted = this.sortByPrice(sorted);
                sorted = this.mergeWithFavorites(sorted, this.favorites);
            } else if (this.sortOption.includes('date_added')) {
                sorted = this.sortByDate(sorted);
                sorted = this.mergeWithFavorites(sorted, this.favorites);
            }
            return sorted;
        },
    },
    methods: {
        updateFavorites(newFavorites) {
            console.log(324)
            this.favorites = newFavorites;
        },
        async getProducts() {
            const productUrl = "http://localhost:1337/api/products";
            try {
                const response = await axios.get(productUrl);
                this.products = response.data.data;
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },

        onShopSelected(shop) {
            this.shop = shop;
        },

        sortByPrice(products) {
            const ascending = this.sortOption.includes('asc');
            return products.sort((a, b) => (ascending ? a.attributes.Price - b.attributes.Price : b.attributes.Price - a.attributes.Price));
        },

        sortByDate(products) {
            const ascending = this.sortOption.includes('asc');
            return products.sort((a, b) => {
                const dateA = new Date(a.attributes.createdAt);
                const dateB = new Date(b.attributes.createdAt);
                return ascending ? dateA - dateB : dateB - dateA;
            });
        },

        mergeWithFavorites(products, favorites) {
            const favoriteIds = new Set(favorites.map(fav => fav.id));
            return products.filter(product => favoriteIds.has(product.id)).concat(products.filter(product => !favoriteIds.has(product.id)));
        }
    }
}
</script>

<style scoped>
.main {
    flex: 1;
}

.cardBox>select {
    grid-column: 1 / -1;
    align-self: baseline;
}

.cardBox {
    overflow: scroll;
    height: 90vh;
    padding: 20px;
    border: 1px solid;
    gap: 20px;
    margin-left: 20px;
    border-radius: 15px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-auto-rows: min-content;
}

.mainContent {
    display: flex;
}
</style>
