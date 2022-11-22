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

</script>

<template>
    <aside class="bg-white absolute top-0 left-0 lg:left-[calc(100%-400px)] w-full h-full flex flex-col p-2 sm:p-4 lg:w-[400px] lg:fixed lg:border-l border-solid border-slate-400">
        <div class="close-cart flex justify-end">
            <button type="button" class="leading-none" aria-label="Close cart" @click="handleCloseCart">
                <font-awesome-icon class="text-2xl text-slate-600" icon="fa-solid fa-xmark" />
            </button>
        </div>

        <div v-if="cartStore.productsInCart.length" class="products-list">
            <div class="product-box flex mb-6 pb-2 border-b border-solid border-slate-200" v-for="product in cartStore.productsInCart" :key="product.id">
                <div class="product-image flex w-[20%] mr-2 relative">
                    <img
                        class="h-full object-contain rounded-3xl"
                        :src="product.image"
                        :alt="product.title"
                    />
                    <p class="w-6 h-6 border border-solid border-slate-300 absolute top-[-12px] right-[-4px] rounded-full bg-white text-center font-light text-slate-600">
                        {{product.productCartQuantity}}
                    </p>
		        </div>
                <div class="product-title w-[50%] pt-1">
                    <p class="text-center font-semibold text-xs max-h-12 text-clip overflow-hidden">
                        {{ product.title }}
                    </p>
                    <div class="quantity flex items-center justify-center mt-2">
                        <button type="button"
                            class="rounded-full shadow-md w-6 h-6 hover:bg-rose-200 active:bg-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                            data-action="subtract"
                            :data-product-id="product.id"
                            @click="handleProductQuantityInCartUpdate">
                            <font-awesome-icon class="text-sm" icon="fa-solid fa-minus" />
                        </button>
                        <span class="mx-2 text-xs">Qty</span>
                        <button type="button"
                            class="rounded-full shadow-md w-6 h-6 hover:bg-sky-200 active:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                            data-action="add"
                            :data-product-id="product.id"
                            @click="handleProductQuantityInCartUpdate">
                            <font-awesome-icon class="text-sm" icon="fa-solid fa-plus" />
                        </button>
                    </div>
                    <!-- <p class="text-center truncate w-full font-light text-xs mt-1">
                        {{ product.description }}
                    </p> -->
		        </div>
                <div class="product-price flex flex-col items-center w-[30%] ml-2">
                    <div class="flex items-center">
                        <div class="text-md flex mr-1">
                            <font-awesome-icon icon="fa-solid fa-dollar-sign" />
                        </div>
                        <p class="text-xl font-light">{{ product.price }}</p>
                    </div>
                    <div>
                        <font-awesome-icon class="" icon="fa-solid fa-trash" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Cart is empty</p>
        </div>
    </aside>
</template>