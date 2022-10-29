<template>
  <div class="w-auto p-5 flex flex-row bg-green-300 justify-around justify-items-center gap-14 rounded-md">
    <div class="bg-white rounded-md flex flex-col justify-center items-center px-5">
        <img :src="img" class="w-[250px]"/>
        <p class="capitalize">{{name}}</p>
    </div>

    <div class="w-full flex flex-col gap-5">
        <div>
            Atack: {{atack}}
        </div>
        <div>
            Defense: {{defense}}
        </div>
        <div>
            Speed: {{speed}}
        </div>
        <div  class="flex flex-row w-full justify-center gap-10">
            <p>Tipos:</p>
            <div v-for="tipo in tipos" :key="tipo.id" class="capitalize">{{tipo }}</div>
        </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios';
export default {
   
   props: {
       id: {
           type: String,
           default: "1",
       },
       
   },
   data() {
       return {
           idCard:this.id,
           name:'',
           img:'',
           tipos:[],
           atack:null,
           defense: null,
           speed:null,
       }
   },
   methods: {
       async getInfo(){
            this.img='https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png'
            this.name ='Buscando...'
            this.atack='Buscando...'
            this.defense='Buscando...'
            this.speed='Buscando...'
           axios.get("https://pokeapi.co/api/v2/pokemon/"+this.idCard.toLowerCase())
     
               .then(response => {
                   var data = response.data
                   this.name = data.name
                   this.img = data.sprites.front_default
                   this.atack=data.stats[1].base_stat
                   this.defense=data.stats[2].base_stat
                   this.speed=data.stats[0].base_stat
                   var tips = []
                   for (const x in data.types) {
                       tips.push(data.types[x].type.name)    
                   }
                   this.tipos = tips;
               })
               .catch(error => {
               
                    this.img='https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png'
                    this.name ='Nombre no encontrado'
                    this.atack=''
                    this.defense=''
                    this.speed=''
                    this.tipos = [];
               });
       }
   },
   mounted() {
       this.getInfo()
   },
   watch: {
       idCard: function () {
           console.log(this.idCard)
           this.getInfo() 
       },
       id: function () {

           this.idCard = this.id

       }

   },
}
</script>

<style>

</style>