<template lang="pug">
client-only
  vs-dialog.login-dialog(v-model="dialog.isOpen" blur @close="handleClose")
    template(#header)
      h2.mb-2
        template(v-if="activeAuthForm === 'login'") {{ $t('general.login') }}
        template(v-if="activeAuthForm === 'register'") {{ $t('general.register') }}

    div(v-show="activeAuthForm === 'login'")
      LoginForm(:variant="variant" @on-click-register-link="onClickRegisterLink")
    div(v-show="activeAuthForm === 'register'")
      RegisterForm(:variant="variant" @on-click-login-link="onClickLoginLink")
</template>

<script lang="ts">
import { defineComponent, useContext, useStore, useRouter, ref, reactive, computed, watch } from '@nuxtjs/composition-api'
import { LoginForm, RegisterForm } from '@/components/Form'

export default defineComponent({
  components: {
    LoginForm,
    RegisterForm
  },
  props: {
    variant: {
      type: String,
      default: 'dialog' // 'dialog' | 'embed'
    }
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

    const activeAuthForm = ref('login')

    const onClickRegisterLink = () => {
      activeAuthForm.value = 'register'
    }

    const onClickLoginLink = () => {
      activeAuthForm.value = 'login'
    }

    return {
      dialog,
      handleClose,
      activeAuthForm,
      onClickRegisterLink,
      onClickLoginLink
    }
  }
})
</script>

<style lang="scss" src="./LoginDialog.component.scss"></style>
