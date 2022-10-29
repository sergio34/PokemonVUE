import { createStore } from 'vuex'

export default createStore({
  state: {
    listaPoke:[],
    listaMuerte:[],
    listaSelecionado:[],
    numSelected:0,
    mostrar:false,
  },
  getters: {
    getListaPoke: state => {
      return state.listaPoke;
    },
    getListaMuerte: state => {
      return state.listaMuerte;
    },

    getListaSelecionado: state => {
      return state.listaSelecionado;
    },
    getNumSelected: state => {
      return state.numSelected;
    },
  },
  mutations: {
    setListaPoke:  ( state, payload ) => {
      state.listaPoke = payload;
    },
    setListaMuerte:  ( state, payload ) => {
      state.listaMuerte = payload;
    },
    setNumSelected:  ( state, payload ) => {
      state.numSelected = payload;
    },
    setListaSelecionado:  ( state, payload ) => {
      state.listaSelecionado = payload;
    },


    addListaMuerte: (state, payload)=>{
      state.listaMuerte.push(payload);
    },
    addPokemon: (state, payload)=>{
      state.listaSelecionado.push(payload);
      state.numSelected++;
    },
    resetGameValues: (state)=>{
      state.listaSelecionado=[];
      state.numSelected=0;
    },
    resetAllGameValues: (state)=>{
      state.listaMuerte=[];
      state.listaSelecionado=[];
      state.numSelected=0;
    }

  },
  actions: {
    resetGame (context) {
      context.commit('resetAllGameValues')
    },
    resetSelect (context) {
      context.commit('resetGameValues')
    },
    addPokemon ({ commit }, payload) {
      commit('addPokemon',payload)
    },
    addPokemonMuerte ({ commit }, payload) {
      commit('addListaMuerte',payload)
    },
  },
  modules: {
  }
})
