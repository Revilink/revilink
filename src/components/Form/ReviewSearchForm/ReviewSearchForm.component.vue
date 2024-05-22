<template lang="pug">
form.form.review-search-form(@submit.prevent="handleOnSubmit")
  .form__inner
    .form-item
      vs-input.review-search-form__urlInput(
        v-model="form.url"
        :placeholder="$t('form.reviewSearch.url')"
        spellcheck="false"
        theme="light"
        :maxlength="v$.url.maxLength.$params.max"
        primary
        @keyup.space.prevent
      )
        template(#icon)
          AppIcon(name="material-symbols:link" color="var(--color-icon-02)" :width="24" :height="24")

      // Validation messages
      template(v-if="v$.url.$error")
        small.d-block.color-text-danger.my-6
          | {{ $t('form.validation.enterValidUrl') }}

      h2.review-search-form__description {{ $t('form.reviewSearch.description') }}

    .form-item
      vs-button.review-search-form__submitButton(type="submit" size="large")
        span {{ $t('form.reviewSearch.submit') }}
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter, reactive } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { FormTypes } from './ReviewSearchForm.component.types'
import { AppIcon } from '@/components/Icon'
import { reviewSearchValidator } from '@/validator'

export default defineComponent({
  components: {
    AppIcon
  },
  setup(_, { emit }) {
    const context = useContext()
    const router = useRouter()

    const form = reactive<FormTypes>({
      url: ''
    })

    const rule = {
      ...reviewSearchValidator
    }

    const v$ = useVuelidate(rule, form)

    const handleOnSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        router.push(context.localePath({ name: 'Reviews', query: { link: form.url } }))

        v$.value.$reset()
        emit('on-submit', form)
      }
    }

    return {
      v$,
      form,
      handleOnSubmit
    }
  }
})
</script>

<style lang="scss" src="./ReviewSearchForm.component.scss"></style>
