<template>
  <nav class="pb-2 pt-0 pb-lg-0">
    <div class="mx-3 d-none d-lg-flex align-items-center">
        <div class="me-2">
          <router-link :to="{name:'Home'}" class="navbar-brand">
         <span class="rensys">RENSYS</span
          ><span class="engineering">ENGINEERING</span>
        </router-link>
        </div>
        <div class="flex-fill me-3">
          <form class="mx-0">
          <div class="input-group" :class="{isFocused:isLoading}">
            <select
              class="form-select categoryselect"              
              aria-label="Default select example"
              v-model="selectedCategory"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.title }}
              </option>
            </select>
            <input
              type="text"
              id="searchBigScreen"
              class="form-control w-50 inputSearch text-white"
              placeholder="Search solars you want"
              aria-label="Text input with 2 dropdown buttons"
              v-model="searchBy"
            />
            <button
              @click="searchProduct()"
              class="btn searchbtn"
              type="button"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
        </div>
        
      <div class="d-flex align-items-center">
        <div class="mx-1 mt-2">
          <div>{{$t('language',$store.getters.lang)}}</div>
          <div>
            <select
              class="languageselect px-1"
              aria-label="Default select example"
              v-model="selectedLanguage"
              @change="changeLanguage($event)">
              <option v-for="language in languages" :key="language.id" :value="language.code">{{language.name}}</option>
            </select>
          </div>
        </div>
        <div class="veriticalline"></div>
        <div class="mx-1">
          <div v-if="!user" class="d-flex align-items-center routerLinke">
            <router-link class="mx-1" :to="{ name: 'Login' }"
              >{{$t('login',$store.getters.lang)}}</router-link
            >
            <router-link class="ms-1" :to="{ name: 'SignUp' }"
              >{{$t('signup',$store.getters.lang)}}</router-link
            >
          </div>
           <div v-if="user" class="dropdown">
            <button
              class="btn dropdownbtn text-white"
              type="button"
              id="account1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{$t('myAccount',$store.getters.lang)}}
              <div>{{user?.first_name+' '+user?.last_name}}</div>
            </button>
            <ul class="dropdown-menu py-0" aria-labelledby="account1">
              <li class="py-1">
              <router-link :to="{name:'MyOrder'}" class="ms-3 text-dark text-decoration-none">{{$t('orderHistory',$store.getters.lang)}}</router-link>
              </li>
              <li class="py-1">
              <router-link :to="{name:'SetAccount'}" class="ms-3 text-dark text-decoration-none">{{$t('accountSetting',$store.getters.lang)}}</router-link>
              </li>
              <li class="py-1">
              <router-link :to="{name:'ChangePassword'}" class="ms-3 text-dark text-decoration-none">{{$t('changePassword',$store.getters.lang)}}</router-link>
              </li>
              
              <li @click="logout()" class="py-2">
                <p class="ms-3 my-0">{{$t('logout',$store.getters.lang)}}</p>
              </li>
            </ul>
          </div> 
        </div>
        <!-- cart icon -->
        <div class="veriticalline"></div>
        <button
          @click="gotoCartItem()"
          type="button"
          class="btn cartbtn position-relative d-flex ms-2"
        >
          <div class="fs-3">
            <i class="fa-solid fa-cart-shopping"></i>
            <div
              class="bagetext position-absolute ms-4 mt-2 left-5 translate-middle px-1 border rounded-circle"
            >
              {{ numberOfCartItem }}
            </div>
          </div>
          <span class="ms-2">{{$t('cart',$store.getters.lang)}}</span>
        </button>
      </div>
      </div>

    <!-- for small device -->
    <div class="d-lg-none">
      <div class="d-flex align-items-center ms-2 mt-1">
        <router-link :to="{name:'Home'}" class="navbar-brand">
         <span class="rensys litelText">RENSYS</span
          ><span class="engineering litelText">ENGINEERING</span>
        </router-link>
        <div class="d-flex align-items-center ms-auto">
          <div class="dropdown px-0 m-0">
            <button
              class="btn loginbtn text-white dropdown-toggle px-0"
              type="button"
              id="account2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="icons"><i class="fa-solid fa-globe"></i></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="account2">
              <li v-for="language in languages" :key="language.id" @click="changeLanguageSm(language.code)"><span class="dropdown-item">{{language.name}}</span></li>
                   </ul>
          </div>
          <!-- cart icon -->
          <button
            @click="gotoCartItem()"
            type="button"
            class="btn loginbtn cartbtn position-relative mx-2"
          >
            <div class="icons">
              <i class="fa-solid fa-cart-shopping"></i>
              <div
                class="bagetext position-absolute ms-4 mt-2 left-5 translate-middle px-1 border rounded-circle"
              >
                {{ numberOfCartItem }}
              </div>
            </div>
          </button>

          <div v-if="!user" class="me-2 routerLinke">
            <router-link class="mx-1" :to="{ name: 'Login' }"
              >{{$t('login',$store.getters.lang)}}</router-link
            >
          </div>
          <!-- <router-link class="ms-1" to="#">{{$t('signup',$store.getters.lang)}}</router-link> -->

          <div v-if="user" class="dropdown">
            <button
              class="btn dropdownbtn accountbtn"
              type="button"
              id="account"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="icons"><i class="fa-solid fa-circle-user"></i></span>
            </button>
             <ul class="dropdown-menu py-0" aria-labelledby="account">
              <li class="py-1">
              <router-link :to="{name:'MyOrder'}" class="ms-3 text-dark text-decoration-none">{{$t('orderHistory',$store.getters.lang)}}</router-link>
              </li>
              <li class="py-1">
              <router-link :to="{name:'SetAccount'}" class="ms-3 text-dark text-decoration-none">{{$t('accountSetting',$store.getters.lang)}}</router-link>
              </li>
              <li class="py-1">
              <router-link :to="{name:'ChangePassword'}" class="ms-3 text-dark text-decoration-none">{{$t('changePassword',$store.getters.lang)}}</router-link>
              </li>
              
              <li @click="logout()" class="py-2">
                <span class="ms-3">{{$t('logout',$store.getters.lang)}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <form class="mx-2">
        <div class="input-group" :class="{isFocused:isLoading}">
          <select
            class="form-select categoryselect "
            aria-label="category selection"
            v-model="selectedCategory"
          >
            <option value="all">{{$t('category',$store.getters.lang)}}</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
          <input
            type="text"
            id="searchsm"
            class="form-control inputwidth text-white"
            placeholder="Search solars you want"
            aria-label="search input"
            v-model="searchBy"
          />
          <button @click="searchProduct()" class="btn searchbtn" type="button">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
    </div>
  </nav>
</template>
<script>
import apiClient from '../resource/baseurl';
export default {
  data() {
    return {
      selectedCategory: "",
      selectedLanguage: "en",
      searchBy: "",
      queryObject:{
        per_page:20,
      }
    };
  },
  created(){
    this.selectedLanguage = this.$store.getters.lang || 'en'
    this.selectedCategory = localStorage.getItem('cateId')
    this.queryObject.lang = this.$store.getters.lang || 'en'
    this.queryObject.id = localStorage.getItem('cateId')
    this.$store.dispatch("featchProducts",this.queryObject);
  },
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    categories() {
      return this.$store.getters.categories;
    },
    isLoading(){
      return this.$store.getters.isLoading
    },
    numberOfCartItem() {
      var totalProduct = 0;
      if(this.cartItems.length){
      this.cartItems.forEach((cartItem) => {
        totalProduct = totalProduct + cartItem.qty;
      });
      console.log("state product----",this.cartItems)
      return totalProduct;
      }
      return 0
      
    },
    user(){
      return this.$store.getters.user
    },
    isLegal(){
     return  this.$store.getters.isAuthenticated
    },
   languages(){
    return this.$store.getters.languages
   },
   categoryId(){
    return this.$store.getters.categoryId
   },
   defaultLang(){
    return this.$store.getters.lang
   },
   lang(){
    return this.$store.getters.lang
   }

  },
  watch:{
    categoryId(newValue){
        this.selectedCategory = newValue
    }
  },
  methods: {
    changeLanguage(event) {
      this.$store.commit('setLang',event.target.value)
      localStorage.setItem('lang',event.target.value)
    },
    changeLanguageSm(value){
      this.$store.commit('setLang',value)
      localStorage.setItem('lang',value)
    },
      gotoAccount() {
      this.$router.push({name:'MyOrder'})
    },
    async logout() {
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
   },
    gotoCartItem() {
      this.$router.push({ name: "CheckoutPage" });
    },
      async searchProduct() {
             this.$store.commit('setIsLoading', true)
            
            try {
                var response = await apiClient.get(`api/search_from_user/${this.selectedCategory}?lang=${this.lang}&per_page=${20}}&search=${this.searchBy}`);
                if (response.status === 200) {
                    this.$store.commit('setProducts', response.data);
                    console.log('product lists form search page =', response.data)
                    this.$router.push({ name: "SolarCategory", params: { id: this.selectedCategory}});

                }
            } 
             finally {
                this.$store.commit('setIsLoading', false)
                this.searchBy = ''
               
            }
            
        },
  },
};
</script>
<style scoped>
nav {
  background-color: #062539;
  border-bottom: 2px solid gainsboro;
  color: #fff;
}
.rensys {
  color: #ff7e00;
}
.engineering {
  color: #84bd3a;
}
.litelText {
  font-size: 0.8rem;
}
.bagetext {
  background-color: #ff7e00;
  font-size: 0.7rem;
  color: #fff;
  top: 10%;
}
.routerLinke a {
  text-decoration: none;
  color: #fff;
}
form {
  border: 1px solid gray;
  border-radius: 10rem;
}
.veriticalline {
  border-left: 3px solid rgb(208, 206, 206);
  height: 50px;
}
select,
input,
.searchbtn {
  box-shadow: none !important;
}
select {
  background-color: #062539;
  color: #fff !important;
  
}
input {
  background-color: #062539;
  /* color: black; */
}
input:focus{
   background-color: #062539;
}
.inputwidth {
  width: 42% !important;
}
.inputwidth:focus{
background-color: #062539;
}
.languageselect {
  border: none;
  appearance: none !important;
  box-shadow: none !important;
}
.categoryselect {
  border-top-left-radius: 10rem;
  border-bottom-left-radius: 10rem;
  z-index: 0;
}

.isFocused{
  z-index: -1;
}
.searchbtn {
  background-color: #ff7e00;
  color: #fff;
  border-top-right-radius: 10rem;
  border-bottom-right-radius: 10rem;
  z-index: 0;
}
li:hover {
  background-color: #ff7e00;
  color: #fff;
  cursor: pointer;
}
hr {
  padding: 0%;
  margin: 0%;
}
.dropdownbtn {
  border: none;
  box-shadow: none !important;
}
.loginbtn {
  border: none;
  background: none;
  box-shadow: none !important;
}
.cartbtn {
  color: #fff;
  box-shadow: none !important;
  border: none;
}
.cartbtn:hover {
  color: #fff;
}
.icons {
  color: #fff;
  font-size: 1rem;
}
</style>
