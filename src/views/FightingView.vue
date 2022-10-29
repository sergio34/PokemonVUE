<template>
    <div v-if="!start">
        <div class="w-full h-screen flex flex-row justify-center justify-items-center">
            <div class="flex flex-col justify-center justify-items-center gap-3">
                <input v-model="player1" type="text" placeholder="Player 1"/>
                <input v-model="player2" type="text" placeholder="Player 2"/>
                <button @click="startGame" class="bg-green-400 rounded-md py-2 px-6">START</button>  
            </div>

        </div>
    </div>
    <div v-else>
        <div v-if="!endGame" class="w-full py-4 flex flex-row justify-center justify-items-center">
            <p v-if="numSelect==0" class="w-[50%] px-10 py-3 bg-blue-600">
                
                PLayer 1: {{player1}}
            </p>
            <p v-else class="w-[50%] px-10 py-3 bg-red-600">PLayer 2: {{player2}}</p>
            
        </div>
        <div v-if="endGame" class="w-full py-4 flex flex-row justify-center justify-items-center">

            <p class="w-[50%] px-10 py-3 bg-blue-600">
                <label v-if="score[0]>score[1]">👑</label>
                <label v-else>😦</label>
                PLayer 1: 
                {{player1}} Score: {{score[0]}}
            </p>

            <p class="w-[50%] px-10 py-3 bg-red-600">
                <label v-if="score[1]>score[0]">👑</label>
                <label v-else>😦</label>
                PLayer 2: 
                {{player2}}  Score: {{score[1]}}
            </p>
            
        </div>
        <div v-if="endGame" class="w-full flex flex-row justify-center justify-items-center">
            <button @click="resetAll" class="p-5 rounded-md bg-red-600 text-white">Reset Game</button>
        </div>
        <div class="w-full grid md:grid-cols-5 gap-4 grid-cols-1 sm:grid-cols-2 py-5 px-5">
            <PokeCardFlip v-for="index in listaPoke" :key="index" :id="index"/>
        </div> 
    </div>

</template>

<script>
import PokeCardFlip from '@/components/PokeCardFlip.vue';
import { mapActions, mapGetters } from 'vuex'
import store from '@/store/index.js';
export default {
    components: { PokeCardFlip },
    data() {
        return {
            listaPoke:[],
            numSelect:0,
            endGame:false,
            player1:'',
            player2:'',
            start:false,
            score:[0,0],

        }
    },
    methods: {
        startGame(){
            if(this.player1 && this.player2){
                this.start = true;
                this.generarListaPoke()
            }
        },
        resetAll(){
            this.resetGame();
            this.endGame=false;
            this.listaPoke=[];
            this.score=[0,0],
            this.generarListaPoke();
        },
        random(min, max){
            return Math.floor(Math.random() * (max - min)) + min
        },
        randomList(){
            console.log('Random')
            
        },
        
        
        generarListaPoke(){
            let numPoke = 1;
            while (numPoke <= 10) {
                let pokemon = this.random(1,905)
                if(!pokemon in this.listaPoke){
                    
                }else{
                    this.listaPoke.push(pokemon)
                    numPoke++;
                }  
            }
        },

        ...mapActions(['resetGame','resetSelect','addPokemon','addPokemonMuerte']),
    },
    computed: {
        ...mapGetters(['getNumSelected','getListaPoke'])
    },
    mounted() {
        //this.generarListaPoke()
    },
    watch: {

        getNumSelected: function (value){
            setTimeout(()=>{
               
            this.numSelect = value
            if(value == 2){
                let getLista = store.state.listaSelecionado
                //si el primer jugador saca una carta que tiene un ataque superior
                //a la defensa de la carta del segundo jugador , la carta del jugador numero 2 muere y se le pone un punto al primer 
                //jugador
                //si no se mira la carta del segundo jugador su ataque y si supera la defensa de
                //la carta del primer jugador muere la primera carta y se le suma un punto al segundo jugador
                //sino se matan mutuamente y consiguen punto los dos
                if(getLista[0].atack>getLista[1].def){
                    this.score[0]+=1
                    store.dispatch('addPokemonMuerte',getLista[1].id)
                }else if(getLista[1].atack>getLista[0].def){
                    this.score[1]+=1
                    store.dispatch('addPokemonMuerte',getLista[0].id)
                }else{
                    this.score[1]+=1
                    this.score[0]+=1
                    store.dispatch('addPokemonMuerte',getLista[0].id)
                    store.dispatch('addPokemonMuerte',getLista[1].id)
                }
                
                store.dispatch('resetSelect')
                if(store.state.listaMuerte.length >= 9){
                    this.endGame = true; 
                }
                this.listaPoke=this.listaPoke.sort(function(){return 0.5 - Math.random()});
            }
            },3000);
        }
    }
}


</script>

<style>

</style>