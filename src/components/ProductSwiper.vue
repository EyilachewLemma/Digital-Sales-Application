<template>
<div class="p-4 d-flex w-100 flexContainer"> 
   <div v-for="featuredProduct in featuredProducts"
        :key="featuredProduct.id" class="me-3"
      >
        <div class="carousel__item pb-3">
          <div class="card">
              <router-link
              :to="{
                name: 'ProductDetail',
                params: { productId: featuredProduct.id },
              }"
             class="text-decoration-none text-dark">
              <img
                :src="featuredProduct.images?.path"
                class="card-img-top img-fluid"
                alt="product image"
              />           

            <div class="cardBody p-1">
              <div v-if="featuredProduct.description?.name?.length > 35" class="card-title fw-bold small">
                {{ featuredProduct.description?.name.slice(0,35) }}
              </div>
              <div v-else class="card-title fw-bold small">
                {{ featuredProduct.description?.name }}
              </div>
              <div v-if="featuredProduct.description?.description?.length > 50">
                {{ featuredProduct.description?.description.slice(0,50) }}
              </div>
               <div v-else>
                {{ featuredProduct.description?.description }}
              </div>
              <div class="ms-4 d-flex mt-1 text-danger">
                {{ featuredProduct.price }} ETB
              </div>
            </div>
            </router-link>
          </div>
        </div>
  </div>
  </div>
</template>

<script>

export default {
  computed: {
    featuredProducts() {
      return this.$store.getters.featuredProducts;
    },
  },
};
</script>

<style scoped>
.flexContainer{
  background-color: #fff;
  overflow-x: scroll;
}
.flexContainer::-webkit-scrollbar {
  display: none;
}

.flexContainer {
  -ms-overflow-style: none;
  scrollbar-width: none; 
} 
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


</style>
