<template lang="pug">
ClientOnly
  form.form.comment-form(ref="rootRef" auth-control @submit.prevent="handleSubmit")
    .form__inner
      .comment-form-card
        .comment-form-card__avatar(v-if="getReviewsEmbedOption(reviewsEmbedOptionKeyEnum.COMMENT_FORM_AVATAR)" circle size="48")
          NuxtLink(v-if="user" :to="localePath({ name: 'Profile', query: { username: user.username } })" :title="user.username")
            AppAvatar(:user="user" :size="48")
          AppAvatar(v-else :size="48")

        .comment-form-card__body
          AppTextarea.comment-form-card__textarea(
            :value="form.content"
            character-counter
            :maxlength="v$.content.maxLength.$params.max"
            rows="4"
            autosize
            :placeholder="contentPlaceholder"
            spellcheck="false"
            @input="input => { form.content = input.target.value.trim() }"
          )
          // Validation messages
          template(v-if="v$.content.$error")
            small.color-text-danger(v-if="v$.content.required.$invalid")
              | {{ $t('form.validation.modelIsRequired', { model: $t('general.comment') }) }}

          // Hint
          small.comment-form-card__hint {{ $t('form.comment.hint') }}

          // Send Button
          vs-button.comment-form__submitButton.ms-auto(type="submit" size="large" :loading="state.isBusy" :disabled="state.isBusy")
            | {{ $t('general.send') }}
</template>

<script lang="ts">
import { defineComponent, useContext, ref, reactive, watch, computed } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import type { Ref } from 'vue'
import type { FormTypes } from './CommentForm.component.types'
import { useReviewsEmbed } from '@/hooks'
import { commentValidator } from '@/validator'
import { AppAvatar } from '@/components/Avatar'
import { AppTextarea } from '@/components/Textarea'

export default defineComponent({
  components: {
    AppAvatar,
    AppTextarea
  },
  props: {
    formModel: {
      type: Object,
      required: false,
      default: null
    },
    isBusy: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { emit }) {
    const context = useContext()

    const { setReviewsEmbedOptions, reviewsEmbedOptionKeyEnum, getReviewsEmbedOption } = useReviewsEmbed()

    setReviewsEmbedOptions(context.route.value.fullPath)

    const baseClassName = 'comment-form'
    const rootRef: Ref<HTMLElement | null> = ref(null)

    const state = reactive({
      isBusy: props.isBusy
    })

    watch(
      () => props.isBusy,
      value => {
        state.isBusy = value
      }
    )

    const form = reactive<FormTypes>({
      content: props.formModel?.content || ''
    }) as any

    const clearForm = () => {
      form.content = ''
    }

    const focus = () => {
      const textareaElement = rootRef.value?.querySelector(`.${baseClassName}-card__textarea textarea`)

      if (textareaElement instanceof HTMLElement) {
        textareaElement.focus()
      }
    }

    const rule = {
      ...commentValidator
    }

    const v$ = useVuelidate(rule, form)

    const handleSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        v$.value.$reset()
        emit('on-submit', form)
      }
    }

    const user = computed(() => (context.$auth.loggedIn ? context.$auth.user : null))

    const contentPlaceholder = computed(() => {
      return user.value
        ? context.i18n.t('form.comment.content.placeholder.loggedIn', { username: user.value.username })
        : context.i18n.t('form.comment.content.placeholder.nonLoggedIn')
    })

    return {
      rootRef,
      state,
      v$,
      form,
      clearForm,
      focus,
      handleSubmit,
      user,
      contentPlaceholder,
      reviewsEmbedOptionKeyEnum,
      getReviewsEmbedOption
    }
  }
})
</script>

<style lang="scss" src="./CommentForm.component.scss"></style>
