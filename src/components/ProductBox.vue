<script setup lang="ts">
const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  category: String,
  image: String,
  description: String,
  rating: Object
})
</script>

<template>
	<div class="product-box flex flex-col items-center bg-white p-4 rounded-3xl">
		<div class="product-image flex justify-center h-56 w-56">
            <img class="h-full object-contain rounded-3xl" :src="props.image" :alt="props.title">
        </div>
		<div class="product-category">{{props.category}}</div>
		<div class="product-title truncate w-full">{{props.title}}</div>
		<div class="product-description truncate w-full">{{props.description}}</div>
		<div class="actions">
			<div class="product-price">{{props.price}}</div>
			<div class="add-to-cart">
				<button>Add</button>
			</div>
		</div>
	</div>
</template>
<style>

    .product-image {
        margin-top: -48px;
    }
    /* .product-box > * {
        width: 100%;
    }
    .product-image {
        width: 200px;
    }
    .product-image img {
        width: 100%;
        height: auto;
    } */
</style>