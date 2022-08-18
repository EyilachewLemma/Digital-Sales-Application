 <template>
  <GMapMap
    :center="center"
    :zoom="7"
    map-type-id="terrain"
    style="width: 98vw; height: 100vh"
  >
    <GMapCluster :zoomOnClick="true">
      <GMapMarker        
        v-for="(store) in stores" :key="store.id"
        :position="{lat:store.latitude*1,lng:store.longitude*1}"
        :clickable="true"
        :draggable="true"
        @click="openMarker(store)"
      >
      <GMapInfoWindow
          :closeclick="true"
          @closeclick="closeMarker(store)"
          :opened="openedMarkerID === store.id"
      >
        <div> 
            <p class="fw-bold">{{ store.shop_name }}</p>
            <p class="fw-bold mt-3">Locaton </p>
                <p>Region: {{store.region}}</p>
                <p>Zone: {{store.zone}}</p>
                <p>Woreda: {{store.woreda}}</p>
                <p>City: {{store.city}}</p>
                <p>Kebele: {{store.kebele}}</p>
                <p class="mt-3">
                  <span class="fw-bold">Contact Person Name: </span><span class="text-capitalize">{{store.name}}</span> </p>
                <div class="mt-2 d-flex">
                    <p class="fw-bold">Phone Number: </p>
                    <div class="ms-3">
                      <p class="m-0" v-for="phone in store.phone_numbers" :key="phone.id">{{phone.phone_number}}</p>
                    </div>
                </div>
         </div>
      </GMapInfoWindow>
      </GMapMarker>
    </GMapCluster>
  </GMapMap>
</template>

<script>
export default {
  data() {
    return {
      center: { lat: 11.574209, lng: 37.361353 },
      openedMarkerID:null,
    };
  },
  computed:{
   stores   (){
      return this.$store.getters.stores
    },
  },
  methods: {
    openMarker(store) {
      this.center = {lat:store.latitude*1,lng:store.longitude*1}
       this.openedMarkerID = store.id
       
    },
    closeMarker(){
      this.openedMarkerID = null
    }
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>

