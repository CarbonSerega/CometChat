<template>
    <div>
      <div v-if="name === 'admin'" class="system-msg">
        <p>{{ text }}</p>
      </div>

      <div v-else class="msg-container">
        <div class="msg" :class="{ owner }">
          <strong>{{ name }}</strong>
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
      props: {
        name: String,
        text: String,
        owner: {
          type: Boolean,
          default: false
        }
      }
  }
</script>

<style lang="stylus" scoped>
  .system-msg {
    margin-bottom 1rem
    text-align center
    color #1dac9e
    font-weight bold
    border-bottom #1dac9e 2px dashed
    p {
      margin-bottom 1 rem
    }
  }

  .msg-container {
    display flex
    flex-direction column

    .msg {
      position: relative;
      padding 1rem
      width 50%
      border-radius 5px
      background: #1dac9e
      margin-bottom 1rem
      color: white

      p {
        margin-bottom 0
      }
    }

    .owner {
      background: #d9d9d9
      color #6d6d6d
      align-self flex-end

    }
  }
</style>
