<template>
  <div id="q-app">
    <q-btn label="Right"
           style="right: 20px; position: fixed; top: 700px; z-index: 1000;float: right;background-color: white;"
           icon="keyboard_arrow_right" color="yellow" @click="open('right')" />
    <q-dialog v-model="dialog" :position="position">
      <basic-vue-chat :title="'Your Personal Doctor'" :initial-feed="feed" style="height: 1000px"/>
      <!--      <q-card style="width: 350px">-->
<!--        <q-linear-progress :value="0.6" color="pink" />-->

<!--        <q-card-section class="row items-center no-wrap">-->
<!--          <div>-->
<!--            <div class="text-weight-bold">The Walker</div>-->
<!--            <div class="text-grey">Fitz & The Tantrums</div>-->
<!--          </div>-->

<!--          <q-space />-->

<!--          <q-btn flat round icon="fast_rewind" />-->
<!--          <q-btn flat round icon="pause" />-->
<!--          <q-btn flat round icon="fast_forward" />-->
<!--        </q-card-section>-->
<!--      </q-card>-->
    </q-dialog>
    <router-view />
  </div>
</template>

<script>
import BasicVueChat from 'basic-vue-chat'
export default {
  name: 'App',
  components: {
    "basic-vue-chat": BasicVueChat
  },
  methods: {
    open (position) {
      this.position = position
      this.dialog = true
    }
  },
  data() {
    return {
      dialog: '',
      position: 'top',
      feed: [
        {
          id: 1,
          author: 'Dr. One',
          // imageUrl: 'http://path/to/image',
          contents: 'hi there',
          date: '16:30'
        },
        {
          id: 0,
          author: 'Me',
          contents: 'hello',
          date: '16:30'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
// above the following import you can override default values of variables like $primary
$dark-bg: black;
$light-bg: white;
@import "./assets/scss/main.scss";
</style>

