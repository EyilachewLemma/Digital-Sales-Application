<template>
  <div class="px-3 pb-2 bg-white">
    <Carousel :breakpoints="breakpoints" :settings="settings">
      <Slide
        v-for="product in products"
        :key="product.id"
      >
        <div class="carousel__item pb-3">
          <div class="card">
            <div class="new border rounded-pill text-center">{{$t('new',$store.getters.lang)}}</div>
            <div class="imgBox mt-3">
              <router-link
              :to="{
                name: 'ProductDetail',
                params: { productId: product.id },
              }"
            >
              <img
                :src="product.images?.path"
                class="card-img-top img-fluid"
                alt="product image"
              />
            </router-link>
            </div>

            <div class="cardBody mt-4 p-1">
              <h6 v-if="product.name.length > 30" class="card-title">
                {{ product.name.slice(0, 30) }}
              </h6>
              <h6 v-elsse class="card-title">
                {{ product.name }}
              </h6>
              <div class="ms-4 d-flex redText mt-1">
                {{ product.price }} {{$t('priceUnit',$store.getters.lang)}}
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  props:['products'],
  // props: ["featuredProducts"],
  data: () => ({
    settings: {
      itemsToShow: 4,
      itemsToScroll: 1,
      snapAlign: "center",
    },
    breakpoints: {
      0: {
        itemsToShow: 1,
        snapAlign: "center",
      },
      576: {
        itemsToShow: 2,
        snapAlign: "center",
      },
      768: {
        itemsToShow: 3,
        snapAlign: "center",
      },
      992: {
        itemsToShow: 4,
        snapAlign: "start",
      },
    },
    fullStar: "",
    emptyStar: "",
  }),
  // created() {
  //   console.log('featuredProducts from parent =',this.featuredProducts)
  // },
  computed: {
    featuredProducts() {
      return this.$store.getters.featuredProducts;
    },
  },
  methods: {
    averageRatings(
      fiveStar,
      fourStar,
      threeStar,
      twoStar,
      oneStar,
      noReviewers
    ) {
      var avarageRateing;

      if (noReviewers > 0) {
        avarageRateing = Math.floor(
          (fiveStar + fourStar + threeStar + twoStar + oneStar) / noReviewers
        );
        this.emptyStar = 5 - avarageRateing;
        this.fullStar = avarageRateing;
      } else {
        this.emptyStar = 5;
        this.fullStar = 0;
      }
      // return { fullStar: avarageRateing, emptyStar: unComplete };
    },
    addToCart(product) {

      var cartItem = {};
          cartItem.id = product.id;
          cartItem.name = product.name;
          cartItem.price = product.price;
          cartItem.path = product.images.path;
          cartItem.qty = 1;
          this.$store.commit("setCartItems", cartItem);
          console.log('added product =',cartItem)
          this.$toast.success('product added to the cart')

    },
  },
});
</script>

<style scoped>
.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}

.card {
  max-width: 17rem;
  min-width: 17rem;
  min-height: 23%;
  max-height: 23rem;
  margin: 4%;
  overflow: hidden;
  border: none;
}
.imgBox{
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow: hidden;
}
.imgBox img {
  /* min-width: 100%; */
  max-width: 17rem;
  min-height: 8rem;
  max-height: 8rem;
   transition: all 1.5s;
}
.imgBox img:hover{
  transform: scale(1.5);
}
.new{
    width: 3rem;
    /* margin: auto; */
    border-color: #ff7e03;
    color: #ff7e03;
}
.redText{
    color: red;
}

</style>
