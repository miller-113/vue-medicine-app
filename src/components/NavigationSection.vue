<template>
    <nav>
        <div class="shops">
            <h3>Shops:</h3>
        </div>
        <button v-for="shop in shops" @click="selectShop(shop)" :key="shop.id">{{ shop.attributes.Name }}</button>
    </nav>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            shops: []
        };
    },
    created() {
        this.getShops();
    },
    methods: {
        async getShops() {
            try {
                const response = await axios.get("http://localhost:1337/api/shops");
                this.shops = response.data.data;
            } catch (error) {
                console.error(error)
            }
        },
        selectShop(shop) {
            this.$emit('shopSelected', shop); // Emitting an event with selected shop
        }
    }
};
</script>

<style scoped>
    nav button {
        width: 100%;
        background-color: transparent;
        border: 1px solid grey;
        border-radius: 8px;
        padding: 10px 20px;
        margin: 20px;
        cursor: pointer;
    }

    nav p {
        min-width: 100px;
        text-align: center;
    }

    nav {
        border: 1px solid;
        border-radius: 15px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 40px 30px;
        width: 100px;

    }
</style>