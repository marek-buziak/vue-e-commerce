<script setup lang="ts">
import { useCartStore } from "@/stores/CartStore";
import { RouterLink } from "vue-router";
const cartStore = useCartStore();

</script>

<template>
	<header class="mb-4 px-2 pt-2 sm:p-4 bg-sky-800">
		<nav>
			<ul class="sm:flex items-center">
				<li class="mb-4 sm:mb-0 sm:mr-6 lg:mr-10 text-white"><RouterLink class="inline-block w-full" to="/">Home</RouterLink></li>
				<li class="mb-4 sm:mb-0 sm:mr-6 lg:mr-10 text-white"><RouterLink class="inline-block w-full" to="/about">About</RouterLink></li>
				<li class="mb-4 sm:mb-0 sm:mr-6 lg:mr-10 text-white"><RouterLink class="inline-block w-full" to="/products">Products</RouterLink></li>
				<li class="mb-4 sm:mb-0 text-white"><RouterLink class="inline-block w-full" to="/contact">Contact</RouterLink></li>
				<li class="sm:ml-auto mb-4 sm:mb-0">
                    <div class="cart flex items-center">
                        <font-awesome-icon class="text-2xl text-white" icon="fa-solid fa-cart-shopping" />
                        <span class="ml-2 text-3xl text-white font-light">{{cartStore.getCartItemsQuantity}}</span>
                    </div>
                </li>
			</ul>
		</nav>
	</header>
</template>
