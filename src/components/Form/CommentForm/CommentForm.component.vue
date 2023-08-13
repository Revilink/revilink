<template lang="pug">
form.form.comment-form(ref="rootRef" @submit.prevent="handleSubmit")
  .form__inner
    .comment-form-card
      vs-avatar.comment-form-card__avatar(circle size="48")
        NuxtLink(v-if="user" :to="localePath({ name: 'Profile', query: { username: user.username } })" :title="user.username")
          img(v-if="user.avatar" :src="user.avatar.formats.thumbnail.url" :alt="user.username")
          img(v-else src="@/assets/media/core/user.png" :alt="user.username")
        img(v-else src="@/assets/media/core/user.png" :alt="user.username")

      .comment-form-card__body
        textarea.comment-form-card__textarea(v-model="form.content" v-autosize :placeholder="contentPlaceholder" spellcheck="false")
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
import { defineComponent, useContext, ref, reactive, computed } from '@nuxtjs/composition-api'
import autosize from 'v-autosize'
import { useVuelidate } from '@vuelidate/core'
import type { Ref } from 'vue'
import type { FormTypes } from './CommentForm.component.types'
import { commentValidator } from '@/validator'

export default defineComponent({
  directives: {
    autosize
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
    const baseClassName = 'comment-form'

    const rootRef: Ref<HTMLElement | null> = ref(null)

    const context = useContext()

    const state = reactive({
      isBusy: props.isBusy
    })

    const form = reactive<FormTypes>({
      content: props.formModel?.content || ''
    }) as any

    const clearForm = () => {
      form.content = ''
    }

    const focus = () => {
      const textareaElement = rootRef.value?.querySelector(`.${baseClassName}-card__textarea`)

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

    const user = computed(() => context.$auth.loggedIn && context.$auth.user)

    const contentPlaceholder = computed(() => {
      return user?.value
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
      user: user?.value,
      contentPlaceholder
    }
  }
})
</script>

<style lang="scss" src="./CommentForm.component.scss"></style>
