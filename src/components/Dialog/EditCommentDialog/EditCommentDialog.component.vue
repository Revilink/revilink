<template lang="pug">
client-only
  vs-dialog.edit-comment-dialog(v-model="dialog.isOpen" @close="handleClose")
    template(#header)
      h2 {{ $t('general.edit') }}

    CommentForm(:form-model="{ id: comment.id, content: comment.content }" @on-submit="handleOnSubmit")
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@nuxtjs/composition-api'
import { ReviewTypes } from '@/types'
import { CommentForm } from '@/components/Form'

export default defineComponent({
  components: {
    CommentForm
  },
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

    const handleOnSubmit = (review: ReviewTypes) => {
      handleClose()

      emit('on-confirm', { ...props.comment, ...review })
    }

    return {
      dialog,
      handleClose,
      handleOnSubmit
    }
  }
})
</script>

<style lang="scss" src="./EditCommentDialog.component.scss"></style>
