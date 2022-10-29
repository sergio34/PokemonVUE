<template>
<!-- creacion del tyemplate, solo de una carta -->
  <div class="flex flex-col rounded-md justify-center justify-items-center bg-white w-full h-auto hover:scale-105 transition-all pb-5 flex-1">
    <!-- ponemos la imagen del pokemon -->
    <img :src="`${img}`"/>
    <!-- aqui escribimos la variable nombre -->
    <h1 class="text-center text-2xl break-words capitalize">{{nombre}}</h1>
   
    
    <div class="w-full flex flex-row justify-center justify-items-center gap-4 pt-5">
        <!-- aqui ponemos el id para identificar los componentes de un bucle -->
        <div v-for="tipo in tipos" :key="tipo.id">

            <div class="capitalize">{{tipo }}</div>
        </div>
    </div>
    
  </div>
</template>


<script>

import axios from 'axios';

export default {
   
    props: {
        //generar una propiedad id
        id: {
            type: String,
            //por defecto vale 1
            default: "1",
        },
        
    },
    data() {
        //para obtener todas las variables reacctivas, estas pueden ponerse en el template
        return {
            idCard:this.id,
            nombre:'',
            img:'',
            tipos:[]
        }
    },
    methods: {
        //aqui estaran todas las funciones
        async getInfo(){
            this.img='https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png'
            this.name ='Buscando...'
            axios.get("https://pokeapi.co/api/v2/pokemon/"+this.idCard)
      
                .then(response => {
                    var data = response.data
                    this.nombre = data.name
                    this.img = data.sprites.front_default
                    if (!this.img){
                        this.img='https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png'
                    }
                    var tips = []
                    for (const x in data.types) {
                        //coger el tipo o tipos del pokemon
                        tips.push(data.types[x].type.name)    
                    }
                    this.tipos = tips;
                })
                .catch(error => {
                    //si sucede un error
                    this.img='https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png'
                    this.name ='No encontrado'
                });
        }
    },
    mounted() {
        //cuando esta cargado el componente llamamos a la funcion getinfo
        this.getInfo()
    },
   
}
</script>

<style>

</style>