<template lang="pug">
.reactioner-user-list
  nuxt-link.reactioner-user-list-item(v-for="i in 86" :key="i" to="/username" title="username")
    vs-avatar.reactioner-user-list-item__avatar(size="36" circle)
      img(src="https://i.pravatar.cc/1024?img=52" alt="username")
    span.reactioner-user-list-item__username @username
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {}
})
</script>

<style lang="scss" src="./ReactionerUserList.component.scss"></style>
