<template>
  <div class="wraper pb-5">
    <div class="d-flex mx-3">
      <div class="orderconfirm mt-5 border rounded pt-2 ms-auto me-auto">
        <span class="ms-3 me-3 icon rounded-circle p-1 fs-4"
          ><i class="fas fa-check"></i
        ></span>
        <span>Thank you your order has been recieved</span>
      </div>
    </div>
    <div class="d-none d-lg-block">
      <div class="row mt-4 border rounded shadow-sm orderDetailContainer">
        <div class="orderDetail col-lg-2">
          <div class="mt-4"><b>Order Id</b></div>
          <div class="mt-3">{{orderConfirmation.order_id}}</div>
        </div>
        <div class="orderDetail col-lg-2">
          <div class="mt-4"><b>Order Secret Number</b></div>
        <div class="mt-3">{{orderConfirmation.pin}}</div>
        </div>
        <div class="orderDetail col-lg-2">
          <div class="mt-4"><b>pickup Date</b></div>
          <div class="mt-3">{{orderConfirmation.pickup_date}}</div>
        </div>
        <div class="orderDetail col-lg-2">
          <div class="mt-4"><b>Phone Number</b></div>
          <div class="mt-3">{{orderConfirmation.phone_number}}</div>
        </div>
        <div class="orderDetail col-lg-2">
          <div class="mt-4"><b>Total Price</b></div>
          <div class="mt-3">{{orderConfirmation.total_price}}</div>
        </div>
        <div class="col-lg-2">
          <div class="mt-4"><b>Payment Method</b></div>
          <div class="mt-3 text-capitalize">{{orderConfirmation.payment_method}}</div>
        </div>
      </div>
    </div>
    <!-- for small screen device -->
    <div class="d-lg-none mx-3 mt-4">
      <table class="table border-top border-bottom rounded shadow-sm">
        <tr>
          <th scope="col">Order Id</th>
          <td>{{orderConfirmation.order_id}}</td>
        </tr>
        <tr>
          <th scope="col">Order Secret Number</th>
          <td>{{orderConfirmation.pin}}</td>
        </tr>
        <tr>
          <th scope="col">Pickup  Date</th>
          <td>{{orderConfirmation.pickup_date}}</td>
        </tr>
        <tr>
          <th scope="col">Phone Number</th>
          <td>{{orderConfirmation.phone_number}}</td>
        </tr>
        <tr>
          <th scope="col">Total Price</th>
          <td>{{orderConfirmation.total_price}} ETB</td>
        </tr>
        <tr>
          <th scope="col">Payment Method</th>
          <td class="text-capitalize">{{orderConfirmation.payment_method}}</td>
        </tr>
      </table>
    </div>
    <!-- <div class="d-none d-lg-block mt-3 orderDetailContainer">
      Make your payment by using Abyssiniya Bank and
      <router-link to="#"
        >click this link to confirm or the one we sent to your mobile number
        0966016473</router-link
      >
    </div> -->
    <!-- <div class="d-lg-none mt-3 mx-3">
      Make your payment by using Abyssiniya Bank and
      <router-link to="#"
        >click this link to confirm or the one we sent to your mobile number
        0966016473</router-link
      >
    </div> -->
  </div>
</template>
<script>
export default {
  computed:{
    orderConfirmation(){
      return this.$store.getters.orderConfirmation
    }
  }
}
</script>
<style scoped>
.wraper {
  background-color: #fff;
  min-height: 50vh;
}
.icon {
  background-color: #ff7e03;
  color: #fff;
}
.orderconfirm {
  width: 100%;
  margin: auto;
  height: 4rem;
  background-color: rgb(217, 247, 247);
}
.orderDetail {
  border-right: 1px dashed gainsboro;
}
.table {
  max-width: 100%;
}
@media (min-width: 768px) {
  .orderconfirm {
    width: 60%;
    margin: auto;
    height: 4rem;
  }
}
.orderDetailContainer {
  width: 75%;
  margin: auto;
  min-height: 10rem;
  max-height: 10rem;
}
</style>
