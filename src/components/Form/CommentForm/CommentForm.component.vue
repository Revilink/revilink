<template lang="pug">
form.comment-form(@submit.prevent="handleOnSubmit")
  .comment-form-card
    vs-avatar.comment-form-card__avatar(circle size="48")
      AppIcon(v-if="form.isAnonymous" name="ooui:user-anonymous" color="var(--color-text-01)" :width="22" :height="22")
      nuxt-link(v-else :to="localePath({ name: 'profile', params: { username: user.username } })" :title="user.name")
        img(:src="user?.avatar" alt="avatar")

    .comment-form-card__body
      // eslint-disable vue/attributes-order
      textarea.comment-form-card__textarea(
        v-model="form.content"
        :placeholder="$t('form.comment.content', { username: form.isAnonymous ? $t('general.anonymous') : user.username })"
        v-autosize
      )
      small.comment-form-card__hint {{ $t('form.comment.hint') }}

      .d-flex
        .comment-form-card-anonymous-switch(v-if="isVisibleAnonymousSwitcher")
          small.comment-form-card-anonymous-switch__title
            AppIcon.me-1(name="ooui:user-anonymous" color="var(--color-icon-02)" :width="16" :height="16")
            | {{ $t('form.comment.anonymousSwitch') }}
          vs-switch.comment-form-card-anonymous-switch__input(v-model="form.isAnonymous")
            template(#off)
              span {{ $t('general.no') }}
            template(#on)
              span {{ $t('general.yes') }}

        // Send Button
        vs-button.comment-form__submitButton(type="submit" size="large") {{ $t('general.send') }}
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import autosize from 'v-autosize'
import { FormTypes } from './CommentForm.component.types'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  directives: {
    autosize
  },
  props: {
    formModel: {
      type: Object,
      required: false,
      default: null
    },
    isVisibleAnonymousSwitcher: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props) {
    const form = reactive<FormTypes>({
      isAnonymous: props.formModel?.isAnonymous || false,
      content: props.formModel?.content || ''
    })

    /**
     * mock
     */
    const user = {
      id: 0,
      username: 'selimdoyranli',
      createdAt: '1 Mayıs 2020',
      name: 'Selim Doyranlı',
      email: 'selimdoyranli@gmail.com',
      avatar: 'https://i.pravatar.cc/1024?img=52'
    }

    return {
      form,
      user
    }
  }
})
</script>

<style lang="scss" src="./CommentForm.component.scss"></style>
