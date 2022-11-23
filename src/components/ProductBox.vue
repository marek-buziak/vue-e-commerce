<script setup lang="ts">
import { ref, onMounted } from "vue";
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

// const productId: number = +props.id!;

interface ArithmeticOperation {
    add: string;
    subtract: string;
}

const ARITHMETIC_OPERATION: ArithmeticOperation = {
    add: "add",
    subtract: "subtract"
}
/* TO INSPECT
onMounted(() => {
    console.log("onMounted!");
    console.log("props.id!:", props.id!);
    const isProdInCart = cartStore.isProductAlreadyInCart(props.id!).productCartQuantity ? cartStore.isProductAlreadyInCart(props.id!).productCartQuantity : "prod not in cart";
    console.log("isProdInCart:", isProdInCart);
});
*/

const cartStore = useCartStore();
const prodQuantity = ref<number>(1);
// const isProdInCart = cartStore.isProductAlreadyInCart(props.id!).productCartQuantity;
// console.log("isProdInCart:", isProdInCart);
// const prodQuantityInCart = ref<number>(cartStore.isProductAlreadyInCart(props.id!).productCartQuantity ? cartStore.isProductAlreadyInCart(props.id!).productCartQuantity : 1);
const cartActionButtonLabel = ref<string>("Add to cart");
const cartActionButtonIcon = ref<string>("fa-solid fa-cart-plus");

const handleCartButtonAction = (event: any) => {
    cartStore.handleProductCartAction(+event.currentTarget.dataset.productId, +event.currentTarget.dataset.productQuantity);
    updateCartActionButton();
}

const updateCartActionButton = (): void => {
    if (!cartStore.isProductAlreadyInCart(props.id!)) {
        cartActionButtonLabel.value = "Add to cart";
        cartActionButtonIcon.value = "fa-solid fa-cart-plus";
    } else if (!prodQuantity.value && cartStore.isProductAlreadyInCart(props.id!)) {
        cartActionButtonLabel.value = "Remove from cart";
        cartActionButtonIcon.value = "fa-solid fa-trash";
    } else if (prodQuantity.value && cartStore.isProductAlreadyInCart(props.id!) && prodQuantity.value !== cartStore.isProductAlreadyInCart(props.id!).productCartQuantity) {
        cartActionButtonLabel.value = "Update qty";
        cartActionButtonIcon.value = "fa-solid fa-pen";
    }
}

const changeProdQuantity = (event: any) => {
    if (event.currentTarget.dataset.action === ARITHMETIC_OPERATION.add) {
        prodQuantity.value++;
    }
    
    if (event.currentTarget.dataset.action === ARITHMETIC_OPERATION.subtract && prodQuantity.value) {
        prodQuantity.value--;
    }

    updateCartActionButton();
}

</script>

<template>
	<div
		class="flex flex-col items-center bg-white p-4 pb-6 rounded-3xl relative before:absolute before:content-[''] before:w-1/2 before:h-10 before:bg-white before:-top-5 before:left-1/2 before:rounded-[50%] before:-translate-x-1/2"
	>
		<div class="product-image flex justify-center h-56 w-56 mb-4">
			<img
				class="h-full object-contain rounded-3xl"
				v-lazy="props.image"
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
		<div class="actions flex items-center">
            <div class="quantity flex items-center mr-3">
                <button type="button" aria-label="Subtract from quantity" class="rounded-full shadow-md w-7 h-7 hover:bg-rose-200 active:bg-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500" data-action="subtract" @click="changeProdQuantity">
                    <font-awesome-icon class="text-base" icon="fa-solid fa-minus" />
                </button>
                <span class="mx-2">{{prodQuantity}}</span>
                <button type="button" aria-label="Add to quantity" class="rounded-full shadow-md w-7 h-7 hover:bg-sky-200 active:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500" data-action="add" @click="changeProdQuantity">
                    <font-awesome-icon class="text-base" icon="fa-solid fa-plus" />
                </button>
            </div>
			<div class="add-to-cart ml-3 relative before:absolute before:-left-3 before:content-[''] before:w-px before:h-full before:bg-slate-200">
				<button type="button"
					class="flex items-center border-solid border-2 border-slate-400 rounded-lg p-2 bg-white hover:bg-slate-200 active:bg-slate-400 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    :data-product-id="props.id"
                    :data-product-quantity="prodQuantity"
				    @click="handleCartButtonAction"
                >
					<font-awesome-icon class="text-2xl" :icon="cartActionButtonIcon" />
					<span class="text-sm leading-none ml-2">{{cartActionButtonLabel}}</span>
				</button>
                <p class="flex items-center justify-center w-6 h-6 border border-solid border-slate-300 absolute top-[-12px] right-[-4px] rounded-full bg-white text-sm text-center font-light text-slate-600">1</p>
			</div>
		</div>
	</div>
</template>
<style></style>
