<template lang="pug">
header.app-header(:class="[revealClass, variantClass]")
  .app-header__inner.container
    AppLogo(:height="34")
    ReviewSearchForm(v-if="isVisibleReviewSearchForm" :auto-focus="false")
    .d-flex.align-items-center.ms-auto
      ApplicationNavButtonGroup
      ProfileDropdown.ms-2(v-if="$auth.loggedIn && $auth.user")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, computed, useRoute } from '@nuxtjs/composition-api'
import type { Ref } from 'vue'
import { AppLogo } from '@/components/Logo'
import { ApplicationNavButtonGroup } from '@/components/ButtonGroup'
import { ProfileDropdown } from '@/components/Dropdown'
import { ReviewSearchForm } from '@/components/Form'

export default defineComponent({
  components: {
    AppLogo,
    ApplicationNavButtonGroup,
    ProfileDropdown,
    ReviewSearchForm
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
    const route = useRoute()

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

    const isVisibleReviewSearchForm = computed(() => {
      return route.value.name?.includes('Reviews')
    })

    return {
      revealClass,
      variantClass,
      isVisibleReviewSearchForm
    }
  }
})
</script>

<style lang="scss" src="./AppHeader.component.scss"></style>
