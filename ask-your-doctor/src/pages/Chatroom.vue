<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 800px">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 600px; max-width: 750px; margin-left: 10px; padding-left: 10px;"
      >
        <q-chat-message
          label="Sunday, 19th"
        />

        <q-chat-message
          name="me"
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          :text="['hey, how are you?']"
          sent
          :stamp="timee1"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="['doing fine, how r you?']"
          :stamp="timee2"
        />
        <q-chat-message
          name="me"
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          :text="['Pretty good.']"
          sent
          :stamp="timee1"
        />
        <q-chat-message
          name="me"
          avatar="https://cdn.quasar.dev/img/avatar4.jpg"
          :text="['Recently my knees hurt oftenly, could you please help me to diagnose what issue it is?']"
          sent
          :stamp="timee1"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="['Of course!']"
          :stamp="timee2"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="['Would you mind to take a picture of your knees?']"
          :stamp="timee2"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="['I want to know more information.']"
          :stamp="timee2"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="['I want to know more information.']"
          :stamp="timee2"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="['I want to know more information.']"
          :stamp="timee2"
        />
        <q-chat-message
          name="Jane"
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          :text="['I want to know more information.']"
          :stamp="timee2"
        />        <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['I want to know more information.']"
        :stamp="timee2"
      />


      </q-scroll-area>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {getRequesthaha, symptomCheckRequest,getCovidInfo} from '../helpers/request.js'
export default {
  name: "Chatroom",
  components: {
    // CardPricing : () => import('components/cards/CardPricing')
  },
  data() {
    return {
      timee1: '2020-12-01',
      timee2: '2020-12-08',
      year: (new Date()).getFullYear(),
      pricing_data: [
        {
          title: 'Basic',
          price: '$0',
          icon: 'home_work',
          background_image: 'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)',
          text: 'This is good if your company size is between 2 and 10 Persons.'
        },
        {
          title: 'Small Company',
          price: '$25',
          icon: 'home',
          background_image: 'linear-gradient(-225deg, #5D9FFF 0%, #6BBBFF 100%)',
          text: 'This is good if your company size is between 2 and 10 Persons.'
        },
        {
          title: 'Extended',
          price: '$250',
          icon: 'apartment',
          background_image: 'linear-gradient(to right, #2B86C5 0%, #2B86C5 100%)',
          text: 'This is good if your company size is between 2 and 10 Persons.'
        },
        {
          title: 'Extra Pack',
          price: '$750',
          icon: 'business_center',
          background_image: 'linear-gradient(87deg, rgb(17, 205, 239), rgb(17, 113, 239)) !important',
          text: 'This is good if your company size is between 2 and 10 Persons.'
        },
      ]
    }
  },
  created() {
    console.log('CREATED');
    // getRequesthaha('https://covid19-api.weedmark.systems/api/v1/stats?country=Canada');
    // symptomCheckRequest();
    getCovidInfo();
  },
  methods: {

  }
}
</script>

<style scoped>
.q-page-container bg-grey-2{
  height: 1000px;
}
</style>
