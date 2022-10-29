<template>

<div :id="id" class="flip-card" @click="test">
    <div class="flip-card-inner " :style="styleObject">
        <div class="flip-card-front flex flex-col justify-center justify-items-center">
            <div class="w-full h-[48%] bg-red-700 rounded-t-md">

            </div>

            <div class="w-full h-[4%] bg-black flex justify-center justify-items-center">
                <div class="bg-black relative z-10 rounded-full h-[80px] w-[80px] -top-[35px] flex justify-center justify-items-center">
                    <div class="bg-white relative z-[11] rounded-full h-[60px] w-[60px] top-[10px]">
                    </div>
                </div>
            </div>
            <div class="w-full h-[48%] bg-white rounded-b-md">

        </div>
    </div>

    <div class="flip-card-back ">

        <div v-if="vivo" class="flex flex-col bg-white transition-all rounded-md h-full justify-items-center">
            
            <div class="flex flex-row w-full justify-center justify-items-center">
                <img :src="`${img}`" class="w-[200px] "/>
            </div>
            
            <h1 class="text-center text-2xl break-words capitalize">{{nombre}}</h1>
            <div class="w-full flex flex-row justify-center justify-items-center gap-4 pt-5">
                
                <div class="capitalize">Atack: {{atack}}</div>
                <div class="capitalize">Defen: {{def}}</div>
                
            </div>
            <div class="w-full flex flex-row justify-center justify-items-center gap-4 ">
                <div v-for="tipo in tipos" :key="tipo.id">
                    <div class="capitalize">{{tipo }}</div>
                </div>
            </div>
        </div>

        <div v-else class="flex flex-col bg-slate-500 transition-all rounded-md h-full justify-items-center">
            
            <div class="flex flex-col w-full justify-center justify-items-center">
                <div class="w-full flex flex-row justify-center justify-items-center">
                   <img :src="`${img}`" class="w-[150px] grayscale"/> 
                </div>
                
                <h1 class="text-center text-2xl break-words capitalize">==RIP==</h1>
                <h4 class="text-center text-2xl break-words capitalize">{{nombre}}</h4>
                <div class="w-full flex flex-row justify-center justify-items-center gap-4 pt-5">
                
                    <div class="capitalize">Atack: {{atack}}</div>
                    <div class="capitalize">Defen: {{def}}</div>
                
                </div>
            </div>
            
            
            
        </div>

    </div>
  </div>
</div>

</template>


<script>

import axios from 'axios';
import { mapActions, mapGetters } from 'vuex'
import store from '@/store/index.js';
export default {
    
    props: {
        id: {
            type: Number,
            default: 1,
        }, 
    },
    data() {
        return {
            idCard:this.id,
            nombre:'',
            img:'',
            tipos:[],
            styleObject: {
                transform: 'rotateY(0deg)'
            },
            IsActive:false,
            atack:null,
            def:null,
            vivo:true,
        }
    },
    computed: {
        ...mapGetters(['getNumSelected'])
    },
    methods: {
        ...mapActions(['resetGame','resetSelect','addPokemon']),
        test(){
            if(store.state.listaMuerte.length  >=  9){
                return true 
            }
            
            if(this.getNumSelected<2 && this.vivo){
                if(this.IsActive){
                    this.styleObject = {
                        transform: 'rotateY(0deg)'
                    }
                    this.IsActive=false;
                }else{
                    console.log('Card: '+this.idCard)
                    this.styleObject = {
                        transform: 'rotateY(180deg)'
                    }
                    this.IsActive=true;
                    this.addPokemon({id:this.idCard,atack:this.atack,def:this.def})
                }
            }
        },
        async getInfo(){
            this.img='https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png'
            this.name ='Buscando...'
            axios.get("https://pokeapi.co/api/v2/pokemon/"+this.idCard)
    
            .then(response => {
                var data = response.data
                this.nombre = data.name
                this.img = data.sprites.front_default
                this.atack=data.stats[1].base_stat
                this.def=data.stats[2].base_stat
                if (!this.img){
                    this.img='https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png'
                }
                var tips = []
                for (const x in data.types) {
                    tips.push(data.types[x].type.name)    
                }
                this.tipos = tips;
            })
            .catch(error => {
                this.img='https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png'
                this.name ='No encontrado'
            });
        },
        
    },
    mounted() {
        this.getInfo()
    },
    watch: {
        idCard: function () {
            console.log(this.idCard)
            this.getInfo() 
        },
        id: function (){
            this.idCard = this.id
        },
        getNumSelected: function (value){
           //dejamos un tiempo de 3 segundos para que se giren las 2 cartas
            setTimeout(()=>{
                if(this.vivo && (value == 0 || value == 2)){
                    
                    this.styleObject = {
                    transform: 'rotateY(0deg)'
                    }
                    this.IsActive=false;
                }

                for (let i = 0; i < store.state.listaMuerte.length; i++) {
                    
                    if(this.id == store.state.listaMuerte[i]){
                        console.log(store.state.listaMuerte[i])
                        this.vivo = false;
                        this.styleObject = {
                            transform: 'rotateY(180deg)'
                        }
                    } 
                }
                if(store.state.listaMuerte.length == 9){
                    this.styleObject = {
                        transform: 'rotateY(180deg)'
                    }
                    return true 
                }
            },3000);

            
            

            for (let i = 0; i < store.state.listaMuerte.length; i++) {
                
                if(this.id == store.state.listaMuerte[i]){
                    console.log(store.state.listaMuerte[i])
                    this.vivo = false;
                    this.styleObject = {
                        transform: 'rotateY(180deg)'
                    }
                } 
            }
            if(store.state.listaMuerte.length == 9){
                this.styleObject = {
                    transform: 'rotateY(180deg)'
                }
                return true 
            }
               
        }      
    },
}
</script>

<style>
.flip-card {
  background-color: transparent;
  width: 100%;
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;

  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

/* .flip-card:focus .flip-card-inner {
  transform: rotateY(180deg);
} */

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 300px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  /* background-color: #bbb; */

  
  color: black;
  
}

.flip-card-back {

  transform: rotateY(180deg);
}
</style>