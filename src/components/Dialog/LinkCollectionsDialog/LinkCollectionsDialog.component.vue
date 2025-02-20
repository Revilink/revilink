<template lang="pug">
ClientOnly
  vs-dialog.link-collections-dialog(v-model="dialog.isOpen" tabindex="0" @close="handleClose")
    template(#header)
      PaperButton.link-collections-dialog__closeButton(
        v-if="isVisibleLinkCollectionForm"
        @click.native.prevent.stop="closeLinkCollectionForm"
      )
        AppIcon(name="ri:arrow-left-line" :width="26" :height="26" color="var(--color-icon-01)")
      h2 {{ $t('linkCollection.myLinkCollections') }}

    template(v-if="isVisibleLinkCollectionForm")
      LinkCollectionForm(@on-success="handleLinkCollectionFormSuccess")

    template(v-else)
      .link-collections-dialog-selected-link(v-if="hasSelectedLink && myLinkCollections.length > 0")
        span.link-collections-dialog-selected-link__title {{ $t('linkCollection.selectedLink') }}
        UrlLinkCard.mb-3(:url="selectedLink.url")
        AppTextarea.link-collections-dialog-selected-link__descriptionTextarea(
          ref="descriptionTextareaRef"
          :value="selectedLinkDescription"
          :placeholder="$t('linkCollection.field.description.placeholder')"
          rows="1"
          spellcheck="false"
          resize="none"
          maxlength="128"
          autofocus
          character-counter
          @input="selectedLinkDescription = $event.target.value"
        )

        // Image Upload
        .link-collections-dialog-selected-link-image-upload
          span.link-collections-dialog-selected-link-image-upload__title Görsel yükle
          AppLoading.link-collections-dialog-selected-link-image-upload__loading(v-if="state.isBusy")
          client-only
            label.link-collections-dialog-selected-link-image-upload__icon.cursor-pointer(
              v-if="!isChoosedImage"
              @click="$refs.imageUploadRef.chooseFile()"
            )
              AppIcon(v-if="!isChoosedImage" name="ri:image-line" :width="24" :height="24")
            div(@click.stop)
              croppa(
                ref="imageUploadRef"
                v-model="imageUpload.file"
                placeholder
                :disabled="state.isBusy"
                :file-size-limit="Number(imageUpload.config.fileSizeLimit)"
                :accept="imageUpload.config.accept"
                :prevent-white-space="imageUpload.config.preventWhiteSpace"
                :show-remove-button="imageUpload.config.showRemoveButton && !state.isBusy"
                :zoom-speed="imageUpload.config.zoomSpeed"
                :width="imageUpload.config.width"
                :height="imageUpload.config.height"
                @file-choose="handleImageChoose"
                @image-remove="handleImageRemove"
                @file-size-exceed="showImageFileSizeExceedMessage"
                @file-type-mismatch="showImageFileTypeMismatchMessage"
              )

      template(v-if="state.isBusy")
        AppLoading.my-6

      template(v-if="fetchState.pending")
        AppLoading.my-6

      template(v-else-if="fetchState.error")
        p {{ fetchState.error }}
        vs-button(@click.prevent.stop="fetch")
          | {{ $t('error.tryAgain') }}

      template(v-else)
        template(v-if="myLinkCollections.length > 0")
          .link-collections-dialog__itemsTitle(v-if="hasSelectedLink")
            AppIcon(name="ri:information-line" :width="24" :height="24")
            | Kaydetmek için aşağıdan bir koleksiyona bas

          .link-collections-dialog__items(:inert="state.isBusy")
            template(v-for="collection in myLinkCollections")
              LinkCollectionCard(
                :key="collection.id"
                :as="hasSelectedLink ? 'div' : 'NuxtLink'"
                :collection="collection"
                @on-click="handleClickCollection(collection)"
                @on-update-link-collection="handleUpdateLinkCollection"
                @on-delete-link-collection="handleDeleteLinkCollection"
              )

        template(v-else)
          BasicState.mt-10.pt-10(
            :title="$t('state.empty.noLinkCollection.title')"
            :description="$t('state.empty.noLinkCollection.description')"
          )
            template(#head)
              img(src="/media/elements/state/no_results.svg" width="128")
            template(#footer)
              vs-button.mt-10(
                :loading="state.isBusy"
                :disabled="state.isBusy"
                size="small"
                type="button"
                @click.prevent.stop="handleClickCreate"
              )
                | {{ $t('linkCollection.createNew') }}
                AppIcon.ms-2(name="ri:add-line")

    template(#footer)
      .d-flex.justify-content-end
        vs-button(
          v-if="!isVisibleLinkCollectionForm && myLinkCollections.length > 0"
          :loading="state.isBusy"
          :disabled="state.isBusy"
          size="small"
          type="button"
          @click.prevent.stop="handleClickCreate"
        )
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
import type { ImageUploadRefTypes, ImageUploadTypes } from './LinkCollectionsDialog.component.types'
import type { LinkCollectionTypes } from '@/types'
import { AppIcon } from '@/components/Icon'
import { LinkCollectionCard, UrlLinkCard } from '@/components/Card'
import { AppTextarea } from '@/components/Textarea'
import { AppLoading } from '@/components/Loading'
import { BasicState } from '@/components/State'
import { LinkCollectionForm } from '@/components/Form'
import { PaperButton } from '@/components/Button'

export default defineComponent({
  components: {
    AppIcon,
    LinkCollectionCard,
    UrlLinkCard,
    AppTextarea,
    AppLoading,
    BasicState,
    LinkCollectionForm,
    PaperButton
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
      resetImageUpload()

      store.commit('link-collection/CLEAR_SELECTED_LINK')
      store.commit('link-collection/CLOSE_LINK_COLLECTIONS_DIALOG')

      emit('on-close')
    }

    router.afterEach(() => {
      handleClose()
    })

    const handleClickCreate = () => {
      openLinkCollectionForm()
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
      const { data, error } = await context.$api.rest.linkCollection.fetchLinkCollections({
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

    const hasSelectedLink = computed(() => selectedLink.value && Object.keys(selectedLink.value)?.length > 0)

    const imageUploadRef: Ref<ImageUploadRefTypes | null> = ref(null)
    const imageUpload = reactive<ImageUploadTypes>({
      file: {},
      isDirty: false,
      config: {
        width: 600,
        height: 400,
        preventWhiteSpace: true,
        showRemoveButton: true,
        zoomSpeed: 10,
        accept: '.JPEG,.jpg,.jpeg,.png',
        fileSizeLimit: 2 * 1024 * 1024 // 2MB limit
      }
    })

    const showImageFileSizeExceedMessage = () => {
      window.$nuxt.$vs.notification({
        title: context.i18n.t('form.validation.fileUpload.singleMaxItemSize', {
          max: imageUpload.config.fileSizeLimit / 1024 / 1024,
          unit: 'MB'
        }),
        color: 'danger',
        position: 'bottom-center',
        flat: true
      })
    }

    const showImageFileTypeMismatchMessage = () => {
      window.$nuxt.$vs.notification({
        title: context.i18n.t('form.validation.fileUpload.singleItemMismatch', { extensions: imageUpload.config.accept }),
        color: 'danger',
        position: 'bottom-center',
        flat: true
      })
    }

    const isChoosedImage = ref(false)

    const handleImageChoose = () => {
      isChoosedImage.value = true
      imageUpload.isDirty = true
    }

    const handleImageRemove = (e: Event) => {
      if (e) e.stopPropagation()
      isChoosedImage.value = false
      imageUpload.isDirty = false
    }

    const uploadMedia = async ({ blob, linkId }: { blob: Blob; linkId: string }): Promise<void> => {
      state.isBusy = true

      const formData = new FormData()
      formData.append('files', new File([blob], 'link-preview.png'))

      const { data, error } = await context.$api.rest.file.uploadFile({
        formData
      })

      if (data) {
        const uploadedFile = data[0]

        const { data: updateLinkCollection } = await context.$api.rest.linkCollection.updateLinkCollectionLink({
          id: linkId,
          media: uploadedFile.id
        })

        if (updateLinkCollection) {
          //
        } else {
          window.$nuxt.$vs.notification({
            title: context.i18n.t('error.error'),
            text: context.i18n.t('error.updateFailed'),
            color: 'danger',
            position: 'bottom-center',
            flat: true
          })
        }
      } else {
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

    const handleClickCollection = async (collection: LinkCollectionTypes) => {
      if (selectedLink.value && Object.keys(selectedLink.value)?.length > 0) {
        state.isBusy = true
        const { data, error } = await context.$api.rest.linkCollection.postLinkCollectionLink({
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

          // Handle image upload before closing
          if (selectedLink.value?.media && !imageUploadRef.value?.hasImage()) {
            selectedLink.value.media = null
            await handleClose()
          } else if ((!imageUpload.file.currentIsInitial && imageUploadRef.value?.hasImage()) || imageUpload.isDirty) {
            await new Promise(resolve => {
              imageUpload.file.generateBlob?.((blob: Blob) => {
                uploadMedia({
                  blob,
                  linkId: data.id
                }).then(() => resolve(true))
              }, 0.8)
            })
            await handleClose()
          } else {
            await handleClose()
          }

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
      } else {
        await router.push(
          context.localePath({
            name: 'LinkCollections-LinkCollection-slug',
            params: { slug: collection.slug }
          })
        )
      }
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

    const isVisibleLinkCollectionForm = ref(false)

    const resetImageUpload = () => {
      if (imageUploadRef.value) {
        imageUploadRef.value.remove()
      }
      isChoosedImage.value = false
      imageUpload.isDirty = false
    }

    const openLinkCollectionForm = () => {
      isVisibleLinkCollectionForm.value = true
      resetImageUpload()
    }

    const closeLinkCollectionForm = () => {
      isVisibleLinkCollectionForm.value = false
    }

    const handleLinkCollectionFormSuccess = async () => {
      await closeLinkCollectionForm()

      await fetch()
    }

    const handleUpdateLinkCollection = async () => {
      await fetch()
    }

    const handleDeleteLinkCollection = async () => {
      await fetch()
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
      hasSelectedLink,
      descriptionTextareaRef,
      focusToDescriptionTextarea,
      isVisibleLinkCollectionForm,
      openLinkCollectionForm,
      closeLinkCollectionForm,
      handleLinkCollectionFormSuccess,
      handleUpdateLinkCollection,
      handleDeleteLinkCollection,
      imageUploadRef,
      imageUpload,
      isChoosedImage,
      showImageFileSizeExceedMessage,
      showImageFileTypeMismatchMessage,
      handleImageChoose,
      handleImageRemove
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionsDialog.component.scss"></style>
