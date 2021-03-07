import Vue from 'vue'
import axios from 'axios'
import App from '../App'
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCoU9gHx8I__cazm9Yf8F1t8auzcpWxZHk",
    libraries: "places" // necessary for places input
  }
});
Vue.prototype.$axios = axios
