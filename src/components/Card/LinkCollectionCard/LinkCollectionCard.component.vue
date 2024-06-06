<template lang="pug">
NuxtLink.card.link-collection-card.link-collection-card(
  :to="localePath({ name: 'LinkCollections-LinkCollection-slug', params: { slug: collection.slug } })"
  @click.native.prevent.capture="handleClick"
)
  header.link-collection-card__header
    .link-collection-card__users
      template(v-for="user in collection.users")
        .link-collection-card-user(:key="user.id" :user="user")
          AppAvatar.link-collection-card-user__avatar(:user="user")
          span.link-collection-card-user__username {{ user.username }}

  .link-collection-card__body
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
import { defineComponent } from '@nuxtjs/composition-api'
import { bookmarksCollectionPrivacyEnum } from '@/enums'
import { AppAvatar } from '@/components/Avatar'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppAvatar,
    AppIcon
  },
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit('on-click', props.collection)
    }

    return {
      bookmarksCollectionPrivacyEnum,
      handleClick
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionCard.component.scss"></style>
