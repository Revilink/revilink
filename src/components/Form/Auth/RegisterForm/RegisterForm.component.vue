<template lang="pug">
form.form.auth-form.register-form(@submit.prevent="handleSubmit")
  .form-head
    AppLogo.form-head__logo(:height="36")
    p.form-head__description {{ $t('form.register.description') }}

  .form__inner
    .form-item
      ClientOnly
        .auth-provider-buttons
          vs-button.auth-provider-button.auth-provider-button--google(active type="button" @click.prevent.capture="openGoogleAuth")
            AppIcon.ms-2(name="logos:google-icon")
            | {{ $t('form.register.provider.google.title') }}
          vs-button.auth-provider-button.auth-provider-button--apple(v-if="false" active type="button")
            AppIcon.ms-2(name="logos:apple")
            | {{ $t('form.register.provider.apple.title') }}
    .form-item
      vs-input(
        v-model="form.email"
        :placeholder="$t('form.register.email.placeholder')"
        spellcheck="false"
        theme="light"
        :maxlength="v$.email.maxLength.$params.max"
        @keydown.space.prevent
      )
        template(v-if="v$.email.$error" #message-danger)
          span(v-if="v$.email.email.$invalid")
            | {{ $t('form.validation.enterValidModel', { model: $t('form.email').toLowerCase() }) }}
          span(v-if="v$.email.required.$invalid")
            | {{ $t('form.validation.modelIsRequired', { model: $t('form.email') }) }}
          span(v-if="v$.email.maxLength.$invalid")
            | {{ $t('form.validation.max', { max: v$.email.maxLength.params.max }) }}

    .form-item
      vs-input(
        v-model="form.username"
        :placeholder="$t('form.register.username.placeholder')"
        spellcheck="false"
        theme="light"
        :maxlength="v$.username.maxLength.$params.max"
        @keydown.space.prevent
      )
        template(v-if="v$.username.$error" #message-danger)
          span(v-if="v$.username.required.$invalid")
            | {{ $t('form.validation.modelIsRequired', { model: $t('form.username') }) }}
          span(v-if="v$.username.isValid.$invalid && form.username.length > 0")
            | {{ $t('form.validation.containsInvalidCharacters') }}
          span(v-if="v$.username.minLength.$invalid")
            | {{ $t('form.validation.min', { min: v$.username.minLength.$params.min }) }}
          span(v-if="v$.username.maxLength.$invalid")
            | {{ $t('form.validation.max', { max: v$.username.maxLength.$params.max }) }}

    .form-item
      vs-input(
        v-model="form.password"
        type="password"
        :placeholder="$t('form.register.password.placeholder')"
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

    .form-item
      i18n.terms-label(path="form.register.terms" tag="label" for="terms")
        template(#terms)
          a(:href="localePath({ name: 'cms-page-slug', params: { slug: $t('cms.terms.route') } })" target="_blank")
            | {{ $t('cms.terms.title') }}
        template(#privacyPolicy)
          a(:href="localePath({ name: 'cms-page-slug', params: { slug: $t('cms.privacyPolicy.route') } })" target="_blank")
            | {{ $t('cms.privacyPolicy.title') }}
        template(#cookiePolicy)
          a(:href="localePath({ name: 'cms-page-slug', params: { slug: $t('cms.cookiePolicy.route') } })" target="_blank")
            | {{ $t('cms.cookiePolicy.title') }}

    .form-item.form-item--submit
      vs-button(:loading="state.isBusy" :disabled="state.isBusy")
        | {{ $t('form.register.submit.action.title') }}
        AppIcon.ms-2(name="ri:pass-pending-line")

    .form-item.mt-base
      span.me-2 {{ $t('general.doYouHaveAnAccount') }}
      a(
        v-if="variant === 'dialog' || variant === 'embed'"
        :href="localePath({ name: 'Auth-Login' })"
        target="_blank"
        @click.prevent.capture="handleClickLoginLink"
      ) {{ $t('form.login.title') }}
      NuxtLink(v-else :to="localePath({ name: 'Auth-Login' })") {{ $t('form.login.title') }}
</template>

<script lang="ts">
import { defineComponent, useContext, reactive, ref } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { FormTypes } from './RegisterForm.component.types'
import { registerValidator } from '@/validator'
import { AppLogo } from '@/components/Logo'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppLogo,
    AppIcon
  },
  props: {
    variant: {
      type: String,
      default: 'default' // 'dialog' | 'embed' | 'default'
    }
  },
  setup(props, { emit }) {
    const context = useContext()

    const state = reactive({
      isBusy: false
    })

    const form = reactive<FormTypes>({
      email: '',
      username: '',
      password: ''
    })

    const rule = {
      ...registerValidator
    }

    const v$ = useVuelidate(rule, form)

    const isVisiblePassword = ref(false)

    const togglePasswordVisibility = () => {
      isVisiblePassword.value = !isVisiblePassword.value
    }

    const handleSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        register()
        emit('on-submit', form)
      }
    }

    const openGoogleAuth = () => {
      context.$cookies.set('authNextRedirect', context.route.value.fullPath)

      if (props.variant === 'embed') {
        window.parent.postMessage({ type: 'on-click-google-auth', url: `${context.$config.API}/connect/google` }, '*')
      } else {
        window.location.href = `${context.$config.API}/connect/google`
      }
    }

    const register = async () => {
      state.isBusy = true

      const { data, error } = await context.$api.rest.auth.register({ ...form })

      if (data) {
        const { data: loginData, error: loginError }: any = await context.$auth.loginWith('local', {
          data: {
            identifier: form.email,
            password: form.password
          }
        })

        if (loginData) {
          await context.$auth.setUser(loginData.user)
        } else {
          window.$nuxt.$vs.notification({
            title: loginError.status,
            text: loginError.message,
            color: 'danger',
            position: 'bottom-center',
            flat: true
          })
        }

        window.$nuxt.$vs.notification({
          title: context.i18n.t('form.register.callback.success.title'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        emit('on-success', form)
      }

      if (error) {
        window.$nuxt.$vs.notification({
          title: error.code,
          text: error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })
      }

      state.isBusy = false
    }

    const handleClickLoginLink = () => {
      if (props.variant === 'dialog' || props.variant === 'embed') {
        emit('on-click-login-link')
      }
    }

    return {
      state,
      v$,
      form,
      isVisiblePassword,
      togglePasswordVisibility,
      handleSubmit,
      openGoogleAuth,
      handleClickLoginLink
    }
  }
})
</script>

<style lang="scss" src="./RegisterForm.component.scss"></style>
