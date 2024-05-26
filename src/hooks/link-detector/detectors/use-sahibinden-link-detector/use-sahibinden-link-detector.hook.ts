import { isSahibindenDomain, isSahibindenIlan, getSahibindenIlanGecmisi } from '@/utils/detector/sahibinden.detector.util'

export default () => {
  return {
    isSahibindenDomain,
    isSahibindenIlan,
    getSahibindenIlanGecmisi
  }
}
