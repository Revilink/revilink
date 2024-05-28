<template lang="pug">
client-only
  vs-dialog.login-dialog(v-model="dialog.isOpen" blur @close="handleClose")
    template(#header)
      h2.mb-2 {{ $t('general.login') }}

    LoginForm
</template>

<script lang="ts">
import { defineComponent, useContext, useStore, useRouter, reactive, computed, watch } from '@nuxtjs/composition-api'
import { LoginForm } from '@/components/Form'

export default defineComponent({
  components: {
    LoginForm
  },
  setup(_, { emit }) {
    const context = useContext()
    const store = useStore()
    const router = useRouter()

    const isOpen = computed(() => store.getters['auth-control/isOpenLoginDialog'])

    const dialog = reactive({
      isOpen: store.getters['auth/isOpenLoginDialog']
    })

    watch(
      () => isOpen.value,
      value => {
        if (value) {
          dialog.isOpen = true

          context.$cookies.set('authNextRedirect', context.route.value.fullPath)
        } else {
          dialog.isOpen = false
        }
      }
    )

    const handleClose = () => {
      store.commit('auth-control/CLOSE_LOGIN_DIALOG')

      emit('on-close')
    }

    context.$auth.$storage.watchState('loggedIn', async loggedIn => {
      if (loggedIn) {
        await store.commit('auth-control/CLOSE_LOGIN_DIALOG')

        const redirect = context.$cookies.get('authNextRedirect')

        if (redirect) {
          await router.push(redirect)
        }
      }
    })

    return {
      dialog,
      handleClose
    }
  }
})
</script>

<style lang="scss" src="./LoginDialog.component.scss"></style>
