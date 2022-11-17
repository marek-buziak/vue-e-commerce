<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "@/stores/CartStore";
import { RouterLink } from "vue-router";
import Cart from "@/components/Cart.vue";

const cartStore = useCartStore();

const mobileMenuToggleButtonIcon = ref<string>("fa-solid fa-bars");
const headerCss = ref<string>("");
const navCss = ref<string>("hidden");
const cartCss = ref<string>("hidden");
const ariaNavbarExpandedValue = ref<boolean>(false);

const toggleMobileMenu = () => {
    let buttonIcon = "";
    
    const navCssClass = navCss.value === "hidden" ? "animate__animated animate__slideInLeft" : "animate__animated animate__slideOutLeft";
    navCss.value = navCssClass;
    const buttonAriaExpandedState = navCssClass === "animate__animated animate__slideOutLeft" ? false : true;
    ariaNavbarExpandedValue.value = buttonAriaExpandedState;

    if (navCssClass === "animate__animated animate__slideOutLeft") {
        buttonIcon = "fa-solid fa-bars";
    } else {
        buttonIcon = "fa-solid fa-xmark";
        // headerCssClass = "h-screen";
        headerCss.value = "h-screen";
    }
    mobileMenuToggleButtonIcon.value = buttonIcon;
    // headerCss.value = headerCssClass;
};

const ariaCartExpandedValue = ref<boolean>(false);
const toggleCart = () => {
    const state = ariaCartExpandedValue.value = ariaCartExpandedValue.value === false ? true : false;
    ariaCartExpandedValue.value = state;
    const cartCssClass = state ? "animate__animated animate__slideInLeft" : "animate__animated animate__slideOutLeft";
    cartCss.value = cartCssClass;
}

const handleAnimationEnd = (event: any) => {
    console.log("event.currentTarget:", event.currentTarget);
    const cssClassToAdd = navCss.value.includes("animate__slideOutLeft") ? "hidden" : "";
    navCss.value = cssClassToAdd;
    if (event.currentTarget.id === "navbar" && cssClassToAdd === "hidden") {
        headerCss.value = "";
    }
};

const closeCartCallback = (event: any) => {
    console.log("Need to close the cart!");
    cartCss.value = "animate__animated animate__slideOutLeft";
};

</script>

<template>
	<header class="flex flex-col p-2 sm:p-4 bg-sky-800 sticky top-0 z-10" :class="headerCss">
        <div class="toggle-menu-button flex justify-end lg:hidden">
            <button type="button" class="leading-none" aria-label="Toggle mobile menu" :aria-expanded="ariaNavbarExpandedValue" aria-controls="navbar" @click="toggleMobileMenu">
                <font-awesome-icon class="text-2xl text-white" :icon="mobileMenuToggleButtonIcon" />
            </button>
        </div>
		<nav id="navbar" class="mt-2 pt-2 border-t border-solid border-white lg:block lg:mt-0 lg:pt-0 lg:border-0" :class="navCss" @animationend="handleAnimationEnd">
			<ul class="sm:flex items-center">
				<li class="mb-4 sm:mb-0 sm:mr-6 lg:mr-10 text-white"><RouterLink class="inline-block w-full" to="/">Home</RouterLink></li>
				<li class="mb-4 sm:mb-0 sm:mr-6 lg:mr-10 text-white"><RouterLink class="inline-block w-full" to="/about">About</RouterLink></li>
				<li class="mb-4 sm:mb-0 sm:mr-6 lg:mr-10 text-white"><RouterLink class="inline-block w-full" to="/products">Products</RouterLink></li>
				<li class="mb-4 sm:mb-0 text-white"><RouterLink class="inline-block w-full" to="/contact">Contact</RouterLink></li>
				<li class="sm:ml-auto mb-4 sm:mb-0">
                    <div class="cart flex items-center relative w-fit" aria-label="Toggle cart" tabindex="0" role="button" :aria-expanded="ariaCartExpandedValue" aria-controls="cart" @click="toggleCart">
                        <font-awesome-icon class="text-2xl text-white pointer-events-none" icon="fa-solid fa-cart-shopping" />
                        <span class="ml-2 text-3xl text-white font-light pointer-events-none">{{cartStore.getCartItemsQuantity}}</span>
                        <div class="price-total flex items-center absolute -bottom-3 left-1/2 -translate-x-1/2 border-t border-solid border-white pointer-events-none">
                            <font-awesome-icon icon="fa-solid fa-dollar-sign pointer-events-none" class="text-white text-[10px]" />
                            <span class="ml-1 text-xs text-white font-light pointer-events-none">{{cartStore.getCartTotalValue}}</span>
                        </div>
                    </div>
                </li>
			</ul>
		</nav>
        <Cart id="cart" class="absolute top-0 left-0 w-full h-full" :class="cartCss" @animationend="handleAnimationEnd" @close-cart="closeCartCallback"/>
	</header>
</template>
