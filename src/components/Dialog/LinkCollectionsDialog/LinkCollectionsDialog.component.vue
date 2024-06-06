<template lang="pug">
ClientOnly
  vs-dialog.link-collections-dialog(v-model="dialog.isOpen" tabindex="0" @close="handleClose")
    template(#header)
      h2 {{ $t('linkCollection.myLinkCollections') }}

    .link-collections-dialog-selected-link(v-if="selectedLink && Object.keys(selectedLink)?.length > 0")
      span.link-collections-dialog-selected-link__title {{ $t('linkCollection.selectedLink') }}
      UrlLinkCard.mb-3(:url="selectedLink.url")
      AppTextarea.link-collections-dialog-selected-link__descriptionTextarea(
        ref="descriptionTextareaRef"
        :value="selectedLinkDescription"
        :placeholder="$t('linkCollection.field.description.placeholder')"
        rows="1"
        spellcheck="false"
        resize="none"
        maxlength="512"
        autofocus
        character-counter
        @input="selectedLinkDescription = $event.target.value"
      )

    template(v-if="state.isBusy")
      AppLoading.my-6

    template(v-if="fetchState.pending")
      AppLoading.my-6

    template(v-else-if="fetchState.error")
      p {{ fetchState.error }}
      vs-button(@click="fetch")
        | {{ $t('error.tryAgain') }}

    template(v-else)
      template(v-if="myLinkCollections.length > 0")
        .link-collections-dialog__items(:inert="state.isBusy")
          template(v-for="collection in myLinkCollections")
            LinkCollectionCard(:key="collection.id" :collection="collection" @on-click="handleClickCollection(collection)")

      template(v-else)
        BasicState(
          :title="$t('state.empty.profileNoReviewComments.title')"
          :description="$t('state.empty.profileNoReviewComments.description')"
        )
          template(#head)
            img(src="/media/elements/state/no_results.svg" width="128")
          template(#footer)
            vs-button.mt-10(:loading="state.isBusy" :disabled="state.isBusy" size="small" @click="handleClickCreate")
              | {{ $t('linkCollection.createNew') }}
              AppIcon.ms-2(name="ri:add-line")

    template(#footer)
      .d-flex.justify-content-end
        vs-button(:loading="state.isBusy" :disabled="state.isBusy" size="small" @click="handleClickCreate")
          | {{ $t('linkCollection.createNew') }}
          AppIcon.ms-2(name="ri:add-line")
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useStore,
  useRouter,
  useFetch,
  ref,
  reactive,
  watch,
  computed,
  nextTick
} from '@nuxtjs/composition-api'
import type { Ref } from 'vue'
import type { BookmarksCollectionTypes } from '@/types'
import { AppIcon } from '@/components/Icon'
import { LinkCollectionCard, UrlLinkCard } from '@/components/Card'
import { AppTextarea } from '@/components/Textarea'
import { AppLoading } from '@/components/Loading'
import { BasicState } from '@/components/State'

export default defineComponent({
  components: {
    AppIcon,
    LinkCollectionCard,
    UrlLinkCard,
    AppTextarea,
    AppLoading,
    BasicState
  },
  props: {
    isBusy: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { emit }) {
    const context = useContext()
    const store = useStore()
    const router = useRouter()

    const isOpen = computed(() => store.getters['link-collection/isOpenLinkCollectionsDialog'])

    const dialog = reactive({
      isOpen: store.getters['link-collection/isOpenLinkCollectionsDialog']
    })

    watch(
      () => isOpen.value,
      async value => {
        if (value) {
          dialog.isOpen = true

          await fetch()

          setTimeout(() => {
            focusToDescriptionTextarea()
          }, 0)
        } else {
          dialog.isOpen = false
        }
      }
    )

    const handleClose = () => {
      selectedLinkDescription.value = null

      store.commit('link-collection/CLEAR_SELECTED_LINK')
      store.commit('link-collection/CLOSE_LINK_COLLECTIONS_DIALOG')

      emit('on-close')
    }

    router.afterEach(() => {
      handleClose()
    })

    const handleClickCreate = () => {
      //
    }

    const state = reactive({
      isBusy: props.isBusy
    })

    watch(
      () => props.isBusy,
      value => {
        state.isBusy = value
      }
    )

    const myLinkCollections = ref([])

    const { fetch, fetchState } = useFetch(async () => {
      const { data, error } = await context.$api.rest.bookmark.fetchBookmarksCollections({
        filters: `filters[users][id][$eq]=${context.$auth?.user?.id}`
      })

      if (data) {
        myLinkCollections.value = data.items
      }

      if (error) {
        throw new Error(error.message)
      }
    })

    const selectedLink = computed(() => store.getters['link-collection/selectedLink'])
    const selectedLinkDescription = ref(null)

    const handleClickCollection = async (collection: BookmarksCollectionTypes) => {
      if (selectedLink.value && Object.keys(selectedLink.value)?.length > 0) {
        state.isBusy = true
        const { data, error } = await context.$api.rest.bookmark.postBookmark({
          collectionId: collection.id,
          url: selectedLink.value.url,
          description: selectedLinkDescription.value
        })

        if (data) {
          window.$nuxt.$vs.notification({
            title: 'OK',
            text: context.i18n.t('success.saveSuccessfully'),
            color: 'success',
            position: 'bottom-center',
            flat: true
          })

          selectedLinkDescription.value = null
          await store.commit('link-collection/CLOSE_LINK_COLLECTIONS_DIALOG')
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

        return false
      }

      await router.push(
        context.localePath({
          name: 'LinkCollections-LinkCollection-slug',
          params: { slug: collection.slug }
        })
      )
    }

    const descriptionTextareaRef: Ref = ref(null)

    const focusToDescriptionTextarea = async () => {
      await nextTick()

      if (descriptionTextareaRef.value) {
        const textarea = descriptionTextareaRef.value.$el.querySelector('textarea')

        if (textarea) {
          textarea.focus()
        }
      }
    }

    return {
      fetch,
      fetchState,
      state,
      dialog,
      handleClose,
      myLinkCollections,
      handleClickCreate,
      handleClickCollection,
      selectedLink,
      selectedLinkDescription,
      descriptionTextareaRef,
      focusToDescriptionTextarea
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionsDialog.component.scss"></style>
