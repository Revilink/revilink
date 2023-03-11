<template lang="pug">
client-only
  vs-dialog.reply-dialog(v-model="dialog.isOpen" @close="handleClose")
    template(#header)
      h2 {{ $t('general.reply') }}

    .reply-dialog-summary
      strong.reply-dialog-summary__user
        template(v-if="summary.user") @{{ summary.user.username }}
        template(v-else) {{ $t('general.anonymous') }}
      p.reply-dialog-summary__content {{ summary.content }}

    CommentForm
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@nuxtjs/composition-api'
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
    summary: {
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

    return {
      dialog,
      handleClose
    }
  }
})
</script>

<style lang="scss" src="./ReplyDialog.component.scss"></style>
