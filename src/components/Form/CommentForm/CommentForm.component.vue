<template lang="pug">
form.comment-form(@submit.prevent="handleSubmit")
  .comment-form-card
    vs-avatar.comment-form-card__avatar(circle size="48")
      nuxt-link(:to="localePath({ name: 'profile', params: { username: user.username } })" :title="user.name")
        img(v-if="user.avatar" :src="user.avatar" :alt="user.username")
        img(v-else src="@/assets/media/core/user.png" :alt="user.username")

    .comment-form-card__body
      // eslint-disable vue/attributes-order
      textarea.comment-form-card__textarea(
        v-model="form.content"
        :placeholder="$t('form.comment.content', { username: user.username })"
        v-autosize
      )
      small.comment-form-card__hint {{ $t('form.comment.hint') }}

      // Send Button
      vs-button.comment-form__submitButton(type="submit" size="large" :loading="isBusy" :disabled="isBusy") {{ $t('general.send') }}
</template>

<script lang="ts">
import { defineComponent, useContext, reactive } from '@nuxtjs/composition-api'
import autosize from 'v-autosize'
import { FormTypes } from './CommentForm.component.types'

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
    const context = useContext()

    const form = reactive<FormTypes>({
      content: props.formModel?.content || ''
    })

    const clearForm = () => {
      form.content = ''
    }

    const handleSubmit = () => {
      emit('on-submit', form)
    }

    return {
      form,
      user: context.$auth.loggedIn && context.$auth.user,
      clearForm,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" src="./CommentForm.component.scss"></style>
