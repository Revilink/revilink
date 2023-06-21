<template lang="pug">
.profile-head
  .profile-head__media
    vs-avatar.profile-head__avatar(circle size="64")
      img(v-if="user.avatar" :src="user.avatar.formats.thumbnail.url" :alt="user.username")
      img(v-else src="@/assets/media/core/user.png" :alt="user.username")
  .profile-head__body
    h1.profile-head__username {{ user.username }}
    strong.profile-head__fullname(v-if="user.information?.fullname") {{ user.information.fullname }}
    p.profile-head__bio(v-if="user.information?.bio") {{ user.information.bio }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup() {}
})
</script>

<style lang="scss" src="./ProfileHead.component.scss"></style>
