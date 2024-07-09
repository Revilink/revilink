<template lang="pug">
component.card.link-collection-card.link-collection-card(
  :is="as"
  :to="localePath({ name: 'LinkCollections-LinkCollection-slug', params: { slug: collection.slug } })"
)
  .link-collection-card__actions
    LinkCollectionCardMoreDropdown(
      :collection="collection"
      :is-busy="state.isBusy"
      @on-update-privacy-link-collection="handleUpdatePrivacyLinkCollection"
      @on-delete-link-collection="handleDeleteLinkCollection"
    )

  header.link-collection-card__header(:style="[headerStyle]" @click.prevent.capture="handleClick")
    strong.link-collection-card__featuredTitle {{ collection.title }}

  .link-collection-card__body(@click.prevent.capture="handleClick")
    .d-flex.align-items-center.justify-content-between
      strong.link-collection-card__title {{ collection.title }}
      .link-collection-card-link-count
        AppIcon.link-collection-card-link-count__icon(name="ri:link")
        span.link-collection-card-link-count__title {{ collection.linkCollectionLinkCount }} link

    LinkCollectionPrivacyBadge(:privacy="collection.privacy")

    p.link-collection-card__description {{ collection.description }}

  footer.link-collection-card__footer(@click.prevent.capture="handleClick")
    .link-collection-card__users
      template(v-for="user in collection.users")
        .link-collection-card-user(:key="user.id" :user="user")
          AppAvatar.link-collection-card-user__avatar(:user="user" :size="28")
          span.link-collection-card-user__username {{ user.username }}
    .link-collection-card-date
      ClientOnly
        Timeago(:datetime="collection.createdAt" :auto-update="60" :locale="$i18n.locale")
</template>

<script lang="ts">
import { defineComponent, useContext, reactive, computed } from '@nuxtjs/composition-api'
import type { LinkCollectionPrivacyEnumTypes } from '@/types'
import { useColor } from '@/hooks'
import { AppAvatar } from '@/components/Avatar'
import { AppIcon } from '@/components/Icon'
import { LinkCollectionCardMoreDropdown } from '@/components/Dropdown'
import { LinkCollectionPrivacyBadge } from '@/components/Badge'

export default defineComponent({
  components: {
    AppAvatar,
    AppIcon,
    LinkCollectionCardMoreDropdown,
    LinkCollectionPrivacyBadge
  },
  props: {
    as: {
      type: String,
      required: false,
      default: 'NuxtLink'
    },
    collection: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const context = useContext()

    const { generateRadialGradient } = useColor()

    const state = reactive({
      isBusy: false
    })

    const handleClick = () => {
      emit('on-click', props.collection)
    }

    const handleUpdatePrivacyLinkCollection = async (privacy: LinkCollectionPrivacyEnumTypes) => {
      state.isBusy = true

      const { data, error } = await context.$api.rest.linkCollection.updateLinkCollection({
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

      const { data, error } = await context.$api.rest.linkCollection.deleteLinkCollection({
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

    const headerStyle = computed(() => ({
      background: generateRadialGradient({ key: props.collection.slug, theme: 'light' })
    }))

    return {
      state,
      handleClick,
      handleUpdatePrivacyLinkCollection,
      handleDeleteLinkCollection,
      headerStyle
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionCard.component.scss"></style>
