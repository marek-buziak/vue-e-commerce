<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import { RouterLink, RouterView } from 'vue-router'
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const navbar = ref(null);
const h1 = ref(null)
console.log("navbar initially:", navbar.value);
onMounted(() => {
    console.log("navbar onMounted:", navbar.value);
    console.log("h1 onMounted:", h1.value);
})

</script>

<template>
    <Navbar ref="navbar"/>
    <RouterView />
    <Footer />
    <h1 ref="h1">Vue App</h1>
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
