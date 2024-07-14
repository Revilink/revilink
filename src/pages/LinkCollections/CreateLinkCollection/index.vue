<template lang="pug">
.page.create-link-collection-page
  LinkCollectionForm
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { LinkCollectionForm } from '@/components/Form'

export default defineComponent({
  components: {
    LinkCollectionForm
  },
  layout: 'Default/Default.layout',
  setup() {}
})
</script>

<style lang="scss" src="./CreateLinkCollection.page.scss"></style>
