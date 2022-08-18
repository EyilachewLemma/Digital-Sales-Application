<template>
  <div class="maincontainer">
    <div class="d-flex ms-2 ms-lg-5 align-items-center py-2">
      <div class="me-2 me-lg-3 categoryMenu">
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </div>      
      <!-- category drop down -->
      <div class="dropdown">
        <button
          class="btn categoryBtn dropdown-toggle"
          type="button"
          id="categoryDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Category
        </button>
        <ul class="dropdown-menu" aria-labelledby="categoryDropdown">
          <li
            v-for="category in categories"
            :key="category.id"
            @click="changeCategory(category.id)"
          >
            <span class="mx-2 p-1">{{ category.title }}</span>
          </li>
        </ul>
      </div>
      <!-- store locator -->
      <div class="categoryMenu ms-3">
        <router-link :to="{ name: 'StoreLocator' }"> Store Locator</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryObject:{
      per_page:20,
      },
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
     lang(){
      return this.$store.getters.lang
    }
  },
  methods: {
    changeCategory(categoryId) {  
      this.$router.push({name:'SolarCategory',params: { id: categoryId }})
       this.queryObject.id = categoryId
      this.queryObject.lang = this.lang || 'en'
      this.$store.dispatch("featchProducts", this.queryObject);        
      
      }
  },
};
</script>
<style scoped>
.maincontainer {
  background-color: #e3eede;
  color: #fff;
}
a {
  text-decoration: none;
  color: black;
}
/* .categoryselector {
  width: 10%;
} */
.categoryBtn {
  border: none;
  background: none;
  box-shadow: none !important;
  color: black;
}
/* select {
  background-color: #84db3a;
  color: #fff;
  border: none;
  box-shadow: none !important;
} */
.categoryMenu:hover {
  cursor: pointer;
}
li:hover {
  background-color: gainsboro;
  cursor: pointer;
}
</style>
