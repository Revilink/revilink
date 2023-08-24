<template lang="pug">
form.form.settings-form.account-settings-form(@submit.prevent="handleSubmit")
  .form-head
    h1.settings-form-title {{ $t('general.account') }}

  h4.my-base {{ $t('form.settings.account.password.title') }}
  .form__inner
    .form-item
      vs-input(
        v-model="form.password"
        type="password"
        :placeholder="$t('form.settings.account.password.change.password')"
        spellcheck="false"
        icon-after
        :visible-password="isVisiblePassword"
        @click-icon="togglePasswordVisibility"
      )
        template(#icon)
          AppIcon(v-if="isVisiblePassword" name="ri:eye-off-fill")
          AppIcon(v-else name="ri:eye-fill")

        template(v-if="v$.password.$error" #message-danger)
          span(v-if="v$.password.required.$invalid")
            | {{ $t('form.validation.modelIsRequired', { model: $t('form.settings.account.password.change.password') }) }}
          span(v-if="v$.password.minLength.$invalid")
            | {{ $t('form.validation.min', { min: v$.password.minLength.$params.min }) }}
          span(v-if="v$.password.maxLength.$invalid")
            | {{ $t('form.validation.max', { max: v$.password.maxLength.$params.max }) }}

    .form-item
      vs-input(
        v-model="form.confirmPassword"
        type="password"
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
            | {{ $t('form.validation.modelIsRequired', { model: $t('form.settings.account.password.change.confirmPassword') }) }}
          span(v-if="v$.confirmPassword.minLength.$invalid")
            | {{ $t('form.validation.min', { min: v$.confirmPassword.minLength.$params.min }) }}
          span(v-if="v$.confirmPassword.maxLength.$invalid")
            | {{ $t('form.validation.max', { max: v$.confirmPassword.maxLength.$params.max }) }}

    .form-item.form-item--submit
      vs-button(:loading="state.isBusy" :disabled="state.isBusy") {{ $t('form.saveInformations') }}
</template>

<script lang="ts">
import { defineComponent, useContext, ref, reactive } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { accountSettingsValidator } from '@/validator'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup(_, { emit }) {
    const context = useContext()

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
      ...accountSettingsValidator
    }

    const v$ = useVuelidate(rule, form)

    const handleSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        saveAccountSettings()
        emit('on-submit', form, context)
      }
    }

    const saveAccountSettings = async () => {
      state.isBusy = true

      const { data, error } = await context.$api.rest.auth.updateMe({
        ...form
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: 'Update successfully',
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        const { data } = await context.$api.rest.auth.fetchMe()

        if (data) {
          context.$auth.setUser(data)
        }
      } else {
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

<style lang="scss" src="./AccountSettingsForm.component.scss"></style>
