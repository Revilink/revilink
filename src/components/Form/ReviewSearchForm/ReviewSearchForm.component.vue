<template lang="pug">
form.review-search-form(@submit.prevent="handleOnSubmit")
  vs-input.review-search-form__urlInput(v-model="form.url" :placeholder="$t('form.reviewSearch.url')" primary)
    template(#icon)
      AppIcon(name="material-symbols:link" color="var(--color-icon-02)" :width="24" :height="24")
  vs-button.review-search-form__submitButton(type="submit" size="large")
    span {{ $t('form.reviewSearch.getReviews') }}
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter, reactive } from '@nuxtjs/composition-api'
import { FormTypes } from './ReviewSearchForm.component.types'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup() {
    const context = useContext()
    const router = useRouter()

    const form = reactive<FormTypes>({
      url: ''
    })

    const handleOnSubmit = () => {
      router.push(context.localePath({ name: 'Reviews', query: { link: form.url } }))
    }

    return {
      form,
      handleOnSubmit
    }
  }
})
</script>

<style lang="scss" src="./ReviewSearchForm.component.scss"></style>
