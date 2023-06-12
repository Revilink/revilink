<template lang="pug">
form.comment-form(@submit.prevent="handleSubmit")
  .comment-form-card
    vs-avatar.comment-form-card__avatar(circle size="48")
      nuxt-link(v-if="user" :to="localePath({ name: 'profile', params: { username: user.username } })" :title="user.username")
        img(v-if="user.avatar" :src="user.avatar" :alt="user.username")
        img(v-else src="@/assets/media/core/user.png" :alt="user.username")
      img(v-else src="@/assets/media/core/user.png" :alt="user.username")

    .comment-form-card__body
      // eslint-disable vue/attributes-order
      textarea.comment-form-card__textarea(v-model="form.content" :placeholder="contentPlaceholder" v-autosize)
      small.comment-form-card__hint {{ $t('form.comment.hint') }}

      // Send Button
      vs-button.comment-form__submitButton(type="submit" size="large" :loading="isBusy" :disabled="isBusy") {{ $t('general.send') }}
</template>

<script lang="ts">
import { defineComponent, useContext, reactive, computed } from '@nuxtjs/composition-api'
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

    const user = computed(() => context.$auth.loggedIn && context.$auth.user)

    const contentPlaceholder = computed(() => {
      return user?.value
        ? context.i18n.t('form.comment.content.placeholder.loggedIn', { username: user.value.username })
        : context.i18n.t('form.comment.content.placeholder.nonLoggedIn')
    })

    return {
      form,
      clearForm,
      handleSubmit,
      user: user?.value,
      contentPlaceholder
    }
  }
})
</script>

<style lang="scss" src="./CommentForm.component.scss"></style>
