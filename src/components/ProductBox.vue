<script setup lang="ts">
import { useCartStore } from "@/stores/CartStore";
const props = defineProps({
	id: Number,
	title: String,
	price: Number,
	category: String,
	image: String,
	description: String,
	rating: Object,
});

const cartStore = useCartStore();

</script>

<template>
	<div
		class="flex flex-col items-center bg-white p-4 rounded-3xl relative before:absolute before:content-[''] before:w-1/2 before:h-10 before:bg-white before:-top-5 before:left-1/2 before:rounded-[50%] before:-translate-x-1/2"
	>
		<div class="product-image flex justify-center h-56 w-56 mb-4">
			<img
				class="h-full object-contain rounded-3xl"
				:src="props.image"
				:alt="props.title"
			/>
		</div>
		<div
			class="product-category absolute -top-[16px] left-1/2 -translate-x-1/2 rounded-md"
		>
			<p class="text-slate-400 text-xs">{{ props.category }}</p>
		</div>
		<div class="product-title w-full mb-1">
			<p class="text-center truncate w-full font-semibold text-lg">
				{{ props.title }}
			</p>
		</div>
		<div class="product-description w-full mb-4">
			<p class="text-center truncate w-full font-light text-sm">
				{{ props.description }}
			</p>
		</div>
		<div class="product-price flex items-center mb-4">
			<div class="text-2xl flex items-center mr-1">
				<font-awesome-icon icon="fa-solid fa-dollar-sign" />
			</div>
			<p class="text-center text-4xl font-light">{{ props.price }}</p>
		</div>
		<div class="actions">
			<div class="add-to-cart">
				<button
					class="flex items-center p-2 bg-white hover:bg-slate-200 active:bg-slate-400 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    :data-product-id="props.id"
				    @click="cartStore.addToCart"
                >
					<font-awesome-icon class="text-2xl" icon="fa-solid fa-cart-plus" />
					<span class="text-sm ml-2">Add to cart</span>
				</button>
			</div>
		</div>
	</div>
</template>
<style></style>
