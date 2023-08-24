<template lang="pug">
client-only
  vs-dialog.reactioner-user-list-dialog(v-model="dialog.isOpen" @close="handleClose")
    template(#header)
      h2
        template(v-if="reactionType === 'likes'") {{ $t('general.likes') }}
        template(v-else) {{ $t('general.replies') }}

    ReactionerUserList
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@nuxtjs/composition-api'
import { ReactionerUserList } from '@/components/List'

export default defineComponent({
  components: {
    ReactionerUserList
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    reactionType: {
      type: String,
      required: false,
      default: 'likes'
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

<style lang="scss" src="./ReactionerUserListDialog.component.scss"></style>
