<template>
  
  <div class="w-full bg-white/70 py-5">
    <nav class="w-full px-5 flex flex-row justify-around justify-items-center gap-20">
      <router-link to="/" class="hover:scale-125 hover:text-white bg-red-600 px-20 py-5 rounded-md transition-all">Home</router-link>

      <router-link to="/fighter" class="hover:scale-125 hover:text-white bg-red-600 px-20 py-5 rounded-md transition-all">Fighter</router-link>

      <router-link to="/about" class="hover:scale-125 hover:text-white bg-red-600 px-20 py-5 rounded-md transition-all">Search</router-link>
    </nav>
  </div>
  <router-view/>
</template>

<style>
body{
  background-color: dimgray;
}
</style>
