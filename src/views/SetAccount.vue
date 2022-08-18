<template>
  <div class="px-2 bg-white">
      <h5>{{$t("setAccount",$store.getters.lang)}}</h5>
      <!--  -->
      <div class="addressBox d-flex border rounded shadow-sm p-3 p-lg-4">
        <div>
          <span class="fw-bold">{{user?.first_name+' '+user?.last_name}}</span>
          <span class="phone">({{user?.phone_number}})</span>
          <p>{{user?.user_region+"/"+user?.user_zone+'/'+user?.user_woreda}}</p>
        </div>

        <div class="ms-auto">
            <button @click="editAddress()" class="editBtn fs-4"><i class="far fa-edit"></i> {{$t("edit",$store.getters.lang)}}</button>
        </div>
          
      </div>

      <!--  -->
      
      <div v-if="isEditAddress" class="row mt-4">
              <div class="mb-3 col-lg-6" :class="{ warning: v$.address.first_name.$error }">
  <label for="fname" class="form-label">{{$t("firstName",$store.getters.lang)}}</label>
  <input type="text" class="form-control" id="fname" v-model="address.first_name">
   <span class="mt-1">{{v$.address.first_name.$errors[0]?.$message}}</span>
</div>
           <div class="mb-3 col-lg-6" :class="{ warning: v$.address.last_name.$error }">
  <label for="lname" class="form-label">{{$t("lastName",$store.getters.lang)}}</label>
  <input type="text" class="form-control" id="lname" v-model="address.last_name">
   <span class="mt-1">{{v$.address.last_name.$errors[0]?.$message}}</span>
</div>
          <div class="mb-3 col-lg-6" :class="{ warning: v$.address.user_region.$error }">
            <label for="region" class="form-label"
              >{{$t("region",$store.getters.lang)}}</label
            >
            <input
              type="text"
              class="form-control"
              id="region"
              v-model="address.user_region"
            />
            <span class="mt-1">{{
              v$.address.user_region.$errors[0]?.$message
            }}</span>
          </div>
          <div class="mb-3 col-lg-6" :class="{ warning: v$.address.user_zone.$error }">
            <label for="zone" class="form-label">{{$t("zone",$store.getters.lang)}}</label>
            <input
              type="text"
              class="form-control"
              id="zone"
              v-model="address.user_zone"
            />
            <span class="mt-1">{{
              v$.address.user_zone.$errors[0]?.$message
            }}</span>
          </div>
          <div class="mb-3 col-lg-6" :class="{ warning: v$.address.user_woreda.$error }">
            <label for="region" class="form-label"
              >{{$t("woreda",$store.getters.lang)}}</label
            >
            <input
              type="text"
              class="form-control"
              id="region"
              v-model="address.user_woreda"
            />
            <span class="mt-1">{{
              v$.address.user_woreda.$errors[0]?.$message
            }}</span>
          </div>
          <div class="col-lg-6 mt-2">
            <div class="d-grid gap-2 mt-3">
        <button @click="submitAddress()" class="btn text-white py-1 submitBtn mt-2" type="submit">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>{{$t("submiting",$store.getters.lang)}}</span>
          </span>
          <span v-else>{{$t("submit",$store.getters.lang)}}</span>
        </button>
        <p class="text-center small" :class="{success:isSuccess,fail:isFail}">{{ notify }}</p>
      </div>
          </div>
        
      </div>     
   
  </div>
</template>
<script>
import apiClient from "../resource/baseurl";
import useValidate from "@vuelidate/core";
import { required,helpers } from "@vuelidate/validators";
// import apiClient from "../resource/baseurl";
export default {
  data() {
    return {
      v$: useValidate(),
     
      address: {
      },
      // countryCode:'+251',
      isEditAddress:false,
      notify:'',
      isLoading:false,
      isSuccess:false,
      isFail:false,
          };
  },
  validations() {
    return {
      address: {
        first_name:{
                required:helpers.withMessage('first name is required',required)
            },
            last_name:{
                required:helpers.withMessage('last name is required',required)
            },
        user_zone: {
          required: helpers.withMessage("zone is required", required),
        },
        user_region: {
          required: helpers.withMessage("your region is required", required),
        },
        user_woreda:{
          required: helpers.withMessage("your woreda is required", required),
        },     
       
      },
    };
  },
   computed: {
    user(){
      return this.$store.getters.user
    },
   
  },
  created(){
    this.address.first_name = this.user?.first_name
    this.address.last_name = this.user?.last_name
    this.address.user_region = this.user?.user_region
    this.address.user_zone = this.user?.user_zone
    this.address.user_woreda = this.user?.user_woreda
  },
  methods: { 
    editAddress(){
      this.isEditAddress = !this.isEditAddress
      this.v$.$reset()
    },
  async submitAddress(){
    this.notify = ''
  this.v$.address.$validate()
  if(!this.v$.address.$error){
      this.isLoading = true
      // this.address.phone_number = this.countryCode+this.address.phone_no
    try{
    var response = await apiClient.put(`api/users/${this.user.id}`,this.address)
    if(response.status === 200){
      this.notify = 'your address is successfully saved'
      this.isSuccess = true
      this.isFail = false
      this.$store.commit('setUser',response.data)
      localStorage.setItem('user',JSON.stringify(response.data))
    }
    }
    catch(err){
      this.notify = 'faild to save your address'
      this.isSuccess = false
      this.isFail = true
    }
    finally{
      this.isLoading = false
    }
  }
  }
  
  },
};
</script>
<style scoped>
.submitBtn {
  background-color: #ff7e03;
  color: #fff;
}
.submitBtn:hover{
  background-color: #ffb875;
}
.phone{
  color: #ff7e03;
}
.warning input {
  border: 1px red solid;
}

.warning span {
  display: inline;
  color: red;
}
.editBtn{
  background: none;
  border: none;
  color: #ff7e03;
}
.editBtn:hover{
  color: #ffbc03;
}
.telSelect{
  max-width: 6rem;
  border-right: none;
  box-shadow: none!important;
}
.warning .telSelect{
  border-color: red;
}
#poneNo{
  border-left: none;
  box-shadow: none!important;
}
.success{
  color: green;
}
.fail{
  color: red;
}
@media (min-width: 992px) {
  .address {
    min-width: 50%;
    max-width: 50%;
  }
  .addressBox{
    width: 70%;
  }
}
</style>
