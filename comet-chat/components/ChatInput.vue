<template>
    <v-flex xs12>
      <v-text-field label="Type the message"
                    v-model="text"
                    outlined
                    @keydown.enter="send"/>
    </v-flex>
</template>

<script>
  export default {
     data: () => ({
       text: ''
     }),
    methods: {
       send() {
         this.$socket.emit('createMsg', {
           text: this.text,
           id: this.$store.state.user.id
         }, data => {
           if(typeof data === 'string') {
             console.error(data)
           } else {
             this.text = ''
           }
         })
       }
    }
  }
</script>

<style scoped>

</style>
