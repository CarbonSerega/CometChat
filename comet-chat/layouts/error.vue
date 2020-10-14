<template>
  <v-app>
    <div class="http-error">
      <div>
        <h2 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h2>
        <h2 v-else>
          {{ otherError }}
        </h2>
      </div>
      <div>
        <NuxtLink class="link" to="/">
          <v-btn small>
          Home page
          </v-btn>
        </NuxtLink>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: '404 | Not Found',
      otherError: 'An error occurred'
    }
  }
}
</script>

<style lang="stylus" scoped>
*
  height 100%

  h2
    text-align center

  .http-error
    padding 2rem
    display flex
    justify-content space-between

  .link
    text-decoration none

</style>
