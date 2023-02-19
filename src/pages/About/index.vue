<template lang="pug">
.page.about-page
  h1 {{ message.title }}
  p {{ message.description }}

  NuxtLink(:to="navigation.link") {{ navigation.title }}
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { AboutNavigationTypes } from './About.page.types'
import { WelcomeMessageTypes } from '@/types'

export default defineComponent({
  layout: 'Default/Default.layout',
  setup() {
    const message = ref<WelcomeMessageTypes>({
      title: 'About page',
      description: 'Welcome to about page'
    })

    const navigation = ref<AboutNavigationTypes>({
      title: 'Go to home page',
      link: '/'
    })

    return {
      message,
      navigation
    }
  }
})
</script>

<style lang="scss" src="./About.page.scss"></style>
