<template>  
   <div class="d-flex mt-4 mx-2 mx-lg-4 mb-4">
      <div class="sideMenu me-3 d-none d-lg-block">
       <div>
        <router-link :to="{name:'MyOrder'}" class="d-flex align-items-center px-4">
         <span class="fs-4 me-3"><i class="fa-solid fa-cart-shopping"></i></span>
         <span>{{$t("order",$store.getters.lang)}}</span>
        </router-link>
        </div>
       <div class="mt-3">
        <router-link :to="{name:'SetAccount'}" class="d-flex align-items-center px-4">
          <span class="fs-4 me-3"><i class="fa-solid fa-circle-user"></i></span>
        <span>{{$t("account",$store.getters.lang)}}</span>
        </router-link>
        </div>
       <div class="mt-3">
        <router-link :to="{name:'ChangePassword'}" class="d-flex align-items-center px-4">
         <span class="fs-4 me-3"><i class="fa-solid fa-lock"></i></span>
        <span>{{$t("changePassword",$store.getters.lang)}}</span>
        </router-link>
        </div>
         <div class="mt-3 ms-3 logoutDiv" @click="logout()">
            <span class="fs-4 me-3"><i class="fa-solid fa-arrow-up-from-bracket logout"></i></span>
            <span>{{$t("logout",$store.getters.lang)}}</span>
            </div>
       
    </div>
    <div class="routerView flex-fill p-lg-3">
         <router-view />
    </div>
   </div>
</template>
<script>
import apiClient from '../resource/baseurl'
export default {
    components:{
        
    },
    data() {
        return {
        }
    },
    
    methods: {
            async logout() {
    try{
      var response = await apiClient.post('api/logout')
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
      console.log(err)
    }
       }
    },
}
</script>
<style scoped>
.sideMenu{
    width: 18%;
    min-height: 75vh;
}
.active{
    background-color: rgb(225, 227, 227);
}
a{
    text-decoration: none;
    color: black;
}
.logout{
    transform: rotate(-90deg);
}
.logoutDiv:hover{
    cursor: pointer;

}
</style>