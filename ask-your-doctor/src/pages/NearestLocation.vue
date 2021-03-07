<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-12 col-md-8">
      </div>
      <div class="col-12 col-md-4">
        <div class="q-pa-md" style="max-width: 400px">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-option-group
              v-model="distanceGroup"
              :options="distanceOptions"
              color="primary"
            />
            <q-input
              filled
              type="text"
              v-model="coordinates"
              label="Enter your address"
              lazy-rules
            ><q-btn label="Locate me!" @click="locatorButtonPressed" type="button" color="primary"/></q-input>
<!--            <q-toggle v-model="accept" label="I accept the license and terms" />-->
            <div>
              <q-btn label="Find Close-by Hospital" type="submit" color="primary"/>
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
name: "NearestLocation.vue",
  data() {
  return {
    type: 'restaurant',
    places: [],
    radius: "",
    address: "",
    lat: 0,
    lng: 0,
    distanceGroup: '5',
    distanceOptions: [
      {
        label: '5 KM',
        value: '5'
      },
      {
        label: '10 KM',
        value: '10'
      },
      {
        label: '15 KM',
        value: '15'
      },
      {
        label: '20 KM',
        value: '20'
      }
    ]
  }
  },
  computed: {
  coordinates() {
    return this.address;
    // return `${this.lat}, ${this.lng}`;
  }
  },
  methods: {
    async getStreetAddressFrom(lat, long) {
      try {
        var {
          data
        } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          long +
          "&key=AIzaSyCoU9gHx8I__cazm9Yf8F1t8auzcpWxZHk"
        );
        if (data.error_message) {
          console.log(data.error_message)
        } else {
          this.address = data.results[0].formatted_address;
          console.log('address', data.results[0].formatted_address)
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.getStreetAddressFrom(position.coords.latitude, position.coords.longitude)
        },
        error => {
          console.log(error.message);
        }
      );
    },

  //
  // locatorButtonPressed() {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //     },
  //     error =>{
  //       console.error('Error getting location', error);
  //     }
  //   );
  // }
  }
}
</script>

<style scoped>

</style>
