<template lang="pug">
.page.link-collection-page
  template(v-if="collectionFetchState.pending")
    AppLoading

  template(v-if="collectionFetchState.error")
    BasicState.mb-base.pb-base(:title="$t('error.error')" :description="collectionFetchState.error.message")
      template(#head)
        img(src="/media/elements/state/network.svg" width="256")
      template(#footer)
        vs-button.my-10(type="button" @click="collectionFetch") {{ $t('error.tryAgain') }}

  template(v-else)
    .row(v-if="linkCollection && Object.keys(linkCollection).length > 0")
      .col.col-4
        .link-collection-page-cover(:style="[coverStyle]")
          h1.link-collection-page__coverTitle {{ linkCollection.title }}

      .col.col-8
        header.link-collection-page__header
          h1.link-collection-page__title {{ linkCollection.title }}

          span.link-collection-page__linkCount.me-2
            AppIcon.link-collection-page__linkCount__icon(name="ri:link" :width="16" :height="16")
            span.link-collection-page__linkCount__title {{ linkCollection.linkCollectionLinkCount }} Link

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

    template(v-if="linkCollectionLinksFetchState.pending")
      AppLoading

    template(v-if="linkCollectionLinksFetchState.error")
      BasicState.mb-base.pb-base(:title="$t('error.error')" :description="$t('error.anErrorOccurred')")
        template(#head)
          img(src="/media/elements/state/network.svg" width="256")
        template(#footer)
          vs-button.my-10(type="button" @click="collectionFetch") {{ $t('error.tryAgain') }}

    template(v-else)
      LinkCollectionLinkCardList(:items="linkCollectionLinks")
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useStore, useFetch, computed, useMeta } from '@nuxtjs/composition-api'
import { linkCollectionPrivacyEnum } from '@/enums'
import { useColor } from '@/hooks'
import { AppLoading } from '@/components/Loading'
import { LinkCollectionPrivacyBadge } from '@/components/Badge'
import { AppIcon } from '@/components/Icon'
import { AppAvatar } from '@/components/Avatar'
import { LinkCollectionLinkCardList } from '@/components/List'
import { BasicState } from '@/components/State'

export default defineComponent({
  components: {
    AppLoading,
    LinkCollectionPrivacyBadge,
    AppIcon,
    AppAvatar,
    LinkCollectionLinkCardList,
    BasicState
  },
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()
    const route = useRoute()
    const store = useStore()

    const { generateRadialGradient } = useColor()

    const collectionId = Number(route.value.params.slug.split('-').pop())

    const linkCollection = computed(() => store.getters['link-collection/linkCollection'])

    const { fetch: collectionFetch, fetchState: collectionFetchState } = useFetch(async () => {
      await store.dispatch('link-collection/fetchLinkCollection', { id: collectionId })
    })

    const linkCollectionLinks = computed(() => store.getters['link-collection/linkCollectionLinks'])

    const { fetch: linkCollectionLinksFetch, fetchState: linkCollectionLinksFetchState } = useFetch(async () => {
      await store.dispatch('link-collection/fetchLinkCollectionLinks', { collectionId })
    })

    const coverStyle = computed(() => ({
      background: generateRadialGradient({ key: linkCollection.value?.title || '', theme: 'light' })
    }))

    useMeta(() => {
      if (!linkCollection.value || collectionFetchState.error) {
        return {
          meta: [
            {
              hid: 'robots',
              name: 'robots',
              content: 'noindex,nofollow'
            }
          ]
        }
      }

      const metaTags = [
        {
          hid: 'og:title',
          name: 'og:title',
          content: context.i18n.t('seo.linkCollection.title', { collectionTitle: linkCollection.value.title || '' })
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: context.i18n.t('seo.linkCollection.title', { collectionTitle: linkCollection.value.title || '' })
        },
        {
          hid: 'description',
          name: 'description',
          content: context.i18n.t('seo.linkCollection.description', {
            collectionDescription: linkCollection.value.description,
            linkCount: linkCollection.value.linkCollectionLinkCount,
            username: linkCollection.value.users?.[0]?.username || ''
          })
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: context.i18n.t('seo.linkCollection.description', {
            collectionDescription: linkCollection.value.description,
            linkCount: linkCollection.value.linkCollectionLinkCount,
            username: linkCollection.value.users?.[0]?.username || ''
          })
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: context.i18n.t('seo.linkCollection.description', {
            collectionDescription: linkCollection.value.description,
            linkCount: linkCollection.value.linkCollectionLinkCount,
            username: linkCollection.value.users?.[0]?.username || ''
          })
        }
      ]

      if (
        collectionFetchState.error ||
        linkCollection.value?.privacy === linkCollectionPrivacyEnum.LINK_ONLY ||
        linkCollection.value?.privacy === linkCollectionPrivacyEnum.ME_ONLY
      ) {
        metaTags.push({
          hid: 'robots',
          name: 'robots',
          content: 'noindex,nofollow'
        })
      }

      return {
        title: context.i18n.t('seo.linkCollection.title', { collectionTitle: linkCollection.value.title || '' }),
        meta: metaTags
      } as any
    })

    return {
      collectionFetch,
      collectionFetchState,
      linkCollectionLinksFetch,
      linkCollectionLinksFetchState,
      linkCollection,
      linkCollectionLinks,
      coverStyle
    }
  },
  head: {}
})
</script>

<style lang="scss" src="./LinkCollection.page.scss"></style>
