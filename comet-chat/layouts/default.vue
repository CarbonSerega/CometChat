<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer" mobile-breakpoint="700">
      <v-list subheader>
        <v-subheader>Room members</v-subheader>
        <v-list-item
          v-for="u in users"
          :key="u.id"
          @click=""
        >

          <v-list-item-icon>
            <img class="user-avatar" v-if="u.img" :src="u.img" :alt="u.id">
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="u.name"></v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense>
      <v-app-bar-nav-icon @click="openDrawer" v-if="!drawer"/>
      <v-btn icon v-else @click="closeDrawer">
        <v-icon>close</v-icon>
      </v-btn>

      <v-btn icon @click="exit">
        <v-icon>arrow_back</v-icon>
      </v-btn>

      <v-toolbar-title>Chat Room: {{ user.room }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div style="height: 100%;">
        <nuxt/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data: () => ({
      drawer: true
    }),
    computed: mapState(['user', 'users']),

    methods: {
      openDrawer() {
        this.drawer = true
      },
      closeDrawer() {
        this.drawer = false
      },
      ...mapMutations(['clearData']),
      exit() {
        this.$socket.emit('userLeft', this.user.id, () => {
          this.$router.push('/?msg=exit')
          this.clearData()
        })
      }
    }
  }
</script>

<style lang="stylus">
  html
    overflow-y hidden

  .v-application .primary--text
    color #1dac9e !important

  .user-avatar
    width: 40px
    height 40px
    border-radius 100px

</style>
