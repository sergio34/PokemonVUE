<template>
  <div class="w-full flex justify-center items-center flex-col">
    <img alt="Vue logo" src="../assets/logo.png"/>
  </div>

  <div class="w-full grid md:grid-cols-6 gap-4 grid-cols-1 sm:grid-cols-3 px-5">
    <div v-for="index in 905" :key="index" >
      <PokeCard :id=index />
    </div>
  </div>
    

  
  
</template>

<script>
import PokeCard from '@/components/PokeCard.vue';
import PokeCardFlip from '@/components/PokeCardFlip.vue';

// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    PokeCard,
    PokeCardFlip
},
  data() {
    return {
      text: ''
    }
  },
  methods: {

  
  }
}
</script>
