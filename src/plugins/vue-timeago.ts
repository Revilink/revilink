import Vue from 'vue'
import VueTimeago from 'vue-timeago'
import { tr, enUS } from 'date-fns/locale'

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: enUS,
  locales: {
    tr,
    en: enUS
  }
})
