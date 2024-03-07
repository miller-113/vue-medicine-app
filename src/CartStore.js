import { defineStore } from 'pinia';

export const useCartStore = defineStore({
  id: 'cart',
  state: () => {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    return {
      items: cartItems || [],
    };
  },
  actions: {
    addToCart(product) {
      const existingProductIndex = this.items.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
          this.items[existingProductIndex].quantity++;
      } else {
          this.items.push({ ...product, quantity: 1 });
      }
      console.log(this.items);
    },
    increaseQuantity(product){
      // console.log(this.items.find(el => el.id == product.id))
      this.items.find(el => el.id == product.id).quantity += 1
    },
    decreaseQuantity(product){
      // console.log(this.items.find(el => el.id == product.id))
      this.items.find(el => el.id == product.id).quantity -= 1
    },
    removeFromCart(product) {
      const index = this.items.findIndex(item => item.id === product.id);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    getCart() {
      return this.items; // Return the cart items
    },
    clearCart() {
      this.items = [];
      localStorage.removeItem('cart');
    }
  },


});


