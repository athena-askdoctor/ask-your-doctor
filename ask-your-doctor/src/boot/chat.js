import Chat from 'vue-beautiful-chat'
import Vue from "vue";
Vue.use(Chat)
Vue.prototype.$chat = Chat
// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, Vue ... } */) => {
  // something to do
}
