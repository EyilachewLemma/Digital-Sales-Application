<template>
  <div class="wraper d-flex justify-content-center">
    <div v-if="isPhoneField" class="phoneInput mt-5 mx-3">
      <h4 class="text-center fw-bold mt-lg-5">
        <span class="rensys">RENSYS</span>
        <span class="engineering">ENGINEERING</span>
      </h4>
      <div class="border rounded shadow-sm px-3 py-4 bg-white">
         <div class="mt-3" :class="{ warning: v$.phone.$error }">
            <label for="loginphone" class="form-label">{{$t("phoneNumber",$store.getters.lang)}}</label>
            <vue3-phone-input
              class="p-0"
              v-model="phone"
              outlined
              id="loginphone"
            />
            <span
              v-if="v$.phone.$error && !phone?.isValid"
              class="error-msg mt-1"
            >invalid phone number</span>
          </div>
        <div class="form-check mt-2">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="keepmesignedin"
            v-model="keepMeLogedIn"
          />
          <label class="form-check-label" for="keepmesignedin">
            {{$t('keepMeLogedIn',$store.getters.lang)}}
          </label>
        </div>
        <button @click="gotoNameField()" class="btn mt-2 nextBtn w-100">
          {{$t('next',$store.getters.lang)}}
        </button>
      </div>
    </div>
    <!-- name fields -->
    <div v-if="isNameField" class="nameInput mx-3 mt-5 mt-lg-3 mb-lg-5 overflow-auto">
      <div class="text-center">
        <span class="rensys"
          >{{ phone?.number }}
          <span @click="editPhineNumber()" class="ms-2"
            ><i class="fas fa-pen editIcon"></i></span
        ></span>
      </div>
      <div class="border rounded shadow-sm mt-2 px-3 py-4 bg-white">
        <div class="mb-3" :class="{ warning: v$.first_name.$error }">
          <label for="name" class="form-label">{{$t('firstName',$store.getters.lang)}}</label>
          <input
            type="tel"
            class="form-control"
            id="name"
            aria-label="Text input with select field"
            v-model="first_name"
          />
          <span class="mt-1">{{ v$.first_name.$errors[0]?.$message }}</span>
        </div>
        <div class="mb-3" :class="{ warning: v$.last_name.$error }">
          <label for="name" class="form-label">{{$t('lastName',$store.getters.lang)}}</label>
          <input
            type="tel"
            class="form-control"
            id="name"
            aria-label="Text input with select field"
            v-model="last_name"
          />
          <span class="mt-1">{{ v$.last_name.$errors[0]?.$message }}</span>
        </div>
         <div class="mb-3" :class="{ warning: v$.password.$error }">
          <label for="name" class="form-label">{{$t('password',$store.getters.lang)}}</label>
          <input
            type="password"
            class="form-control"
            id="name"
            aria-label="Text input with select field"
            v-model="password"
          />
          <span class="mt-1">{{ v$.password.$errors[0]?.$message }}</span>
        </div>
         <div class="mb-3" :class="{ warning: v$.passwordConfirm.$error }">
          <label for="name" class="form-label">{{$t('confirmPassword',$store.getters.lang)}}</label>
          <input
            type="password"
            class="form-control"
            id="name"
            aria-label="Text input with select field"
            v-model="passwordConfirm"
          />
          <span class="mt-1">{{ v$.passwordConfirm.$errors[0]?.$message }}</span>
        </div>
        <div class="form-check mt-2" :class="{ warning: v$.agreement.$error }">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="keepmesignedin"
            v-model="agreement"
          />
          <label class="form-check-label" for="keepmesignedin">
            I agree to the
            <router-link to="#">Terms of service</router-link> and
            <router-link to="#">Privacy Policy</router-link>
          </label>
          <br>
          <span class="mt-1">{{ v$.agreement.$errors[0]?.$message }}</span>
        </div>
        <div class="d-grid gap-2">
        <button @click="registerUser()" class="btn text-white mt-2 nextBtn w-100" type="submit">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>{{$t('submiting',$store.getters.lang)}}</span>
          </span>
          <span v-else>{{$t('submit',$store.getters.lang)}}</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
      </div>
    </div>
    <!-- finish field -->
    <div v-if="isFinishField" class="codeInput mx-3 mt-5">
      <div class="text-center">
        <span class="rensys"
          >{{ phone?.number }}
          <span @click="editPhineNumber()" class="ms-2"
            ><i class="fas fa-pen editIcon"></i></span
        ></span>
      </div>
      <div class="border rounded shadow-sm mt-2 px-3 py-4 bg-white">
        <div class="mb-3 p-2 codeSent">
          We have sent a login code via sms to you
        </div>
        <div class="mb-3" :class="{ warning: v$.loginCode.$error }">
          <label for="lname" class="form-label">Confirm the Code</label>
          <input
            type="tel"
            class="form-control"
            id="lname"
            ref="codeInput"
            aria-label="Text input with select field"
            v-model="loginCode"
          />
          <span class="mt-1">{{ v$.loginCode.$errors[0]?.$message }}</span>
        </div>
           <div class="d-grid gap-2">
        <button @click="login()" class="btn text-white mt-2 nextBtn w-100" type="submit">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>{{$t('submiting',$store.getters.lang)}}</span>
          </span>
          <span v-else>{{$t('login',$store.getters.lang)}}</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
   
      </div>
    </div>
  </div>
</template>
<script>
import Vue3PhoneInput from "vue3-phone-input";
import apiClient from "../resource/baseurl";
import useValidate from "@vuelidate/core";
import { required, maxLength, helpers, sameAs } from "@vuelidate/validators";
export default {
  components:{
    Vue3PhoneInput
  },
  data() {
    return {
      v$: useValidate(),
      isPhoneField: true,
      isNameField: false,
      isFinishField: false,
      phone_no: "",
      keepMeLogedIn: true,
      first_name: "",
      last_name:'',
      password:'',
      passwordConfirm:'',
      countryCode:'+251',
      agreement: "",
      loginCode: "",
      otpCode:'',
      notify:'',
      isFail:false,
      isLoading:false,
      regularPhoneNo:'',
      phone:''

      
    };
  },
  validations() {
    return {
      phone:{required:helpers.withMessage('required',required)},
      first_name: {
        required: helpers.withMessage("first name is required", required),
        max:helpers.withMessage('first name must be less than 15 characters',maxLength(15))
      },
       last_name: {
        required: helpers.withMessage("last name is required", required),
        max:helpers.withMessage('last name must be less than 15 characters',maxLength(15))
      },
      agreement: {
        required: helpers.withMessage(
          "you must agree with the policy and privacy terms",
          required
        ),
      },
       password:{
         required: helpers.withMessage(
          "password is required",required),
      },
      passwordConfirm:{
         required: helpers.withMessage(
          "password is required",
          required
        ),
        same:helpers.withMessage('password does not mutch',sameAs(this.password))
      },
      loginCode: {
        required: helpers.withMessage("login code is required", required),
      },
    };
  },
  created() {
    
    this.$store.commit('setLang',localStorage.getItem('lang'))
  },
   watch:{
       keepMeLogedIn(value){
        localStorage.setItem('rememberMe',value)
         console.log('is keep me loged in =',value)
       }

  },
  methods: {
    editPhineNumber() {
      this.isNameField = false;
      this.isFinishField = false;
      this.isPhoneField = true;
    },
    gotoNameField() {
      this.v$.$validate();
      if (!this.v$.phone.$error && this.phone?.isValid) {
        this.isPhoneField = false;
        this.isNameField = true;
        this.v$.$reset();
      }
    },
   async  registerUser() {
    
    this.notify = ''
      this.v$.$validate();
       var user = {
            phone_number: this.phone?.number,
            first_name: this.first_name,
            last_name: this.last_name,
            password:this.password

            }
            try{
      if (!this.v$.first_name.$error && !this.v$.last_name.$error && !this.v$.agreement.$error && !this.v$.password.$error && !this.v$.passwordConfirm.$error) {
           this.isLoading = true
          var response = await apiClient.post("/api/users", user);
          if (response.status === 201) {
             console.log('response from user added = ',response.data)
            this.isNameField = false;
            this.isFinishField = true;
          }
        this.v$.$reset();
        window.requestAnimationFrame(() => this.$refs.codeInput.focus());
        
      }
            }
            catch(err){
              this.notify = 'Faild to send your information'
            }
            finally{
              this.isLoading = false
            }
    },
    async login() {
      this.notify = "";
      this.v$.$validate();
      if (!this.v$.loginCode.$error) {
        this.isLoading = true;       
        var userCrediantail={
          phone_number:this.phone?.number,
          code:this.loginCode
        }        
        try {
          var response = await apiClient.post("/api/verify_otp",userCrediantail);
          if (response.status === 200 && response.data.user.verified === 1) {
            console.log('response from user added = ',response.data)
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.access_token}`;
            // this.$store.commit("setToken", response.data.access_token);
            this.$store.commit("setUser", response.data.user);
            this.$store.commit("setIsAuthenticated", true);
            let user = response.data.user;
            localStorage.setItem("utoken", response.data.access_token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isAuthorized", true);

            let toPath = this.$route.query.to || "/";
            this.$router.push(toPath);
          } else {
            throw "faild" + response.status;
          }
        } catch (e) {
          this.isFail = true
          this.notify = "Faild to verify";
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>
<style scoped>
.rensys {
  color: #ff7e00;
}
.engineering {
  color: #84bd3a;
}
.wraper {
  min-width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
}
/* .phoneInput,
.nameInput,
.codeInput {
  width: 30%;
  margin-top: 10%;
} */
.codeSent {
  border: 1px solid #ff7e00;
  background-color: rgb(228, 253, 253);
}
.phoneEntry,
.codeSent {
  border: 1px solid #ff7e00;
}
select {
  border: none;
  max-width: 6rem;
  box-shadow: none !important;
  appearance: none!important;
}
#phoneNo {
  border: none;
  box-shadow: none !important;
}
input {
  background-color: #fff;
}
.form-check-input {
  background-color: #ff7e00;
  color: #fff;
  box-shadow: none !important;
  border: none;
}
.nextBtn {
  background-color: #ff7e00;
  color: #fff;
}
.editIcon:hover {
  cursor: pointer;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
.fail{
  color:red
}
@media (min-width: 992px) {
  .phoneInput
   {
    width: 30%;
    margin-top: 10%;
  }
} 

</style>
