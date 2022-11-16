<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "@/stores/CartStore";
import { RouterLink } from "vue-router";
const cartStore = useCartStore();

const mobileMenuToggleButtonIcon = ref<string>("fa-solid fa-bars");
const navCss = ref<string>("hidden");
const headerCss = ref<string>("");

const toggleMobileMenu = () => {
    let headerCssClass = "";
    let navCssClass = "";
    let buttonIcon = "";
    
    navCssClass = navCss.value === "hidden" ? "animate__animated animate__slideInLeft" : "hidden";
    navCss.value = navCssClass;

    if (navCssClass === "hidden") {
        buttonIcon = "fa-solid fa-bars";
        headerCssClass = "";
    } else {
        buttonIcon = "fa-solid fa-xmark";
        headerCssClass = "h-screen";
    }
    mobileMenuToggleButtonIcon.value = buttonIcon;
    headerCss.value = headerCssClass;
};

</script>

<template>
	<header class="flex flex-col mb-4 p-2 sm:p-4 bg-sky-800 sticky top-0 z-10" :class="headerCss">
        <div class="toggle-menu-button flex justify-end lg:hidden">
            <button type="button" class="leading-none" aria-label="Toggle mobile menu" @click="toggleMobileMenu">
                <font-awesome-icon class="text-2xl text-white" :icon="mobileMenuToggleButtonIcon" />
            </button>
        </div>
		<nav class="mt-2 pt-2 border-t border-solid border-white lg:block lg:mt-0 lg:pt-0 lg:border-0" :class="navCss">
			<ul class="sm:flex items-center">
				<li class="mb-4 sm:mb-0 sm:mr-6 lg:mr-10 text-white"><RouterLink class="inline-block w-full" to="/">Home</RouterLink></li>
				<li class="mb-4 sm:mb-0 sm:mr-6 lg:mr-10 text-white"><RouterLink class="inline-block w-full" to="/about">About</RouterLink></li>
				<li class="mb-4 sm:mb-0 sm:mr-6 lg:mr-10 text-white"><RouterLink class="inline-block w-full" to="/products">Products</RouterLink></li>
				<li class="mb-4 sm:mb-0 text-white"><RouterLink class="inline-block w-full" to="/contact">Contact</RouterLink></li>
				<li class="sm:ml-auto mb-4 sm:mb-0">
                    <div class="cart flex items-center relative w-fit">
                        <font-awesome-icon class="text-2xl text-white" icon="fa-solid fa-cart-shopping" />
                        <span class="ml-2 text-3xl text-white font-light">{{cartStore.getCartItemsQuantity}}</span>
                        <div class="price-total flex items-center absolute -bottom-3 left-1/2 -translate-x-1/2 border-t border-solid border-white">
                            <font-awesome-icon icon="fa-solid fa-dollar-sign" class="text-white text-[10px]" />
                            <span class="ml-1 text-xs text-white font-light">{{cartStore.getCartTotalValue}}</span>
                        </div>
                    </div>
                </li>
			</ul>
		</nav>
	</header>
</template>
