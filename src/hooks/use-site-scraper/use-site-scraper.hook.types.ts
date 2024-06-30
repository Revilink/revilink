type SiteMetaWidgetTypes = {
  announcementPriceHistory?: string
}

type SiteMetaTypes = {
  title?: string
  icon?: string
  widget?: SiteMetaWidgetTypes
}

export type SiteTypes = {
  isAllowed: boolean
  isInDetector: boolean
  isBusy: boolean
  meta: SiteMetaTypes
}
