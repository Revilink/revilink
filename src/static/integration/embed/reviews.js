(function() {
  var setEmbedHeight = function() {
    window.addEventListener('message', function(event) {
      if (event.data.type === 'revilink-reviews-embed-height') {
        var iframe = document.getElementById('revilink-reviews-embed-iframe');

        if (iframe) {
          iframe.style.height = event.data.height + 32 + 'px';
          applyCSS()
        }
      }
    });
  };

  var applyCSS = function() {
    var iframe = document.getElementById('revilink-reviews-embed-iframe');

    if (iframe) {
      var customStyles = '';
      var styleElements = document.getElementsByTagName('style');

      for (var i = 0; i < styleElements.length; i++) {
        customStyles += styleElements[i].textContent;
      }

      if (customStyles) {
        iframe.contentWindow.postMessage({
          type: 'applyCSS',
          styles: customStyles
        }, '*');
      }
    }
  };

  var listenAuth = function() {
    window.addEventListener('message', function(event) {
      if (event.data.type === 'on-click-google-auth') {
        var popup = window.open(event.data.url, 'popup', 'width=600,height=600');

        if (popup) {
          window.addEventListener('message', function(event) {
            if (event.data.type === 'google-callback-success') {
              var iframe = document.getElementById('revilink-reviews-embed-iframe');

              if (iframe) {
                setTimeout(function() {
                  // eslint-disable-next-line no-self-assign
                  iframe.src = iframe.src;
                }, 0);
              }
            }
          });
        }
      }
    });
  };

  // Ensure the functions are called after the script is loaded
  if (document.readyState === 'complete') {
    setEmbedHeight();
    applyCSS();
    listenAuth();
  } else {
    window.addEventListener('load', function() {
      setEmbedHeight();
      applyCSS();
      listenAuth();
    });
  }
})()
