<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

onMounted(() => {
    console.log("App.vue onMounted");
})

</script>

<template>
    <Navbar />
    <section class="view flex-grow px-2 sm:p-4 text-center text-xl">
        <RouterView />
    </section>
    <Footer class="footer px-2 py-4 sm:p-4 mt-8 text-center text-sm bg-sky-500"/>
</template>

<style scoped>

</style>
