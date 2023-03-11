<template lang="pug">
client-only
  vs-dialog.delete-comment-dialog(v-model="dialog.isOpen" @close="handleClose")
    template(#header)
      h2 {{ $t('general.delete') }}

    p.delete-comment-dialog__comment {{ comment.content }}

    template(#footer)
      .d-flex
        vs-button.me-2(danger @click="handleClickDelete") {{ $t('general.delete') }}
        vs-button(transparent @click="handleClickCancel") {{ $t('general.cancel') }}
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
    comment: {
      type: Object,
      required: true
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

    const handleClickDelete = () => {
      handleClose()
      emit('on-delete')
    }

    const handleClickCancel = () => {
      handleClose()
      emit('on-cancel')
    }

    return {
      dialog,
      handleClose,
      handleClickDelete,
      handleClickCancel
    }
  }
})
</script>

<style lang="scss" src="./DeleteCommentDialog.component.scss"></style>
