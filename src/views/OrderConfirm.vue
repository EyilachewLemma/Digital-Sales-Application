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
    
    <div class="mt-3 orderDetailContainer">
      To view Your order 
      <router-link :to="{name:'MyOrder'}"
        >click here
        </router-link
      >
    </div>
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

@media (min-width: 768px) {
  .orderconfirm,.orderDetailContainer {
    width: 60%;
    margin: auto;
    height: 4rem;
  }
}

</style>
