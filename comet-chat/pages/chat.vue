<template>
  <div class="chat-container">
    <div class="chat" ref="block">
      <Message v-for="(msg, i) in messages"
               :key="i"
               :name="msg.name"
               :text="msg.text"
               :date="msg.date"
               :owner="msg.id === user.id" />
    </div>
    <div class="chat-form">
      <ChatInput />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Message from "../components/Message"
  import ChatInput from "../components/ChatInput"

  export default {
    components: { Message, ChatInput },
    middleware: ['chat'],
    head() {
      return { title: `Chat room ${this.user.room}` }
    },
    computed: mapState(['user', 'messages']),
    comments: { Message },
    watch: {
      messages() {
        setTimeout(() => {
          if(this.$refs.block) {
            this.$refs.block.scrollTop = this.$refs.block.scrollHeight
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .chat-container
    position: relative
    height: 100%

  .chat
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 80px
    padding: 1rem
    overflow-y: auto

  .chat-form
    position: absolute
    left: 0
    right: 0
    bottom: 0
    padding: 1rem
    height: 80px

</style>
