<script setup lang="ts">
    import { useCartStore } from "@/stores/CartStore";

    const cartStore = useCartStore();

    const emit = defineEmits(['closeCart']);

    const handleCloseCart = () => {
        emit('closeCart');
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
            <div class="product-box flex mb-6" v-for="product in cartStore.productsInCart" :key="product.id">
                <div class="product-image flex justify-center w-[20%] mr-2">
                    <img
                        class="h-full object-contain rounded-3xl"
                        :src="product.image"
                        :alt="product.title"
                    />
		        </div>
                <div class="product-title w-[50%] pt-1">
                    <p class="text-center truncate w-full font-semibold text-sm">
                        {{ product.title }}
                    </p>
                    <p class="text-center truncate w-full font-light text-xs mt-1">
                        {{ product.description }}
                    </p>
		        </div>
            </div>
        </div>
        <div v-else>
            <p>Cart is empty</p>
        </div>
    </aside>
</template>