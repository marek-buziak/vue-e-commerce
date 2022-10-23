<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";

const a = 1;
const b = ref(2);

defineExpose({
	a,
	b,
});
</script>

<template>
	<header>
		<nav>
			<ul>
				<li><RouterLink to="/">Home</RouterLink></li>
				<li><RouterLink to="/about">About</RouterLink></li>
				<li><RouterLink to="/products">Products</RouterLink></li>
				<li>Contact</li>
				<li>Cart - icon placeholder</li>
			</ul>
		</nav>
	</header>
</template>
