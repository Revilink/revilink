<template lang="pug">
ClientOnly
  .link-collection-card-more-dropdown.dropdown
    DropdownMenu(direction="right" :overlay="false" :is-open="isOpen" @closed="onClose")
      template(#trigger)
        template(v-if="$slots.trigger")
          slot(name="trigger")
        template(v-else)
          PaperButton(:width="24" :height="24")
            AppIcon(name="ri:more-line" :width="24" :height="24")
      template(#body)
        ul.link-collection-card-more-dropdown-list
          li.link-collection-card-more-dropdown-list-item
            NuxtLink(
              :to="localePath({ name: 'LinkCollections-LinkCollection-slug', params: { slug: collection.slug } })"
              :title="$t('linkCollection.seeLinkCollection')"
            )
              AppIcon.link-collection-card-more-dropdown-list-item__icon(name="ri:external-link-line")
              span.link-collection-card-more-dropdown-list-item__title {{ $t('linkCollection.seeLinkCollection') }}
          template(v-if="isOwner({ users: collection.users })")
            li.link-collection-card-more-dropdown-list-item
              //
                NuxtLink(
                  :to="localePath({ name: 'LinkCollections-LinkCollection-slug', params: { slug: collection.slug }, query: { edit: true } })"
                  :title="$t('general.edit')"
                )
                  AppIcon.link-collection-card-more-dropdown-list-item__icon(name="ri:pencil-line")
                  span.link-collection-card-more-dropdown-list-item__title {{ $t('general.edit') }}
              hr
              small {{ $t('general.privacy') }}
            li.link-collection-card-more-dropdown-list-item(@click.prevent.stop="handleClickItemPrivacy(linkCollectionPrivacyEnum.PUBLIC)")
              a
                AppIcon.link-collection-card-more-dropdown-list-item__icon(name="ri:global-line")
                span.link-collection-card-more-dropdown-list-item__title {{ $t('linkCollection.privacy.public') }}
            li.link-collection-card-more-dropdown-list-item(
              @click.prevent.stop="handleClickItemPrivacy(linkCollectionPrivacyEnum.LINK_ONLY)"
            )
              a
                AppIcon.link-collection-card-more-dropdown-list-item__icon(name="ri:link")
                span.link-collection-card-more-dropdown-list-item__title {{ $t('linkCollection.privacy.linkOnly') }}
            li.link-collection-card-more-dropdown-list-item(
              @click.prevent.stop="handleClickItemPrivacy(linkCollectionPrivacyEnum.ME_ONLY)"
            )
              a
                AppIcon.link-collection-card-more-dropdown-list-item__icon(name="ri:lock-line")
                span.link-collection-card-more-dropdown-list-item__title {{ $t('linkCollection.privacy.meOnly') }}
              hr
            li.link-collection-card-more-dropdown-list-item.link-collection-card-more-dropdown-list-item--delete(
              @click.prevent.stop="handleClickItemDelete"
            )
              a
                AppIcon.link-collection-card-more-dropdown-list-item__icon(name="ri:delete-bin-line")
                span.link-collection-card-more-dropdown-list-item__title {{ $t('general.delete') }}

    ConfirmDialog(
      :is-open="isOpenPrivacyUpdateDialog"
      :is-busy="isBusy"
      @on-confirm="handleConfirmPrivacyUpdate"
      @on-cancel="handleCancelPrivacyUpdate"
    )

    ConfirmDialog(
      :is-open="isOpenDeleteLinkCollectionDialog"
      :title="collection.title"
      :is-busy="isBusy"
      confirm-button-color="danger"
      :confirm-text="$t('general.delete')"
      @on-confirm="handleConfirmDeleteLinkCollection"
      @on-cancel="handleCancelDeleteLinkCollection"
    )
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import DropdownMenu from 'v-dropdown-menu'
import { useAuth } from '@/hooks'
import type { LinkCollectionPrivacyEnumTypes } from '@/types'
import { linkCollectionPrivacyEnum } from '@/enums'
import 'v-dropdown-menu/dist/v-dropdown-menu.css'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'
import { ConfirmDialog } from '@/components/Dialog'

export default defineComponent({
  components: {
    DropdownMenu,
    PaperButton,
    AppIcon,
    ConfirmDialog
  },
  props: {
    collection: {
      type: Object,
      required: true
    },
    isBusy: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { emit }) {
    const { isOwner } = useAuth()

    const isOpen = ref(false)

    const onClose = () => {
      isOpen.value = false
    }

    const isOpenPrivacyUpdateDialog = ref(false)

    const selectedPrivacy = ref('')

    const handleClickItemPrivacy = (privacy: LinkCollectionPrivacyEnumTypes) => {
      selectedPrivacy.value = privacy
      isOpenPrivacyUpdateDialog.value = true
    }

    const handleConfirmPrivacyUpdate = () => {
      emit('on-update-privacy-link-collection', selectedPrivacy.value)
    }

    const handleCancelPrivacyUpdate = () => {
      isOpenPrivacyUpdateDialog.value = false
    }

    const isOpenDeleteLinkCollectionDialog = ref(false)

    const handleClickItemDelete = () => {
      isOpenDeleteLinkCollectionDialog.value = true
    }

    const handleConfirmDeleteLinkCollection = () => {
      emit('on-delete-link-collection', props.collection)
    }

    const handleCancelDeleteLinkCollection = () => {
      isOpenDeleteLinkCollectionDialog.value = false
    }

    return {
      isOwner,
      linkCollectionPrivacyEnum,
      isOpen,
      onClose,
      isOpenPrivacyUpdateDialog,
      handleClickItemPrivacy,
      handleConfirmPrivacyUpdate,
      handleCancelPrivacyUpdate,
      isOpenDeleteLinkCollectionDialog,
      handleClickItemDelete,
      handleConfirmDeleteLinkCollection,
      handleCancelDeleteLinkCollection
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionCardMoreDropdown.component.scss"></style>
