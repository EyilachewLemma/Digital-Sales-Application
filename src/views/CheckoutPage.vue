<template>
  <div class="d-lg-flex px-lg-3 bg-white">
    <div v-if="cartItems.length" class="mx-3 me-lg-5 address">
      <h5 class="my-3">{{$t("address",$store.getters.lang)}}</h5>
      <div v-if="!isNewAddress" class="d-flex align-items-center">
        <div class="me-3">{{$t("selectAddress",$store.getters.lang)}}</div>
        <button @click="enterNewAddress()" class="btn addNewAddress">
          {{$t("newAddress",$store.getters.lang)}}
        </button>
      </div>
      <div
        v-if="!isNewAddress"
        class="my-3"
        :class="{ warning: v$.old_address.$error }"
      >
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="old_address"
        >
          <option v-for="location in userAddress" :key="location.id" :value="location.id">{{location.user_region+'/'+location.user_zone+'/'+location.user_woreda}}</option>
          
        </select>
        <span class="mt-1">{{ v$.old_address.$errors[0]?.$message }}</span>
      </div>
      <!-- order with new address -->
    <div v-if="isNewAddress && this.user" class="d-flex">
        <div class="me-3">{{$t("fillNewAddress",$store.getters.lang)}}</div>
        <button @click="usePreviousAddress()" class="btn addNewAddress px-1">
          {{$t("usePreviousAddress",$store.getters.lang)}}
        </button>
      </div>
      <div v-if="isNewAddress" class="row mt-3">
      <div class="row">
          <div class="mb-3 col-lg-6" :class="{ warning: v$.address.phone_number.$error }">
            <label for="phnoeNo" class="form-label">{{$t("phoneNumber",$store.getters.lang)}}</label>
            <input
              type="tel"
              class="form-control"
              id="phnoeNo"
              v-model="address.phone_number"
            />
            <span class="mt-1">{{
              v$.address.phone_number.$errors[0]?.$message
            }}</span>
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
        </div>
        <div class="row">
          <div class="mb-3 col-lg-6" :class="{ warning: v$.address.user_zone.$error }">
            <label for="fullName" class="form-label">{{$t("zone",$store.getters.lang)}}</label>
            <input
              type="text"
              class="form-control"
              id="fullName"
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
        </div>
        
      </div>
      <!--  -->
      <div class="row">
         <div class="mb-3 col-lg-6" :class="{ warning: v$.address.shop_id.$error }">
            <label for="store" class="form-label">{{$t("selectNearestStore",$store.getters.lang)}}</label>
            <select
          class="form-select"
          aria-label="Default select example"
          v-model="address.shop_id"
        >
          <option v-for="store in stores" :key="store.id" :value="store?.id">{{store.region+'/'+store.zone+'/'+store.woreda+'/ kebele '+store.kebele}}</option>
        </select>
            <span class="mt-1">{{
              v$.address.shop_id.$errors[0]?.$message
            }}</span>
          </div>
           <div class="mb-3 col-lg-6" :class="{ warning: v$.address.pickup_date.$error }">
            <label for="pickup_date" class="form-label">{{$t("PickupDate",$store.getters.lang)}}</label>
            <input
              type="date"
              class="form-control"
              id="pickup_date"
              v-model="address.pickup_date"
            />
            <span class="mt-1">{{
              v$.address.pickup_date.$errors[0]?.$message
            }}</span>
          </div>
      </div>
      <h5 class="my-2">{{$t("selectPaymentMethod",$store.getters.lang)}}</h5> 
      <div class="mb-4" :class="{ warning: v$.paymentId.$error }">
      <div class="my-3" v-for="paymentMethod in paymentMethods" :key="paymentMethod.id">
        <div
          class="form-check"
          
        >
          <input
            class="form-check-input"
            type="radio"
            name="paymentMethod"
            :value="paymentMethod.id"
            :id="paymentMethod.id"
            v-model="paymentId"
            :class="{ activeRadio: paymentId === paymentMethod.id }"
          />
          <label class="form-check-label" :for="paymentMethod.id">{{paymentMethod.payment_name}} </label>
   
        </div>
      </div>
       <span class="mt-1">{{
            v$.paymentId.$errors[0]?.$message
          }}</span>
      </div>
    </div>
    <div v-if="cartItems.length" class="mx-3 ms-lg-auto">
      <div class="mt-3">
        <hr />
        <h5>{{$t("product",$store.getters.lang)}}</h5>
        <div v-for="(cartItem, index) in cartItems" :key="index">
          <div class="d-flex align-items-center">
            <div class="imageBox me-3 me-lg-5">
              <img
                :src="cartItem.path"
                class="img-fluid"
                alt="cart product image"
              />
            </div>
            <div class="flex-grow-1">
              <div v-if="cartItem.name?.length > 0">{{ cartItem.name.slice(0,30) }}</div>
                <div v-else>{{ cartItem.name }}</div>
              <div>{{$t("price",$store.getters.lang)}} {{ cartItem.price }} {{$t("priceUnit",$store.getters.lang)}}</div>
              <div class="d-flex align-items-center mt-3">
                <div class="d-flex inputGroup mt-3 rounded me-2">
                  <button
                    @click="decreaseQuantity(cartItem)"
                    class="btn valueBtn py-1"
                    type="button"
                  >
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <div class="text-center pt-1">{{ cartItem.qty }}</div>
                  <button
                    @click="increaseQuantity(cartItem)"
                    class="btn valueBtn py-1"
                    type="button"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div class="ms-auto mt-2">
                  <button
                    @click="removeProduct(cartItem.id)"
                    class="btn removeBtn">{{$t("removeCartProduct",$store.getters.lang)}}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2"><hr /></div>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <div>{{$t("totalPrice",$store.getters.lang)}}</div>
        <div class="me-5">{{ calculateTotalPrice(cartItems) }} {{$t("priceUnit",$store.getters.lang)}}</div>
      </div>
      <hr />
      <div v-if="!isChapa" class="d-grid gap-2 mt-4">
        <button @click="placeOrder()" class="btn text-white orderBtn" type="submit">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>{{$t("submiting",$store.getters.lang)}}</span>
          </span>
          <span v-else>{{$t("placeOrder",$store.getters.lang)}}</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
            <div v-if="isChapa" class="d-grid gap-2 mt-4">
        <button @click="checkOut()" class="btn text-white orderBtn" type="submit">
          <span v-if="isLoading">
            <span
              class="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span>{{$t("wait",$store.getters.lang)}}</span>
          </span>
          <span v-else>{{$t("checkout",$store.getters.lang)}}</span>
        </button>
        <p class="text-danger text-center small">{{ notify }}</p>
      </div>
      <p class="mt-2 text-danger">{{notify}}</p>
    </div>
    <div v-if="!cartItems.length" class="text-center warningpage">
      <div class="warningText">You didnt have any product added to the cart</div>
    </div>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";
import apiClient from "../resource/baseurl";
export default {
  data() {
    return {
      v$: useValidate(),
      userAddress:[],
      quantity: 1,
      isNewAddress: true,
      paymentId: null,
      isChapa:false,
      address: {
        is_new:0,
        payment_method:null,
      },
      notify:'',
      isLoading:false,
      old_address:null,
          };
  },
  validations() {
    return {
      address: {
        user_zone: {
          required: helpers.withMessage("zone is required", required),
        },
        phone_number: {
          required: helpers.withMessage("phone number is required", required),
          min: helpers.withMessage(
            "the minimum digit shuld be equal to 10",
            minLength(10)
          ),
          max: helpers.withMessage(
            "the maximum digit shuld be equal to 10",
            maxLength(10)
          ),
        },
        user_region: {
          required: helpers.withMessage("your region is required", required),
        },
        user_woreda:{
          required: helpers.withMessage("your woreda is required", required),
        },
        pickup_date:{
          required: helpers.withMessage(
            "please select pickup dated",
            required
          ),
        },
         shop_id:{
          required: helpers.withMessage(
            "please select the store you want to pickup your order",
            required
          ),
        },
        },
         paymentId: {
          required: helpers.withMessage(
            "please select your choice payment method",
            required
          ),
        },
         old_address:{
          required: helpers.withMessage("your address is  required", required),
        },
    };
  },
   computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    stores(){
      return this.$store.getters.stores
    },
    user(){
      return this.$store.getters.user
    },
    paymentMethods(){
      return this.$store.getters.paymentMethods
    }

  },
  created() {
    this.featchUserAddress()
  },
  watch:{
    paymentId(id){
      this.address.payment_method = id
      this.paymentMethods.forEach(payment=>{       
        if(payment.id === id && payment.payment_name === 'Chapa'){
          this.isChapa = true
          return
        }
        else{
          this.isChapa = false
        }
      })
    }
  },
  methods: {
   async featchUserAddress(){
      var response = await apiClient.get(`api/user_order_address/${this.user?.id}`)
      if(response.status === 200){
        this.userAddress = response.data
        console.log('user address = ',response.data)
      }
    },
    increaseQuantity(cartItem) {
      cartItem.qty = cartItem.qty + 1;
      var index = this.cartItems.findIndex((item) => {
        return cartItem.id * 1 === item.id * 1;
      });
      if (index !== -1) {
        this.cartItems[index] = cartItem;
      }
      this.$store.state.cartItems = this.cartItems;
    },
    decreaseQuantity(cartItem) {
      if (cartItem.qty * 1 > 1) {
        cartItem.qty = cartItem.qty - 1;
        var index = this.cartItems.findIndex((item) => {
          return cartItem.id * 1 === item.id * 1;
        });
        if (index !== -1) {
          this.cartItems[index] = cartItem;
        }
        this.$store.state.cartItems = this.cartItems;
      }
    },
    removeProduct(id) {
         var itemslist = this.cartItems
          var index = this.cartItems.findIndex((cartItem) => {
            return id * 1 === cartItem.id * 1;
          });         
            itemslist.splice(index, 1);
            this.$store.state.cartItems = itemslist;
            console.log('item removed')
              localStorage.setItem('cartItems', JSON.stringify(itemslist))
          
      
    },
    enterNewAddress() {
      this.isNewAddress = true;
      this.v$.$reset()
    },
    usePreviousAddress() {
      this.isNewAddress = false;
      this.v$.$reset()
    },
    calculateTotalPrice(cartItems) {
      var totalPrice = 0;
      if(cartItems.length){
      cartItems?.forEach((cartItem) => {
        totalPrice = totalPrice + cartItem.price * cartItem.qty;
      });
      return totalPrice;
      }
      return 0
    },
    async checkOut(){
      this.notify = ''
    this.address.payment_method = this.paymentId
      if(!this.isNewAddress){
        this.v$.old_address.$validate();
        this.v$.paymentId.$validate();
        this.v$.address.pickup_date.$validate();
        this.v$.address.shop_id.$validate();
         this.address.user_region = this.user?.user_region
            this.address.user_zone = this.user?.user_zone
            this.address.user_woreda = this.user?.user_woreda
             this.address.products = this.cartItems
           this.address.user_id = this.user?.id
           this.address.address_id = this.old_address
           this.address.is_new = 0
      }
      else if(this.isNewAddress){
         this.v$.address.$validate();
         this.v$.paymentId.$validate();
          this.address.products = this.cartItems
           this.address.user_id = this.user?.id
           this.address.is_new = 1
      }
      if (!this.v$.$error && !this.v$.paymentId.$error) {
        if(localStorage.getItem('isAuthorized')){
          this.isLoading = true
        try {
          
           console.log('order item sent to server= ',this.address)
          var response = await apiClient.post("api/pay", this.address);
          if (response.status === 200) {
            console.log("order place successfully");
            this.$store.state.cartItems = [];
            var path = response.data
            location.replace(path)
            localStorage.removeItem('cartItems')
            
              
          }
          else if(response.status === 400){
             this.notify = response.data
          }
        } catch (err) {
          console.log(err);
        }
        finally{
          this.isLoading = false
             this.address.user_region = ''
            this.address.user_zone = ''
            this.address.user_woreda = ''
          
        }
        }
        else{
          this.$router.push({name:'Login',query:{to:'/check-out'}})
        }
      }
    },
    async placeOrder() {
      this.notify = ''
      this.address.payment_method = this.paymentId
      if(!this.isNewAddress){
        this.v$.old_address.$validate();
        this.v$.paymentId.$validate();
        this.v$.address.pickup_date.$validate();
        this.v$.address.shop_id.$validate();
         this.address.user_region = this.user.user_region
            this.address.user_zone = this.user.user_zone
            this.address.user_woreda = this.user.user_woreda
             this.address.products = this.cartItems
           this.address.user_id = this.user.id
           this.address.address_id = this.old_address
           this.address.is_new = 0
      }
      else if(this.isNewAddress){
         this.v$.address.$validate();
         this.v$.paymentId.$validate();
          this.address.products = this.cartItems
           this.address.user_id = this.user?.id
           this.address.is_new = 1
      }
      if (!this.v$.$error && !this.v$.paymentId.$error) {
        if(localStorage.getItem('isAuthorized')){
          this.isLoading = true
        try {
          
           console.log('order item sent to server= ',this.address)
          var response = await apiClient.post("api/order_products", this.address);
          if (response.status === 201) {
            console.log("order place successfully");
            this.$store.state.cartItems = [];
            localStorage.removeItem('cartItems')
            this.$store.commit('setOrderConfirmation',response.data)
            this.$router.push({name:'OrderConfirmation'})
          }
        } catch (err) {
          this.notify = 'Faild to send order'
        }
        finally{
          this.isLoading = false
             this.address.user_region = ''
            this.address.user_zone = ''
            this.address.user_woreda = ''
          
        }
        }
        else{
          this.$router.push({name:'Login',query:{to:'/check-out'}})
        }
      }
      
    },
  },
};
</script>
<style scoped>
.addNewAddress {
  background-color: #ff7e03;
  color: #fff;
}
.activeRadio {
  background-color: #ff7e03;
  color: #fff;
}
hr {
  padding: 1px;
}
.imageBox {
  width: 7rem;
  height: 9rem;
}
.imageBox img {
  min-width: 7rem;
  max-width: 7rem;
  min-height: 9rem;
  max-height: 9rem;
}
.inputGroup {
  width: 9rem;
  border: 2px solid rgb(216, 213, 213);
}
.inputGroup div {
  min-width: 3rem;
  border-left: 2px solid rgb(216, 213, 213);
  border-right: 2px solid rgb(216, 213, 213);
  border-top: none;
  border-bottom: none;
}
.inputGroup div,
.valueBtn {
  max-width: 3rem;
  box-shadow: none !important;
}
.removeBtn {
  color: #ff7e03;
}
.removeBtn:hover {
  background-color: #ff7e03;
  color: #fff;
}
.orderBtn {
  width: 80%;
  margin-bottom: 10%;
  background-color: #ff7e03;
  color: #fff;
}
.warning input {
  border: 1px red solid;
}
.warning span {
  display: inline;
  color: red;
}
.warningpage{
  width: 100%;
  height: 50vh;
  margin: auto;
}
.warningText{
  padding-top: 10%;
}
@media (min-width: 992px) {
  .address {
    min-width: 50%;
    max-width: 50%;
  }
}
</style>
