<template>
<div class="mx-2 mx-lg-4 mt-3 mb-4">
  <div class="d-lg-flex">
    <div
      class=" align-self-start col-lg-4 border rounded shadow-sm me-2 me-lg-2 p-2 mb-4 bg-white"
    >
      <div class="d-flex">
        <div class="me-2">
          <div
            class="smallImage border rounded shadow-sm px-1 pt-2 pb-1 mb-2"
            v-for="image in productDetails.images"
            :key="image.id"
            @mouseenter="onMouseEnter(image.path)"
          >
            <img :src="image.path" class="img-fluid" alt="solar photo" />
          </div>
        </div>
        <div class="bigImage flex-grow-1 mx-1 mx-lg-3 my-lg-2">
          <img :src="bigImagePath" class="img-fluid" alt="big solar image" />
        </div> 
      </div>
    </div>
    <!-- related products -->
    <div class="d-none d-lg-block flex-fill mb-3  p-2 bg-white me-lg-3">
       <div>{{ productDetails.name }}</div>
      <div class="rating mt-2">
        {{ratingAveraging(
                productDetails.five_star,
                productDetails.four_star,
                productDetails.three_star,
                productDetails.two_star,
                productDetails.one_star
              )}}
         <span v-if="fullStar > 0">
              <span class="rating me-2" v-for="n in fullStar" :key="n"
                ><i class="fa-solid fa-star"></i
              ></span>
            </span>
            <span v-if="emptyStar > 0">
              <span class="rating me-2" v-for="n in emptyStar" :key="n"
                ><i class="far fa-star"></i
              ></span>
            </span>
        <span class="text-black ms-2"
          >
          <span class="small"> {{ totalReviewer }} {{$t("customer",$store.getters.lang)}}</span></span
        >
      </div>
      <div class="small mt-3">{{$t("warrantyPeriod",$store.getters.lang)}}: 
        <span class="text-success">{{ productDetails.warranty }}</span>
      </div>
      <hr />
      
      <div class="d-flex ms-lg-5">
        <div>{{$t("price",$store.getters.lang)}} :</div>
        <div class="ms-3 price">{{ productDetails.price }} {{$t("priceUnit",$store.getters.lang)}}</div>
      </div>
      <hr />
      <div v-if="productDetails?.related_products?.length">{{$t("RelatedProducts",$store.getters.lang)}}</div>
      <div class="d-flex relatedProduct">
        <button @click="feachProductDetail(relatedProduct.id,this.$store.getters.lang)" class="btn product h-100 flex-fill border rounded me-1 px-1" v-for="relatedProduct in productDetails?.related_products" :key="relatedProduct.id">
        <div>{{$t("model",$store.getters.lang)}}: {{relatedProduct.model}}</div>
        <div>{{$t("price",$store.getters.lang)}}: {{relatedProduct.price}} {{$t("priceUnit",$store.getters.lang)}}</div>
        </button>
      </div>
    <!-- product description -->
      <div>{{ productDetails.description }}</div>
    </div>
    <!-- add to cart section -->
    <div class="addToCartSection mb-3 border rounded shadow-sm px-4  py-4 bg-white align-self-start"
    >
    <!-- for only small device -->
    <div class="d-lg-none">
         <div>{{ productDetails.name }}</div>
      <div class="rating mt-2">
        {{ratingAveraging(
                productDetails.five_star,
                productDetails.four_star,
                productDetails.three_star,
                productDetails.two_star,
                productDetails.one_star
              )}}
         <span v-if="fullStar > 0">
              <span class="rating me-2" v-for="n in fullStar" :key="n"
                ><i class="fa-solid fa-star"></i
              ></span>
            </span>
            <span v-if="emptyStar > 0">
              <span class="rating me-2" v-for="n in emptyStar" :key="n"
                ><i class="far fa-star"></i
              ></span>
            </span>
        <span class="text-black ms-2"
          >
          <span class="small">{{ totalReviewer }} {{$t("customer",$store.getters.lang)}}</span></span
        >
      </div>
      <div class="small mt-3"> {{$t("warrantyPeriod",$store.getters.lang)}}: 
        <span class="text-success">{{ productDetails.warranty }}</span>
      </div>
      <hr />
    </div>
    <div class="redText ms-3 ms-lg-5">{{$t("price",$store.getters.lang)}}: <span class="price">5000 {{$t("priceUnit",$store.getters.lang)}}</span></div>
    <div v-if="productDetails.qty > 0" class="ms-3 ms-lg-5 text-success">{{$t("instock",$store.getters.lang)}}</div>
    <div v-else class="ms-3 ms-lg-5 text-danger">{{$t("outOfStock",$store.getters.lang)}}</div>
      <div v-if="productDetails?.qty > 0" class="d-flex ms-lg-5">
        <div class="mt-3 me-3 me-lg-4">{{$t("quantity",$store.getters.lang)}}</div>
        <div class="d-flex inputGroup mt-3 border rounded me-2">
          <button
            @click="decreaseQuantity()"
            class="btn valueBtn py-1"
            type="button"
          >
            <i class="fa-solid fa-minus"></i>
          </button>
          <div class="text-center pt-1">{{ quantity }}</div>
          <button
            @click="increaseQuantity()"
            class="btn valueBtn py-1"
            type="button"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div v-if="productDetails?.qty > 0" class="d-flex btnContainer justify-content-center">
        <button @click="addToCart(productDetails)" class="btn addBtn me-4">
          {{$t("addToCart",$store.getters.lang)}}
        </button>
        <button @click="buyNow(productDetails)" class="btn buyBtn">
          {{$t("buyNow",$store.getters.lang)}}
        </button>
      </div>
      <div v-else class="mt-5 text-danger">
          This product is currently unavailable
        </div>
    </div>
   
  </div>
   <hr />
    <!-- product description -->
      <div class="productDetail m-auto">
         <h5>{{$t("detailsAboutProduct",$store.getters.lang)}}</h5>
      <div v-html="productDetails.detail"></div>
      </div>
   <hr />
   <!-- products you may like -->
   <div v-if="productsUmayLike?.length">
    <div class="mt-2"><b>{{$t("suggestedProducts",$store.getters.lang)}}</b></div>
   <div>
    <suggested-products :products="productsUmayLike"></suggested-products>
   </div> 
   <hr>
   </div>
   <!-- review section -->

   <div class="d-lg-flex">
      <div class="col-lg-5">
        <div><b>{{$t("customersReview",$store.getters.lang)}}</b></div>
         <div>
            <span v-if="fullStar > 0">
              <span class="rating" v-for="n in fullStar" :key="n"
                ><i class="fa-solid fa-star"></i
              ></span>
            </span>
            <span v-if="emptyStar > 0">
              <span class="rating" v-for="n in emptyStar" :key="n"
                ><i class="far fa-star"></i
              ></span>
            </span>
            {{averageRating}} out of 5
          </div>
          <!-- <div v-if="totalReviewer" class="mt-2">{{totalReviewer}} ratings</div> -->
          <!-- five star -->
          <div class="d-flex mt-2">
            5 Star
            <div class="col-3 ms-2">
              <span class="rating me-lg-1" v-for="n in 5" :key="n"
                ><i class="fa-solid fa-star"></i
              ></span>
            </div>
            <div class="col-5 col-lg-6 px-1">
              <div class="progress">
                <div
                  class="progress-bar fiveStar bg-warning"
                  id="fiveStar"
                  :style="{width: calculateWidth(productDetails.five_star)}"
                  role="progressbar"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="col-1">{{ calculateWidth(productDetails.five_star)}}</div>
          </div>
           <!-- four star -->
          <div class="d-flex mt-2">
            4 Star
            <div class="col-3 ms-2">
              <span class="rating me-lg-1" v-for="n in 4" :key="n"
                ><i class="fa-solid fa-star"></i
              ></span>
              <span class="rating me-lg-1"><i class="far fa-star"></i></span>
            </div>
            <div class="col-5 col-lg-6 ms-1 px-1">
              <div class="progress">
                <div
                  class="progress-bar fourStar bg-warning"
                  id="fourStar"
                  :style="{width:calculateWidth(productDetails.four_star)}"
                  role="progressbar"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="col-1">{{ calculateWidth(productDetails.four_star) }}</div>
          </div>
          <!-- three star -->
          <div class="d-flex mt-2">
            3 Star
            <div class="col-3 ms-2">
              <span class="rating me-lg-1" v-for="n in 3" :key="n"
                ><i class="fa-solid fa-star"></i
              ></span>
              <span class="rating me-lg-1" v-for="n in 2" :key="n"
                ><i class="far fa-star"></i
              ></span>
            </div>
            <div class="col-5 col-lg-6 ms-1 px-1">
              <div class="progress">
                <div
                  class="progress-bar threeStar bg-warning"
                  id="threeStar"
                  :style="{width:calculateWidth(productDetails.three_star)}"
                  role="progressbar"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="col-1">{{ calculateWidth(productDetails.three_star) }}</div>
          </div>
          <!-- two star -->
          <div class="d-flex mt-2">
            2 Star
            <div class="col-3 ms-2">
              <span class="rating me-lg-1" v-for="n in 2" :key="n"
                ><i class="fa-solid fa-star"></i
              ></span>
              <span class="rating me-lg-1" v-for="n in 3" :key="n"
                ><i class="far fa-star"></i
              ></span>
            </div>
            <div class="col-5 col-lg-6 ms-1 px-1">
              <div class="progress">
                <div
                  class="progress-bar twoStar bg-warning"
                  id="twoStar"
                  :style="{width:calculateWidth(productDetails.two_star)}"
                  role="progressbar"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="col-1">{{ calculateWidth(productDetails.two_star)}}</div>
          </div>
          <!-- one star -->
          <div class="d-flex mt-2">
            1 Star
            <div class="col-3 ms-2">
              <span class="rating me-lg-1"
                ><i class="fa-solid fa-star"></i
              ></span>
              <span class="rating me-lg-1" v-for="n in 4" :key="n"
                ><i class="far fa-star"></i
              ></span>
            </div>
            <div class="col-5 col-lg-6 ms-1 px-1">
              <div class="progress">
                <div
                  class="progress-bar oneStar bg-warning"
                  id="oneStar"
                  :style="{width:calculateWidth(productDetails.one_star)}"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="col-1">{{ calculateWidth(productDetails.one_star) }}</div>
          </div>
       </div> 
       <!-- comments given to the product -->
        <div class="flex-fill mt-4">
      <div class="review" v-for="reviewer in productDetails.reviews" :key="reviewer.date">
        <div class="d-flex">
          <div class="firtLetter text-white border rounded-circle px-2 py-1 align-self-center fs-5">{{reviewer.first_name.slice(0,1)+reviewer.last_name.slice(0,1)}}</div>
          <div class="mt-2">
            <span class="ms-2"
              ><strong>{{
                reviewer.first_name + " " + reviewer.last_name
              }}</strong></span>
           
          </div>       
          <div class="ms-auto me-3">{{ dateFormat(reviewer?.date) }}</div>
        </div>
          <div class="d-flex">
            <div class="rating ms-2">
              <span v-if="reviewer.rate > 0">
                <span v-for="star in reviewer.rate" :key="star" class="me-1"
                  ><i class="fa-solid fa-star"></i
                ></span>
              </span>
              <span v-if="5 - reviewer.rate > 0">
                <span v-for="star in 5 - reviewer.rate" :key="star" class="me-1"
                  ><i class="far fa-star"></i
                ></span>
              </span>
            </div>
             <h6 class="ms-4">{{ reviewer.comment_title }}</h6>
          </div>
       
        <div class="py-2">{{ reviewer.comment }}</div>      
      </div>
      </div>
   </div>
  </div>
</template>
<script>
import apiClient from "../resource/baseurl";
// import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
 import SuggestedProducts from "../components/SuggestedProducts.vue";
// import InnerImageZoom from "vue-inner-image-zoom";
export default {
  components: {
     SuggestedProducts
    // "inner-image-zoom": InnerImageZoom,
  },
  props: ["productId"],
  data() {
    return {
      quantity: 1,
      productDetails: {},
      bigImagePath: "",
      xCordinet: "",
      yCordinet: "",
      zoom: 300,
      averageRating: "",
      totalReviewer: "",
      fullStar: "",
      emptyStar: "",
      comment: "",
      isComment: false,
      productsUmayLike:[],
    };
  },
  computed:{
    cartItems(){
      return this.$store.getters.cartItems
    },
    lang(){
      return this.$store.getters.lang
    }
  },
  created() {
    this.feachProductDetail(this.productId,this.$store.getters.lang);
  },
  watch:{
    lang(newValue){
      this.feachProductDetail(this.productId,newValue);
    }
  },
  methods: {
    async feachProductDetail(productId,lang) {
      this.$store.commit('setIsLoading',true)
      try {
        var response = await apiClient.get(
          `api/user_products/${productId}?lang=${lang}`
        );
        if (response.status === 200) {
          this.productDetails = response.data.data;
          this.bigImagePath = response.data.data.images[0]?.path;
          this.productsUmayLike = response.data.data?.product_you_may_like
          console.log("product detail", response.data);
        }
      } catch (err) {
        console.log(err);
      }
      finally{
        this.$store.commit('setIsLoading',false)
      }
    },
    onMouseEnter(path) {
      this.bigImagePath = path;
    },
    ratingAveraging(fiveStar, fourStar, threeStar, twoStar, oneStar) {
      this.totalReviewer = fiveStar + fourStar + threeStar + twoStar + oneStar || 0;
      var avarage
      if(this.totalReviewer >0){
      avarage = (
        (fiveStar * 5 +
          fourStar * 4 +
          threeStar * 3 +
          twoStar * 2 +
          oneStar * 1) /
        this.totalReviewer 
      ).toFixed(1);
      
      this.averageRating = avarage || 0;
      this.fullStar = Math.floor(avarage);
      this.emptyStar = 5 - this.fullStar;
      }
      else{
        this.averageRating =  0;
      this.fullStar = 0;
      this.emptyStar = 5;
      }
      // return avarage;
    },
    dateFormat(time){
 var date = new Date(time)
 var year = date.getFullYear()
 var month = date.getMonth()
 var day = date.getDate()
 return month*1+1+'/'+day+'/'+year
    },
        increaseQuantity() {
      this.quantity = this.quantity + 1;
       
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity = this.quantity - 1
      }
    },
     addToCart(product) {
       var cartItem = {};
          cartItem.id = product.id;
          cartItem.name = product.name;
          cartItem.price = product.price;
          cartItem.path = this.bigImagePath;
          cartItem.qty = this.quantity;
           console.log('added product from detail =',cartItem)
          this.$store.commit("setCartItems", cartItem);
           this.$toast.success('product added to the cart')
    },
    buyNow(product){
        var cartItem = {};
        var selectedProduct=[];
          cartItem.id = product.id;
          cartItem.name = product.name;
          cartItem.price = product.price;
          cartItem.path = this.bigImagePath;
          cartItem.qty = this.quantity;
          selectedProduct.push(cartItem)
           console.log('added product from detail =',cartItem)
          this.$store.state.cartItems = selectedProduct;
          this.$router.push({ name: "CheckoutPage" });
    },
    calculateWidth(starValue){
      var progressWidth = Math.floor((starValue/this.totalReviewer) * 100) ||0
      console.log('progress width=',progressWidth,'starValue',starValue)
      return progressWidth+'%'

    }
  },
};
</script>
<style scoped>
.rating {
  color: #ff7e00;
}
.container {
  min-height: 24rem;
  max-height: 24rem;
}
.smallImage {
  width: 5rem;
  max-width: 5rem;
  min-height: 4rem;
  max-height: 4rem;
  overflow: hidden;
}
.smallImage:hover {
  border: 2px solid #ff7e00;
}
.smallImage img {
  min-width: 4rem;
  max-width: 4rem;
  min-height: 3rem;
  max-height: 3rem;
}

.bigImage {
  max-width: 100%;
  min-height: 100%;
  border-radius: 5px;
  overflow: hidden;
}
.bigImage img {
  min-width: 100%;
  min-height: 100%;
}
/* .zoomImg {
  min-width: 100%;
  max-height: 23rem;
  overflow: hidden;
} */
.price {
  color: red;
}
.inputGroup{
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
.btnContainer {
  margin-top: 7rem;
} 
.buyBtn {
  background-color: #ff7e00;
  color: #fff;
}
.buyBtn:hover {
  background-color: #fa424b;
  color: #fff;
}
.addBtn {
  background-color: rgb(70, 230, 70);
  color: #fff;
}
.addBtn:hover {
  background-color: rgb(7, 184, 7);
  color: #fff;
}

.addBtn,
.buyBtn {
  width: 10rem;
}
.solarPicture img {
  min-width: 15rem;
  max-width: 15rem;
  min-height: 10rem;
  max-height: 10rem;
}
.tdLeft {
  text-align-last: right;
}
/* .veriticalline {
  border-left: 1px solid rgb(208, 206, 206);
} */
.reviewBtn:hover {
  background-color: #ff7e00;
  color: #fff;
}
.averageRate {
  border-right: 2px solid rgb(209, 206, 206);
}
.relatedProduct{
  min-height: 6rem;
  max-height: 6rem;
}
.product:focus{
     box-shadow: none!important;
     border: 1px solid #ff7e00!important;
}
.firtLetter{
  background-color: rgb(60, 59, 59);
}
@media(max-width: 992px){
  .btnContainer{
    margin-top: 3rem;
  }
  .productDetail{
    max-width: 96vw;
  }
}
@media(min-width: 992px){
  .productDetail{
  width: 70%;
  margin: auto;
  }
}


</style>
