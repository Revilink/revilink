<template lang="pug">
form.form.settings-form.profile-settings-form(@submit.prevent="handleSubmit")
  .form-head
    h1.settings-form-title {{ $t('general.profile') }}

  template(v-if="fetchState.pending")
    AppLoading.d-block.py-10

  template(v-if="fetchState.error")
    BasicState(:title="$t('error.error')" :description="getFetchError(fetchState.error).message")
      template(#head)
        img(src="/media/elements/state/network.svg" width="256")
      template(#footer)
        vs-button.my-10(type="button" @click="fetch") {{ $t('error.tryAgain') }}

  ClientOnly(v-else)
    .form__inner.pt-1(v-if="!fetchState.pending && !fetchState.error")
      .form-item
        .avatar-upload
          AppLoading.avatar-upload__loading(v-if="state.isBusy")
          client-only
            croppa(
              ref="avatarUploadRef"
              v-model="avatar.file"
              placeholder
              :disabled="state.isBusy"
              :initial-image="$auth.loggedIn && getAvatarSrc({ user: $auth.user })"
              :file-size-limit="Number(avatar.config.fileSizeLimit)"
              :accept="avatar.config.accept"
              :prevent-white-space="avatar.config.preventWhiteSpace"
              :show-remove-button="avatar.config.showRemoveButton && !state.isBusy"
              :zoom-speed="avatar.config.zoomSpeed"
              :width="avatar.config.width"
              :height="avatar.config.height"
              @file-choose="handleAvatarChoose"
              @zoom="handleDirtyAvatar"
              @move="handleDirtyAvatar"
              @image-remove="handleAvatarRemove"
              @file-size-exceed="showAvatarFileSizeExceedMessage"
              @file-type-mismatch="showAvatarFileTypeMismatchMessage"
            )
            label.avatar-upload__label.cursor-pointer(@click="$refs.avatarUploadRef.chooseFile()")
              strong
                a(@click.prevent) {{ $t('form.changeProfilePhoto') }}

      .form-item
        vs-input(
          v-model="form.username"
          :label="$t('form.username')"
          :placeholder="$t('form.username')"
          spellcheck="false"
          :maxlength="v$.username.maxLength.$params.max"
          @keydown.space.prevent
        )
          template(v-if="v$.username.$error" #message-danger)
            span(v-if="v$.username.required.$invalid")
              | {{ $t('form.validation.modelIsRequired', { model: $t('form.username') }) }}
            span(v-if="v$.username.isValid.$invalid && form.username.length > 0")
              | {{ $t('form.validation.containsInvalidCharacters') }}
            span(v-if="v$.username.minLength.$invalid")
              | {{ $t('form.validation.min', { min: v$.username.minLength.$params.min }) }}
            span(v-if="v$.username.maxLength.$invalid")
              | {{ $t('form.validation.max', { max: v$.username.maxLength.$params.max }) }}

      .form-item
        vs-input(
          v-model="form.email"
          :label="$t('form.email')"
          :placeholder="$t('form.email')"
          spellcheck="false"
          :readonly="$auth.strategy.name === 'google'"
          :disabled="$auth.strategy.name === 'google'"
          :maxlength="v$.email.maxLength.$params.max"
          @keydown.space.prevent
        )
          template(v-if="v$.email.$error" #message-danger)
            span(v-if="v$.email.email.$invalid")
              | {{ $t('form.validation.enterValidModel', { model: $t('form.email').toLowerCase() }) }}
            span(v-if="v$.email.required.$invalid")
              | {{ $t('form.validation.modelIsRequired', { model: $t('form.email') }) }}
            span(v-if="v$.email.maxLength.$invalid")
              | {{ $t('form.validation.max', { max: v$.email.maxLength.params.max }) }}

      .form-item
        vs-input(
          v-model="form.information.fullname"
          :label="$t('form.name')"
          :placeholder="$t('form.name')"
          spellcheck="false"
          :maxlength="v$.information.fullname.maxLength.$params.max"
        )
          template(v-if="v$.information.fullname.$error" #message-danger)
            span(v-if="v$.information.fullname.maxLength.$invalid")
              | {{ $t('form.validation.max', { max: v$.information.fullname.maxLength.params.max }) }}

      .form-item
        AppTextarea(
          :value="form.information.bio"
          character-counter
          maxlength="120"
          rows="4"
          autosize
          placeholder="bio"
          spellcheck="false"
          @input="input => { form.information.bio = input.target.value.trim() }"
        )

      .form-item.form-item--submit
        vs-button(:loading="state.isBusy" :disabled="state.isBusy") {{ $t('form.saveInformations') }}
</template>

<script lang="ts">
import { defineComponent, useContext, useFetch, ref, reactive } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import type { Ref } from 'vue'
import type { AvatarUploadRefTypes, AvatarTypes } from './ProfileSettingsForm.component.types'
import { setFetchError, getFetchError } from '@/utils/fetch-error'
import { profileSettingsValidator } from '@/validator'
import { useAuth } from '@/hooks'
import { AppTextarea } from '@/components/Textarea'
import { AppLoading } from '@/components/Loading'
import { BasicState } from '@/components/State'

export default defineComponent({
  components: {
    AppTextarea,
    AppLoading,
    BasicState
  },
  setup(_, { emit }) {
    const context = useContext()

    const { getAvatarSrc } = useAuth()

    const state = reactive({
      isBusy: false,
      isEdited: false
    })

    const avatarUploadRef: Ref<AvatarUploadRefTypes | null> = ref(null)
    const avatar = reactive<AvatarTypes>({
      file: {},
      isDirty: false,
      config: {
        width: 300,
        height: 300,
        preventWhiteSpace: true,
        showRemoveButton: true,
        zoomSpeed: 10,
        accept: '.JPEG,.jpg,.jpeg,.png',
        fileSizeLimit: 6 * 1024 * 1024 // Byte to MB
      }
    })

    const showAvatarFileSizeExceedMessage = () => {
      window.$nuxt.$vs.notification({
        title: context.i18n.t('form.validation.fileUpload.singleMaxItemSize', {
          max: avatar.config.fileSizeLimit / 1024 / 1024,
          unit: 'MB'
        }),
        color: 'danger',
        position: 'bottom-center',
        flat: true
      })
    }

    const showAvatarFileTypeMismatchMessage = () => {
      window.$nuxt.$vs.notification({
        title: context.i18n.t('form.validation.fileUpload.singleItemMismatch', { extensions: avatar.config.accept }),
        color: 'danger',
        position: 'bottom-center',
        flat: true
      })
    }

    const uploadAvatar = async ({ blob }: { blob: Blob }) => {
      state.isBusy = true

      const formData = new FormData()
      formData.append('files', new File([blob], 'profile.png'))

      const { data, error } = await context.$api.rest.file.uploadFile({
        formData
      })

      if (data) {
        const uploadedFile = data[0]

        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.uploadSuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        const { data: updateUserData } = await context.$api.rest.auth.updateMe({
          id: context.$auth.user?.id,
          avatar: uploadedFile.id
        })

        if (updateUserData) {
          if (context.$auth.user) {
            context.$auth.user.avatar = uploadedFile
          }
        } else {
          window.$nuxt.$vs.notification({
            title: context.i18n.t('error.error'),
            text: context.i18n.t('error.updateFailed'),
            color: 'danger',
            position: 'bottom-center',
            flat: true
          })
        }
      } else {
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

    const deleteAvatar = () => {
      form.avatar = null
    }

    const handleAvatarChoose = () => {
      state.isEdited = true
    }

    const handleDirtyAvatar = () => {
      state.isEdited = true
      avatar.isDirty = true
    }

    const handleAvatarRemove = () => {
      state.isEdited = true
    }

    const { fetch, fetchState } = useFetch(async () => {
      const { data, error } = await context.$api.rest.auth.fetchMe()

      if (data) {
        form.id = data.id
        form.username = data.username
        form.email = data.email
        form.information.fullname = data.information?.fullname
        form.information.bio = data.information?.bio
      }

      if (error) {
        setFetchError(error)
      }
    })

    const form = reactive({
      id: null,
      username: '',
      email: '',
      information: {
        fullname: '',
        bio: ''
      }
    }) as any

    const rule = {
      ...profileSettingsValidator
    }

    const v$ = useVuelidate(rule, form)

    const handleSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        saveProfileSettings()
        emit('on-submit', form, context)
      }
    }

    const saveProfileSettings = async () => {
      if (context.$auth.user?.avatar && !avatarUploadRef.value?.hasImage()) {
        deleteAvatar()
        context.$auth.user.avatar = null
      } else if ((!avatar.file.currentIsInitial && avatarUploadRef.value?.hasImage()) || avatar.isDirty) {
        avatar.file.generateBlob?.((blob: Blob) => {
          uploadAvatar({
            blob
          })
        }, 0.8)
      }

      const { data, error } = await context.$api.rest.auth.updateMe({
        ...form
      })

      if (data) {
        window.$nuxt.$vs.notification({
          title: 'OK',
          text: context.i18n.t('success.updateSuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })

        const { data } = await context.$api.rest.auth.fetchMe()

        if (data) {
          context.$auth.setUser(data)
        }
      } else {
        window.$nuxt.$vs.notification({
          title: error.code,
          text: error.message,
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })
      }
    }

    return {
      fetch,
      fetchState,
      getFetchError,
      state,
      getAvatarSrc,
      avatarUploadRef,
      avatar,
      showAvatarFileSizeExceedMessage,
      showAvatarFileTypeMismatchMessage,
      uploadAvatar,
      deleteAvatar,
      handleAvatarChoose,
      handleAvatarRemove,
      handleDirtyAvatar,
      v$,
      form,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" src="./ProfileSettingsForm.component.scss"></style>
