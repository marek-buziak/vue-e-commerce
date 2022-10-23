<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

let productsData = ref(null);
console.log("productsData - initial:", productsData.value);

const getProductsData = async () => {
    console.log("getProductsData");
	try {
		const response = await axios.get("https://api.escuelajs.co/api/v1/products");
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
    <h2 v-if="productsData">
        Products loaded
    </h2>
    <h2 v-else>
        Loading...
    </h2>
</template>
