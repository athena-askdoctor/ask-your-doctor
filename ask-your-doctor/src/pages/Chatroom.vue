<template>
  <basic-vue-chat :title="'Your Personal Doctor'" :initial-feed="feed" style="height: 1000px"/>
</template>
<script>
import BasicVueChat from 'basic-vue-chat'

export default {
  components: {
    "basic-vue-chat": BasicVueChat
  },
  data() {
    return {
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
@import "../assets/scss/main.scss";
</style>

