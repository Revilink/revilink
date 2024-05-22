<template lang="pug">
.reaction-button-group(:class="[isBusyClass]")
  template(v-for="(reaction, index) in reactions")
    vs-tooltip.me-4(
      :key="index"
      auth-control
      not-arrow
      shadow
      top
      @click.native.prevent="$emit('on-click-reaction-button', reaction.type, index)"
    )
      button.reaction-button(role="button" :class="[getReactionButtonActiveClass(reaction.type), getReactionButtonIsBusyClass(index)]")
        AppIcon.reaction-button__icon(:name="reaction.icon" :width="36" :height="36")
        label.reaction-button__label(v-if="state.reactionCount") {{ state.reactionCount[reaction.type.toLowerCase()] }}
      template(#tooltip)
        small {{ $t(`reaction.${reaction.type.toLowerCase()}`) }}
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, computed } from '@nuxtjs/composition-api'
import { reactionTypeEnum } from '@/enums'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  props: {
    reactionCount: {
      type: Object,
      required: false,
      default: null
    },
    myReaction: {
      type: Object,
      required: false,
      default: null
    },
    isBusy: {
      type: Boolean,
      required: false,
      default: false
    },
    busyReactionIndex: {
      type: Number,
      required: false,
      default: null
    }
  },
  setup(props) {
    const baseClassName = 'reaction-button-group'

    const state = reactive({
      reactionCount: props.reactionCount,
      myReaction: props.myReaction
    })

    watch(
      () => props.reactionCount,
      value => {
        if (value) {
          state.reactionCount = value
        }
      }
    )

    watch(
      () => props.myReaction,
      value => {
        if (value) {
          state.myReaction = value
        }
      }
    )

    const reactions = ref([
      {
        type: reactionTypeEnum.HEART,
        icon: 'fluent-emoji:red-heart'
      },
      {
        type: reactionTypeEnum.BOOKMARK,
        icon: 'fluent-emoji:bookmark'
      },
      {
        type: reactionTypeEnum.DISLIKE,
        icon: 'fluent-emoji:thumbs-down-medium-light'
      },
      {
        type: reactionTypeEnum.SMILE,
        icon: 'fluent-emoji:grinning-face-with-smiling-eyes'
      },
      {
        type: reactionTypeEnum.WOW,
        icon: 'fluent-emoji:astonished-face'
      },
      {
        type: reactionTypeEnum.THINKING,
        icon: 'fluent-emoji:thinking-face'
      },
      {
        type: reactionTypeEnum.ANGRY,
        icon: 'fluent-emoji:face-with-symbols-on-mouth'
      }
    ])

    const isBusyClass = computed(() => props.isBusy && `${baseClassName}--isBusy`)

    const getReactionButtonActiveClass = (type: string) => {
      if (state.myReaction?.type === type) {
        return `reaction-button--active`
      }
    }

    const getReactionButtonIsBusyClass = (index: number) => {
      if (props.isBusy && props.busyReactionIndex === index) {
        return `reaction-button--isBusy`
      }
    }

    return {
      state,
      reactions,
      isBusyClass,
      getReactionButtonActiveClass,
      getReactionButtonIsBusyClass
    }
  }
})
</script>

<style lang="scss" src="./ReactionButtonGroup.component.scss"></style>
