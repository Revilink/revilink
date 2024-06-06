<template lang="pug">
.app-textarea(:class="[resizeClass]")
  textarea.app-textarea__textarea(v-autosize="$attrs['v-autosize']" v-bind="$attrs" :value="value" v-on="$listeners")
  .app-textarea-character-counter(v-if="characterCounter && $attrs['maxlength']")
    span.app-textarea-character-counter__value
      template(v-if="value && value.length > 0") {{ value.length }} / {{ String($attrs['maxlength']) }}
      template(v-else) 0 / {{ String($attrs['maxlength']) }}
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
import autosize from 'v-autosize'

export default defineComponent({
  directives: {
    autosize
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: false,
      default: null
    },
    characterCounter: {
      type: Boolean,
      required: false,
      default: false
    },
    resize: {
      type: String,
      required: false,
      default: 'both' // 'none' | 'vertical' | 'horizontal' | 'both'
    }
  },
  setup(props, { attrs }) {
    const baseClassName = 'app-textarea'

    const checkValidCharacterCounter = () => {
      if (props.characterCounter && !attrs.maxlength) {
        console.warn('Type a maxlength value for character counter')
      }
    }

    checkValidCharacterCounter()

    const resizeClass = computed(() => {
      if (props.resize === 'none') {
        return `${baseClassName}--resize-none`
      }

      if (props.resize === 'vertical') {
        return `${baseClassName}--resize-vertical`
      }

      if (props.resize === 'horizontal') {
        return `${baseClassName}--resize-horizontal`
      }

      return `${baseClassName}--resize-both`
    })

    return {
      resizeClass
    }
  }
})
</script>

<style lang="scss" src="./AppTextarea.component.scss"></style>
