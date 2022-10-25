<script setup lang="ts">
const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  category: String,
  image: String,
  description: String
})
</script>

<template>
	<div class="product-box">
		<div class="product-image">
            <img :src="props.image" alt="">
        </div>
		<div class="product-category">{{props.category}}</div>
		<div class="product-title">{{props.title}}</div>
		<div class="product-description">{{props.description}}</div>
		<div class="actions">
			<div class="product-price">{{props.price}}</div>
			<div class="add-to-cart">
				<button>Add</button>
			</div>
		</div>
	</div>
</template>
