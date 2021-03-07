<template>
  <q-page class="q-pa-sm">
    <div class="q-gutter-md row">
      <q-select
        filled
        :value="userCountry"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="covidCountries"
        @filter="filterFn"
        @input-value="setModel"
        hint="Text autocomplete"
        style="width: 250px; padding-bottom: 32px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </q-page>
</template>

<script>
import moment from 'moment'
import IEcharts from 'vue-echarts-v3/src/full.js'
import _ from 'lodash'
import {getRequesthaha, symptomCheckRequest,getCovidInfo} from '../helpers/request.js'
import axios from "axios";

const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]

export default {
  data () {
    return {
      covidData: null,
      countryOptions: [],
      userCountry: null,
      options: stringOptions,
      covidCountries: [],
      covidUpdateTime: null,
      model: null
    }
  },
  mounted(){
    var self = this;
    const options = {
      method: 'GET',
      url: `http://192.168.31.12:3000/covid19?country=China` ,
      params: {language: 'en-gb', format: 'json'},
      headers: {
        'Access-Control-Allow-Methods' : '*',
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios.request(options).then(function (response) {
      console.log('get covid info',response.data.data);
      var tmpData = response.data.data;
      tmpData = new Set(_.map(tmpData.covid19Stats, 'country'))
      self.covidCountries = [...tmpData]
      // self.covidCountries = new Set(...self.covidCountries)
      // self.covidCountries = [...self.covidCountries]
      console.log('covidCountries', self.covidCountries)
      console.log('covidUpdateTime', self.covidUpdateTime)
    }).catch(function (error) {
      console.error(error);
    });
  },
  watch: {
    model: () => {
      var selff = this;
      console.log('model changed!', selff.model)
    },
    userCountry: () => {
      console.log('userCountry changed!', this.userCountry)
    },
    setModel: () => {
      console.log('setModel changed!', this.setModel)
    }
    // covidData: () => {
    //   var self = this;
    //   console.log('COUNTRY OPTIONS CHANGED!', self.covidData)
    //   self.covidCountries = _.map(self.covidData['covid19Stats'], 'country')
    //   console.log('covidCountries', self.covidCountries)
    // }
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.options = this.covidCountries.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },
    setModel (val) {
      this.model = val
    }
  }
}
</script>
