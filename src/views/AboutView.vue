<template>
  <div class="flex flex-col justify-center w-full justify-items-center px-5 py-5 items-center">
    <h1 class="text-2xl">Pokédex</h1>
    
  </div>
  <div class="flex flex-row justify-center w-full justify-items-center px-5 py-5 items-center">
    
    <input v-model="search" type="text" class="rounded-md px-10 py-5 border-gray-700 ring-2 ring-slate-700"/>
    
    
  </div>

  <div class="flex flex-row justify-center justify-items-center  px-5 py-5 items-center w-full">
    
    
    <PokeStatus :id=search v-if="search" />

  </div>
</template>

<script>
import PokeCard from '@/components/PokeCard.vue';
import PokeStatus from '@/components/PokeStatus.vue';
export default {
    data() {
      return {
        search:'',
        
      }
      
    },
    components: {
    PokeCard,
    PokeStatus
},
    methods: {

    }

}
</script>

<style>

</style>
