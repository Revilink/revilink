<template lang="pug">
form.form.auth-form.login-form(@submit.prevent="handleSubmit")
  .form-head
    AppLogo.form-head__logo(:height="36")
    p.form-head__description {{ $t('form.login.description') }}

  .form__inner
    .form-item
      ClientOnly
        .auth-provider-buttons
          vs-button.auth-provider-button.auth-provider-button--google(active type="button" @click.prevent.capture="openGoogleAuth")
            AppIcon.ms-2(name="logos:google-icon")
            | {{ $t('form.login.provider.google.title') }}
          vs-button.auth-provider-button.auth-provider-button--apple(v-if="false" active type="button")
            AppIcon.ms-2(name="logos:apple")
            | {{ $t('form.login.provider.apple.title') }}

    .form-item
      vs-input(
        v-model="form.username"
        :placeholder="$t('form.login.username.placeholder')"
        theme="light"
        spellcheck="false"
        :maxlength="v$.username.maxLength.$params.max"
        @keydown.space.prevent
      )
        template(v-if="v$.username.$error" #message-danger)
          span(v-if="v$.username.required.$invalid")
            | {{ $t('form.validation.modelIsRequired', { model: $t('form.username') }) }}
          span(v-if="v$.username.maxLength.$invalid")
            | {{ $t('form.validation.max', { max: v$.username.maxLength.params.max }) }}

    .form-item
      vs-input(
        v-model="form.password"
        type="password"
        :placeholder="$t('form.login.password.placeholder')"
        spellcheck="false"
        theme="light"
        icon-after
        :visible-password="isVisiblePassword"
        @click-icon="togglePasswordVisibility"
      )
        template(#icon)
          AppIcon(v-if="isVisiblePassword" name="ri:eye-off-fill")
          AppIcon(v-else name="ri:eye-fill")

        template(v-if="v$.password.$error" #message-danger)
          span(v-if="v$.password.required.$invalid")
            | {{ $t('form.validation.modelIsRequired', { model: $t('form.password') }) }}
          span(v-if="v$.password.minLength.$invalid")
            | {{ $t('form.validation.min', { min: v$.password.minLength.$params.min }) }}
          span(v-if="v$.password.maxLength.$invalid")
            | {{ $t('form.validation.max', { max: v$.password.maxLength.$params.max }) }}

    .form-item.form-item--submit
      .d-flex.align-items-center
        vs-button(:loading="state.isBusy" :disabled="state.isBusy")
          | {{ $t('form.login.submit.action.title') }}
          AppIcon.ms-2(name="ri:pass-pending-line")
        NuxtLink.ms-4(:to="localePath({ name: 'Auth-ForgotPassword' })") {{ $t('form.login.iForgotMyPassword') }}

    .form-item.mt-base
      span.me-2 {{ $t('general.doNotYouHaveAnAccountYet') }}
      NuxtLink(:to="localePath({ name: 'Auth-Register' })") {{ $t('general.createAnAccount') }}
</template>

<script lang="ts">
import { defineComponent, useContext, reactive, ref } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { FormTypes } from './LoginForm.component.types'
import { loginValidator } from '@/validator'
import { AppLogo } from '@/components/Logo'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppLogo,
    AppIcon
  },
  setup(_, { emit }) {
    const context = useContext()

    const state = reactive({
      isBusy: false
    })

    const form = reactive<FormTypes>({
      username: '',
      password: ''
    })

    const rule = {
      ...loginValidator
    }

    const v$ = useVuelidate(rule, form)

    const isVisiblePassword = ref(false)

    const togglePasswordVisibility = () => {
      isVisiblePassword.value = !isVisiblePassword.value
    }

    const handleSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        login()
        emit('on-submit', form)
      }
    }

    const openGoogleAuth = () => {
      context.$cookies.set('authNextRedirect', context.route.value.fullPath)

      window.location.href = `${context.$config.API}/connect/google`
    }

    const login = async () => {
      state.isBusy = true

      try {
        const { data, error }: any = await context.$auth.loginWith('local', {
          data: {
            identifier: form.username,
            password: form.password
          },
          headers: {
            'Accept-Language': context.i18n.locale
          }
        })

        if (data) {
          await context.$auth.setUser(data.user)

          emit('on-success', form)
        } else {
          window.$nuxt.$vs.notification({
            title: error.status,
            text: error.message,
            color: 'danger',
            position: 'bottom-center',
            flat: true
          })
        }
      } catch (error: any) {
        window.$nuxt.$vs.notification({
          title: error.response?.status,
          text: error.response?.data?.error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })
      }

      state.isBusy = false
    }

    return {
      state,
      v$,
      form,
      isVisiblePassword,
      togglePasswordVisibility,
      handleSubmit,
      openGoogleAuth
    }
  }
})
</script>

<style lang="scss" src="./LoginForm.component.scss"></style>
