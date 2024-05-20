<template lang="pug">
form.form.auth-form.forgot-password-form(@submit.prevent="handleSubmit")
  .form-head
    h1.form-head__title {{ $t('form.forgotPassword.title') }}
    p.form-head__description {{ $t('form.forgotPassword.description') }}

  .form__inner
    .form-item
      vs-input(
        v-model="form.email"
        :placeholder="$t('form.forgotPassword.email.placeholder')"
        theme="light"
        spellcheck="false"
        :maxlength="v$.email.maxLength.$params.max"
        @keydown.space.prevent
      )
        template(v-if="v$.email.$error" #message-danger)
          span(v-if="v$.email.required.$invalid")
            | {{ $t('form.validation.modelIsRequired', { model: $t('form.email') }) }}
          span(v-if="v$.email.minLength.$invalid")
            | {{ $t('form.validation.min', { min: v$.email.minLength.$params.min }) }}
          span(v-if="v$.email.maxLength.$invalid")
            | {{ $t('form.validation.max', { max: v$.email.maxLength.params.max }) }}

    .form-item.form-item--submit
      .d-flex.align-items-center
        vs-button(:loading="state.isBusy" :disabled="state.isBusy")
          | {{ $t('form.forgotPassword.submit.action.title') }}
          AppIcon.ms-2(name="ri:pass-pending-line")
        NuxtLink.ms-4(:to="localePath({ name: 'Auth-Login' })") {{ $t('form.forgotPassword.iRemembered') }}
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter, reactive, ref } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { FormTypes } from './ForgotPasswordForm.component.types'
import { forgotPasswordValidator } from '@/validator'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup(_, { emit }) {
    const context = useContext()
    const router = useRouter()

    const state = reactive({
      isBusy: false
    })

    const form = reactive<FormTypes>({
      email: ''
    })

    const rule = {
      ...forgotPasswordValidator
    }

    const v$ = useVuelidate(rule, form)

    const isVisiblePassword = ref(false)

    const togglePasswordVisibility = () => {
      isVisiblePassword.value = !isVisiblePassword.value
    }

    const handleSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        sendResetPasswordEmail()
        emit('on-submit', form)
      }
    }

    const sendResetPasswordEmail = async () => {
      state.isBusy = true

      const { data, error } = await context.$api.rest.auth.forgotPassword({
        email: form.email
      })

      if (data) {
        router.push(context.localePath({ name: 'Auth-ForgotPassword-Sent' }))

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

<style lang="scss" src="./ForgotPasswordForm.component.scss"></style>
