<template>
  <div class="q-pa-md">
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
      options: stringOptions
    }
  },
  mounted(){
    var haha = getCovidInfo()
    console.log('haha', haha)
  },
  watch: {
    model: () => {
      var self = this;
      console.log('model changed!!!', self.model)
    }
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
