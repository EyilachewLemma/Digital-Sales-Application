<template>
  <div class="footer pt-4 pb-3">
    <div class="row mx-2 mx-lg-5 pb-2">
      <div class="col-lg-4">
        <div class="mb-2 textCenter">
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </div>
        <div class="mb-2 textCenter">
          <router-link :to="{ name: 'StoreLocator' }"
            >Store Locator</router-link
          >
        </div>
        <div class="mb-2 textCenter">
          <a href="http://rensysengineering.com/">About Us</a>
        </div>
        <div class="mb-2 mb-lg-0 textCenter">
          <a href="http://rensysengineering.com/contact-us/">Contact US</a>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="mt-4 mt-lg-2 textCenter">Shop</div>
        <div class="mb-2 textCenter" v-for="category in categories" :key="category.id">
           <button @click="gotoProductList(category.id)" class="footerBtn">{{category.title}}</button>
        </div> 
        
      </div>
      <div class="col-lg-4">
        <div class="mt-4 mt-lg-2 textCenter">Subscribe to our news letter</div>
        <div class="textCenter">Subscribe to our news letter to get latest</div>
        <div class="textCenter">Information in your inbox</div>
        <div class="mt-3 textCenter subscrib" :class="{warning:v$.emailAddress.$error}">
        <div class="input-group">
          <input
            type="email"
            class="form-control"
            placeholder="email address"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            v-model="emailAddress"
            @keyup.enter="subscribe()"
          />
          <button
            @click="subscribe()"
            class="btn subscribBtn"
            type="button"
            id="button-addon2"
          >
            Subscribe
          </button>
          </div>
          <span>{{v$.emailAddress.$errors[0]?.$message}}</span>
          </div>
      </div>
    </div>
    <hr />
    <div class="text-center mt-2">
      <a href="https://www.facebook.com/rensysengineering8544/"
        ><span class="fs-4 me-3"><i class="fa-brands fa-facebook"></i></span
      ></a>
      <a to="#"
        ><span class="fs-4 me-3"
          ><i class="fa-brands fa-twitter-square"></i></span
      ></a>
      <a to="#"
        ><span class="fs-4 me-3"
          ><i class="fa-brands fa-instagram-square"></i></span
      ></a>
      <a to="#">
        <span class="fs-4 me-3"
          ><i class="fa-brands fa-youtube-square"></i></span
      ></a>
    </div>
  </div>
</template>
<script>
import apiClient from '../resource/baseurl';
import { required, helpers,email } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
export default {
  props: {
  },
  data() {
    return {
      v$:useValidate(),
      emailAddress: "",
      queryObject:{
        per_page:20,
      }
    };
  },
  validations(){
    return {
      emailAddress:{
        required:helpers.withMessage('please enter your email address',required),
        email
      }
    }
  },
  computed:{
    user(){
      return this.$store.getters.user
    },
     categories(){
      return this.$store.getters.categories
    }
  },
  methods: {
    gotoProductList(id) {  
      
      this.queryObject.id = id
      this.queryObject.lang = localStorage.getItem('lang')
      this.$store.dispatch("featchProducts", this.queryObject);
          this.$store.commit('setCategoryId',id)       
      this.$router.push({ name: "SolarCategory", params: { id: id }});
    },
   async subscribe() {
           this.v$.$validate()  
      if(!this.v$.$error)  {
      try{
        var response = await apiClient.post(`api/subscribe`,{email:this.emailAddress})
        if(response.status === 200){
          this.user.is_subscribe = 0
           this.$toast.success('Thank you, We will inform you about new products and events')
        }
      }
      catch(err){
        console.log('error',err)
      }
   }
    },
  },
};
</script>
<style scoped>
.footer {
  background-color: #062539;
  color: #fff;
}
.subscribBtn {
  background-color: #ff7e00;
  color: #fff;
  z-index: 0;
}
a {
  text-decoration: none;
  color: #fff;
}
.fa-brands {
  color: #fff;
}
.footerBtn{
  background: none;
  border: none;
  color: #fff;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
@media (max-width: 992px) {
  .textCenter {
    text-align: center;
  }
  .subscrib {
    width: 80%;
    margin: auto;
  }
}

</style>
