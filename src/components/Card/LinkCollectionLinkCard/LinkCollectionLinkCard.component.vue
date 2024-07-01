<template lang="pug">
a.link-collection-link-card(:href="link.url.urlRaw" :title="link.url.urlRaw" target="_blank")
  header.link-collection-link-card__header(:style="[headerStyle]")
    .link-collection-link-card__actions
      vs-tooltip(v-if="link.description" not-arrow shadow bottom)
        vs-button.link-collection-link-card-action-item(transparent @click.prevent.stop="handleClickNoteActionItem")
          AppIcon.link-collection-link-card-action-item__icon(name="fxemoji:note" color="var(--color-link-01)" :width="18" :height="18")
          span.link-collection-link-card-action-item__title {{ $t('general.note') }}
        template(#tooltip)
          p.py-2.px-2 {{ link.description }}

      LinkCollectionLinkCardMoreDropdown(:link="link")

    img.link-collection-link-card__image(v-if="site.meta?.image" :src="site.meta.image" alt="site image" width="1200" height="630")
    span.link-collection-link-card__domain(v-else) {{ parseURL(link.url.urlRaw).host }}

  .link-collection-link-card__body
    span.link-collection-link-card__title(v-if="site.meta?.title") {{ site.meta.title }}
    span.link-collection-link-card__title(v-else) {{ link.url.urlRaw }}
    p.link-collection-link-card__description(v-if="site.meta?.description") {{ site.meta.description }}

  footer.link-collection-link-card__footer
    span.link-collection-link-card-link
      AppIcon.link-collection-link-card-link__icon(name="material-symbols:link" color="var(--color-link-01)" :width="18" :height="18")
      span.link-collection-link-card-link__title {{ link.url.urlRaw }}
    img.link-collection-link-card__favicon(v-if="site.meta?.icon" :src="site.meta.icon" alt="site icon" width="18" height="18")
    span.link-collection-link-card__footerDomain {{ parseURL(link.url.urlRaw).host }}
    .link-collection-link-card-date
      ClientOnly
        Timeago(:datetime="link.createdAt" :auto-update="60" :locale="$i18n.locale")
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from '@nuxtjs/composition-api'
import { useSiteScraper, useColor } from '@/hooks'
import { AppIcon } from '@/components/Icon'
import { LinkCollectionLinkCardMoreDropdown } from '@/components/Dropdown'
const { parseURL } = require('ufo')

export default defineComponent({
  components: {
    AppIcon,
    LinkCollectionLinkCardMoreDropdown
  },
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const { site, extractSiteMeta } = useSiteScraper()
    const { generateRadialGradient } = useColor()

    onMounted(() => {
      extractSiteMeta({
        url: props.link.url.urlRaw
      })
    })

    const handleClickNoteActionItem = () => {
      emit('on-click-note')
    }

    const headerStyle = computed(() => ({
      background: generateRadialGradient({ key: parseURL(props.link.url.urlRaw).host, theme: 'light' })
    }))

    return {
      parseURL,
      site,
      handleClickNoteActionItem,
      headerStyle
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionLinkCard.component.scss"></style>
