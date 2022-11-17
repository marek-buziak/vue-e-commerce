<script setup lang="ts">
    import { ref } from "vue";
    const emit = defineEmits(['closeCart']);

    const handleCloseCart = () => {
        emit('closeCart');
    };
</script>

<template>
    <aside class="flex flex-col p-2 sm:p-4 bg-white">
        <div class="close-cart flex justify-end lg:hidden">
            <button type="button" class="leading-none" aria-label="Close cart" @click="handleCloseCart">
                <font-awesome-icon class="text-2xl text-slate-600" icon="fa-solid fa-xmark" />
            </button>
        </div>
    </aside>
</template>