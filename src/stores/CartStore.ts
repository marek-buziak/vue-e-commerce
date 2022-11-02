import { defineStore } from "pinia";
import { useProductsStore } from "@/stores/ProductsStore";

interface Cart {
    cart: any[];
}

export const useCartStore = defineStore("CartStore", {
    state: (): Cart => ({ cart: [] }),
    getters: {
        getCartTotalValue(state) {
            return state.cart.reduce((previousProduct: any, currentProduct: any) => previousProduct.price + currentProduct.price, 0);
        },
        getCartItemsQuantity(state) {
            return state.cart.length;
        }
    },
    actions: {
        addToCart(event: any) {
            console.log("Product id addToCart - CartStore:", event.currentTarget.dataset.productId);
            const productIdToAdd = +event.currentTarget.dataset.productId;
            // this.cart.push()
            const productsStore = useProductsStore();
            if (productsStore.getProductsData) {
                const products = productsStore.getProductsData;
                const productObjectToAdd = products.find(prod => productIdToAdd === prod.id);
                if (productObjectToAdd) {
                    this.cart.push(productObjectToAdd);
                }
            }
            console.log("this.cart:", this.cart);
        }
    }
});