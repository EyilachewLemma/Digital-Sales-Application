<template>
   <div v-if="orderHistry?.length" class="mx-lg-4">
    <div v-if="!isOrderDetail" class="ms-5">{{$t("orderHistory",$store.getters.lang)}}</div>
    <div  class="orderTable d-none d-md-block mt-3">
    <table v-if="!isOrderDetail" class="w-100">
  
    <tr>
      <th scope="col">{{$t("orderId",$store.getters.lang)}}</th>
      <th scope="col">{{$t("orderDate",$store.getters.lang)}}</th>
      <th scope="col">{{$t("orderStatus",$store.getters.lang)}}</th>
      <th scope="col">{{$t("totalPrice",$store.getters.lang)}}</th>
      <th scope="col" class="sr-only">Action</th>
    </tr>
  <tbody>
    <tr v-for="(order) in orderHistry" :key="order.id">
      <td>{{order.order_ref}}</td>
      <td>{{formatDate(order.order_date)}}</td>
      <td>{{order.order_status}}</td>
      <td>{{order.total_price}} ETB</td>
      <td class="py-2">
        <div class="d-flex">
            <button v-if="order.order_status !== 'canceled'" @click="viewOrder(order.order_items)" class="btn viewBtn me-2 py-0">{{$t("view",$store.getters.lang)}}</button>
            <!-- <button v-if="order.order_status === 'pending'" @click="payOrderPrice()" class="btn payBtn me-2 py-1">{{$t("pay",$store.getters.lang)}}</button> -->
            <button v-if="order.order_status === 'pending'" @click="cancelOrder(order)" class="btn cancelBtn py-1">{{$t("cancel",$store.getters.lang)}}</button>
        </div>
      </td>
    </tr>
    
  </tbody>
</table>
<!-- order detail -->
 <div v-if="isOrderDetail" class="mx-2 orderDetail">
 <button @click="isOrderDetail = false" class="bg-white border-0">
    <span class="fs-4 backArrow"><i class="fas fa-arrow-left"></i></span>
    <span>Back</span>
  </button>

        <div class="fw-bold ms-5 mt-2">Order Detail</div>
    <div v-for="order in orderDetail" :key="order.id" class="mt-3 border rounded shadow-sm p-2">
     <table class="table border rounded w-100">
    <tr>
      <th scope="col">product name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Unit price</th>
      <th scope="col">Total Price</th>
    </tr>
  <tbody>
    <tr>
      <td>
        <span v-if="order.name?.length > 50">{{order.name.slice(0,50)}} </span>
        <span v-else>{{order.name}}</span>
      </td>
      <td>{{order.qty}}</td>
      <td>{{order.unit_price}} ETB</td>
      <td>{{order.qty * order.unit_price}} ETB</td>
    </tr>
    
  </tbody>
</table>
   
   <div class="d-flex">
    <div class="me-4">
      <p v-if="order?.rate">Your rate</p>
      <p v-else>Rate This Product</p>
      <span v-for="n in order?.rate" :key="n" class="fs-4 filledstar">
      <i class="fa-solid fa-star"></i>
      </span>
      <span v-for="(n,index) in 5-order?.rate" :key="n" class="fs-4 emptyStar" @click="giveRate(index+1,order)">
      <i class="far fa-star"></i>
      </span>
    </div>
    <div class="ms-4 flex-fill">
     <div>
       <p> give comment for this product</p>
     <div class="form-floating mt-2">
  <input type="text" class="form-control" placeholder="Leave a comment here" id="coment-area" v-model="order.comment" @keyup.enter="submitComment(order?.rate,order)"/>
  </div>
  <p class="text-danger text-center small">{{ notify }}</p>
      </div>
    </div>
   </div>
</div>
   </div>
    </div>
    <!-- for small device -->
     <div class="orderTable d-md-none mt-2">
      <div v-if="!isOrderDetail">
    <table class="w-100 border" v-for="order in orderHistry" :key="order.id">
  <tbody class="smallTable">
    <tr>
    <th class="px-3">Order Number</th>
      <td class="px-3">{{order.order_ref}}</td>
    </tr>
    <tr>
      <th class="px-3">Ordered Date</th>
      <td class="px-3">{{formatDate(order.order_date)}}</td>
    </tr>
    <tr>
      <th class="px-3">Order Status</th>
      <td class="px-3">{{order.order_status}}</td>
    </tr>
    <tr>
      <th class="px-3">Total price</th>
      <td class="px-3">{{order.total_price}} ETB</td>
    </tr>
    <tr>
      <th class="px-3">Action</th>
      <td class="px-3">
        <div class="d-flex justify-content-end">
            <button @click="viewOrder(order.order_items)" class="btn viewBtn me-2 py-">View</button>
            <!-- <button @click="payOrderPrice(order)" class="btn payBtn me-2 py-1">Pay</button> -->
            <button @click="cancelOrder(order)" class="btn cancelBtn py-1">Cancel</button>
        </div>
      </td>
    </tr>
    
  </tbody>
</table>
</div>
<!-- order detail for small device -->
<div v-if="isOrderDetail">
 <div class="d-flex">
  <button @click="isOrderDetail = false" class="bg-white border-0">
    <span class="fs-4 backArrow"><i class="fas fa-arrow-left"></i></span>
    <span>Back</span>
  </button>
  <div class="ms-5 mt-2 fw-bold">Order Details</div>
 </div>
<div v-for="order in orderDetail" :key="order.id" class="border rounded shadow-sm mt-3 pb-3">
   <table class="w-100 border">
  <tbody class="smallTable">
    <tr>
    <th class="px-3">Product Name</th>
      <td class="px-3">
        <span v-if="order.name?.length > 50">{{order.name.slice(0,50)}} </span>
        <span v-else>{{order.name}}</span>
      </td>
    </tr>
     <tr>
      <th class="px-3">Quantity</th>
      <td class="px-3">{{order.qty}}</td>
    </tr>
    <tr>
      <th class="px-3">Unit Price</th>
      <td class="px-3">{{order.unit_price}}</td>
    </tr>
    <tr>
      <th class="px-3">Total price</th>
      <td class="px-3">{{order.unit_price*order.qty}} ETB</td>
    </tr>
    
  </tbody>
</table>
 <div class="mx-4">
    <div class="me-1 me-lg-4">
      <span v-if="!order?.rate" class="me-3">Rate This Product</span>
      <span v-else class="me-3">Your Rate</span>      
      <span v-for="n in order?.rate" :key="n" class="filledstar fs-4">
      <i class="fa-solid fa-star"></i>
      </span>
      <span v-for="(n,index) in 5-order?.rate" :key="n" class="emptyStar fs-4" @click="giveRate(index+1,order)">
      <i class="far fa-star"></i>
      </span>
    </div>
    <div class="ms-lg-4 flex-fill">
     <p> give comment for this product</p>
     <div class="form-floating">
  <input type="text" class="form-control" placeholder="Leave a comment here" id="commentInputsm" v-model="order.comment" @keyup.enter="submitComment(order?.rate,order,)" />
  </div>
  <p class="text-danger text-center small">{{ notify }}</p>
    </div>
   </div>
</div>
</div>
    </div>
   </div>
   <div v-else class="text-center mt-5">
           Your order histry is empty yet
   </div>
  
</template>
<script>
import apiClient from '../resource/baseurl'
export default {
  data() {
    return {
      orderHistry:[],
      orderDetail:[],
      isOrderDetail:false,
      givenStar:0,
      ProdcutComment:'',
      isLoading:false,
      notify:'',
      comment:""

    }
  },
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  created() {
    this.fetchMyOrderHistory()
  },
  methods: {
    async fetchMyOrderHistory(){
      try{this.$store.commit('setIsLoading', true)
        var response = await apiClient.get(`api/user_orders/${this.user.id}`)
        if(response.status === 200){
          this.orderHistry = response.data.data
          console.log('order history',response.data.data)
        }
      }
      finally{
        this.$store.commit('setIsLoading', false)
      }
    },
    viewOrder(order){
      this.isOrderDetail = true
      this.orderDetail = order
    },
   async payOrderPrice(id){
        try {
          var response = await apiClient.post(`api/repay/${this.user.id}`,{order_id:id});
          if (response.status === 201) {
            console.log("order is paid successfully");          
          }
        } catch (err) {
          console.log(err);
        }
    },
    async cancelOrder(order){
      try{
        var response = await apiClient.post(`api/cancel_order/${order.id}`)
        if(response.status === 200){
        order.order_status = 'canceled'
      }
      }
      catch(err){
        console.log('error')
      }
  
    },
    formatDate(orderDate){
      var date = new Date(orderDate)
      var year = date.getFullYear()
      var month = date.getMonth()
      var dates = date.getDate()
      return month*1+1+'/'+dates+'/'+year
    },
    giveRate(value,order){
      order.rate = value
    },
    async submitComment(rate,order){
      this.isLoading =true
      var reviewData = {
        rate:rate,
        comment:order.comment,
        user_id:this.user?.id,
        product_id:order.product_id,
        comment_id:order?.comment_id
      }
      try{
        var response = await apiClient.post('api/reviews',reviewData)
        if(response.status === 200){
            order.comment_id = response.data
          this.$toast.success('Your comment is received,Thank you for your review')
        }
      }
      catch(err){
           console.log('success')
      }
      finally{
        this.isLoading = false
      }

    }
  },
}
</script>
<style scoped>
.viewBtn,.rateBtn{
    background-color: #ff7e03;
    color: white;
}
.viewBtn:hover,.rateBtn:hover{
     background-color: #fcb16a;
}
.rateBtn{
  width: 10rem;
}
.payBtn{
    background-color: rgb(33, 219, 157);
    color: #fff;
}
.payBtn:hover{
    background-color: rgb(14, 250, 172);
}
.cancelBtn{
    background-color: rgb(237, 64, 64);
    color: #fff;
}
.cancelBtn:hover{
    background-color: rgb(253, 21, 21);
}
table tr{
 border-top: 2px solid rgb(155, 152, 152);
}
tr{
  padding: 4px;
}
.smallTable td{
  text-align: right;
}
.filledstar{
  color: #ff7e03;
}
.backArrow{
  color: #ff7e03;
  cursor: pointer;
}
</style>