<template lang="pug">
.page.profile-page
  .row
    .col-12.col-lg-4
      aside.sidebar
    .col-12.col-lg-8
      template(v-if="fetchState.pending")
        AppLoading.py-base(:title="$t('general.loadingProfile')")
      template(v-else-if="fetchState.error")
        p.color-text-danger {{ fetchState.error }}
        vs-button.my-10(type="button" @click="fetch") {{ $t('error.tryAgain') }}
      template(v-else)
        ProfileHead(:user="user")

      // Review List
      .profile-page-review-list
        .profile-page-review-list-head
          AppIcon.profile-page-review-list-head__icon(name="uil:comment-alt-dots" color="var(--color-icon-01)" :width="28" :height="28")
          span.profile-page-review-list-head__title
            | {{ $t('general.comments') }}
            template(v-if="reviews && reviews.length > 0")
              | &nbsp;({{ reviewsMeta.pagination.total }})

        template(v-if="fetchState.pending")
          AppLoading.py-base(:title="$t('general.loadingComments')")

        template(v-else-if="fetchState.error")
          p.color-text-danger {{ fetchState.error }}
          vs-button.my-10(type="button" @click="fetch") {{ $t('error.tryAgain') }}

        template(v-else)
          ProfileCommentList(:items="reviews")

        // Pagination
        vs-pagination.my-base(
          v-if="reviews && reviews.length > 0 && reviewsMeta && Object.keys(reviewsMeta).length > 0"
          v-model="review.page"
          :length="reviewsMeta.pagination.pageCount"
        )
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useRoute,
  useRouter,
  useStore,
  useFetch,
  useMeta,
  ref,
  reactive,
  computed,
  watch
} from '@nuxtjs/composition-api'
import { ProfileHead } from '@/components/Head'
import { ProfileCommentList } from '@/components/List'
import { AppIcon } from '@/components/Icon'
import { AppLoading } from '@/components/Loading'

export default defineComponent({
  components: {
    ProfileHead,
    ProfileCommentList,
    AppIcon,
    AppLoading
  },
  layout: 'Profile/Profile.layout',
  setup() {
    const context = useContext()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const user = ref({})

    const reviews = computed(() => store.getters['review/items'])
    const reviewsMeta = computed(() => store.getters['review/meta'])

    const { fetch, fetchState } = useFetch(async () => {
      const { data: userData } = await context.$api.rest.user.fetchUser({
        username: route.value.query.username
      })

      if (userData) {
        user.value = userData
      }

      const { data: reviewsData } = await store.dispatch('review/fetchReviews', {
        populate: `populate=url,user,user.avatar,images`,
        filters: `filters[user][username]=${route.value.query.username}&filters[parent][id][$notNull]=false`,
        pagination: `pagination[page]=${review.page}&pagination[pageSize]=10`
      })

      if (reviewsData) {
        if (reviewsData.items?.length <= 0) {
          review.page = 1
        }
      }
    })

    const review = reactive({
      page: route.value.query.page || 1
    })

    watch(
      () => review.page,
      async value => {
        review.page = value
        await router.push({ query: { ...route.value.query, page: String(value) } })
        await fetch()
      }
    )

    watch(
      () => route.value.query.page,
      value => {
        review.page = Number(value || 1)
      }
    )

    watch(
      () => route.value.query.username,
      async () => {
        review.page = 1

        await fetch()
      }
    )

    useMeta(() => ({
      title: route.value.query.username as string
    }))

    return {
      fetch,
      fetchState,
      user,
      reviews,
      reviewsMeta,
      review
    }
  },
  head: {}
})
</script>

<style lang="scss" src="./Profile.page.scss"></style>
