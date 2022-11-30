<script setup lang="ts">
    import { useCartStore } from "@/stores/CartStore";

    const cartStore = useCartStore();

    const emit = defineEmits(['closeCart']);

    const handleCloseCart = () => {
        emit('closeCart');
    };

    const handleProductQuantityInCartUpdate = (event: any) => {
        cartStore.handleProductQuantityInCartUpdate(+event.currentTarget.dataset.productId, event.currentTarget.dataset.action);
    }

    const removeProductFromCart = (event: any) => {
        cartStore.removeProductFromCart(+event.currentTarget.dataset.productId);
    };

</script>

<template>
    <aside class="bg-white absolute top-0 left-0 lg:left-[calc(100%-400px)] w-full h-full flex flex-col p-2 sm:p-4 lg:w-[400px] lg:fixed lg:border-l border-solid border-slate-400">
        <div class="close-cart flex justify-end">
            <button type="button" class="leading-none" aria-label="Close cart" @click="handleCloseCart">
                <font-awesome-icon class="text-2xl text-slate-600" icon="fa-solid fa-xmark" />
            </button>
        </div>
        <div v-if="cartStore.productsInCart.length" class="products-list">
            <div class="product-box flex mb-6 pb-2 border-b border-solid border-slate-200 sm:w-full" v-for="product in cartStore.productsInCart" :key="product.id">
                <div class="product-image flex w-[20%] mr-2 relative">
                    <img
                        class="h-full object-contain rounded-3xl"
                        :src="product.image"
                        :alt="product.title"
                    />
                    <p class="flex items-center justify-center w-6 h-6 border border-solid border-slate-300 absolute top-[-12px] right-[-4px] rounded-full bg-white text-sm text-center font-light text-slate-600">{{product.productCartQuantity}}</p>
		        </div>
                <div class="product-title w-[50%] pt-1">
                    <p class="text-center font-semibold text-xs max-h-12 text-clip overflow-hidden sm:text-base lg:text-xs">
                        {{ product.title }}
                    </p>
                    <div class="quantity flex items-center justify-center mt-2">
                        <button type="button"
                            aria-label="Subtract from quantity"
                            class="rounded-full shadow-md w-6 h-6 text-slate-700 hover:bg-rose-200 active:bg-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-8 sm:h-8"
                            data-action="subtract"
                            :data-product-id="product.id"
                            @click="handleProductQuantityInCartUpdate">
                            <font-awesome-icon class="text-sm sm:text-base lg:text-sm" icon="fa-solid fa-minus" />
                        </button>
                        <span class="mx-2 text-xs">Qty</span>
                        <button type="button"
                            aria-label="Add to quantity"
                            class="rounded-full shadow-md w-6 h-6 text-slate-700 hover:bg-sky-200 active:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:w-8 sm:h-8"
                            data-action="add"
                            :data-product-id="product.id"
                            @click="handleProductQuantityInCartUpdate">
                            <font-awesome-icon class="text-sm sm:text-base lg:text-sm" icon="fa-solid fa-plus" />
                        </button>
                    </div>
                    <!-- <p class="text-center truncate w-full font-light text-xs mt-1">
                        {{ product.description }}
                    </p> -->
		        </div>
                <div class="product-price flex flex-col items-center justify-center w-[30%] pl-2 ml-2 border-l border-solid border-slate-200">
                    <div class="flex items-center pb-1 mb-1 border-b border-solid border-slate-200">
                        <div class="flex mr-1">
                            <font-awesome-icon class="text-slate-700 text-base sm:text-lg lg:text-base" icon="fa-solid fa-dollar-sign" />
                        </div>
                        <p class="text-xl font-light text-slate-700 sm:text-2xl lg:text-xl">{{ product.productCartTotalValue }}</p>
                    </div>
                    <div>
                        <button type="button"
                            class="text-slate-500 hover:text-slate-700 active:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                            aria-label="Remove from cart"
                            :data-product-id="product.id"
                            @click="removeProductFromCart">
                            <font-awesome-icon class="text-base sm:text-lg lg:text-base" icon="fa-solid fa-trash" />
                        </button>
                    </div>
                </div>
            </div>
            <div class="cart-summary">
                <p class="text-xl text-slate-700 text-center font-semibold mb-2">Totals</p>
                <p class="text-sm text-slate-700 text-center">Items: {{cartStore.getCartItemsQuantity}}</p>
                <div class="flex justify-center items-center">
                    <font-awesome-icon class="text-slate-700 text-sm mr-1 mb-0.5" icon="fa-solid fa-dollar-sign" />    
                    <p class="text-sm text-slate-700">Sum: {{cartStore.getCartTotalValue}}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-xl text-slate-700 text-center font-semibold mb-2">Cart is empty!</p>
            <p class="text-sm text-slate-700 text-center">Feel free to add here anything you like!</p>
        </div>
    </aside>
</template>