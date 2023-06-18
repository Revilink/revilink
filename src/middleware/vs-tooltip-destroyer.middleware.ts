export default () => {
  if (process.browser) {
    const tooltip = document.querySelector('.vs-tooltip')

    if (tooltip) document.body.removeChild(tooltip)
  }
}
