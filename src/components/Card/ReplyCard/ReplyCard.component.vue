<template lang="pug">
.reply-card
  .reply-card__inner
    vs-avatar.reply-card__avatar(circle size="48")
      AppIcon(v-if="reply.isAnonymous" name="ooui:user-anonymous" color="var(--color-text-01)" :width="22" :height="22")
      nuxt-link(v-else :to="localePath({ name: 'profile', params: { username: reply.user.username } })" :title="reply.user.name")
        img(:src="reply.user?.avatar" alt="avatar")

    .reply-card__body
      .reply-card-meta
        strong.reply-card-meta__user
          template(v-if="reply.isAnonymous") {{ $t('general.anonymous') }}
          nuxt-link(v-else :to="localePath({ name: 'profile', params: { username: reply.user.username } })" :title="reply.user.name")
            | {{ reply.user?.name }}
        time.reply-card-meta__date • {{ reply.createdAt }}

      .reply-card-review
        p.reply-card-review__text {{ reply.content }}

      .reply-card-actions
        .reply-card-actions-item.like-button(role="button" :class="[likedClass]" @click="toggleLike")
          PaperButton.reply-card-actions-item__button(:width="36" :height="36")
            AppIcon(v-if="isLiked" name="ri:heart-3-fill" :width="18" :height="18")
            AppIcon(v-else name="ri:heart-3-line" :width="18" :height="18")
          span.reply-card-actions-item__label
            template(v-if="likeCount <= 0") {{ $t('general.like') }}
            template(v-else) {{ likeCount }}

        .reply-card-actions-item.reply-button(role="button")
          PaperButton.reply-card-actions-item__button(:width="36" :height="36")
            AppIcon(name="ri:chat-1-line" :width="18" :height="18")
          span.reply-card-actions-item__label {{ $t('general.reply') }}

        .reply-card-actions-item.delete-button(v-if="true" role="button" @click="deleteReply")
          PaperButton.review-card-actions-item__button(:width="36" :height="36")
            AppIcon(name="ri:delete-bin-6-line" :width="18" :height="18")
          span.review-card-actions-item__label {{ $t('general.delete') }}

        vs-tooltip.reply-card-actions.share-button.ms-auto(role="button")
          PaperButton.reply-card-actions-item__button(:width="36" :height="36")
            AppIcon(name="ri:share-line" :width="18" :height="18")
          template(#tooltip)
            span {{ $t('general.share') }}

        vs-tooltip.reply-card-actions-item.report-button(role="button")
          PaperButton.reply-card-actions-item__button(:width="36" :height="36")
            AppIcon(name="ri:flag-line" :width="18" :height="18")
          template(#tooltip)
            span {{ $t('general.report') }}
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import { PaperButton } from '@/components/Button'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    PaperButton,
    AppIcon
  },
  props: {
    reply: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const isLiked = ref(false)
    const likeCount = ref(props.reply.likeCount)

    const toggleLike = () => {
      isLiked.value = !isLiked.value

      if (isLiked.value) {
        likeCount.value += 1
      } else {
        likeCount.value -= 1
      }
    }

    const likedClass = computed(() => {
      const likeButtonClassName = 'like-button'

      if (isLiked.value) {
        return `${likeButtonClassName}--liked`
      }
    })

    const deleteReply = () => {
      emit('on-click-delete')
    }

    return {
      isLiked,
      likeCount,
      toggleLike,
      likedClass,
      deleteReply
    }
  }
})
</script>

<style lang="scss" src="./ReplyCard.component.scss"></style>
