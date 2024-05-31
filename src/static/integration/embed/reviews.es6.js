const setEmbedHeight = () => {
  window.addEventListener('message', event => {
    if (event.data.type === 'revilink-reviews-embed-height') {
      const iframe = document.getElementById('revilink-reviews-embed')

      if (iframe) {
        iframe.style.height = `${event.data.height + 32}px`
      }
    }
  })
}

const listenAuth = () => {
  window.addEventListener('message', event => {
    if (event.data.type === 'on-click-google-auth') {
      const popup = window.open(event.data.url, 'popup', 'width=600,height=600')

      if (popup) {
        window.addEventListener('message', event => {
          if (event.data.type === 'google-callback-success') {
            const iframe = document.getElementById('revilink-reviews-embed')

            if (iframe) {
              setTimeout(() => {
                // eslint-disable-next-line no-self-assign
                iframe.src = iframe.src
              }, 0)
            }
          }
        })
      }
    }
  })
}

// Ensure the functions are called after the script is loaded
if (document.readyState === 'complete') {
  setEmbedHeight()
  listenAuth()
} else {
  window.addEventListener('load', () => {
    setEmbedHeight()
    listenAuth()
  })
}
