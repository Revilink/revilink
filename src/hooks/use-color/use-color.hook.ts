import type { GenerateRadialGradientTypes } from './use-color.hook.types'
import { isSahibindenDomain } from '@/utils/detector/sahibinden.detector.util'

export default () => {
  /**
   * Generate a radial gradient based on a key and theme.
   * @param {string} key - The key to generate the gradient from.
   * @param {'light' | 'dark'} theme - The theme to determine the gradient's saturation and lightness.
   * @returns {string} The generated radial gradient.
   */
  const generateRadialGradient: GenerateRadialGradientTypes = ({ key, theme }) => {
    // Check if the key matches Sahibinden domain
    if (isSahibindenDomain(key) || key.includes('sahibinden')) {
      return `radial-gradient(circle at 50% 10%, #fff000 0%, rgb(255 240 3 / 20%) 100%)`
    }

    // Generate a hash from the key
    const hash = key.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)

    // Generate hue based on the hash
    const hue = hash % 360

    // Generate saturation and lightness based on the theme
    const saturation = theme === 'light' ? '70%' : '60%'
    const lightness = theme === 'light' ? '80%' : '30%'

    // Generate two slightly different colors for the gradient
    const color1 = `hsla(${hue}, ${saturation}, ${lightness}, 0.7)`
    const color2 = `hsla(${(hue + 30) % 360}, ${saturation}, ${lightness === '80%' ? '85%' : '35%'}, 0.7)`

    // Generate random positions for the radial gradient
    const x = Math.floor(Math.random() * 100)
    const y = Math.floor(Math.random() * 100)

    return `radial-gradient(circle at ${x}% ${y}%, ${color1} 0%, ${color2} 100%)`
  }

  return {
    generateRadialGradient
  }
}
