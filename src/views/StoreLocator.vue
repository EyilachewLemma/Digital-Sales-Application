<template>
  <div class="mx-2 mx-lg-5 my-3">
    <!-- <router-link :to="{ name: 'Home' }">home</router-link> > Sore Locator
  </div>
  <h4 class="text-center mt-2">Store Locator</h4>
  <div class="row bg-white mx-2 mx-lg-5 p-2 mb-3">
    <div class="col-lg-4 mt-2">
      <input
        type="tel"
        class="form-control"
        id="cityname"
        placeholder="enter city name"
        aria-label="Text input with select field"
        v-model="cityName"
      />
      <div class="form-check mt-3 d-flex justify-content-end">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="useMyLocation"
          v-model="useLocation"
        />
        <label class="form-check-label ms-2" for="keepmesignedin">
          Use my Location
        </label>
      </div>
      <div class="range-slider">
        <label for="customRange" class="form-label"
          >radius: {{ inputRange }}KM</label
        >
        <input
          type="range"
          id="customRange"
          min="0"
          max="100"
          v-model="inputRange"
        />
      </div>
    </div> -->

    <div class="mt-2">
      <MapBox />
    </div>
  </div>
  <div class="row mx-1 mx-lg-5 mt-4 pb-3 mb-3">
    <div class="col-md-6 col-lg-3 cardContainer">
      <div class="card position-relative">
        <img src="../assets/img/store.png" class="img-fluid" alt="near shop" />
        <div class="cardBody">
          <h5 class="text-white"><strong>Go Local</strong></h5>
          <div class="text-white">
            Reach out to solar shop near to
            <div class="text-white">Your home</div>
          </div>
          <button @click="findStore()" class="btn findOut px-3">
            Find Out
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-6 col-lg-3 mb-3 mb-lg-0 mt-lg-0 cardContainer" v-for="category in categories" :key="category.id">
        <div class="card position-relative border rounded">
          <img :src="category.image" class="img-fluid rounded" alt="category image" />
          <div class="cardBody">
            <div class="fw-bold text-white">{{category.title}}</div>
            <div class="text-white">
              Reach out to solar shop near to
              <div class="text-white mb-3">Your home</div>
            </div>
            <router-link :to="{name:'SolarCategory',params:{id:category.id}}" class=" bg-white border rounded shadow-sm p-2 text-decoration-none">{{$t("SeeMore",$store.getters.lang)}}</router-link>
            
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import MapBox from "./MapBox.vue";
export default {
  components: {
    MapBox,
  },
  data() {
    return {
      cityName: "",
      useLocation: "",
      inputRange: 0,
    };
  },
  computed:{
      categories() {
      return this.$store.getters.categories;
    },
     
  },
  methods: {
     findStore() {
      this.$router.push({ name: "StoreLocator" });
    },
  },
};
</script>
<style scoped>
#useMyLocation {
  background-color: #84db3a;
}
.form-check-label {
  color: #ff7e03;
}
/* range input */
.range-slider {
  min-width: 100%;
}
.range-slider input {
  min-width: 100%;
  background-color: #84db3a;
  color: #84db3a !important;
}
.cardBody {
  position: absolute;
  top: 15%;
  left: 5%;
}
.cardContainer,
.card,
.card img {
  min-height: 45vh;
  max-height: 45vh;
}
.findOut {
  background-color: #fff;
  color: black;
  box-shadow: none !important;
}
</style>
