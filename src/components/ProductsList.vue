<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ProductBox from "@/components/ProductBox.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

let productsData = ref<any[]>([]);
console.log("productsData - initial:", productsData.value);

const getProductsData = async () => {
    console.log("getProductsData");
	try {
		const response = await axios.get("https://fakestoreapi.com/products");
		console.log("response:", response);
        productsData.value = response.data;
        console.log("productsData - updated:", productsData.value);
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
    getProductsData();
})
</script>

<template>
	<h1>ProductList component</h1>
    <section class="products" v-if="productsData.length">
        <ProductBox v-for="product in productsData" :key="product.id" v-bind="product"/>
    </section>
    <LoadingSpinner v-else/>
</template>
