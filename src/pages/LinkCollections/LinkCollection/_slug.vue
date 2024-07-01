<template lang="pug">
.page.link-collection-page
  template(v-if="collectionFetchState.pending")
    AppLoading

  template(v-else)
    .row
      .col.col-4
        .link-collection-page-cover(:style="[coverStyle]")
          h1.link-collection-page__coverTitle {{ linkCollection.title }}

      .col.col-8
        header.link-collection-page__header(v-if="linkCollection")
          h1.link-collection-page__title {{ linkCollection.title }}

          span.link-collection-page__linkCount.me-2
            AppIcon.link-collection-page__linkCount__icon(name="ri:link" :width="16" :height="16")
            span.link-collection-page__linkCount__title {{ linkCollection.bookmarks.length }} Link

          LinkCollectionPrivacyBadge(:privacy="linkCollection.privacy")

          .link-collection-page__users
            template(v-for="user in linkCollection.users")
              NuxtLink.link-collection-page-user(
                :key="user.id"
                :user="user"
                :to="localePath({ name: 'Profile', query: { username: user.username } })"
              )
                AppAvatar.link-collection-page-user__avatar(:user="user")
                span.link-collection-page-user__username {{ user.username }}

          p.link-collection-page__description(v-if="linkCollection.description?.length > 0") {{ linkCollection.description }}

  template(v-if="bookmarksFetchState.pending")
    AppLoading

  template(v-else)
    LinkCollectionLinkCardList(:items="linkCollectionLinks")
</template>

<script lang="ts">
import { defineComponent, useRoute, useStore, useFetch, computed } from '@nuxtjs/composition-api'
import { useColor } from '@/hooks'
import { AppLoading } from '@/components/Loading'
import { LinkCollectionPrivacyBadge } from '@/components/Badge'
import { AppIcon } from '@/components/Icon'
import { AppAvatar } from '@/components/Avatar'
import { LinkCollectionLinkCardList } from '@/components/List'

export default defineComponent({
  components: {
    AppLoading,
    LinkCollectionPrivacyBadge,
    AppIcon,
    AppAvatar,
    LinkCollectionLinkCardList
  },
  layout: 'Default/Default.layout',
  setup() {
    const route = useRoute()
    const store = useStore()

    const { generateRadialGradient } = useColor()

    const collectionId = Number(route.value.params.slug.split('-').pop())

    const linkCollection = computed(() => store.getters['link-collection/linkCollection'])

    const { fetch: collectionFetch, fetchState: collectionFetchState } = useFetch(async () => {
      await store.dispatch('link-collection/fetchLinkCollection', { id: collectionId })
    })

    const linkCollectionLinks = computed(() => store.getters['link-collection/linkCollectionLinks'])

    const { fetch: bookmarksFetch, fetchState: bookmarksFetchState } = useFetch(async () => {
      await store.dispatch('link-collection/fetchLinkCollectionLinks', { collectionId })
    })

    const coverStyle = computed(() => ({
      background: generateRadialGradient({ key: linkCollection.value?.title || '', theme: 'light' })
    }))

    return {
      collectionFetch,
      collectionFetchState,
      bookmarksFetch,
      bookmarksFetchState,
      linkCollection,
      linkCollectionLinks,
      coverStyle
    }
  }
})
</script>

<style lang="scss" src="./LinkCollection.page.scss"></style>
