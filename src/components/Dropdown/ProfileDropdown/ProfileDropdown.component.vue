<template lang="pug">
.profile-dropdown.dropdown
  DropdownMenu(direction="right" :overlay="false" :is-open="isOpen" @closed="onClose")
    template(#trigger)
      AppAvatar.profile-dropdown-avatar(:user="$auth.user" :size="36")
      span.profile-dropdown__username {{ $auth.user.username }}
    template(#body)
      ul.profile-dropdown-list
        li.profile-dropdown-list-item.profile-dropdown-list-item--profile
          NuxtLink(:to="localePath({ name: 'Profile', query: { username: $auth.user.username } })")
            AppAvatar.profile-dropdown-avatar.profile-dropdown-list-item__icon(:user="$auth.user" :size="24")
            span.profile-dropdown-list-item__title {{ $auth.user.username }}
        li.profile-dropdown-list-item
          NuxtLink(
            :to="localePath({ name: 'Profile', query: { username: $auth.user.username } })"
            @click.native.prevent.capture="handleClickLinkCollections"
          )
            AppIcon.profile-dropdown-list-item__icon(name="ri:bookmark-line")
            span.profile-dropdown-list-item__title {{ $t('linkCollection.myLinkCollections') }}
        li.profile-dropdown-list-item
          NuxtLink(:to="localePath({ name: 'Settings-Profile' })")
            AppIcon.profile-dropdown-list-item__icon(name="ri:settings-3-line")
            span.profile-dropdown-list-item__title {{ $t('general.settings') }}
        li.profile-dropdown-list-item.profile-dropdown-list-item--logout
          NuxtLink(:to="localePath({ name: 'Auth-Logout-Callback' })")
            AppIcon.profile-dropdown-list-item__icon(name="ri:logout-box-r-line")
            span.profile-dropdown-list-item__title {{ $t('general.logout') }}
</template>

<script lang="ts">
import { defineComponent, useStore, ref } from '@nuxtjs/composition-api'
import DropdownMenu from 'v-dropdown-menu'
import 'v-dropdown-menu/dist/v-dropdown-menu.css'
import { useAuth } from '@/hooks'
import { AppAvatar } from '@/components/Avatar'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    DropdownMenu,
    AppAvatar,
    AppIcon
  },
  setup() {
    const store = useStore()

    const { getAvatarSrc } = useAuth()

    const isOpen = ref(false)

    const onClose = () => {
      isOpen.value = false
    }

    const handleClickLinkCollections = () => {
      store.commit('link-collection/OPEN_LINK_COLLECTIONS_DIALOG')
    }

    return {
      getAvatarSrc,
      isOpen,
      onClose,
      handleClickLinkCollections
    }
  }
})
</script>

<style lang="scss" src="./ProfileDropdown.component.scss"></style>
