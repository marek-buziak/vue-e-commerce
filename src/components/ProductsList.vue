<script setup lang="ts">
import { ref, onMounted, onErrorCaptured, computed } from "vue";
import { useProductsStore } from "@/stores/ProductsStore";
import ProductBox from "@/components/ProductBox.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const productsStore = useProductsStore();

const error = ref<any>(null);
onErrorCaptured(e => {
  error.value = e;
  return false;
})

onMounted(() => {
    productsStore.fetchProductsData();
});

const getProductsData: any = computed(() => {
    return productsStore.getProductsData;
});

</script>

<template>
	<h1>ProductList component</h1>
    <section class="products md:container mx-auto px-2 sm:px-4 flex flex-wrap gap-y-16 sm:gap-x-8 lg:gap-x-6" v-if=" getProductsData">
        <ProductBox class="product-box" v-for="product in getProductsData" :key="product.id" v-bind="product"/>
    </section>
    <LoadingSpinner v-else/>
</template>

<style>

    .product-box {
        width: 100%;
    }

    @media (min-width: 640px) {
        .product-box {
            width: calc(100% / 2 - 1rem);
        }
    }

    @media (min-width: 1024px) {
        .product-box {
            width: calc(100% / 3 - 1rem);
        }
    }
</style>
