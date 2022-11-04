import { defineStore } from "pinia";
import { useProductsStore } from "@/stores/ProductsStore";

interface Cart {
    cart: any[];
}

interface CartProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: object;
    productCartQuantity: number;
    productCartTotalValue: number;
}

export const useCartStore = defineStore("CartStore", {
    state: (): Cart => ({ cart: [] }),
    getters: {
        getCartTotalValue(state) {
            const cartTotalValue = state.cart.reduce<number>((previousQuantity: number, currentQuantity: CartProduct) => previousQuantity + currentQuantity.price, 0);
            console.log("cartTotalValue:", cartTotalValue);
            return cartTotalValue;
        },
        getCartItemsQuantity(state) {
            // return state.cart.length;
            console.log("state.cart", state.cart);
            const cartItemsQuantity = state.cart.reduce<number>((previousQuantity: number, currentQuantity: CartProduct) => previousQuantity + currentQuantity.productCartQuantity, 0);
            console.log("cartItemsQuantity:", cartItemsQuantity);
            return cartItemsQuantity;
        },
        isProductAlreadyInCart(state) {
            return (productId: number) => state.cart.find((prod) => prod.id === productId);
        }
    },
    actions: {
        addToCart(event: any) {
            console.log("Product id addToCart - CartStore:", event.currentTarget.dataset.productId);
            const productIdToAdd: number = +event.currentTarget.dataset.productId;
            const productCartQuantity: number = +event.currentTarget.dataset.productQuantity;
            let productCartTotalValue: number; 
            // this.cart.push()
            const productsStore = useProductsStore();
            if (productsStore.getProductsData) {
                const products = productsStore.getProductsData;
                const productObjectToAdd: CartProduct = products.find(prod => productIdToAdd === prod.id);
                const productAlreadyInCart: CartProduct = this.cart.find(prod => productIdToAdd === prod.id);
                if (!productAlreadyInCart) {
                    console.log("Product is not in cart - can be added!");
                    productCartTotalValue = productObjectToAdd.price * productCartQuantity;
                    this.cart.push({...productObjectToAdd, productCartQuantity, productCartTotalValue });
                } else {
                    console.log("Need to update existing product in cart!");
                }
            }
            console.log("this.cart:", this.cart);
        }
    }
});