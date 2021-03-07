<template>
  <div class="q-pa-md">

    <div class="row">
      <div class="col-12 col-md-4">
        <q-toolbar style="border-radius:7.5px; height: 6px;" class="bg-primary text-white shadow-2">
          <q-toolbar-title>Contacts</q-toolbar-title>
        </q-toolbar>

        <q-list bordered >
          <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable v-ripple>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ contact.letter }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ contact.name }}</q-item-label>
              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="chat_bubble" color="green" />
            </q-item-section>
          </q-item>

          <q-separator />
          <q-item-label header>Offline</q-item-label>

          <q-item v-for="contact in offline" :key="contact.id" class="q-mb-sm" clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ contact.name }}</q-item-label>
              <q-item-label caption lines="1">{{ contact.email }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="chat_bubble" color="grey" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-12 col-md-8">
        <basic-vue-chat :title="'Your Personal Doctor'" :initial-feed="feed" style="height: 1000px"/>
      </div>
    </div>
  </div>
</template>
<script>
import BasicVueChat from 'basic-vue-chat'
const contacts = [ {
  id: 1,
  name: 'Ruddy Jedrzej',
  email: 'rjedrzej0@discuz.net',
  letter: 'R'
}, {
  id: 2,
  name: 'Mallorie Alessandrini',
  email: 'malessandrini1@marketwatch.com',
  letter: 'M'
}, {
  id: 3,
  name: 'Elisabetta Wicklen',
  email: 'ewicklen2@microsoft.com',
  letter: 'E'
}, {
  id: 4,
  name: 'Seka Fawdrey',
  email: 'sfawdrey3@wired.com',
  letter: 'S'
},
  {
    id: 5,
    name: 'Ruddy Jedrzej',
    email: 'rjedrzej0@discuz.net',
    letter: 'R'
  },
  {
    id: 6,
    name: 'Ruddy Jedrzej',
    email: 'rjedrzej0@discuz.net',
    letter: 'R'
  },
  {
    id: 7,
    name: 'Ruddy Jedrzej',
    email: 'rjedrzej0@discuz.net',
    letter: 'R'
  }]
const offline = [ {
  id: 5,
  name: 'Brunhilde Panswick',
  email: 'bpanswick4@csmonitor.com',
  avatar: 'avatar2.jpg'
}, {
  id: 6,
  name: 'Winfield Stapforth',
  email: 'wstapforth5@pcworld.com',
  avatar: 'avatar6.jpg'
} ]

export default {
  components: {
    "basic-vue-chat": BasicVueChat
  },
  data() {
    return {
      offline,
      contacts,
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
$window-width: 800px;
$window-height: 700px;
// above the following import you can override default values of variables like $primary
@import "../assets/scss/main.scss";
</style>

