(function() {
  var setEmbedHeight = function() {
    window.addEventListener('message', function(event) {
      if (event.data.type === 'revilink-reviews-embed-height') {
        var iframe = document.getElementById('revilink-reviews-embed');

        if (iframe) {
          iframe.style.height = event.data.height + 32 + 'px';
        }
      }
    });
  };

  var listenAuth = function() {
    window.addEventListener('message', function(event) {
      if (event.data.type === 'on-click-google-auth') {
        var popup = window.open(event.data.url, 'popup', 'width=600,height=600');

        if (popup) {
          window.addEventListener('message', function(event) {
            if (event.data.type === 'google-auth-success') {
              var iframe = document.getElementById('revilink-reviews-embed');

              if (iframe) {
                setTimeout(function() {
                  // eslint-disable-next-line no-self-assign
                  iframe.src = iframe.src;
                }, 0);

                // Oturum bilgisini iframe'e gönder
                sendSessionToIframe();
              }
            }
          });
        }
      }
    });
  };

  // Çerezleri okuyan fonksiyon
  var getCookie = function(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // Kullanıcı oturum bilgisini iframe'e gönder
  var sendSessionToIframe = function() {
    var iframe = document.getElementById('revilink-reviews-embed');
    if (iframe) {
      iframe.onload = function() {
        var googleToken = getCookie('auth._token.google');
        var localToken = getCookie('auth._token.local');

        var sessionToken = googleToken || localToken; // Google token öncelikli, yoksa local token

        iframe.contentWindow.postMessage({
          type: 'user-session',
          sessionToken: sessionToken
        }, 'https://revilink.io'); // Bu URL, iframe'in kaynak URL'si ile aynı olmalıdır
      };
    }
  };

  // Ensure the functions are called after the script is loaded
  if (document.readyState === 'complete') {
    setEmbedHeight();
    listenAuth();
    sendSessionToIframe();
  } else {
    window.addEventListener('load', function() {
      setEmbedHeight();
      listenAuth();
      sendSessionToIframe();
    });
  }
})()
