<template lang="pug">
header.app-header(:class="[revealClass, variantClass]")
  .app-header__inner.container
    AppLogo(:height="34")
    .ms-auto.d-flex.align-items-center
      ApplicationNavButtonGroup
      ProfileDropdown.ms-2(v-if="$auth.loggedIn && $auth.user")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, computed } from '@nuxtjs/composition-api'
import type { Ref } from 'vue'
import { AppLogo } from '@/components/Logo'
import { ApplicationNavButtonGroup } from '@/components/ButtonGroup'
import { ProfileDropdown } from '@/components/Dropdown'

export default defineComponent({
  components: {
    AppLogo,
    ApplicationNavButtonGroup,
    ProfileDropdown
  },
  props: {
    variant: {
      type: String,
      required: false,
      default: 'default',
      validator: (value: string) => ['default', 'home'].includes(value)
    }
  },
  setup(props) {
    const baseClassName = 'app-header'

    const isScrolledWindow: Ref<boolean> = ref(false)

    const handleScroll = () => {
      const scrollThreshold = 64
      isScrolledWindow.value = window.scrollY > scrollThreshold
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const revealClass = computed(() => {
      return isScrolledWindow.value ? `${baseClassName}--reveal` : null
    })

    const variantClass = computed(() => {
      if (props.variant === 'home') {
        return `${baseClassName}--home`
      } else {
        return `${baseClassName}--default`
      }
    })

    return {
      revealClass,
      variantClass
    }
  }
})
</script>

<style lang="scss" src="./AppHeader.component.scss"></style>
