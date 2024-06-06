<template lang="pug">
.page.link-collection-page
  template(v-if="collectionFetchState.pending")
    AppLoading

  template(v-else)
    header.link-collection-page-head(v-if="linkCollection")
      h1.link-collection-page__title {{ linkCollection.title }}
      p.link-collection-page__description(v-if="linkCollection.description?.length > 0") {{ linkCollection.description }}

      .link-collection-page-meta
        span {{ linkCollection.users.length }} users
        span {{ linkCollection.bookmarks.length }} bookmarks

  hr

  template(v-if="bookmarksFetchState.pending")
    AppLoading

  template(v-else)
    p(v-if="bookmarks") {{ bookmarks }}
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useFetch, ref } from '@nuxtjs/composition-api'
import { AppLoading } from '@/components/Loading'

export default defineComponent({
  components: {
    AppLoading
  },
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()
    const route = useRoute()

    const linkCollection = ref({})

    const { fetch: collectionFetch, fetchState: collectionFetchState } = useFetch(async () => {
      const collectionId = Number(route.value.params.slug.split('-').pop())

      const { data, error } = await context.$api.rest.bookmark.fetchBookmarksCollection({ id: collectionId })

      if (data) {
        linkCollection.value = data.data
      }

      if (error) {
        throw new Error(error.message)
      }
    })

    const bookmarks = ref(null)

    const { fetch: bookmarksFetch, fetchState: bookmarksFetchState } = useFetch(async () => {
      const collectionId = Number(route.value.params.slug.split('-').pop())

      const { data, error } = await context.$api.rest.bookmark.fetchBookmarks({ collectionId })

      if (data) {
        bookmarks.value = data.data
      }

      if (error) {
        throw new Error(error.message)
      }
    })

    return {
      collectionFetch,
      collectionFetchState,
      bookmarksFetch,
      bookmarksFetchState,
      linkCollection,
      bookmarks
    }
  }
})
</script>

<style lang="scss" src="./LinkCollection.page.scss"></style>
