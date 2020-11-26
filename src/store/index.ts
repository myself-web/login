import Vue from "vue";
import Vuex from "vuex";
// import {getData} from '../../api/index.js'
import axios from 'axios'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    admin:{}
  },
  mutations: {
    loginStates(state,payload){
      console.log('state',state)
      console.log('payload',payload)
      state.admin = payload
      localStorage.setItem('admin',JSON.stringify(payload))
    }
  },
  actions: {
    loginStates({commit}){
      const token = localStorage.getItem('token')
      if(!token){
        return
      }
      axios.post('http://localhost:1999/getuserData',{token:token}).then(data=>{
        console.log(data)
        if(data.data.code === 200){
          commit('loginStates',data.data)
        }else{
          localStorage.removeItem('token')
          localStorage.removeItem('admin')
        }
      })
    }
  },
  modules: {}
});
