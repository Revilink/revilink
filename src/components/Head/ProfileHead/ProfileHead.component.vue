<template lang="pug">
.profile-head
  .profile-head__media
    .profile-head__avatar
      AppAvatar(:user="user" :size="64")
  .profile-head__body
    h1.profile-head__username {{ user.username }}
    strong.profile-head__fullname(v-if="user.information?.fullname") {{ user.information.fullname }}
    p.profile-head__bio(v-if="user.information?.bio") {{ user.information.bio }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAuth } from '@/hooks'
import { AppAvatar } from '@/components/Avatar'

export default defineComponent({
  components: {
    AppAvatar
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { getAvatarSrc } = useAuth()

    return {
      getAvatarSrc
    }
  }
})
</script>

<style lang="scss" src="./ProfileHead.component.scss"></style>
