<template lang="pug">
form.form.link-collection-form(@submit.prevent="handleSubmit")
  .form-head
    h1.form-head__title
      template(v-if="formData") {{ $t('form.linkCollection.edit.title') }}
      template(v-else) {{ $t('form.linkCollection.title') }}
    p.form-head__description
      template(v-if="formData") {{ $t('form.linkCollection.edit.description') }}
      template(v-else) {{ $t('form.linkCollection.description') }}

  .form__inner
    .form-item
      small.form-item__label {{ $t('form.linkCollection.field.title.label') }}
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

    .form-item(v-if="formData")
      small.form-item__label {{ $t('form.linkCollection.field.privacy.label') }}
      vs-select(v-model="form.privacy" theme="light")
        vs-option(:label="$t('linkCollection.privacy.meOnly')" :value="linkCollectionPrivacyEnum.ME_ONLY")
          AppIcon.me-2(name="ri:lock-line")
          | {{ $t('linkCollection.privacy.meOnly') }}
        vs-option(:label="$t('linkCollection.privacy.linkOnly')" :value="linkCollectionPrivacyEnum.LINK_ONLY")
          AppIcon.me-2(name="ri:link")
          | {{ $t('linkCollection.privacy.linkOnly') }}
        vs-option(:label="$t('linkCollection.privacy.public')" :value="linkCollectionPrivacyEnum.PUBLIC")
          AppIcon.me-2(name="ri:global-line")
          | {{ $t('linkCollection.privacy.public') }}

    .form-item
      small.form-item__label {{ $t('form.linkCollection.field.description.label') }}
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
          template(v-if="formData")
            | {{ $t('form.linkCollection.edit.field.submit.action.title') }}
            AppIcon.ms-2(name="ri:save-line")
          template(v-else)
            | {{ $t('form.linkCollection.field.submit.action.title') }}
            AppIcon.ms-2(name="ri:add-line")
</template>

<script lang="ts">
import { defineComponent, useContext, reactive } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { FormTypes } from './LinkCollectionForm.component.types'
import { linkCollectionPrivacyEnum } from '@/enums'
import { linkCollectionValidator } from '@/validator'
import { AppIcon } from '@/components/Icon'
import { AppTextarea } from '@/components/Textarea'

export default defineComponent({
  components: {
    AppIcon,
    AppTextarea
  },
  props: {
    formData: {
      type: Object,
      required: false,
      default: null
    }
  },
  setup(props, { emit }) {
    const context = useContext()

    const state = reactive({
      isBusy: false
    })

    const form = reactive<FormTypes>({
      title: props.formData?.title || '',
      privacy: props.formData?.privacy || linkCollectionPrivacyEnum.ME_ONLY,
      description: props.formData?.description || ''
    })

    const rule = {
      ...linkCollectionValidator
    }

    const v$ = useVuelidate(rule, form)

    const handleSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        if (props.formData) {
          updateLinkCollection()
        } else {
          createLinkCollection()
        }
        emit('on-submit', form)
      }
    }

    const createLinkCollection = async () => {
      state.isBusy = true

      const { data, error } = await context.$api.rest.linkCollection.postLinkCollection({
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

        emit('on-success', data)
      }

      if (error) {
        window.$nuxt.$vs.notification({
          title: error.code,
          text: error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })

        emit('on-error', error)
      }

      state.isBusy = false
    }

    const updateLinkCollection = async () => {
      state.isBusy = true

      const { data, error } = await context.$api.rest.linkCollection.updateLinkCollection({
        id: props.formData?.id,
        title: form.title,
        privacy: form.privacy,
        description: form.description,
        users: [context.$auth?.user]
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.updateSuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        emit('on-edit-success', data)
      }

      if (error) {
        window.$nuxt.$vs.notification({
          title: error.code,
          text: error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })

        emit('on-edit-error', error)
      }

      state.isBusy = false
    }

    return {
      linkCollectionPrivacyEnum,
      state,
      v$,
      form,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" src="./LinkCollectionForm.component.scss"></style>
