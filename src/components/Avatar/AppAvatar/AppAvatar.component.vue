<template lang="pug">
.app-avatar
  vs-avatar(v-if="user?.avatar && getAvatarSrc({ user })?.length > 0" circle :size="String(size)")
    img.app-avatar__image(loading="lazy" :src="getAvatarSrc({ user })" :alt="user.username")
  vs-avatar(v-else circle :size="String(size)")
    img.app-avatar__image(loading="lazy" src="@/assets/media/core/user.png" alt="Avatar")
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { useAuth } from '@/hooks'

export default defineComponent({
  props: {
    user: {
      type: Object,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      required: false,
      default: 32
    },
    name: {
      type: String,
      required: false,
      default: 'avatar'
    }
  },
  setup(props) {
    const { getAvatarSrc } = useAuth()

    const userObject = ref(props.user)

    watch(
      () => props.user,
      value => {
        userObject.value = value
      }
    )

    return {
      userObject,
      getAvatarSrc
    }
  }
})
</script>

<style lang="scss" src="./AppAvatar.component.scss"></style>
