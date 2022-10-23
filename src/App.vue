<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { RouterLink, RouterView } from 'vue-router'
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const navbar = ref(null);
const h1 = ref(null)
onMounted(() => {
    console.log("App.vue onMounted");
})

</script>

<template>
    <Navbar />
    <RouterView />
    <Footer />
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld message="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
  
</template>

<style scoped>

</style>
