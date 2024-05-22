<template lang="pug">
client-only
  vs-dialog.login-dialog(v-model="dialog.isOpen" blur @close="handleClose")
    template(#header)
      h2.mb-2 {{ $t('general.login') }}

    LoginForm
</template>

<script lang="ts">
import { defineComponent, useStore, reactive, computed, watch } from '@nuxtjs/composition-api'
import { LoginForm } from '@/components/Form'

export default defineComponent({
  components: {
    LoginForm
  },
  setup(_, { emit }) {
    const store = useStore()

    const isOpen = computed(() => store.getters['auth-control/isOpenLoginDialog'])

    const dialog = reactive({
      isOpen: store.getters['auth/isOpenLoginDialog']
    })

    watch(
      () => isOpen.value,
      value => {
        if (value) {
          dialog.isOpen = true
        } else {
          dialog.isOpen = false
        }
      }
    )

    const handleClose = () => {
      store.commit('auth-control/CLOSE_LOGIN_DIALOG')

      emit('on-close')
    }

    return {
      dialog,
      handleClose
    }
  }
})
</script>

<style lang="scss" src="./LoginDialog.component.scss"></style>
