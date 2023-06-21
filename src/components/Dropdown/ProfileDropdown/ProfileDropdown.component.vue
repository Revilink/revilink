<template lang="pug">
.profile-dropdown.dropdown
  DropdownMenu(direction="right" :overlay="false" :is-open="isOpen" @closed="onClose")
    template(#trigger)
      vs-avatar.profile-dropdown-avatar(size="36" circle)
        img.profile-dropdown-avatar__image(
          v-if="$auth.user.avatar"
          :src="$auth.user.avatar.formats.thumbnail.url"
          :alt="$auth.user.username"
        )
        img.profile-dropdown-avatar__image(v-else src="@/assets/media/core/user.png" :alt="$auth.user.username")
      span.profile-dropdown__username {{ $auth.user.username }}
    template(#body)
      ul.profile-dropdown-list
        li.profile-dropdown-list-item
          NuxtLink(:to="localePath({ name: 'Profile', query: { username: $auth.user.username } })")
            AppIcon.profile-dropdown-list-item__icon(name="ri:user-3-line")
            span.profile-dropdown-list-item__title {{ $auth.user.username }}
        li.profile-dropdown-list-item
          NuxtLink(to)
            AppIcon.profile-dropdown-list-item__icon(name="ri:settings-3-line")
            span.profile-dropdown-list-item__title {{ $t('general.settings') }}
        li.profile-dropdown-list-item.profile-dropdown-list-item--logout(@click="$auth.logout()")
          NuxtLink(to)
            AppIcon.profile-dropdown-list-item__icon(name="ri:logout-box-r-line")
            span.profile-dropdown-list-item__title {{ $t('general.logout') }}
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import DropdownMenu from 'v-dropdown-menu/vue2'
import 'v-dropdown-menu/dist/vue2/v-dropdown-menu.css'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    DropdownMenu,
    AppIcon
  },
  setup() {
    const isOpen = ref(false)

    const onClose = () => {
      isOpen.value = false
    }

    return {
      isOpen,
      onClose
    }
  }
})
</script>

<style lang="scss" src="./ProfileDropdown.component.scss"></style>
