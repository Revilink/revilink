<template lang="pug">
client-only
  vs-dialog.edit-comment-dialog(v-model="dialog.isOpen" @close="handleClose")
    template(#header)
      h2 {{ $t('general.edit') }}

    CommentForm(
      ref="commentFormRef"
      :is-busy="state.isBusy"
      :form-model="{ id: comment.id, content: comment.content }"
      @on-submit="handleOnSubmit"
    )
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from '@nuxtjs/composition-api'
import type { Ref } from 'vue'
import type { CommentRefTypes } from './EditCommentDialog.component.types'
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
    isBusy: {
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

    const commentFormRef: Ref<CommentRefTypes | null> = ref(null)

    watch(
      () => props.isOpen,
      value => {
        if (value) {
          dialog.isOpen = true

          const FOCUS_DELAY = 200
          setTimeout(() => {
            commentFormRef.value?.focus()
          }, FOCUS_DELAY)
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
      emit('on-confirm', { ...props.comment, ...review })
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
      dialog,
      commentFormRef,
      state,
      handleClose,
      handleOnSubmit
    }
  }
})
</script>

<style lang="scss" src="./EditCommentDialog.component.scss"></style>
