<template lang="pug">
.card.link-collection-card.link-collection-card
  header.link-collection-card__header
    .link-collection-card__users
      template(v-for="user in collection.users")
        .link-collection-card-user(:key="user.id" :user="user")
          AppAvatar.link-collection-card-user__avatar(:user="user")
          span.link-collection-card-user__username {{ user.username }}

    .link-collection-card__actions
      LinkCollectionCardMoreDropdown(
        :collection="collection"
        :is-busy="state.isBusy"
        @on-update-privacy-link-collection="handleUpdatePrivacyLinkCollection"
        @on-delete-link-collection="handleDeleteLinkCollection"
      )
        template(#trigger)
          PaperButton(:width="24" :height="24")
            AppIcon(name="ri:more-line" :width="24" :height="24")

  NuxtLink.link-collection-card__body(
    :to="localePath({ name: 'LinkCollections-LinkCollection-slug', params: { slug: collection.slug } })"
    @click.native.prevent.capture="handleClick"
  )
    strong.link-collection-card__title {{ collection.title }}
    .link-collection-card-privacy
      template(v-if="collection.privacy === bookmarksCollectionPrivacyEnum.ME_ONLY")
        AppIcon.link-collection-card-privacy__icon(name="ri:lock-line" :width="16" :height="16")
        span.link-collection-card-privacy__title {{ $t('linkCollection.privacy.meOnly') }}
      template(v-else-if="collection.privacy === bookmarksCollectionPrivacyEnum.LINK_ONLY")
        AppIcon.link-collection-card-privacy__icon(name="ri:link" :width="16" :height="16")
        span.link-collection-card-privacy__title {{ $t('linkCollection.privacy.linkOnly') }}
      template(v-else-if="collection.privacy === bookmarksCollectionPrivacyEnum.PUBLIC")
        AppIcon.link-collection-card-privacy__icon(name="ri:global-line" :width="16" :height="16")
        span.link-collection-card-privacy__title {{ $t('linkCollection.privacy.public') }}
    p.link-collection-card__description {{ collection.description }}

  footer.link-collection-card__footer
    .link-collection-card-date
      ClientOnly
        Timeago(:datetime="collection.createdAt" :auto-update="60" :locale="$i18n.locale")
    .link-collection-card-bookmark-count
      AppIcon.link-collection-card-bookmark-count__icon(name="ri:link")
      span.link-collection-card-bookmark-count__title {{ collection.bookmarkCount }} link
</template>

<script lang="ts">
import { defineComponent, useContext, reactive } from '@nuxtjs/composition-api'
import type { BookmarksCollectionPrivacyEnumTypes } from '@/types'
import { bookmarksCollectionPrivacyEnum } from '@/enums'
import { AppAvatar } from '@/components/Avatar'
import { AppIcon } from '@/components/Icon'
import { LinkCollectionCardMoreDropdown } from '@/components/Dropdown'
import { PaperButton } from '@/components/Button'

export default defineComponent({
  components: {
    AppAvatar,
    AppIcon,
    LinkCollectionCardMoreDropdown,
    PaperButton
  },
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const context = useContext()

    const state = reactive({
      isBusy: false
    })

    const handleClick = () => {
      emit('on-click', props.collection)
    }

    const handleUpdatePrivacyLinkCollection = async (privacy: BookmarksCollectionPrivacyEnumTypes) => {
      state.isBusy = true

      const { data, error } = await context.$api.rest.bookmark.updateBookmarksCollection({
        id: props.collection.id,
        privacy
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.updateSuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        emit('on-update-link-collection', props.collection)
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

      state.isBusy = false
    }

    const handleDeleteLinkCollection = async () => {
      state.isBusy = true

      const { data, error } = await context.$api.rest.bookmark.deleteBookmarksCollection({
        id: props.collection.id
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.deleteSuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        emit('on-delete-link-collection', props.collection)
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

      state.isBusy = false
    }

    return {
      bookmarksCollectionPrivacyEnum,
      state,
      handleClick,
      handleUpdatePrivacyLinkCollection,
      handleDeleteLinkCollection
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionCard.component.scss"></style>
