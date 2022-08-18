<template>
  <div class="passwordBox col-md-4 rounded mt-lg-3 p-3">
      <div class="text-center">{{$t("changePassword",$store.getters.lang)}}</div>
        <div class="mb-3 flex-fill mt-3" :class="{ warning: v$.cridential.old_password.$error }">
  <label for="oldPasswprd" class="form-label">{{$t("oldPassword",$store.getters.lang)}}</label>
  <input type="password" class="form-control" id="oldPasswprd" v-model="cridential.old_password">
  <span class="mt-1">{{v$.cridential.old_password.$errors[0]?.$message}}</span>
</div>
    <div class="mb-3 flex-fill mt-3" :class="{ warning: v$.cridential.new_password.$error }">
  <label for="newPasswprd" class="form-label">{{$t("newPassword",$store.getters.lang)}}</label>
  <input type="password" class="form-control" id="newPasswprd" v-model="cridential.new_password">
   <span class="mt-1">{{v$.cridential.new_password.$errors[0]?.$message}}</span>
</div>
    <div class="mb-3 flex-fill mt-3" :class="{ warning: v$.cridential.confirm_password.$error }">
  <label for="confirmPasswprd" class="form-label">{{$t("confirmPassword",$store.getters.lang)}}</label>
  <input type="password" class="form-control" id="confirmPasswprd" v-model="cridential.confirm_password">
   <span class="mt-1">{{v$.cridential.confirm_password.$errors[0]?.$message}}</span>
</div>
 <button @click="changePasswod()" class="btn text-white mb-3 w-100">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>{{$t('submiting',$store.getters.lang)}}</span>
          </span>
          <span v-else>{{$t("submit",$store.getters.lang)}}</span>
        </button>
 <p :class="{faild:isFaild,success:isSuccess}">{{notify}}</p>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, helpers, sameAs } from "@vuelidate/validators";
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
            old_password:{
                required:helpers.withMessage('please enter old password',required)
            },
            new_password:{
                required:helpers.withMessage('please enter new password',required)
            },
            confirm_password:{
                required:helpers.withMessage('please confirm new password',required),
                 sameAs:helpers.withMessage('your password is not match',sameAs(this.cridential.new_password))
            }

        }
        }
    },
    methods: {
        async changePasswod(){
            this.v$.$validate()
            if(!this.v$.cridential.$error){
                this.isLoading = true
                try{
                    var response = await apiClient.post('api/change_user_password',this.cridential)
                if(response.status === 200){
                    this.notify = 'Your password is successfully changed'
                    this.isFaild = false
                    this.isSuccess = true
                }
                }
                catch(err){
                    this.isFaild = true
                    this.isSuccess = false
                    this.notify = 'Faild to change your password'
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
.passwordBox{
    margin: auto;
}
.btn{background-color: #ff7e03;
color: #fff;
}
.faild{
    color: red;
}
.success{
    color: green;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
@media(min-width: 992px){
    .passwordBox{
        border: 1px solid gray;
    }
}
</style>