<template lang="pug">
ClientOnly
  form.form.auth-form.reset-password-form(@submit.prevent="handleSubmit")
    .form-head
      h1 {{ $t('form.resetPassword.title') }}

    h4.my-base {{ $t('form.resetPassword.description') }}
    .form__inner
      .form-item
        vs-input(
          v-model="form.password"
          type="password"
          :placeholder="$t('form.settings.account.password.change.password')"
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
        vs-input(
          v-model="form.confirmPassword"
          type="password"
          theme="light"
          :placeholder="$t('form.settings.account.password.change.confirmPassword')"
          spellcheck="false"
          icon-after
          :visible-password="isVisibleConfirmPassword"
          @click-icon="toggleConfirmPasswordVisibility"
        )
          template(#icon)
            AppIcon(v-if="isVisibleConfirmPassword" name="ri:eye-off-fill")
            AppIcon(v-else name="ri:eye-fill")

          template(v-if="v$.confirmPassword.$error" #message-danger)
            span(v-if="v$.confirmPassword.required.$invalid")
              | {{ $t('form.validation.modelIsRequired', { model: $t('form.password') }) }}
            span(v-if="v$.confirmPassword.minLength.$invalid")
              | {{ $t('form.validation.min', { min: v$.confirmPassword.minLength.$params.min }) }}
            span(v-if="v$.confirmPassword.maxLength.$invalid")
              | {{ $t('form.validation.max', { max: v$.confirmPassword.maxLength.$params.max }) }}

      .form-item.form-item--submit
        vs-button(:loading="state.isBusy" :disabled="state.isBusy") {{ $t('form.saveInformations') }}
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useRouter, ref, reactive } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { resetPasswordValidator } from '@/validator'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup(_, { emit }) {
    const context = useContext()
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      isBusy: false,
      isEdited: false
    })

    const form = reactive({
      password: '',
      confirmPassword: ''
    })

    const isVisiblePassword = ref(false)

    const togglePasswordVisibility = () => {
      isVisiblePassword.value = !isVisiblePassword.value
    }

    const isVisibleConfirmPassword = ref(false)

    const toggleConfirmPasswordVisibility = () => {
      isVisibleConfirmPassword.value = !isVisibleConfirmPassword.value
    }

    const rule = {
      ...resetPasswordValidator
    }

    const v$ = useVuelidate(rule, form)

    const handleSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        resetPassword()
        emit('on-submit', form, context)
      }
    }

    const resetPassword = async () => {
      state.isBusy = true

      const { data, error } = await context.$api.rest.auth.resetPassword({
        code: route.value.query.code,
        password: form.password,
        passwordConfirmation: form.confirmPassword
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.successfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        router.push(context.localePath({ name: 'Auth-ForgotPassword-Success' }))

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
      isVisibleConfirmPassword,
      toggleConfirmPasswordVisibility,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" src="./ResetPasswordForm.component.scss"></style>
