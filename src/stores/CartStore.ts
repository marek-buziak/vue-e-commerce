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
            console.log("state - getCartTotalValue:", state)
            const cartTotalValue = state.cart.reduce<number>((previousValue: number, currentValue: CartProduct) => previousValue + currentValue.productCartTotalValue, 0);
            return (cartTotalValue).toFixed(2);
        },
        getCartItemsQuantity(state) {
            // return state.cart.length;
            const cartItemsQuantity = state.cart.reduce<number>((previousQuantity: number, currentQuantity: CartProduct) => previousQuantity + currentQuantity.productCartQuantity, 0);
            // console.log("cartItemsQuantity:", cartItemsQuantity);
            return cartItemsQuantity;
        },
        isProductAlreadyInCart(state) {
            return (productId: number) => state.cart.find((prod) => prod.id === productId);
        }
    },
    actions: {
        handleProductCartAction(prodId: number, prodQuantity: number) {
            const productIdToMutate = prodId;
            const productCartQuantity = prodQuantity;
            const productsStore = useProductsStore();
            if (productsStore.getProductsData) {
                const products = productsStore.getProductsData;
                const productObjectToAdd: CartProduct = products.find(prod => productIdToMutate === prod.id);
                const productAlreadyInCart: CartProduct = this.cart.find(prod => productIdToMutate === prod.id);
                const productCartTotalValue: number = productObjectToAdd.price * productCartQuantity;
                if (!productAlreadyInCart) {
                    // console.log("Product is not in cart - can be added!");
                    this.cart.push({...productObjectToAdd, productCartQuantity, productCartTotalValue });
                } else {
                    // console.log("Need to update existing product in cart!");
                    if (!productCartQuantity) {
                        const updatedCart = this.cart.filter(prod => prod.id !== productIdToMutate);
                        this.cart = [...updatedCart];
                        // console.log("this.isProductAlreadyInCart:", this.isProductAlreadyInCart(productIdToMutate));
                    } else {
                        const updatedCart = this.cart.map(prod => {
                            if (prod.id === productIdToMutate) {
                                return {...prod, productCartQuantity, productCartTotalValue};
                            }
                            return {...prod};
                        });
                        this.cart = [...updatedCart];
                    }
                }
            }
            console.log("this.cart:", this.cart);
        }
    }
});