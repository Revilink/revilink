<template lang="pug">
.page.profile-page
  .row
    .col.col-4
      span Sidebar
    .col.col-8
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
          p loading

        template(v-else-if="fetchState.error")
          p {{ fetchState.error }}

        template(v-else)
          ProfileCommentList(:items="reviews")

        // Pagination
        client-only
          vs-pagination.my-base(
            v-if="reviewsMeta && Object.keys(reviewsMeta).length > 0"
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
  ref,
  reactive,
  computed,
  watch
} from '@nuxtjs/composition-api'
import { ProfileHead } from '@/components/Head'
import { ProfileCommentList } from '@/components/List'
import { AppIcon } from '@/components/Icon'

export default defineComponent({
  components: {
    ProfileHead,
    ProfileCommentList,
    AppIcon
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
        populate: `populate=url,user,images`,
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
      value => {
        review.page = value
        router.push({ query: { ...route.value.query, page: String(value) } })
        fetch()
      }
    )

    watch(
      () => route.value.query.username,
      async () => {
        review.page = 1

        await fetch()
      }
    )

    return {
      fetch,
      fetchState,
      user,
      reviews,
      reviewsMeta,
      review
    }
  }
})
</script>

<style lang="scss" src="./Profile.page.scss"></style>
