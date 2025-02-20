<template lang="pug">
form.form.review-search-form(@submit.prevent="handleOnSubmit")
  .form__inner
    .form-item
      vs-input.review-search-form__urlInput(
        ref="urlInputRef"
        v-model="form.url"
        :placeholder="$t('form.reviewSearch.url')"
        spellcheck="false"
        autocomplete="off"
        theme="light"
        :maxlength="v$.url.maxLength.$params.max"
        primary
        @paste.prevent="handleOnPaste"
        @keyup.space.prevent
      )
        template(#icon)
          AppIcon(name="material-symbols:link" color="var(--color-icon-02)" :width="24" :height="24")

      // Validation messages
      template(v-if="v$.url.$error")
        small.validation-message.d-block.color-text-danger.my-6
          | {{ $t('form.validation.enterValidUrl') }}

      h2.review-search-form__description {{ $t('form.reviewSearch.description') }}

    .form-item.form-item--submit
      vs-button.review-search-form__submitButton(type="submit" size="large")
        span {{ $t('form.reviewSearch.submit') }}
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter, useRoute, ref, reactive, onMounted, nextTick, watch } from '@nuxtjs/composition-api'
import type { Ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { FormTypes } from './ReviewSearchForm.component.types'
import { AppIcon } from '@/components/Icon'
import { reviewSearchValidator } from '@/validator'
import { linkViewFormat } from '@/utils/url'

export default defineComponent({
  components: {
    AppIcon
  },
  props: {
    autoFocus: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const context = useContext()
    const router = useRouter()
    const route = useRoute()

    const urlInputRef: Ref = ref(null)

    const form = reactive<FormTypes>({
      url: route.value.query.link ? linkViewFormat({ url: String(route.value.query.link) }) : ''
    })

    watch(
      () => route.value.query.link,
      value => {
        form.url = value ? linkViewFormat({ url: String(value) }) : ''
      }
    )

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

    const handleOnPaste = (event: ClipboardEvent) => {
      form.url = event.clipboardData?.getData('text') || ''

      handleOnSubmit()
    }

    const focusToUrlInput = async () => {
      await nextTick()

      setTimeout(() => {
        urlInputRef.value?.$el?.querySelector('input')?.focus()
      }, 0)
    }

    onMounted(() => {
      if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        if (props.autoFocus) {
          focusToUrlInput()
        }
      }
    })

    return {
      urlInputRef,
      v$,
      form,
      handleOnSubmit,
      handleOnPaste,
      linkViewFormat
    }
  }
})
</script>

<style lang="scss" src="./ReviewSearchForm.component.scss"></style>
