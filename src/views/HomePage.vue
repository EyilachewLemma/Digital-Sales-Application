<template>
  <div class="superContainer">
    <div
      id="carouselhome"
      class="carousel carousel-darck slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselhome"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselhome"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselhome"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
         <button
          type="button"
          data-bs-target="#carouselhome"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active position-relative"
          data-bs-interval="10000"
        >
          <img
            src="../assets/carousel4.jpg"
            class="d-block w-100"
            alt="solar Image"
          />
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img
            src="../assets/carousel1.jpg"
            class="d-block w-100"
            alt="solar Image"
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/carousel3.jpg"
            class="d-block w-100"
            alt="solar Image"
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/carousel2.jpg"
            class="d-block w-100"
            alt="solar Image"
          />
        </div>
        
      </div>
    </div>
    <!-- product section -->
    <div class="row mx-1 mx-lg-5 mt-4 pb-3">
      <div class="col-md-6 col-lg-3 cardContainer rounded mb-3">
        <div class="card position-relative border rounded">
          <img src="../assets/img/store.png" class="img-fluid rounded" alt="near shop" />
          <div class="cardBody">
            <h5 class="text-white"><strong>Go Local</strong></h5>
            <div class="text-white">
              Reach out to solar shop near to
              <div class="text-white">Your home</div>
            </div>
            <button @click="findStore()" class="btn findOut px-3">
              {{$t("findShop",$store.getters.lang)}}
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3 mb-3 mb-lg-0 mt-lg-0 cardContainer" v-for="category in categories" :key="category.id">
        <div class="card position-relative border rounded">
          <img :src="category.image" class="img-fluid rounded" alt="category image" />
          <div class="cardBody w-100">
            <div class="fw-bold text-white text-center">{{category.title}}</div>
            <button @click="gotoCategory(category.id)" class=" bg-white border rounded shadow-sm p-2 text-decoration-none mt-5 ms-5">{{$t("SeeMore",$store.getters.lang)}}</button>
            
          </div>
        </div>
      </div>
    </div>
    <div class="mx-5 mb-2"><strong>{{$t("featuredProduct",$store.getters.lang)}}</strong></div>
    <div class="mx-lg-5 mb-4">
      <ProductSwiper />
    </div>
  </div>
</template>
<script>
import ProductSwiper from "../components/ProductSwiper";
export default {
  components: {
    ProductSwiper,
  },
  data() {
    return {
      queryObject:{
        per_page:6,
      }
    }
  },
    // this.$store.dispatch("featchFeaturedProduct")
  computed: {
    featuredProducts() {
      return this.$store.getters.featuredProducts;
    },
    categories() {
      return this.$store.getters.categories;
    },
  
  },

  methods: {
    findStore() {
      this.$router.push({ name: "StoreLocator" });
    },
    gotoCategory(id){
      this.$router.push({ name: "SolarCategory", params: { id: id }});
      this.queryObject.id = id
    this.queryObject.lang = localStorage.getItem('lang') || 'en'
    this.$store.dispatch("featchProducts",this.queryObject);
      
    },
  },
};
</script>

<style scoped>
img {
  min-height: auto;
  max-height: auto;
}
.textwarning {
  color: rgb(255, 215, 0);
}
.superContainer {
  background-color: #fafafa;
}
@media (max-width: 992px) {
  .card img {
    min-height: 45vh;
    max-height: 45vh;
  } 
   
}
.cardBody {
  position: absolute;
  top: 15%;
  left: 5%;
}
.findOut {
  background-color: #fff;
  color: black;
  box-shadow: none !important;
}
</style>
