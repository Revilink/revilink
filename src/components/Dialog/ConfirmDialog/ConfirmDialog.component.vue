<template lang="pug">
client-only
  vs-dialog.confirm-dialog(v-model="dialog.isOpen" @close="handleClose")
    template(#header)
      h2(v-if="title") {{ title }}
      h2(v-else) {{ $t('general.edit') }}

    slot(v-if="$slots.default")
    p.mb-base(v-else) {{ $t('general.areYouSure') }}

    template(#footer)
      .d-flex
        vs-button.me-2(:color="confirmButtonColor" :loading="state.isBusy" :disabled="state.isBusy" @click="handleClickConfirm")
          template(v-if="confirmText") {{ confirmText }}
          template(v-else) {{ $t('general.confirm') }}

        vs-button(transparent @click="handleClickCancel")
          template(v-if="cancelText") {{ cancelText }}
          template(v-else) {{ $t('general.cancel') }}
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    isBusy: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: null
    },
    confirmText: {
      type: String,
      required: false,
      default: null
    },
    cancelText: {
      type: String,
      required: false,
      default: null
    },
    confirmButtonColor: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  setup(props, { emit }) {
    const dialog = reactive({
      isOpen: props.isOpen
    })

    watch(
      () => props.isOpen,
      value => {
        if (value) {
          dialog.isOpen = true
        } else {
          dialog.isOpen = false
        }
      }
    )

    const handleClose = () => {
      dialog.isOpen = false

      emit('on-close')
    }

    const handleClickConfirm = () => {
      emit('on-confirm')
    }

    const handleClickCancel = () => {
      handleClose()

      emit('on-cancel')
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

    return {
      state,
      dialog,
      handleClose,
      handleClickConfirm,
      handleClickCancel
    }
  }
})
</script>

<style lang="scss" src="./ConfirmDialog.component.scss"></style>
