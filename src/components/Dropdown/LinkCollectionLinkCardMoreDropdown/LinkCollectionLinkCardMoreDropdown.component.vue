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
import { useAuth } from '@/hooks'
import 'v-dropdown-menu/dist/v-dropdown-menu.css'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'
import { ConfirmDialog } from '@/components/Dialog'
import { UrlLinkCard } from '@/components/Card'
import { AppTextarea } from '@/components/Textarea'

export default defineComponent({
  components: {
    DropdownMenu,
    PaperButton,
    AppIcon,
    ConfirmDialog,
    UrlLinkCard,
    AppTextarea
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

    const handleConfirmEdit = async () => {
      state.isBusy = true

      const { data, error } = await store.dispatch('link-collection/updateLinkCollectionLink', {
        id: props.link.id,
        collectionId: props.link.collectionId || linkCollection.value?.id,
        url: props.link.url.id,
        description: editForm.description
      })

      if (data) {
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
      onClickShowAnnouncementsPriceHistory
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionLinkCardMoreDropdown.component.scss"></style>
