<template>
  <div class="superContainer mx-2 mx-lg-5">
    <div class="my-3 d-flex">
      <div v-if="products.meta && products.data?.length && productCategory">{{products.meta?.from+'-'+products.meta?.to+' of '+products.meta?.total}} results for <span class="text-success">"{{productCategory}}"</span></div>
    </div>
    <hr class="mb-0 pb-0">
    <div class="d-flex mb-4">
      <div class="atributteLIst d-none d-lg-block">
        <div class="border-bottom p-3">
          <div class="ms-2 mt-2 mb-2 fw-bold">Category</div>
        <div class="form-check mb-1" v-for="category in categories" :key="category.id">
          <input
            class="form-check-input"
            type="radio"
            name="category"
            :value="category.id"
            :id="category.title"
            v-model="categoryId"
          />
          <label class="form-check-label small" :for="category.title">
            {{category.title}}
          </label>
        </div>
        </div>
      </div>
      <!-- product list section -->
      <div
        class="flex-grow-1 categoryProduct ms-lg-3"
      >
        <div class="row pb-3">
          <div
            class="col-md-6 col-lg-4 pb-2 cardContainer"
            v-for="product in products.data"
            :key="product.id"
          >
            <div class="card border p-4">
              <router-link
                :to="{
                  name: 'ProductDetail',
                  params: { productId: product.id },
                }"
              class="pb-3" >
                <img
                  :src="product.images?.path"
                  class="card-img-top img-fluid"
                  alt="product image"
                />
              
              <div class="cardBody p-2">
                <h6 v-if="product.name?.length > 30" class="card-title">{{ product.name.slice(0,30) }}</h6>
                <h6 v-else class="card-title">{{ product.name }}</h6>
                <div v-if="product.description?.length > 50">{{ product.description.slice(0, 50) }}</div>
                 <div v-else>{{ product.description}}</div>
                 <div class="rating">
                  <p class="mt-2 mb-1 text-center text-success fw-bold"
                    >{{ product.number_of_review }} {{$t('numOfReview',$store.getters.lang)}}</p>
                </div>
                <div class="text-danger text-center">{{ product.price }} {{$t('priceUnit',$store.getters.lang)}}</div>
                
              </div>
              </router-link>
              <!-- <div class="d-flex">
                  <button
                    @click="addToCart(product)"
                    class="btn mt-3 py-1 addtocartBtn ms-auto me-auto"
                  >
                    {{$t('addToCart',$store.getters.lang)}}
                  </button>
                </div> -->
            </div>
          </div>
        </div>
         <div v-if="products.data?.length && !(products.meta?.to >= products.meta?.total)" class="d-flex mt-5">
      <button @click="loadMore()" class="btn loadMorebtn ms-auto me-auto py-0" :disabled="products.meta?.to >= products.meta?.total">
        <span v-if="isProductLoading">Loading <img src="../assets/img/loadmore.gif" alt=""></span>
         <span v-else>Load More</span>
      </button>
    </div>
      </div>
    </div>   
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      productCategory: "",
      categoryId:'',
      brand:'',
      price:'',
      emptyStar: "",
      fullStar: "",
      queryObject:{
      per_page:20,
      },
      pageCounter:1,
      
    };
  },
  created() {
    this.filterSelectedCategory(this.id)
   
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
    isLoading(){
      return this.$store.getters.isLoading
    },
    lang(){
      return this.$store.getters.lang
    },
     categories() {
      return this.$store.getters.categories;
    },
    isProductLoading(){
      return this.$store.getters.isProductLoading;
    }, 
  },
  watch: {
    categoryId(newValue) {
      this.$store.commit('setCategoryId',this.categoryId)
      this.queryObject.id = newValue
      this.queryObject.lang = this.lang
      this.$store.dispatch("featchProducts", this.queryObject);
      this.$store.commit('setCategoryId',newValue)
      this.filterSelectedCategory(newValue)
    },
    id(newValue){
      this.filterSelectedCategory(newValue)
    },
    lang(newValue){
      this.queryObject.lang = newValue
       this.$store.dispatch("featchProducts", this.queryObject);
    },
  },
  methods: {
    filterSelectedCategory(categoryId){
      this.categories.forEach(category=>{
        if(category.id*1 === categoryId*1){
          this.productCategory =  category.title
          console.log('selected category Id',this.productCategory)
          return
        }
      })
      
    },
    // addToCart(product) {
    //    var cartItem = {};
    //       cartItem.id = product.id;
    //       cartItem.name = product.name;
    //       cartItem.price = product.price;
    //       cartItem.path = product.images.path;
    //       cartItem.qty = 1;
    //       console.log('added product from category =',cartItem)
    //       this.$store.commit("setCartItems", cartItem);
    //       this.$toast.success('product added to the cart')
       
    // },
    loadMore(){
      this.pageCounter +=1
      this.queryObject.per_page = 6 * this.pageCounter
       this.queryObject.id = this.categoryId ? this.categoryId :this.id
      this.queryObject.lang = this.lang
      this.$store.dispatch("featchProducts", this.queryObject);
      this.filterSelectedCategory(this.categoryId)
    }
  },
};
</script>
<style scoped>
.superContainer {
  min-height: 100vh;
}
.atributteLIst{
  border-right: 1px solid gainsboro;

}
.form-check-input {
  border-color: #ff7e00;
  color: #fff;
}
.cardContainer {
  min-height: 17rem;
}
.card {
  max-width: 17rem;
  min-width: 17rem;
  min-height: 23%;
  max-height: 23rem;
  margin: 4%;
  border: none;
}
a img {
  /* min-width: 100%; */
  max-width: 100%;
  min-height: 8rem;
  max-height: 8rem;
  transition: all 1.5s;
}

a img:hover{
  transform: scale(1.2);
}
.addtocartBtn {
  width: 100%;
  background-color: #ff7e00;
  color: #fff;
}
.addtocartBtn:hover{
  background-color: #fa424b;
}
.rating {
  color: #ff7e00;
}
.loading{
    min-width: 100%;
    min-height: 100vh;
     position: absolute;
     margin: 0%;
     background-color: #fff;
     z-index: 1000;

}
.loadMorebtn{
  width: 10rem;
  background-color: #ff7e00;
  height: 2.5rem;
  color: #fff;
}
.loadMorebtn img{
  height: 2.3rem;
}
@media (max-width: 992px) {
  .card {
    min-width: 96%;
    max-width: 100%;
    margin: 4%;
  }
}
  @media (max-width: 768px) {
  .loadMorebtn {
    min-width: 96%;
    max-width: 100%;
  }
  
}

@media (min-width: 992px) {
  .atributteLIst {
    width: 20%;
  }
  .categoryProduct {
    width: 78%;
  }
  .addtocartBtn{
    width: 70%;
  }
}
a {
  text-decoration: none;
  color: black;
}
</style>
