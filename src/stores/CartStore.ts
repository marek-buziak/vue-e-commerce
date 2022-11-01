import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
    state: () => ({ cart: [

    ] }),
    getters: {
        getCartTotalValue(state) {
            return state.cart.reduce((previousProduct, currentProduct) => previousProduct.price + currentProduct.price, 0)
        }
    }
});