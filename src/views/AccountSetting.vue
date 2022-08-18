<template>
    <h5>Profile Information</h5>
    <div class="d-lg-flex mt-3">
        <div>
            <input type="file" id="imageInput" class="d-none">
            <div class="imgBox border  rounded-circle bg-light text-center">
                <img src="../assets/profile.jpg" alt="profile photo" class="img-fluid rounded-circle">
            </div>
        
                <div class="mt-3"><label for="imageInput" class="border rounded p-2">
                    change profile picture
                </label>
                </div>
            
        </div>
    </div>
    <div class="d-lg-flex">
              <div class="mb-3 flex-fill mt-3 me-lg-4" :class="{ warning: v$.cridential.first_name.$error }">
  <label for="fname" class="form-label">First Name</label>
  <input type="text" class="form-control" id="fname" v-model="cridential.first_name">
   <span class="mt-1">{{v$.cridential.first_name.$errors[0]?.$message}}</span>
</div>
           <div class="mb-3 flex-fill mt-3" :class="{ warning: v$.cridential.last_name.$error }">
  <label for="lname" class="form-label">Last Name</label>
  <input type="text" class="form-control" id="lname" v-model="cridential.last_name">
   <span class="mt-1">{{v$.cridential.last_name.$errors[0]?.$message}}</span>
</div>
  
    </div>
    <div class="d-lg-flex">
         <div class="mb-3 flex-fill mt-3 me-lg-4" :class="{ warning: v$.cridential.phone_number.$error }">
  <label for="phone" class="form-label">Phone Number</label>
  <input type="tel" class="form-control" id="phone" v-model="cridential.phone_number">
   <span class="mt-1">{{v$.cridential.phone_number.$errors[0]?.$message}}</span>
</div>
 <div class="mb-3 flex-fill mt-3">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control" id="email" v-model="cridential.email">
</div>
    </div>
      <div class="d-lg-flex">
         <div class="mb-3 flex-fill mt-3 me-lg-4">
            <div>Gendor</div>
  <select class="form-select" aria-label="Default select example" v-model="cridential.sex">
  <option value="male">Male</option>
  <option value="female">Fmaile</option>
</select>
</div>
 <div class="mb-3 flex-fill mt-2">
  <label for="bdate" class="form-label">Birth Date</label>
  <input type="date" class="form-control" id="bdate" v-model="cridential.dob">
</div>
    </div>
    <div class="d-none d-lg-flex ">
        <button @click="accountSetting()" class="btn largeBtn text-white mb-3 ms-auto me-5">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Saving</span>
          </span>
          <span v-else>Save</span>
        </button>
 <p :class="{faild:isFaild,success:isSuccess}">{{notify}}</p>
    </div>
    <!-- for small device -->
     
        <button @click="accountSetting()" class="d-md-none btn text-white mb-3 mx-2 mt-2 w-100 ">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Saving</span>
          </span>
          <span v-else>Save</span>
        </button>
 <p :class="{faild:isFaild,success:isSuccess}">{{notify}}</p>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, helpers,email, minLength,maxLength } from "@vuelidate/validators";
import apiClient from '../resource/baseurl';
export default {
    data() {
        return {
            v$: useValidate(),
            cridential:{},
            notify:'',
            isLoading:false,
            isFaild:false,
            isSuccess:false,
        }
    },
     validations() {
    return {
        cridential:{
            first_name:{
                required:helpers.withMessage('first name is required',required)
            },
            last_name:{
                required:helpers.withMessage('last name is required',required)
            },
            phone_number:{
               required: helpers.withMessage("phone number is required", required),
          min: helpers.withMessage(
            "the minimum digit shuld be equal to 10",
            minLength(10)),
             max: helpers.withMessage( "the maximum digit shuld be equal to 10",maxLength(10)),
            },
            email:{
                email:helpers.withMessage('wrong email address',email)
            }

        }
        }
    },
    methods: {
        async accountSetting(){
               this.v$.$validate()
            if(!this.v$.cridential.$error){
                this.isLoading = true
                try{
                    var response = await apiClient.post('api/account_setting',this.cridential)
                if(response.status === 200){
                    this.notify = 'Your account is successfully edited'
                    this.isFaild = true
                    this.isSuccess = false
                }
                }
                catch(err){
                    this.isFaild = true
                    this.isSuccess = false
                    this.notify = 'Faild to edit your account'
                }
                finally{
                    this.isLoading = false
                }
            }
        }
    },
}
</script>
<style scoped>
.imgBox{
    min-width: 5rem;
    max-width: 5rem;
    min-height: 5rem;
    max-height: 5rem;
    overflow: hidden;
}
img{
    max-width: 100%;
    max-height: 100%;
}
.btn{
    background-color: #ff7e03;
    color: #fff;
}
.btn:hover{
    background-color: #fcc359;
}
.largeBtn{
    width:6rem
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
.faild{
    color: red;
}
.success{
    color: green;
}
</style>