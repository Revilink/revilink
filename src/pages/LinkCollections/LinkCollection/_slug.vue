<template lang="pug">
.page.link-collection-page
  template(v-if="isEdit")
    vs-button(type="button" border size="small" @click.native.prevent.stop="handleClickEditBack")
      AppIcon.me-2(name="ri:arrow-left-line")
      | {{ $t('general.back') }}

    LinkCollectionForm.mt-base(
      :form-data="{ id: linkCollection.id, title: linkCollection.title, privacy: linkCollection.privacy, description: linkCollection.description }"
      @on-edit-success="handleEditSuccess"
    )

  template(v-else)
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
        .col.col-12.col-md-4
          .link-collection-page-cover(:style="[coverStyle]")
            h1.link-collection-page__coverTitle {{ linkCollection.title }}

          .link-collection-page-cover__actions(v-if="isOwner({ users: linkCollection.users })")
            vs-button(type="button" size="small" @click="handleEditLinkCollection")
              AppIcon.me-2(name="ri:pencil-line")
              | {{ $t('general.edit') }}
            vs-button(type="button" size="small" danger @click="handleDeleteLinkCollection")
              AppIcon.me-2(name="ri:delete-bin-line")
              | {{ $t('general.delete') }}

        .col.col-12.col-md-8
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

  // Delete link collection dialog
  ConfirmDialog(
    :is-open="isOpenDeleteLinkCollectionDialog"
    :title="linkCollection.title"
    :is-busy="deleteState.isBusy"
    confirm-button-color="danger"
    :confirm-text="$t('general.delete')"
    @on-confirm="handleConfirmDeleteLinkCollection"
    @on-cancel="handleCancelDeleteLinkCollection"
  )
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useRoute,
  useRouter,
  useStore,
  useFetch,
  ref,
  reactive,
  computed,
  useMeta
} from '@nuxtjs/composition-api'
import { linkCollectionPrivacyEnum } from '@/enums'
import { useAuth, useColor } from '@/hooks'
import { AppLoading } from '@/components/Loading'
import { LinkCollectionPrivacyBadge } from '@/components/Badge'
import { AppIcon } from '@/components/Icon'
import { AppAvatar } from '@/components/Avatar'
import { LinkCollectionLinkCardList } from '@/components/List'
import { BasicState } from '@/components/State'
import { LinkCollectionForm } from '@/components/Form'
import { ConfirmDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    AppLoading,
    LinkCollectionPrivacyBadge,
    AppIcon,
    AppAvatar,
    LinkCollectionLinkCardList,
    BasicState,
    LinkCollectionForm,
    ConfirmDialog
  },
  layout: 'Default/Default.layout',
  setup() {
    const context = useContext()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const { isOwner } = useAuth()
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
      background: generateRadialGradient({ key: linkCollection.value?.slug || '', theme: 'light' })
    }))

    const isEdit = ref(false)

    if (route.value.query.edit) {
      isEdit.value = true
    }

    const handleEditLinkCollection = () => {
      isEdit.value = true
    }

    const handleClickEditBack = () => {
      isEdit.value = false

      window.history.pushState({}, '', route.value.path.split('?')[0])
    }

    const handleEditSuccess = async () => {
      await collectionFetch()
      router.push(context.localePath({ name: 'LinkCollections-LinkCollection-slug', params: { slug: linkCollection.value.slug } }))
      isEdit.value = false
    }

    const isOpenDeleteLinkCollectionDialog = ref(false)

    const handleDeleteLinkCollection = () => {
      isOpenDeleteLinkCollectionDialog.value = true
    }

    const deleteState = reactive({
      isBusy: false
    })

    const handleConfirmDeleteLinkCollection = async () => {
      deleteState.isBusy = true

      const { data, error } = await context.$api.rest.linkCollection.deleteLinkCollection({
        id: linkCollection.value.id
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.deleteSuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        router.push(context.localePath('/'))
      }

      if (error) {
        window.$nuxt.$vs.notification({
          title: error.code,
          text: error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })
      }

      deleteState.isBusy = false
    }

    const handleCancelDeleteLinkCollection = () => {
      isOpenDeleteLinkCollectionDialog.value = false
    }

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
      isOwner,
      collectionFetch,
      collectionFetchState,
      linkCollectionLinksFetch,
      linkCollectionLinksFetchState,
      linkCollection,
      linkCollectionLinks,
      coverStyle,
      isEdit,
      handleEditLinkCollection,
      handleClickEditBack,
      handleEditSuccess,
      deleteState,
      isOpenDeleteLinkCollectionDialog,
      handleDeleteLinkCollection,
      handleConfirmDeleteLinkCollection,
      handleCancelDeleteLinkCollection
    }
  },
  head: {}
})
</script>

<style lang="scss" src="./LinkCollection.page.scss"></style>
