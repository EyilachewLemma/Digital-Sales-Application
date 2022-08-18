<template>
  <router-view />
</template>
<script>
import apiClient from './resource/baseurl';
export default {
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
  },
  created() {
         this.$store.commit('setLang',localStorage.getItem('lang') || 'en') 
         if(localStorage.getItem('user')){   
      this.$store.commit("setUser", JSON.parse(localStorage.getItem('user')));
         }
         else{
          this.$store.commit("setUser",null)
         }
      var storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    this.$store.state.cartItems= storedCartItems || [];
     apiClient.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("utoken") || null}`;
     if(localStorage.getItem('isAuthorized')){    
      this.$store.commit("setIsAuthenticated", true);  
  
    }
   
  },
  unmounted() {
    if(!localStorage.getItem("rememberMe")){
        this.logout()
    }
  },
  methods: {
    async logout(){
        try{
      var response = await apiClient.post('api/logout')
      console.log('response status',response.status)
      if(response.status === 200){
            this.$store.commit('setUser', null)
      this.$store.commit('setIsAuthenticated', false)
       localStorage.removeItem("utoken");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthorized");
            this.$router.push({name:'Home'})
            this.$store.state.cartItems = [];
      }
    }
    catch(err){
      console.log("errors from logout path = ")
    }
    }
  },
};
</script>

<style>
#app {
  font-family: 'Mulish', sans-serif;
font-family: 'Roboto', sans-serif;
}
</style>
