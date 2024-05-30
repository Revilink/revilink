<template lang="pug">
ClientOnly
  form.form.create-reviews-embed-form(@submit.prevent="handleSubmit")
    .row
      .col-12.col-lg-4
        .col-12.col-lg-11
          aside.sidebar
            h3.mb-base {{ $t('general.options') }}
            .form__inner.pt-base
              .form-item
                vs-input(
                  v-model="form.perPage"
                  :label="$t('createReviewsEmbed.options.perPage')"
                  :placeholder="$t('createReviewsEmbed.options.perPage')"
                  spellcheck="false"
                  type="number"
                  min="1"
                  max="100"
                  primary
                  @keyup.space.prevent
                )
              .form-item
                vs-input(
                  v-model="form.page"
                  :label="$t('createReviewsEmbed.options.page')"
                  :placeholder="$t('createReviewsEmbed.options.page')"
                  spellcheck="false"
                  type="number"
                  min="1"
                  max="100"
                  primary
                  @keyup.space.prevent
                )
              .form-item
                vs-checkbox#urlReactions(v-model="form.urlReactions") {{ $t('createReviewsEmbed.options.urlReactions') }}
              .form-item
                vs-checkbox#commentListHead(v-model="form.commentListHead") {{ $t('createReviewsEmbed.options.commentListHead') }}
              .form-item
                vs-checkbox#avatar(v-model="form.avatar") {{ $t('createReviewsEmbed.options.avatar') }}
              .form-item
                vs-checkbox#like(v-model="form.like") {{ $t('createReviewsEmbed.options.like') }}
              .form-item
                vs-checkbox#reply(v-model="form.reply") {{ $t('createReviewsEmbed.options.reply') }}
              .form-item
                vs-checkbox#commentFormAvatar(v-model="form.commentFormAvatar") {{ $t('createReviewsEmbed.options.commentFormAvatar') }}
              .form-item.form-item--submit
                .d-flex.align-items-center
                  vs-button(:loading="state.isBusy" :disabled="state.isBusy" @click="handleSubmit")
                    | {{ $t('createReviewsEmbed.submit.action.title') }}
                    AppIcon.ms-2(name="ri:code-s-slash-fill")

      .col-12.col-lg-8
        .form-head
          h1.form-head__title {{ $t('createReviewsEmbed.title') }}
          p.form-head__description {{ $t('createReviewsEmbed.description') }}

        .form__inner
          .form-item.form-item--link
            vs-input(
              ref="linkInputRef"
              v-model="form.link"
              :label="'Link'"
              :placeholder="$t('form.reviewSearch.url')"
              spellcheck="false"
              theme="light"
              :maxlength="v$.link.maxLength.$params.max"
              primary
              @paste.prevent="v$.link.$touch"
              @keyup.space.prevent
              @keydown="v$.link.$touch"
            )
              template(#icon)
                AppIcon(name="material-symbols:link" color="var(--color-icon-02)" :width="24" :height="24")

            // Validation messages
            template(v-if="v$.link.$error")
              small.d-block.color-text-danger.my-6
                | {{ $t('form.validation.enterValidUrl') }}

          // Embed
          .form-item.form-item--embed(v-if="!v$.link.$error")
            strong.d-block.mb-2 {{ $t('createReviewsEmbed.embed.title') }}
            small.d-block.mb-base.font-size-text-23 * {{ $t('createReviewsEmbed.embed.hint') }}
            section
              iframe#revilink-reviews-embed(:src="embedSrc" frameborder="0" width="600" height="800" scrolling="no")

    // Embed Code Dialog
    vs-dialog.embed-code-dialog(v-model="isOpenEmbedCodeDialog")
      template(#header)
        strong.embed-code-dialog__title {{ $t('general.embedCode') }}

      textarea#embedCodeTextarea.embed-code-dialog__textarea(v-model="embedCode" readonly rows="10")
      .d-flex.justify-content-end.mt-2
        vs-button(@click="copyEmbedCode")
          | {{ $t('general.copyEmbedCode') }}
          AppIcon.ms-2(name="ri:clipboard-line")
</template>

<script lang="ts">
import { defineComponent, useContext, ref, reactive, computed, onMounted, watch } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { REVILINK_URL } from '../../../../../system/constants'
import { FormTypes } from './CreateReviewsEmbedForm.component.types'
import { createReviewsEmbedFormValidator } from '@/validator'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup(_, { emit }) {
    const context = useContext()

    const state = reactive({
      isBusy: false
    })

    const form = reactive<FormTypes>({
      link: REVILINK_URL,
      perPage: 10,
      page: 1,
      urlReactions: true,
      commentListHead: true,
      avatar: true,
      like: true,
      reply: true,
      commentFormAvatar: true
    })

    const embedCode = ref('')

    const rule = {
      ...createReviewsEmbedFormValidator
    }

    const v$ = useVuelidate(rule, form)

    const handleSubmit = () => {
      v$.value.$validate()

      if (!v$.value.$invalid) {
        generateEmbedCode()
        emit('on-submit', form)
      }
    }

    const embedSrc = computed(() => {
      return `${REVILINK_URL}${context.localePath(
        `/embed/reviews?link=${String(form.link)}&urlReactions=${String(form.urlReactions)}&commentListHead=${String(
          form.commentListHead
        )}&avatar=${String(form.avatar)}&reply=${String(form.reply)}&like=${String(form.like)}&commentFormAvatar=${String(
          form.commentFormAvatar
        )}&perPage=${String(form.perPage)}&page=${String(form.page)}`
      )}`
    })

    const isOpenEmbedCodeDialog = ref(false)

    const generateEmbedCode = () => {
      state.isBusy = true

      // eslint-disable-next-line
      embedCode.value = `<iframe id="revilink-reviews-embed" src="${embedSrc.value}" frameborder="0" width="600" height="800" scrolling="no" allowtransparency="true"></iframe><script async src="${REVILINK_URL}/integration/embed/reviews.js" charset="utf-8"><\/script>`

      emit('on-success', form)

      state.isBusy = false

      isOpenEmbedCodeDialog.value = true
    }

    const copyEmbedCode = async () => {
      try {
        const textarea = document.getElementById('embedCodeTextarea') as HTMLTextAreaElement | null

        if (textarea) {
          textarea.select()
        }

        await navigator.clipboard.writeText(embedCode.value)

        window.$nuxt.$vs.notification({
          title: context.i18n.t('success.successfully'),
          text: context.i18n.t('success.copySuccessfully'),
          color: 'success',
          position: 'bottom-center',
          flat: true
        })
      } catch (error) {
        window.$nuxt.$vs.notification({
          title: context.i18n.t('error.error'),
          text: context.i18n.t('error.copyFailed'),
          color: 'danger',
          position: 'bottom-center',
          flat: true
        })

        console.error('Error copying to clipboard:', error)
      }
    }

    onMounted(() => {
      const script = document.createElement('script')
      script.src = '/integration/embed/reviews.js'
      script.async = true
      script.charset = 'utf-8'
      document.body.appendChild(script)
    })

    watch(
      () => form,
      () => {}
    )

    return {
      state,
      v$,
      form,
      handleSubmit,
      isOpenEmbedCodeDialog,
      embedCode,
      embedSrc,
      generateEmbedCode,
      copyEmbedCode
    }
  }
})
</script>

<style lang="scss" src="./CreateReviewsEmbedForm.component.scss"></style>
