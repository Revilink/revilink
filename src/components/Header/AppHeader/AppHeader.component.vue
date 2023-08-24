<template lang="pug">
header.app-header(:class="[variantClass]")
  .app-header__inner.container
    AppLogo(:height="34")
    .ms-auto.d-flex.align-items-center
      ApplicationNavButtonGroup
      ProfileDropdown.ms-2(v-if="$auth.loggedIn && $auth.user")
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
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

    const variantClass = computed(() => {
      if (props.variant === 'home') {
        return `${baseClassName}--home`
      } else {
        return `${baseClassName}--default`
      }
    })

    return {
      variantClass
    }
  }
})
</script>

<style lang="scss" src="./AppHeader.component.scss"></style>
