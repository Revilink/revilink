<template lang="pug">
ClientOnly
  .link-collection-link-card-more-dropdown.dropdown
    DropdownMenu(direction="right" :overlay="false" :is-open="isOpen" @closed="onClose")
      template(#trigger)
        template(v-if="$slots.trigger")
          slot(name="trigger")
        template(v-else)
          PaperButton(:width="24" :height="24")
            AppIcon(name="ri:more-line" :width="24" :height="24")
      template(#body)
        ul.link-collection-link-card-more-dropdown-list
          li.link-collection-link-card-more-dropdown-list-item
            NuxtLink(:to="localePath({ name: 'Reviews', query: { link: link.url.urlRaw } })" :title="$t('linkCollection.seeLink')")
              AppIcon.link-collection-link-card-more-dropdown-list-item__icon(name="ri:external-link-line")
              span.link-collection-link-card-more-dropdown-list-item__title {{ $t('linkCollection.seeLink') }}

          li.link-collection-link-card-more-dropdown-list-item(v-if="site?.meta?.widget?.announcementPriceHistory")
            a(@click.prevent.capture="onClickShowAnnouncementsPriceHistory")
              AppIcon.link-collection-link-card-more-dropdown-list-item__icon(name="ri:line-chart-fill")
              span.link-collection-link-card-more-dropdown-list-item__title
                | {{ $t('widget.siteExtra.nav.widget.announcementPriceHistory.showPriceHistory') }}
              img.link-collection-link-card-more-dropdown-list-item__icon.ms-1(:src="site.meta.icon" width="16" height="16")

          template(v-if="isOwner({ users: link.linkCollection.users })")
            li.link-collection-link-card-more-dropdown-list-item.link-collection-link-card-more-dropdown-list-item--edit(
              @click.prevent.stop="handleClickItemEdit"
            )
              a
                AppIcon.link-collection-link-card-more-dropdown-list-item__icon(name="ri:pencil-line")
                span.link-collection-link-card-more-dropdown-list-item__title {{ $t('general.edit') }}

            hr

            li.link-collection-link-card-more-dropdown-list-item.link-collection-link-card-more-dropdown-list-item--delete(
              @click.prevent.stop="handleClickItemDelete"
            )
              a
                AppIcon.link-collection-link-card-more-dropdown-list-item__icon(name="ri:delete-bin-line")
                span.link-collection-link-card-more-dropdown-list-item__title {{ $t('general.delete') }}

    template(v-if="isOwner({ users: link.linkCollection.users })")
      ConfirmDialog.link-collection-link-card-more-dropdown-edit-dialog(
        :is-open="isOpenEditDialog"
        :title="$t('general.edit')"
        :is-busy="state.isBusy"
        @on-confirm="handleConfirmEdit"
        @on-cancel="handleCancelEdit"
      )
        form.edit-form(@submit.prevent)
          .form__inner
            .form-item
              UrlLinkCard.mb-3(:url="link.url.urlRaw")
            .form-item
              small.d-block.mb-2.ms-2.p-0 {{ $t('linkCollection.field.description.placeholder') }}
              AppTextarea.edit-form__descriptionTextarea(
                ref="descriptionTextareaRef"
                :value="editForm.description"
                :placeholder="$t('linkCollection.field.description.placeholder')"
                rows="1"
                theme="light"
                spellcheck="false"
                resize="none"
                maxlength="128"
                autofocus
                character-counter
                @input="editForm.description = $event.target.value"
              )

            // Image Upload
            .link-collections-dialog-selected-link-image-upload
              span.link-collections-dialog-selected-link-image-upload__title Görsel yükle
              AppLoading.link-collections-dialog-selected-link-image-upload__loading(v-if="state.isBusy")
              client-only
                label.link-collections-dialog-selected-link-image-upload__icon.cursor-pointer(
                  v-if="!isChoosedImage && !link.media"
                  @click="$refs.imageUploadRef.chooseFile()"
                )
                  AppIcon(v-if="!isChoosedImage" name="ri:image-line" :width="24" :height="24")
                div(@click.stop)
                  croppa(
                    ref="imageUploadRef"
                    v-model="imageUpload.file"
                    :initial-image="`${link.media?.formats.small?.url || link.media?.url}?v=${new Date().getTime()}`"
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
                    @move="handleDirtyImage"
                    @zoom="handleDirtyImage"
                    @file-size-exceed="showImageFileSizeExceedMessage"
                    @file-type-mismatch="showImageFileTypeMismatchMessage"
                  )

      ConfirmDialog(
        :is-open="isOpenDeleteDialog"
        :title="$t('general.delete')"
        :is-busy="state.isBusy"
        confirm-button-color="danger"
        :confirm-text="$t('general.delete')"
        @on-confirm="handleConfirmDelete"
        @on-cancel="handleCancelDelete"
      )
        p.my-2 {{ link.url.urlRaw }}

      // Announcements Price History Dialog
      template(v-if="site?.meta?.widget?.announcementPriceHistory")
        vs-dialog.announcement-price-history-dialog(v-model="isOpenAnnouncementsPriceHistoryDialog" scroll)
          template(#header)
            h3.announcement-price-history-dialog__title {{ $t('widget.siteExtra.nav.widget.announcementPriceHistory.title') }}
          p(v-html="site?.meta?.widget?.announcementPriceHistory")
</template>

<script lang="ts">
import { defineComponent, useContext, useStore, ref, reactive, computed, watch } from '@nuxtjs/composition-api'
import DropdownMenu from 'v-dropdown-menu'
import type { Ref } from 'vue'
import type { ImageUploadRefTypes, ImageUploadTypes } from './LinkCollectionLinkCardMoreDropdown.component.types'
import { useAuth } from '@/hooks'
import 'v-dropdown-menu/dist/v-dropdown-menu.css'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'
import { ConfirmDialog } from '@/components/Dialog'
import { UrlLinkCard } from '@/components/Card'
import { AppTextarea } from '@/components/Textarea'
import { AppLoading } from '@/components/Loading'

export default defineComponent({
  components: {
    DropdownMenu,
    PaperButton,
    AppIcon,
    ConfirmDialog,
    UrlLinkCard,
    AppTextarea,
    AppLoading
  },
  props: {
    link: {
      type: Object,
      required: true
    },
    site: {
      type: Object,
      required: false,
      default: null
    },
    isBusy: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { emit }) {
    const context = useContext()
    const store = useStore()

    const { isOwner } = useAuth()

    const state = reactive({
      isBusy: props.isBusy
    })

    watch(
      () => props.isBusy,
      value => {
        state.isBusy = value
      }
    )

    const isOpen = ref(false)

    const onClose = () => {
      isOpen.value = false
    }

    const linkCollection = computed(() => store.getters['link-collection/linkCollection'])

    const isOpenEditDialog = ref(false)

    const handleClickItemEdit = () => {
      isOpenEditDialog.value = true
    }

    const editForm = reactive({
      description: props.link.description
    })

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
        fileSizeLimit: 2 * 1024 * 1024
      }
    })

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

    const handleDirtyImage = () => {
      imageUpload.isDirty = true
      isChoosedImage.value = true
    }

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

    const uploadMedia = async ({ blob, linkId }: { blob: Blob; linkId: number }): Promise<void> => {
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

        if (data) {
          window.$nuxt.$vs.notification({
            title: 'OK',
            text: context.i18n.t('success.editSuccessfully'),
            color: 'success',
            position: 'bottom-center',
            flat: true
          })
        }

        if (!updateLinkCollection) {
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

    const handleConfirmEdit = async () => {
      state.isBusy = true

      const { data, error } = await store.dispatch('link-collection/updateLinkCollectionLink', {
        id: props.link.id,
        collectionId: props.link.collectionId || linkCollection.value?.id,
        url: props.link.url.id,
        description: editForm.description,
        media: imageUpload.file.currentIsInitial ? undefined : null
      })

      if (data) {
        if ((!imageUpload.file.currentIsInitial && imageUploadRef.value?.hasImage()) || imageUpload.isDirty) {
          await new Promise(resolve => {
            imageUpload.file.generateBlob?.((blob: Blob) => {
              uploadMedia({
                blob,
                linkId: props.link.id
              }).then(() => resolve(true))
            }, 0.8)
          })
        } else if (imageUpload.file.currentIsInitial && !imageUploadRef.value?.hasImage()) {
          await context.$api.rest.linkCollection.updateLinkCollectionLink({
            id: props.link.id,
            media: null
          })
        }

        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.editSuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        isOpenEditDialog.value = false
        emit('on-edit')
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

    const handleCancelEdit = () => {
      isOpenEditDialog.value = false
    }

    const handleConfirmDelete = async () => {
      state.isBusy = true

      const { data, error } = await store.dispatch('link-collection/deleteLinkCollectionLink', {
        id: props.link.id
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.deleteSuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        isOpenDeleteDialog.value = false

        emit('on-delete')
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

    const isOpenDeleteDialog = ref(false)

    const handleClickItemDelete = () => {
      isOpenDeleteDialog.value = true
    }

    const handleCancelDelete = () => {
      isOpenDeleteDialog.value = false
    }

    const isOpenAnnouncementsPriceHistoryDialog = ref(false)

    const onClickShowAnnouncementsPriceHistory = () => {
      isOpenAnnouncementsPriceHistoryDialog.value = true
    }

    return {
      isOwner,
      state,
      isOpen,
      onClose,
      isOpenEditDialog,
      handleClickItemEdit,
      editForm,
      handleConfirmEdit,
      handleCancelEdit,
      isOpenDeleteDialog,
      handleClickItemDelete,
      handleConfirmDelete,
      handleCancelDelete,
      isOpenAnnouncementsPriceHistoryDialog,
      onClickShowAnnouncementsPriceHistory,
      imageUploadRef,
      imageUpload,
      isChoosedImage,
      handleImageChoose,
      handleImageRemove,
      showImageFileSizeExceedMessage,
      showImageFileTypeMismatchMessage,
      handleDirtyImage
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionLinkCardMoreDropdown.component.scss"></style>
