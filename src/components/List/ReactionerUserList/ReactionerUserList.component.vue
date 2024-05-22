<template lang="pug">
.reactioner-user-list
  NuxtLink.reactioner-user-list-item(v-for="i in 86" :key="i" to="/username" title="username")
    AppAvatar(:size="36")
    span.reactioner-user-list-item__username @username
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { AppAvatar } from '@/components/Avatar'

export default defineComponent({
  components: {
    AppAvatar
  },
  setup() {}
})
</script>

<style lang="scss" src="./ReactionerUserList.component.scss"></style>
