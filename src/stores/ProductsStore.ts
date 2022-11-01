import { defineStore} from "pinia"
import axios from "axios";

interface Products {
    products: null | any[];
}

export const useProductsStore = defineStore("ProductsStore", {
    state: (): Products => ({ products: null }),
    getters: {
        getProductsData(state) {
            return state.products;
        } 
    },
    actions: {
        async fetchProductsData() {
            try {
                const data = await axios.get("https://fakestoreapi.com/products");
                this.products = data.data;
        
            } catch (error) {
                console.error(error);
                this.products = [];
            }
        }
    }
});