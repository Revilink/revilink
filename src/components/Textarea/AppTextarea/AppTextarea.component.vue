<template lang="pug">
.app-textarea
  textarea.app-textarea__textarea(v-autosize="$attrs['v-autosize']" v-bind="$attrs" :value="value" v-on="$listeners")
  .app-textarea-character-counter(v-if="characterCounter && $attrs['maxlength']")
    span.app-textarea-character-counter__value(v-if="value && value.length > 0") {{ value.length }} / {{ String($attrs['maxlength']) }}
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
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
    }
  },
  setup(props, { attrs }) {
    const checkValidCharacterCounter = () => {
      if (props.characterCounter && !attrs.maxlength) {
        console.warn('Type a maxlength value for character counter')
      }
    }

    checkValidCharacterCounter()
  }
})
</script>

<style lang="scss" src="./AppTextarea.component.scss"></style>
