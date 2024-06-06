<template lang="pug">
form.form.link-collection-form(@submit.prevent="handleSubmit")
  .form-head
    h1.form-head__title {{ $t('form.linkCollection.title') }}
    p.form-head__description {{ $t('form.linkCollection.description') }}

  .form__inner
    .form-item
      vs-input(
        v-model="form.title"
        :placeholder="$t('form.linkCollection.field.title.placeholder')"
        theme="light"
        size="small"
        spellcheck="false"
        :maxlength="v$.title.maxLength.$params.max"
      )
        template(v-if="v$.title.$error" #message-danger)
          span(v-if="v$.title.required.$invalid")
            | {{ $t('form.validation.modelIsRequired', { model: $t('form.linkCollection.field.title.label') }) }}
          span(v-if="v$.title.maxLength.$invalid")
            | {{ $t('form.validation.max', { max: v$.title.maxLength.params.max }) }}

    .form-item
      AppTextarea(
        :value="form.description"
        :placeholder="$t('form.linkCollection.field.description.placeholder')"
        theme="light"
        spellcheck="false"
        character-counter
        rows="10"
        :maxlength="v$.description.maxLength.$params.max"
        @input="form.description = $event.target.value"
      )
        template(v-if="v$.description.$error" #message-danger)
          span(v-if="v$.description.required.$invalid")
            | {{ $t('form.validation.modelIsRequired', { model: $t('form.linkCollection.field.description.label') }) }}
          span(v-if="v$.description.maxLength.$invalid")
            | {{ $t('form.validation.max', { max: v$.description.maxLength.params.max }) }}

    .form-item.form-item--submit
      .d-flex.align-items-center
        vs-button(:loading="state.isBusy" :disabled="state.isBusy")
          | {{ $t('form.linkCollection.field.submit.action.title') }}
          AppIcon.ms-2(name="ri:add-line")
</template>

<script lang="ts">
import { defineComponent, useContext, reactive } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { FormTypes } from './LinkCollectionForm.component.types'
import { linkCollectionValidator } from '@/validator'
import { AppIcon } from '@/components/Icon'
import { AppTextarea } from '@/components/Textarea'

export default defineComponent({
  components: {
    AppIcon,
    AppTextarea
  },
  setup(_, { emit }) {
    const context = useContext()

    const state = reactive({
      isBusy: false
    })

    const form = reactive<FormTypes>({
      title: '',
      description: ''
    })

    const rule = {
      ...linkCollectionValidator
    }

    const v$ = useVuelidate(rule, form)

    const handleSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        createLinkCollection()
        emit('on-submit', form)
      }
    }

    const createLinkCollection = async () => {
      state.isBusy = true

      const { data, error } = await context.$api.rest.bookmark.postBookmarksCollection({
        title: form.title,
        description: form.description,
        users: [context.$auth?.user]
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.successfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })
      }

      if (error) {
        window.$nuxt.$vs.notification({
          title: error.code,
          text: error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })
      }

      state.isBusy = false
    }

    return {
      state,
      v$,
      form,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionForm.component.scss"></style>
