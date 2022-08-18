<template>
<div class="mx-3">
  <div class="wraper mx-auto border rounded px-3 pt-lg-3 mt-5">
    <h4 class="mt-2 text-center fw-bold">
         <span class="rensys">RENSYS</span>
          <span class="engineering">ENGINEERING</span>
    </h4>

    <!-- loign form -->
  <div v-if="!isForgotForm">
    <form v-if="!isForgotSelected" class="pt-1" @submit.prevent="login()">
     <div class="mt-3 position-relative" :class="{ warning: v$.phone.$error }">
            <label for="loginphone" class="form-label">{{$t("phoneNumber",$store.getters.lang)}}</label>
            <vue3-phone-input
              class="p-0  phneInputField"
              v-model="phone"
              outlined
              id="loginphone"
            />
            <span
              v-if="v$.phone.$error && !phone?.isValid"
              class="error-msg mt-1"
            >invalid phone number</span>
          </div>
      <div
        class="mb-4 passwordInputField mt-5"
        :class="{ warning: v$.userCrediantail.password.$error }"
      >
        <label for="#password" class="form-label">{{$t("password",$store.getters.lang)}}</label>
        <div class="d-flex position-relative">
          <input
            class="form-control"
            v-model="userCrediantail.password"
            id="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            aria-label=".form-control-lg"
            @blur="v$.userCrediantail.password.$touch"
          />
          <i
            @click="toggleShowPassword"
            class="position-absolute end-0 mx-2 mt-2 far"
            :class="isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'"
          ></i>
        </div>
        <span
          class="error-msg mt-1"
          v-for="(error, index) of v$.userCrediantail.password.$errors"
          :key="index"
          >{{ error.$message + ", " }}</span
        >
      </div>

      <div class="d-grid gap-2">
        <button class="btn text-white" type="submit">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>{{$t("signing",$store.getters.lang)}}</span>
          </span>
          <span v-else>{{$t("login",$store.getters.lang)}}</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
    </form>

    <!-- forgot password form -->
    <form v-if="isForgotSelected" class="pt-1" @submit.prevent="forgotPassword()">
     <div class="mt-3 w-100" :class="{ warning: v$.phone.$error }">
            <label for="loginphone" class="form-label">{{$t("phoneNumber",$store.getters.lang)}}</label>
            <vue3-phone-input
              class="p-0 forgotPhoneInput"
              v-model="phone"
              outlined
              id="loginphone"
            />
            <span
              v-if="v$.phone.$error && !phone?.isValid"
              class="error-msg mt-1"
            >invalid phone number</span>
          </div>

      <div class="d-grid gap-2 mt-3">
        <button class="btn text-white" type="submit">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>{{$t("forgotPassword",$store.getters.lang)}}</span>
          </span>
          <span v-else>{{$t("forgotPassword",$store.getters.lang)}}</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
        <!-- <p class="text-center">{{ forgotSuccessMessage }}</p> -->
      </div>
    </form>
    
    <div class="mb-2 d-flex justify-content-between">
            <div v-if="!isForgotSelected" class="form-check mt-1">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="keepmesignedin"
              checked
              v-model="keepMeLogedIn"
            />
            <label class="form-check-label" for="keepmesignedin">
              {{$t("keepMeLogedIn",$store.getters.lang)}}
            </label>
          </div>
        <div v-if="!isForgotSelected">
            <div>
                <a
        role="button"
        @click="gotosignupPage()"
        class="nav-link d-inline"
        >{{$t("createAccount",$store.getters.lang)}} </a
      ></div>
     <div>
       <a
        role="button"
        @click="toggleFormType()"
        class="nav-link d-inline"
        >{{$t("forgotPassword",$store.getters.lang)}}</a
      ></div>
      </div>
      
      <a
        v-if="isForgotSelected"
        role="button"
        @click="toggleFormType()"
        class="nav-link d-inline ms-auto"
        >{{$t("login",$store.getters.lang)}}</a
      >
    </div>
  </div>
    <!-- OTP Code input -->
    <div v-if="isForgotForm" class="mx-2">
    <div v-if="isOtp">
           <div class="mb-3 mt-3" :class="{ warning: v$.otpInput.$error }">
          <label for="verifyCode" class="form-label">Enter Verification Code</label>
          <input
            type="text"
            class="form-control"
            id="verifyCode"
            aria-label="Text input with select field"
            v-model="otpInput"
          />
          <span class="mt-1">{{ v$.otpInput.$errors[0]?.$message }}</span>
          
        </div>
       <div v-if="isForForgot">
         <div class="d-grid gap-2">
        <button @click="sendVerificationCode()" class="btn text-white">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Sending</span>
          </span>
          <span v-else>Send Code</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
         <!-- code resend button -->
        <div class="d-flex mb-3">
           <button @click="resendForgotOtp()" class="ms-auto border-0 resendBtn mt-2">resend code</button>
        </div>
       </div>
       <div v-if="!isForForgot">
         <div class="d-grid gap-2">
        <button @click="sendLoginVerificationCode()" class="btn text-white">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Sending</span>
          </span>
          <span v-else>Send Code</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
         <!-- code resend button -->
        <div class="d-flex mb-3">
           <button @click="resendLoginOtp()" class="ms-auto border-0 resendBtn mt-2">resend code</button>
        </div>
       </div>
    </div>
   
    <!-- new Password field -->
  <div v-if="isNewPassword">
    <div class="mb-3" :class="{ warning: v$.newPassword.password.$error }">
          <label for="name" class="form-label">{{$t('newPassword',$store.getters.lang)}}</label>
          <input
            type="password"
            class="form-control"
            id="name"
            aria-label="Text input with select field"
            v-model="newPassword.password"
          />
          <span class="mt-1">{{ v$.newPassword.password.$errors[0]?.$message }}</span>
        </div>
         <div class="mb-3" :class="{ warning: v$.newPassword.passwordConfirm.$error }">
          <label for="name" class="form-label">{{$t('confirmPassword',$store.getters.lang)}}</label>
          <input
            type="tel"
            class="form-control"
            id="name"
            aria-label="Text input with select field"
            v-model="newPassword.passwordConfirm"
          />
          <span class="mt-1">{{ v$.newPassword.passwordConfirm.$errors[0]?.$message }}</span>
        </div>
          <div class="d-grid gap-2">
        <button @click="sebmitNewPassword()" class="btn text-white">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Sending</span>
          </span>
          <span v-else>Send</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
  </div>
  </div>
  </div>
</div>
</template>

<script>
import { required, helpers,sameAs } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import apiClient from "../resource/baseurl";
import Vue3PhoneInput from "vue3-phone-input";
export default {
  components:{Vue3PhoneInput},
  data() {
    return {
      isForgotSelected: false,
      v$: useValidate(),
      userCrediantail: {
        phone_number: "",
        password: "",
      },
      newPassword:{
        password:'',
      passwordConfirm:'',
      },
      otpInput:'',
      verificationToken:'',
      isOtp:false,
      isNewPassword:false,
      isForgotForm:false,
      isForForgot:true,
      keepMeLogedIn:true,
      countryCode:"+251",
      phone_number: "",
      forgotSuccessMessage: "",
      isPasswordVisible: false,
      isLoading: false,
      notify: "",
      phone:'',
    };
  },

  validations() {
    return {
      userCrediantail: {
        password: {
          required: helpers.withMessage("Password can't be empty", required),
        },
      },
       phone: {
          required: helpers.withMessage("phone number is required", required)         
        },
      newPassword:{
       password:{
         required: helpers.withMessage(
          "password is required",required),
      },
      passwordConfirm:{
         required: helpers.withMessage(
          "password is required",
          required
        ),
        same:helpers.withMessage('password does not mutch',sameAs(this.newPassword.password))
      },
      }
      ,otpInput:{
         required: helpers.withMessage("Please enter the code we have sent to your phone number", required),
      }
    }
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
       toggleFormType() {
      if (this.isLoading) return;
      this.isForgotSelected = !this.isForgotSelected;
      this.notify = "";
      this.userCrediantail = {};
      this.phone_number = "";
      this.v$.$reset();
      console.log('forgot klicked',this.isForgotSelected)
    },
    toggleShowPassword() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    gotosignupPage(){
       this.$router.push({name:'SignUp'})
    },
    async forgotPassword() {
      this.notify = "";
      // this.forgotSuccessMessage = "";
      this.v$.phone.$validate();
      if (this.phone?.isValid) {
        this.isLoading = true;
        try {
          const response = await apiClient.post(`/api/user_forgot`, {
          phone_number: this.phone?.number,
          });
          if (response.status === 200) {
            this.isForgotForm = true
            this.isOtp = true
          }
        } catch (e) {
          this.notify = "faild to send phone number";
        } finally {
          this.isLoading = false;
        }
      }
    },
     resendForgotOtp(){
          this.forgotPassword()
    },
   async sendVerificationCode(){
       this.notify = "";
      this.forgotSuccessMessage = "";
      this.v$.otpInput.$validate();
      if (!this.v$.otpInput.$error) {
        this.isLoading = true;
        var response;
        try {
          response = await apiClient.post(`/api/verify_reset_otp/${this.otpInput}`, {
          otp_code: this.otpInput,
          });
          if (response.status === 200) {
            this.verificationToken = response.data.code
            this.isOtp = false
            this.isNewPassword = true 
            console.log('response data',response.data)
             }
             if(response.status === 201){
              console.log('response data',response.data)
          this.notify = response.data
             }
        } catch (e) {
          console.log('response data',response.data)
          this.notify = response.data
        } finally {
          this.isLoading = false;
        }
      }
    },
   

   async  sebmitNewPassword(){
       this.notify = "";
      // this.forgotSuccessMessage = "";
      this.v$.newPassword.$validate();
      if (!this.v$.newPassword.$error) {
        this.isLoading = true;
        try {
          const response = await apiClient.post(`/api/user_reset/${this.verificationToken}`, {
          password:this.newPassword.password,
          otp_code:this.otpInput
          });
          if (response.status == 200) {
            this.isForgotForm = false
          this.isForgotSelected = false
          // saving user data
            this.saveUserData(response)
          }
        } catch (e) {
          this.notify = "Failed";
        } finally {
          this.isLoading = false;
        }
      }
    },
    
   async resendLoginOtp(){
       this.notify = "";
      // this.forgotSuccessMessage = "";
      this.v$.phone.$validate();
      if (this.phone?.isValid) {
        this.isLoading = true;
        try {
          const response = await apiClient.post(`/api/resend_verification_code`, {
          phone_number: this.phone?.number,
          });
          if (response.status === 200) {
            this.isForgotForm = true
            this.isOtp = true
          }
        } catch (e) {
          this.notify = "faild to send phone number";
        } finally {
          this.isLoading = false;
        }
      }
    },
   async sendLoginVerificationCode(){
     this.notify = "";
      // this.forgotSuccessMessage = "";
      this.v$.phone.$validate();
      if (this.phone?.isValid && !this.v$.otpInput.$error) {
        this.isLoading = true;
        var response;
        try {
           response = await apiClient.post(`api/verify_otp`, {
          phone_number: this?.phone.number,
          code:this.otpInput
          });
          if (response.status === 200) {
            this.saveUserData(response)
            this.isForForgot = true
          }
          else if(response.status === 201){
            this.notify = response.data
          }
        } catch (e) {
          this.notify = 'Faild to save'
        } finally {
          this.isLoading = false;
        }
      }
    },
    async login() {
      this.notify = "";
      this.v$.userCrediantail.$validate();
      this.v$.phone.$validate();
      if (!this.v$.userCrediantail.$error && this.phone?.isValid) {
        this.isLoading = true;
        var user = {
          phone_number : this.phone?.number,
          password:this.userCrediantail.password
        }
        
        try {
          var response = await apiClient.post("/api/user_login", user);
          if (response.status === 200) {
           this.saveUserData(response)
          } 
          if(response.status === 201){
            this.isForgotForm = true
            this.isForForgot = false
            this.isOtp = true
          
          }
        } catch (e) {
          this.notify = "Faild to login, check your Phone number and password";
        } finally {
          this.isLoading = false;
        }
      }
       
    },
    saveUserData(response){
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data?.access_token}`;
            this.$store.commit("setUser", response.data.user);
            this.$store.commit("setIsAuthenticated", true);
            let user = response.data.user;

            localStorage.setItem("utoken", response.data.access_token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isAuthorized", true);

            let toPath = this.$route.query.to || "/";
            this.$router.push(toPath);
    }
  },
};
</script>
<style scoped>

.btn {
  background-color: #ff7e00;
  color: #fff;
}
.rensys {
  color: #ff7e00;
}
.engineering {
  color: #84bd3a;
}
.form-check-input{
    background-color: #ff7e00;
    color: #fff;
}
.telInput{
  border-left: none!important;
  box-shadow: none !important;
}
select {
  border-right: none!important;
  max-width: 6rem;
  box-shadow: none !important;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
.warning .telSelector{
   border: 1px red solid;
}
.warning .telSelector{
   border: 1px red solid;
}
.telSelector{
  border-right: none;
}
#phneforforpwaforgot{
  border-left: none;
  box-shadow: none!important;
}

.resendBtn{
  background: none;
  color: rgb(93, 93, 237);
}
.resendBtn:hover{
  color: #ff7e00;
}
.phneInputField{
  min-width: 100%;
  position: absolute;
  z-index: 10;
}
.forgotPhoneInput{
  min-width: 100%;
}
.passwordInputField{
  z-index: -100;
}

@media(min-width: 768px){
    .wraper{
        max-width: 22rem;
    }
}
</style>
