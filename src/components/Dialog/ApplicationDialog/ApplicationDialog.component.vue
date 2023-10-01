<template lang="pug">
client-only
  vs-dialog.application-dialog(v-model="dialog.isOpen" blur @close="handleClose")
    template(#header)
      h2.mb-2 {{ $t('general.application') }}

    strong.d-block.mb-3 {{ $t('general.websiteLanguage') }}
    AppLangSwitch
    br
    CmsPagesWidget
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from '@nuxtjs/composition-api'
import { AppLangSwitch } from '@/components/Switch'
import { CmsPagesWidget } from '@/components/Widget'

export default defineComponent({
  components: {
    AppLangSwitch,
    CmsPagesWidget
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false,
      default: false
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

<style lang="scss" src="./ApplicationDialog.component.scss"></style>
