<template lang="pug">
.app-lang-switch
  template(v-for="locale in $i18n.locales")
    vs-radio.app-lang-switch-item(
      :id="locale.code"
      :key="locale.code"
      v-model="activeLocale"
      :val="locale.code"
      :class="[getActiveItemClass(locale.code)]"
    )
      AppIcon.app-lang-switch-item__icon(:width="24" :height="24" :name="locale.icon")
      strong.app-lang-switch-item__title {{ locale.title }}
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, ref, watch } from '@nuxtjs/composition-api'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    AppIcon
  },
  setup() {
    const baseClassName = 'app-lang-switch'

    const context = useContext()
    const route = useRoute()

    const getActiveItemClass = (locale: string) => {
      if (locale === context.i18n.locale) {
        return `${baseClassName}-item--active`
      }
    }

    const activeLocale = ref(context.i18n.locale)

    watch(
      () => activeLocale.value,
      value => {
        context.i18n.setLocale(value)
        window.$nuxt.$vs.loading({
          target: `.${baseClassName}`
        })

        if (route.value.name?.startsWith('cms')) {
          setTimeout(() => {
            window.location.replace(context.localePath('/cms/page'))
          }, 1000)
        } else {
          setTimeout(() => {
            window.location.replace(context.localePath({ path: route.value.path, query: { ...route.value.query } }))
          }, 1000)
        }
      }
    )

    return {
      getActiveItemClass,
      activeLocale
    }
  }
})
</script>

<style lang="scss" src="./AppLangSwitch.component.scss"></style>
