<template lang="pug">
.link-collection-link-card-list
  slot(name="prepend")
  template(v-if="items && items.length > 0")
    .link-collection-link-card-list__items
      .link-collection-link-card-list__item(v-for="(item, index) in items" :key="index")
        slot(name="itemPrepend")
        LinkCollectionLinkCard(:key="index" :link="item")
        slot(name="itemAppend")
  template(v-else)
    .link-collection-link-card-list__noResults
      slot(v-if="$slots.noResults" name="noResults")
      BasicState(:title="$t('state.empty.noResults.title')" :description="$t('state.empty.noResults.description')")
        template(#head)
          img(src="/media/elements/state/no_results.svg" width="256")
  slot(name="append")
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { BasicState } from '@/components/State'
import { LinkCollectionLinkCard } from '@/components/Card'

export default defineComponent({
  components: {
    BasicState,
    LinkCollectionLinkCard
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: null
    }
  },
  setup() {}
})
</script>

<style lang="scss" src="./LinkCollectionLinkCardList.component.scss"></style>
