<template>
  <div class="q-pa-md">
    <h1>COVID Dashboard</h1>
    <div class="q-gutter-md row">
      <q-select
        filled
        :value="model"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
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
  </div>
</template>

<script>
import moment from 'moment'
import IEcharts from 'vue-echarts-v3/src/full.js'
import _ from 'lodash'
import {getRequesthaha, symptomCheckRequest,getCovidInfo} from '../helpers/request.js'
import axios from "axios";

const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
].reduce((acc, opt) => {
  for (let i = 1; i <= 5; i++) {
    acc.push(opt + ' ' + i)
  }
  return acc
}, [])
export default {
  data () {
    return {
      model: null,
      options: stringOptions,
      covidData: []
    }
  },
  mounted(){
    let self = this;
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
      console.log('get covid info',response.data);
      self.covidData = response.data;
      console.log(self.covidData)
    }).catch(function (error) {
      console.error('error with getCovidData', error)
    }.then(() => {
      console.log('finished fetcing covid data')
    }))
  },
  computed: {
    model: () => {
      console.log('model changed!!!')
      return this.model
    }
  },
  watch: {
    // model: () => {
    //   var self = this;
    //   console.log('model changed!!!', self.model)
    // }
  },
  methods: {
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        this.options = stringOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },
    setModel (val) {
      this.model = val
    }
  }
}
</script>
