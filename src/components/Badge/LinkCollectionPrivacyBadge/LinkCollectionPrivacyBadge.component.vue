<template lang="pug">
.link-collection-privacy-badge
  template(v-if="privacy === bookmarksCollectionPrivacyEnum.ME_ONLY")
    AppIcon.link-collection-privacy-badge__icon(name="ri:lock-line" :width="16" :height="16")
    span.link-collection-privacy-badge__title {{ $t('linkCollection.privacy.meOnly') }}
  template(v-else-if="privacy === bookmarksCollectionPrivacyEnum.LINK_ONLY")
    AppIcon.link-collection-privacy-badge__icon(name="ri:link" :width="16" :height="16")
    span.link-collection-privacy-badge__title {{ $t('linkCollection.privacy.linkOnly') }}
  template(v-else-if="privacy === bookmarksCollectionPrivacyEnum.PUBLIC")
    AppIcon.link-collection-privacy-badge__icon(name="ri:global-line" :width="16" :height="16")
    span.link-collection-privacy-badge__title {{ $t('linkCollection.privacy.public') }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { bookmarksCollectionPrivacyEnum } from '@/enums'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  props: {
    privacy: {
      type: String,
      required: true
    }
  },
  setup() {
    return {
      bookmarksCollectionPrivacyEnum
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionPrivacyBadge.component.scss"></style>
