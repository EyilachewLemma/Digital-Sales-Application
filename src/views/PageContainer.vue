<template>
  <div class="mainContainer">
    <div class="d-flex justify-content-md-between mx-2 mx-lg-3">
      <div class="d-flex">
         <router-link to="#" class="text-decoration-none text-dark"
        ><span class="fs-5 me-3"><i class="fas fa-phone"></i> <span class="smallText">8544</span></span
      ></router-link>
      <router-link to="#" class="text-decoration-none text-dark"
        ><span class="fs-4 me-3"
          ><i class="fas fa-envelope"></i> <span class="smallText"><i>rensysengineering@gmail.com</i></span></span
      ></router-link>
      </div>
      <div class="d-flex d-none d-md-block">
         <a href="https://www.facebook.com/rensysengineering8544/" class="text-dark"
        ><span class="fs-4 me-3"><i class="fa-brands fa-facebook"></i></span
      ></a>
      <router-link to="#" class="text-dark"
        ><span class="fs-4 me-3"
          ><i class="fa-brands fa-twitter-square"></i></span
      ></router-link>
      <router-link to="#" class="text-dark"
        ><span class="fs-4 me-3"
          ><i class="fa-brands fa-instagram-square"></i></span
      ></router-link>
      <router-link to="#" class="text-dark">
        <span class="fs-4 me-3"
          ><i class="fa-brands fa-youtube-square"></i></span
      ></router-link>
      </div>
    </div>
    <TheHeader />
    <CategoryHeader />
    <router-view />
    <TheFooter />
    <!-- Loading spinner component -->
    <div
          v-if="isLoading"
          class="loading-screen route-loading p-0 position-fixed top-0 start-0 bottom-0 end-0 w-100 h-100 bg-white"
        >
          <div class="loading-spinner d-flex justify-content-center mt-5">
            <img src="../assets/loading-spiner.gif" alt="slow connection" />
          </div>
        </div>
  </div>



    
</template>
<script>
// import WaitingPage from "./WaitingPage.vue";
import CategoryHeader from "../components/CategoryHeader.vue";
import TheHeader from "../components/TheHeader.vue";
import TheFooter from "../components/TheFooter.vue";
export default {
  components: {
    CategoryHeader,
    TheHeader,
    TheFooter,
    // WaitingPage
  },
  computed:{
    isLoading(){
      return this.$store.getters.isLoading
    },
     lang(){
      return this.$store.getters.lang
    }
  },
  created() {
    var selectedLang = this.$store.getters.lang || 'en'
    this.$store.dispatch("featchFeaturedProduct",selectedLang);
    this.$store.dispatch("featchCategories");
    this.$store.dispatch('featchStores',selectedLang)
    this.$store.dispatch('featchPaymentMethods')
    this.$store.dispatch('featchLanguage')
  },
  watch:{
    lang(newValue){
       this.$store.dispatch("featchFeaturedProduct",newValue);
       this.$store.dispatch('featchStores',newValue)
    }
  }
};
</script>

<style>
.mainContainer {
  background-color: #fff;
}
.smallText{
  font-size: 1rem;
}
</style>
