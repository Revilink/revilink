export default {
  app: {
    name: 'Revilink',
    domain: 'revilink.io',
    description: 'İnternetteki her hangi bir link hakkında yorum yap',
    copyright: `Tüm hakları saklıdır. revilink.io <a href="https://selimdoyranli.com" title="selimdoyranli" target="_blank">@selimdoyranli</a> tarafından`,
    publisher: 'selimdoyranli'
  },
  error: {
    error: 'Hata',
    anErrorOccurred: 'Bir hata oluştu',
    tryAgain: 'Tekrar dene',
    redirecting: 'Eğer yönlendirilmediysen, buraya tıkla',
    failed: 'İşlem başarısız oldu',
    sendFailed: 'Gönderme başarısız oldu',
    updateFailed: 'Güncelleme başarısız oldu',
    editFailed: 'Düzenleme başarısız oldu',
    deleteFailed: 'Silme başarısız oldu',
    uploadFailed: 'Yükleme başarısız oldu',
    copyFailed: 'Kopyalama başarısız oldu'
  },
  success: {
    successfully: 'İşlem başarılı',
    sendSuccessfully: 'Gönderildi',
    updateSuccessfully: 'Güncellendi',
    editSuccessfully: 'Düzenleme başarılı',
    deleteSuccessfully: 'Silindi',
    uploadSuccessfully: 'Yükleme başarılı',
    copySuccessfully: 'Başarıyla kopyalandı'
  },
  general: {
    loading: 'Yükleniyor',
    redirecting: 'Yönlendiriliyor',
    application: 'Uygulama',
    login: 'Giriş yap',
    register: 'Kayıt ol',
    yes: 'Evet',
    ok: 'Tamam',
    okShort: 'Tamam',
    iUnderstand: 'Anladım',
    no: 'Hayır',
    confirm: 'Onayla',
    areYouSure: 'Emin misin?',
    update: 'Güncelle',
    reject: 'Reddet',
    send: 'Gönder',
    like: 'Beğen',
    unlike: 'Vazgeç',
    likes: 'Beğeniler',
    replies: 'Yanıtlar',
    reply: 'Yanıtla',
    share: 'Paylaş',
    report: 'Bildir',
    updatedAt: 'Son düzenleme',
    edit: 'Düzenle',
    delete: 'Sil',
    cancel: 'İptal',
    more: 'Daha fazla',
    loadMore: 'Daha fazla',
    avatar: 'Avatar',
    doYouHaveAnAccount: 'Zaten bir hesabın var mı?',
    doNotYouHaveAnAccountYet: `Henüz bir hesabın yok mu?`,
    createAnAccount: 'Hesap oluştur',
    logout: 'Çıkış yap',
    loggingOut: 'Çıkış yapılıyor',
    comment: 'Yorum',
    comments: 'Yorumlar',
    settings: 'Ayarlar',
    settingsFor: 'için ayarlar',
    profile: 'Profil',
    account: 'Hesap',
    websiteLanguage: 'Site dili',
    loadingProfile: 'Profil yükleniyor',
    loadingComments: 'Yorumlar yükleniyor',
    loadingReplies: 'Yanıtlar yükleniyor',
    options: 'Seçenekler',
    embedCode: 'Embed kodu',
    embedStylesCode: 'Embed stil kodu',
    copyEmbedCode: 'Embed kodunu kopyala',
    copyEmbedStylesCode: 'Embed stil kodunu kopyala',
    privacy: 'Gizlilik',
    note: 'Not',
    back: 'Geri'
  },
  hero: {
    home: {
      title:
        'İnternetteki herhangi bir <br> <strong class="mark-link">link</strong> hakkında <strong class="mark-reviews">yorum</strong> yap.',
      description: 'Herhangi bir link hakkında yorum yap, reaksiyon ver ve interneti yorum panosuna dönüştür'
    }
  },
  form: {
    name: 'Ad',
    yourName: 'Adın',
    lastname: 'Soyad',
    yourLastname: 'Soyadın',
    email: 'Email adresi',
    yourEmail: 'Email adresin',
    username: 'Kullanıcı adı',
    yourUsername: 'Kullanıcı adın',
    mobilePhone: 'Telefon numarası',
    yourMobilePhone: 'Telefon numaran',
    password: 'Parola',
    yourPassword: 'Parolan',
    showPassword: 'Parolana bir bak',
    hidePassword: 'Parolanı gizle',
    message: 'Mesaj',
    location: 'Lokasyon',
    selectModel: '{model} seç',
    fileUpload: {
      label: 'Dosya Yükle',
      dragAndDrop: 'Dosya yüklemek için tıkla veya sürükleyip buraya bırak'
    },
    profilePhoto: 'Profil fotoğrafı',
    yourProfilePhoto: 'Profil fotoğrafın',
    changeProfilePhoto: 'Profil fotoğrafını değiştir',
    about: 'Hakkında',
    tellUsAboutYourself: 'Bize biraz kendinden bahset',
    whatIsYourGender: 'Cinsiyetin Nedir?',
    IDontWantToIndicate: 'Belirtmek İstemiyorum',
    itDoesntMatterForUs: 'Bizim için çok önemli değil, yine de belirtmek istersen diye koyduk',
    validation: {
      modelAlreadyRegistered: 'Bu {model} zaten kayıtlı. Başka bir tane yaz',
      enterValidModel: 'Geçerli bir {model} gir',
      modelIsRequired: '{model} gereklidir',
      max: 'Çok da şey yapmamak lazım. {model} En fazla {max} karakter',
      min: '{model} en az {min} karakter',
      containsInvalidCharacters: 'Geçersiz karakterler içeriyor',
      modelIsNotAvailable: 'Bu {model} uygun değil. Başka bir tane yaz',
      termsIsRequired: 'Koşul ve İlkeler sana uyuyorsa kayıt olabilirsin',
      makeSureAllTheFieldsAreAsDesired: 'Tüm alanların istenen gibi olduğundan emin ol',
      passwordsDoNotMatch: 'İki parola birbiriyle uyuşmuyor',
      fileUpload: {
        maxItem: 'En fazla {max} dosya yükleyebilirsin',
        singleMaxItemSize: 'Yüklenen dosya en fazla {max} {unit} olmalı',
        eachMaxItemSize: 'Her bir dosya en fazla {max} {unit} olmalı',
        singleItemMismatch: 'Yüklenen dosya {extensions} uzantısında olmalı',
        eachItemMismatch: 'Her bir dosya {extensions} uzantılarından biri olmalı'
      },
      url: 'URL formatı olmalıdır',
      enterValidUrl: 'Geçerli bir URL adresi girmelisin'
    },
    submit: 'Gönder',
    send: 'Gönder',
    saveInformations: 'Bilgileri kaydet',
    register: {
      title: 'Kayıt ol',
      description: 'İnterneti yorum panosuna dönüştürmek için kaydol',
      provider: {
        google: {
          title: 'Google ile kayıt ol'
        },
        apple: {
          title: 'Apple ile kayıt ol'
        }
      },
      email: {
        placeholder: 'Email adresi'
      },
      username: {
        placeholder: 'Kullanıcı adı'
      },
      password: {
        placeholder: 'Parola'
      },
      rePassword: {
        placeholder: 'Parolanı tekrar yaz'
      },
      terms: `Kayıt olarak {terms}'nı, {privacyPolicy}'nı ve {cookiePolicy}'nı kabul etmiş olursunuz`,
      submit: {
        action: {
          title: 'Kayıt ol'
        }
      }
    },
    login: {
      title: 'Giriş yap',
      description: 'Giriş yaparak interneti yorum panosuna dönüştür',
      provider: {
        google: {
          title: 'Google ile giriş yap'
        },
        apple: {
          title: 'Apple ile giriş yap'
        }
      },
      email: {
        placeholder: 'Email adresi'
      },
      username: {
        placeholder: 'Kullanıcı adı ya da email'
      },
      password: {
        placeholder: 'Parola'
      },
      submit: {
        action: {
          title: 'Giriş yap'
        }
      },
      iForgotMyPassword: 'Hafızamı tazele'
    },
    forgotPassword: {
      title: `Endişeye mahal yok endişeye`,
      description: 'Parolanı sıfırlamak için aşağıya email adresini veya kullanıcı adını gir',
      email: {
        placeholder: 'Email'
      },
      username: {
        placeholder: 'Email ya da kullanıcı adı'
      },
      submit: {
        action: {
          title: 'Parolamı Sıfırla'
        }
      },
      iRemembered: 'Oh! Hatırladım',
      sent: {
        title: 'Bir email gönderdik',
        description: 'Parolanı sıfırlamak için email adresine bir link gönderdik. Lütfen kontrol et'
      }
    },
    resetPassword: {
      title: 'Parolanı Sıfırla',
      description: 'Formu kullanarak parolanı sıfırlayabilirsin',
      success: {
        title: 'Parolan sıfırlandı',
        description: 'Parolanı sıfırladın, artık yeni parolan ile giriş yapabilirsin'
      }
    },
    reviewSearch: {
      url: 'Link yaz veya yapıştır',
      description: 'Herhangi bir link hakkında yorum yap, reaksiyon ver ve interneti yorum panosuna dönüştür',
      submit: 'Git'
    },
    comment: {
      title: 'Linkteki şey hakkında incelemeni yaz',
      content: {
        placeholder: {
          loggedIn: '{username} olarak yazıyorsun',
          nonLoggedIn: 'Yorumunu yaz'
        }
      },
      hint: '* Küfür, nefret söylemi, aşağılayıcı ve yanıltıcı yorumlardan kaçının.',
      post: {
        callback: {
          success: {
            title: 'OK',
            description: 'Yorumun gönderildi'
          }
        }
      }
    },
    settings: {
      settingsForUser: `{user} {nbsp} {text}`,
      profile: {
        user: {
          title: 'Kullanıcı',
          phone: {
            helperText: 'Endişelenme sana spam mesaj göndermeyiz, bunu güvenliğin için kullanacağız.'
          }
        },
        basic: {
          title: 'Temel',
          isEmailPublic: {
            label: 'E-mail adresin profilinde gösterilsin mi?'
          },
          birthDate: {
            label: 'Doğum tarihin nedir?',
            helperText: 'Yıllar karışıyo dumanlara...'
          }
        }
      },
      account: {
        password: {
          title: 'Parola Değişikliği',
          change: {
            oldPassword: 'Eski parolan',
            password: 'Parolanı belirle',
            confirmPassword: 'Yeni parolanı tekrar yazmalısın'
          }
        }
      }
    },
    linkCollection: {
      title: 'Link koleksiyonu oluştur',
      description: 'Link koleksiyonu oluştur, favori linklerinizi kaydedin ve arkadaşlarınızla paylaşın',
      edit: {
        title: 'Link koleksiyonu düzenle',
        description: '',
        field: {
          submit: {
            action: {
              title: 'Link koleksiyonunu güncelle'
            }
          }
        }
      },
      field: {
        title: {
          label: 'Koleksiyon başlığı',
          placeholder: 'Koleksiyon başlığı'
        },
        privacy: {
          label: 'Gizlilik',
          placeholder: 'Gizlilik'
        },
        description: {
          label: 'Koleksiyon açıklaması',
          placeholder: 'Koleksiyon açıklaması'
        },
        submit: {
          action: {
            title: 'Koleksiyon oluştur'
          }
        }
      }
    }
  },
  reply: {
    loadMore: 'Daha fazla yanıt getir',
    seeAllReplies: 'Tüm yanıtları gör',
    repliesIsFinished: 'Tüm yanıtlar getirildi'
  },
  reviews: {
    site: {
      meta: {
        tooltip: {
          allowed: `Linke ait web sayfası bilgileri alındı`,
          noAllow: `Linke ait web sayfası bilgileri izin verilmediği için alınamadı, bu nedenle sadece URL görüyorsun`,
          inDetector: `Linke ait gerçek web sayfası bilgileri izin verilmediği için alınamadı`
        }
      }
    }
  },
  createReviewsEmbed: {
    title: 'Yorum embedi oluştur',
    description: 'Web siteniz için bir yorum embed oluşturun. Web sayfanız için ücretsiz yorum embed ekleyin',
    options: {
      link: 'Link',
      perPage: 'Sayfa başına yorum',
      page: 'Sayfa',
      urlReactions: 'Link Reaksiyonları',
      commentListHead: 'Yorum Listesi Başlığı',
      avatar: 'Avatar',
      like: 'Beğen',
      reply: 'Yanıtlar',
      commentFormAvatar: 'Yorum Formu Avatarı',
      commentForm: 'Yorum Formu'
    },
    submit: {
      action: {
        title: 'Embed oluştur'
      }
    },
    embed: {
      title: 'Sizin embediniz',
      hint: 'Kesik çizgili çerçeve sizin web sayfanızda görünmeyecek'
    }
  },
  linkCollection: {
    linkCollection: 'Link koleksiyonu',
    linkCollections: 'Link koleksiyonları',
    myLinkCollections: 'Link koleksiyonlarım',
    selectedLink: 'Şu linki kayıt ediyorsun',
    seeLinkCollection: 'Koleksiyonunu gör',
    loadingCollection: 'Koleksiyon yükleniyor',
    loadingCollectionLinks: 'Koleksiyon linkleri getiriliyor',
    privacy: {
      meOnly: 'Sadece ben',
      linkOnly: 'Bağlantıyı bilenler',
      public: 'Herkese açık'
    },
    field: {
      description: {
        placeholder: 'Not (İsteğe bağlı)'
      }
    },
    create: 'Oluştur',
    createNew: 'Yeni oluştur',
    createLinkCollection: 'Link koleksiyonu oluştur',
    editLinkCollection: 'Link koleksiyonunu düzenle',
    deleteLinkCollection: 'Link koleksiyonunu sil',
    addToLinkCollection: 'Link koleksiyonuna ekle',
    removeFromLinkCollection: 'Link koleksiyonundan çıkar',
    seeLink: 'İncelemeleri gör'
  },
  state: {
    empty: {
      noResults: {
        title: 'Burası boş görünüyor',
        description: ''
      },
      noMoreResults: {
        title: 'Daha fazla bir şey yok',
        description: ''
      },
      listEmpty: {
        title: 'Liste şu anda boş',
        description: ''
      },
      empty: {
        title: 'Burası boş görünüyor',
        description: ''
      },
      noComments: {
        title: 'Henüz yorum yazılmadı',
        description: ''
      },
      noMoreComments: {
        title: 'Tüm yorumlar bu kadar',
        description: ''
      },
      noReviews: {
        title: 'Henüz inceleme yok',
        description: ''
      },
      noReviewComments: {
        title: 'Yorum yok',
        description: 'Linkteki şey hakkında henüz yorum yapılmadı'
      },
      profileNoReviewComments: {
        title: 'Yorum yok',
        description: 'Bu profil henüz bir link yorumlamadı'
      },
      noMoreReviews: {
        title: 'Tüm incelemeler bu kadar',
        description: ''
      },
      noLinkCollection: {
        title: 'Link koleksiyonu yok',
        description: 'Henüz bir link koleksiyonu oluşturulmadı'
      }
    }
  },
  reaction: {
    heart: 'Harika!',
    bookmark: 'Yararlı',
    dislike: 'Beğenmedim',
    smile: 'Eğlenceli',
    wow: 'Şaşırtıcı',
    thinking: 'Düşündürücü',
    angry: 'Berbat'
  },
  widget: {
    applicationDialog: {
      nav: {
        createReviewsEmbed: {
          title: 'Sitene yorum alanı ekle'
        },
        webext: {
          title: 'Chrome eklentimizi yükle'
        }
      }
    },
    siteExtra: {
      title: 'Link hakkında daha fazla',
      nav: {
        webArchive: {
          title: 'Web arşivi'
        },
        widget: {
          priceHistory: {
            title: 'Fiyat geçmişi',
            showPriceHistory: 'Fiyat geçmişini gör'
          },
          announcementPriceHistory: {
            title: 'İlan fiyat geçmişi',
            showPriceHistory: 'İlan fiyat geçmişini gör'
          }
        }
      }
    },
    siteSummary: {
      title: 'Domain hakkında',
      loading: {
        title: 'Yükleniyor',
        description: 'Yapay zeka domain özetini hazırlıyor...'
      }
    },
    cmsPages: {
      title: 'Sayfalar'
    }
  },
  cms: {
    about: {
      title: 'Hakkımızda',
      route: 'hakkimizda'
    },
    terms: {
      title: 'Kullanım koşulları',
      route: 'kullanim-kosullari'
    },
    privacyPolicy: {
      title: 'Gizlilik politikası',
      route: 'gizlilik-politikasi'
    },
    cookiePolicy: {
      title: 'Çerez politikası',
      route: 'cerez-politikasi'
    },
    revilinkDataScraper: {
      title: 'Revilink Veri Kazıyıcı',
      route: 'revilink-veri-kaziyici'
    }
  },
  cookie: {
    title: 'Çerez Politikası',
    description: `🍪 Daha iyi bir çevrimiçi deneyim sunmak ve ilgi alanlarınıza uygun içerik ve hizmetler sunmak için çerezleri kullanıyoruz. Revilink'i kullanarak <a href="/tr/cms/sayfa/cerez-politikasi" title="Çerez politikası" target="_blank">çerez politikamıza</a> onay vermiş oluyorsunuz.`
  },
  seo: {
    reviews: {
      title: 'Link hakkında incelemeler: {link}',
      description: 'İnsanlar bu link hakkında ne diyor? link hakkında yorumları ve reaksiyonları görün: {link}'
    },
    createReviewsEmbed: {
      title: 'Yorum embedi oluştur, web sayfana yorum alanı ekle',
      description: 'Web siteniz için bir yorum embed oluşturun. Web sayfanız için ücretsiz yorum embed ekleyin'
    },
    linkCollection: {
      title: 'Link koleksiyonu: {collectionTitle}',
      description: 'Bu link koleksiyonu {linkCount} link içeriyor ve {username} oluşturdu - {collectionDescription}'
    }
  }
}
