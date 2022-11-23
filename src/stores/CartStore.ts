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
            const cartTotalValue = state.cart.reduce<number>((previousValue: number, currentValue: CartProduct) => previousValue + currentValue.productCartTotalValue, 0);
            return (cartTotalValue).toFixed(2);
        },
        getCartItemsQuantity(state) {
            const cartItemsQuantity = state.cart.reduce<number>((previousQuantity: number, currentQuantity: CartProduct) => previousQuantity + currentQuantity.productCartQuantity, 0);
            return cartItemsQuantity;
        },
        isProductAlreadyInCart(state) {
            return (productId: number) => state.cart.find((prod) => prod.id === productId);
        },
        productsInCart(state) {
            return state.cart;
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
                    this.cart.push({...productObjectToAdd, productCartQuantity, productCartTotalValue });
                } else {
                    if (!productCartQuantity) {
                        const updatedCart = this.cart.filter(prod => prod.id !== productIdToMutate);
                        this.cart = [...updatedCart];
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
        },
        handleProductQuantityInCartUpdate(prodId: number, action: string) {
            const updatedCart = this.cart.map(prod => {
                if (prod.id === prodId) {
                    let updatedProductCartQuantity: number = action === "add" ? prod.productCartQuantity + 1 : prod.productCartQuantity - 1;
                    updatedProductCartQuantity = updatedProductCartQuantity < 1 ? 1 : updatedProductCartQuantity;
                    const updatedProductCartTotalValue: number = updatedProductCartQuantity * prod.price;
                    return {...prod, productCartQuantity: updatedProductCartQuantity, productCartTotalValue: updatedProductCartTotalValue};
                }
                return {...prod};
            });
            this.cart = [...updatedCart];
            console.log("this.cart:", this.cart);
        },
        removeProductFromCart(prodId: number) {
            const updatedCart = this.cart.filter(prod => prod.id !== prodId);
            this.cart = [...updatedCart];
        }
    }
});