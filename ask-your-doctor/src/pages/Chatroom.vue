<template>
  <basic-vue-chat :initial-feed="feed" />
</template>


<script>
import BasicVueChat from 'basic-vue-chat'

export default {
  components: {
    "basic-vue-chat": BasicVueChat
  },
  data() {
    const feed = [
      {
        id: 1,
        author: 'Person',
        imageUrl: 'http://path/to/image',
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
</script>
