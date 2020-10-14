<template>
  <v-layout>
    <v-flex xs12>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>

          <v-text-field label="Type the message"
                        v-model="text"
                        :rules="msgRules"
                        @keydown.enter.prevent="send"/>

      </v-form>
    </v-flex>

  <v-flex>
    <v-btn class="send-btn" x-large depressed icon @click="send" :disabled="!valid">
      <v-icon color="#1dac9e">
        send
      </v-icon>
    </v-btn>
  </v-flex>
  </v-layout>
</template>

<script>
  const msgMaxLength = 100
  const msgOutOfLengthTxt = 'The message is too long! Please, shorten it!'

  export default {
     data: () => ({
       valid: true,
       text: '',
       msgRules: [
         v => (v.length <= msgMaxLength) || msgOutOfLengthTxt,
       ]
     }),
    methods: {
       send() {
         if(!isBlankString(this.text) && this.$refs.form.validate()) {
           this.$socket.emit('createMsg', {
             text: this.text,
             date: Date.now(),
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
  }

  const isBlankString = str => {
    return !str || /^\s*$/.test(str)
  }
</script>

<style lang="stylus" scoped>
  .v-btn.send-btn
    margin-left 10px
</style>
