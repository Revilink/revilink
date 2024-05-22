<template lang="pug">
.app-avatar
  vs-avatar(v-if="userObject" circle :size="String(size)")
    Avatar(:size="size" variant="beam" :colors="colors" :name="userObject.username")
    // img.app-avatar__image(v-if="user && getAvatarSrc({ user })?.length > 0" :src="getAvatarSrc({ user })" :alt="user.username")
  vs-avatar(v-else circle :size="String(size)")
    Avatar(:size="size" variant="beam" :colors="colors" name="revilink")
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from '@nuxtjs/composition-api'
import Avatar from 'vue2-boring-avatars'
import { useAuth } from '@/hooks'

export default defineComponent({
  components: {
    Avatar
  },
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

    const colors = computed(() => {
      return ['#ddd', '#aaa', '#888', '#666', '#eee']
    })

    return {
      userObject,
      getAvatarSrc,
      colors
    }
  }
})
</script>

<style lang="scss" src="./AppAvatar.component.scss"></style>
