<template>
    <div class="container">
        <div class="left-column">
            <form class="form">
                <h2>Checkout</h2>
                <div class="form-group">
                    <label for="name">Your name:</label>
                    <input type="text" id="name" v-model="name" name="name" class="form-control"
                        placeholder="Введите ваше имя">
                </div>
                <div class="form-group">
                    <label for="email">Your email:</label>
                    <input type="email" ref="emailInput" id="email" v-model="email" name="email" class="form-control"
                        placeholder="Введите ваш email">
                </div>
                <div class="form-group">
                    <label for="phone">Your number:</label>
                    <input type="phone" id="phone" v-model="phone" name="phone" class="form-control"
                        placeholder="Введите ваш телефон">
                </div>
                <div class="form-group">
                    <label for="address">Your address:</label>
                    <input type="text" id="address" v-model="address" name="address" class="form-control"
                        placeholder="Введите ваш адрес">
                </div>
                <button type="submit" @click.prevent="submitOrder" class="btn btn-primary">Order</button>
                <hr>
                <div>
                    Total price: {{ total }}
                </div>
            </form>
        </div>
        <div class="right-column">
            <h2>Your cart</h2>
            <div class="cart-items-container">
                <div v-for="item in cartItems" :key="item.id" class="cart-item">
                    <div class="cart-item-image">
                        <img :src="require(`@/assets/imgs/${item.id}.jpg`)" alt="">
                    </div>
                    <div class="cart-item-details">
                        <h3>{{ item.name }}</h3>
                        <p>Price: {{ item.attributes.Price }}</p>
                        <div class="cart-item-quantity">
                            <button @click="decreaseQuantity(item)">-</button>
                            <input type="number" v-model="item.quantity" min="0">
                            <button @click="increaseQuantity(item)">+</button>
                        </div>
                        <button @click="removeFromCart(item)">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useCartStore } from '@/CartStore';
import axios from 'axios';
import { computed } from 'vue';

export default {
    name: 'CartSection',
    data: () => ({
        name: '',
        email: '',
        phone: '',
        address: '',

    }),
    setup() {
        const CartStore = useCartStore();
        const cartItems = CartStore.getCart();

        const total = computed(() => cartItems.reduce((acc, item) => acc + item.attributes.Price * item.quantity, 0));

        function decreaseQuantity(item) {
            if (item.quantity > 0) {
                CartStore.decreaseQuantity(item);
            }
        }

        function increaseQuantity(item) {
            CartStore.increaseQuantity(item);
        }

        function removeFromCart(item) {
            CartStore.removeFromCart(item);
        }
        function clearCart(){
            CartStore.clearCart();
        }

        return {
            cartItems,
            total,
            decreaseQuantity,
            increaseQuantity,
            removeFromCart,
            clearCart
        };
    },
    computed: {
        productIds(){
            return this.cartItems.flatMap((item) => Array(item.quantity).fill(item.id))
        },
        inputsIsFilled(){
            return [this.email, this.name, this.phone, this.address, this.productIds.length].every(item => item)
        }


    },
    methods: {
         async submitOrder(e) {
            const url = 'http://localhost:1337/api/orders';
            const orderData = {
                "data": {
                    "Name": this.name,
                    "Email": this.email,
                    "Phone": this.phone,
                    "Address": this.address,
                    "Amount": this.total,
                    "products": this.productIds,
                    "Product_names": null
                }
            }
            if (this.inputsIsFilled){
                await axios.post(url, orderData)
                this.clearCart()
                alert('Order send')
                e.target.closest('form').submit()
            }else {
                alert('Fullfil data first or change quantity')
            }
        }
    },
    watch: {
        cartItems: {
            deep: true,
            handler(newItems) {
                localStorage.setItem('cart', JSON.stringify(newItems));
            }
        }
    }
};

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
}

.left-column {
    width: 40%;
    margin: 0 20px;
}

.right-column {
    width: 60%;
    padding: 20px;
    height: 70vh;
    overflow: scroll;
    border: 1px solid #ddd;
    border-radius: 10px;
}

.form {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 10px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: -webkit-fill-available;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
    border-radius: 4px;
    padding: 5px 10px;
    margin-top: 10px;
}

.right-column {
    overflow-y: auto;
}

.cart-items-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.cart-item {
    width: 300px;
    margin: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
}

.cart-item-image > img {
    height: 100%;
}
.cart-item-image {
    height: 200px;
    text-align: center;
    margin-bottom: 10px;
}


.cart-item-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cart-item-quantity {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

</style>