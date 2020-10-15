<template>
  <v-layout  column  justify-center  align-center >
    <v-flex class="reg-card" xs12 sm8 >
      <v-card min-width="100">
        <v-card-title>
          <h2>Enter to the Comet Chat</h2>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="14"
              :rules="nameRules"
              label="Name*"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="The Room name*"
              required
            ></v-text-field>

            <div class="avatar-container">
              <v-file-input
                class="file-input"
                :rules="avatarRules"
                @change="showAvatar"
                @click:clear="imgUrl=''"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
              ></v-file-input>
              <img class="avatar-img" v-if="imgUrl" :src="imgUrl" alt="avatar">
            </div>
            <br/>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="submit"
            >
              <span>
                Let's go!
              </span>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  import { mapMutations } from 'vuex'

  const nameRequiredTxt = 'Name is required'
  const nameMaxLength = 14
  const nameOutOfLengthTxt = `Name must be less than ${nameMaxLength} characters`
  const enterRoomNameTxt = 'Enter the Room name'
  const welcomeTitle = 'Welcome to the Comet Chat!'
  const maxAvatarSize = 1000000
  const largeAvatarTxt = `Avatar size should be less than ${maxAvatarSize / (10 ** 6)} MB!`

  export default {
    layout: "empty",
    head: {
      title: welcomeTitle
    },
    sockets: {
      connect: function () {
        console.log('Client IO connected!')
      }
    },
    data: () => ({
      valid: true,
      imgUrl: '',
      name: '',
      nameRules: [
        v => !!v || nameRequiredTxt,
        v => (v && v.length <= nameMaxLength) || nameOutOfLengthTxt,
      ],
      room: '',
      roomRules: [
        v => !!v || enterRoomNameTxt
      ],
      avatarRules: [
        v => !v || v.size < maxAvatarSize || largeAvatarTxt
      ],
    }),

    methods: {
      ...mapMutations(['setUser']),

      showAvatar (file) {
        if(file){
          this.imgUrl = URL.createObjectURL(file)
        }
      },

      submit () {
        if(this.$refs.form.validate()) {
          const user = {
            name: this.name,
            room: this.room,
            img: this.imgUrl
          }

          this.$socket.emit('userConnected', user, data => {
              user.id = data.userId
              this.setUser(user)
              this.$router.push('/chat')
          })
        }
      },
    },
  }
</script>

<style lang="stylus">
  .reg-card
    width 50%
    margin-top: 1rem

  .v-application .success
    background-color #1dac9e !important

  .avatar-container
    display flex
    justify-content space-between

    .avatar-img
      margin 0 0 0 3rem
      width: 50px
      height 50px
      border-radius 100px
</style>
