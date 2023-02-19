<template lang="pug">
.page.home-page
  h1 {{ message.title }}
  p {{ message.description }}

  NuxtLink(:to="navigation.link") {{ navigation.title }}
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { HomeNavigationTypes } from './Home.page.types'
import { WelcomeMessageTypes } from '@/types'

export default defineComponent({
  layout: 'Default/Default.layout',
  setup() {
    const message = ref<WelcomeMessageTypes>({
      title: 'Home page',
      description: 'Welcome to home page'
    })

    const navigation = ref<HomeNavigationTypes>({
      title: 'Go to about page',
      link: '/about'
    })

    return {
      message,
      navigation
    }
  }
})
</script>

<style lang="scss" src="./Home.page.scss"></style>
