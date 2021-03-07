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
    <div id="map"></div>
  </div>
</template>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoU9gHx8I__cazm9Yf8F1t8auzcpWxZHk&libraries=places&callback=initMap" async defer></script>
<script>
import axios from 'axios'
var map;
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
    initMap() {
  // Create the map.
  var pyrmont = {
    lat: 23.8701334,
    lng: 90.2713944
  };
  if (navigator.geolocation) {
    try {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pyrmont = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    } catch (err) {

    }
  }
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 17
  });

  // Create the places service.
  var service = new google.maps.places.PlacesService(map);

  // Perform a nearby search.
  service.nearbySearch({
      location: pyrmont,
      radius: 4000,
      type: ['hospital']
    },
    function(results, status, pagination) {
      if (status !== 'OK') return;

      createMarkers(results);
      getNextPage = pagination.hasNextPage && function() {
        pagination.nextPage();
      };
    });
},createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });
    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}
  }
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

#map {
  height: 500px;
  margin: 10px auto;
  width: 800px;
}
</style>
