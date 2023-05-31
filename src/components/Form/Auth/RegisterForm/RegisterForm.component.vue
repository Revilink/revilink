<template lang="pug">
form.form.register-form(@submit.prevent="handleSubmit")
  .form-head
    AppLogo.form-head__logo(:height="36")
    p.form-head__description {{ $t('form.register.description') }}

  .form-item
    vs-input(
      v-model="form.email"
      :placeholder="$t('form.register.email.placeholder')"
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
        a(href) Terms
      template(#privacyPolicy)
        a(href) Privacy policy
      template(#cookiePolicy)
        a(href) Cookie policy

  .form-item.form-item--submit
    vs-button(:loading="state.isBusy" :disabled="state.isBusy")
      | {{ $t('form.register.submit.action.title') }}
      AppIcon.ms-2(name="ri:pass-pending-line")

  .form-item.mt-base
    span.me-2 Do you have account?
    NuxtLink(:to="localePath({ name: 'Auth-Login' })") Login
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
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
  setup(_, { emit }) {
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

      if (v$.value.$invalid) {
        //
      } else {
        register()
        emit('on-submit', form)
      }
    }

    const register = async () => {
      state.isBusy = true

      await console.log('Success')
      emit('on-success', form)

      state.isBusy = false
    }

    return {
      state,
      v$,
      form,
      isVisiblePassword,
      togglePasswordVisibility,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" src="./RegisterForm.component.scss"></style>
