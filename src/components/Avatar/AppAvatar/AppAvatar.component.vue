<template lang="pug">
.app-avatar
  vs-avatar(v-if="userComputed?.avatar && avatarSrc?.length > 0" circle :size="String(size)")
    img.app-avatar__image(loading="lazy" :src="avatarSrc" :alt="userComputed.username")
  vs-avatar(v-else circle :size="String(size)")
    img.app-avatar__image(loading="lazy" src="/media/core/user.png" alt="Avatar")
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from '@nuxtjs/composition-api'
import { useAuth } from '@/hooks'
import { UserTypes } from '@/types'

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
    const userComputed = computed(() => userObject.value)

    const avatarSrc = ref(getAvatarSrc({ user: userComputed.value as UserTypes }))

    watch(
      () => props.user,
      value => {
        userObject.value = value
        avatarSrc.value = getAvatarSrc({ user: userComputed.value as UserTypes })
      }
    )

    return {
      getAvatarSrc,
      userComputed,
      avatarSrc
    }
  }
})
</script>

<style lang="scss" src="./AppAvatar.component.scss"></style>
