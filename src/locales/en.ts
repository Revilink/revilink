export default {
  app: {
    name: 'Revilink',
    domain: 'revilink.io',
    description: 'Comment on any link on the internet',
    copyright: `All rights reserved &copy; 2024. <a href="https://revilink.io" title="Comment on any link on the internet">revilink.io</a> by <a href="https://selimdoyranli.com" title="selimdoyranli" target="_blank">@selimdoyranli</a>`,
    publisher: 'selimdoyranli'
  },
  error: {
    error: 'Error',
    anErrorOccurred: 'An error has occurred',
    tryAgain: 'Try again',
    redirecting: 'If you are not redirected, click here',
    failed: 'Failed',
    sendFailed: 'Send failed',
    updateFailed: 'Update failed',
    editFailed: 'Edit failed',
    deleteFailed: 'Delete failed',
    uploadFailed: 'Upload failed',
    copyFailed: 'Copy failed',
    addFailed: 'Add failed',
    saveFailed: 'Save failed'
  },
  success: {
    successfully: 'Successfully',
    sendSuccessfully: 'Send successfully',
    updateSuccessfully: 'Update successfully',
    editSuccessfully: 'Edit successfully',
    deleteSuccessfully: 'Delete successfully',
    uploadSuccessfully: 'Upload successfully',
    copySuccessfully: 'Copy successfully',
    addSuccessfully: 'Add successfully',
    saveSuccessfully: 'Save successfully'
  },
  general: {
    loading: 'Loading',
    redirecting: 'Redirecting',
    application: 'Application',
    login: 'Login',
    register: 'Register',
    yes: 'Yes',
    ok: 'Okay',
    okShort: 'OK',
    iUnderstand: 'I understand',
    no: 'No',
    confirm: 'Confirm',
    areYouSure: 'Are you sure?',
    update: 'Update',
    reject: 'Reject',
    send: 'Send',
    like: 'Like',
    unlike: 'Unlike',
    likes: 'Likes',
    replies: 'Replies',
    reply: 'Reply',
    share: 'Share',
    report: 'Report',
    updatedAt: 'Last edit',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    more: 'More',
    loadMore: 'Load more',
    avatar: 'Avatar',
    doYouHaveAnAccount: 'Do you have an account?',
    doNotYouHaveAnAccountYet: `Don't you have account yet?`,
    createAnAccount: 'Create an account',
    logout: 'Logout',
    loggingOut: 'Logging out',
    comment: 'Comment',
    comments: 'Comments',
    settings: 'Settings',
    settingsFor: 'Settings for',
    profile: 'Profile',
    account: 'Account',
    websiteLanguage: 'Website language',
    loadingProfile: 'Loading profile',
    loadingComments: 'Loading comments',
    loadingReplies: 'Loading replies',
    options: 'Options',
    embedCode: 'Embed code',
    embedStylesCode: 'Embed styles code',
    copyEmbedCode: 'Copy embed code',
    copyEmbedStylesCode: 'Copy embed styles code',
    privacy: 'Privacy',
    note: 'Note'
  },
  hero: {
    home: {
      title: '<strong class="mark-reviews">Comment</strong> on any <strong class="mark-link">link</strong> <br> on the internet.',
      description: 'Comment or react to any link and contribute to transforming the internet into a comment board'
    }
  },
  form: {
    name: 'Name',
    yourName: 'Name',
    lastname: 'Lastname',
    yourLastname: 'Lastname',
    email: 'Email',
    yourEmail: 'Email',
    username: 'Username',
    yourUsername: 'Username',
    mobilePhone: 'Phone number',
    yourMobilePhone: 'Phone number',
    password: 'Password',
    yourPassword: 'Your password',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    message: 'Message',
    location: 'Location',
    selectModel: 'Select {model}',
    fileUpload: {
      label: 'Upload File',
      dragAndDrop: 'Click or drag and drop here to upload files'
    },
    profilePhoto: 'Profile photo',
    yourProfilePhoto: 'Profile photo',
    changeProfilePhoto: 'Change profile photo',
    about: 'About',
    tellUsAboutYourself: 'Tell us about yourself',
    whatIsYourGender: 'What is your gender?',
    IDontWantToIndicate: `I don't want to indicate`,
    itDoesntMatterForUs: `It's doesn't matter for us`,
    validation: {
      modelAlreadyRegistered: 'This {model} already registered. Type an another',
      enterValidModel: 'Enter a valid {model}',
      modelIsRequired: '{model} is required',
      max: '{model} maximum {max} character',
      min: '{model} minimum {min} character',
      containsInvalidCharacters: 'Contains invalid characters',
      modelIsNotAvailable: 'This {model} is not available. Type an another',
      termsIsRequired: 'If the terms & privacy policy applies to you, you can register',
      makeSureAllTheFieldsAreAsDesired: 'Make sure all the fields are as desired',
      passwordsDoNotMatch: 'Passwords do not match',
      fileUpload: {
        maxItem: 'You can upload maximum {max} file',
        singleMaxItemSize: 'Uploaded file must be maximum {max} {unit}',
        eachMaxItemSize: 'Each file must be maximum {max} {unit}',
        singleItemMismatch: 'Uploaded file must be {extensions} extension',
        eachItemMismatch: 'Each file must have one of the {extensions} extensions'
      },
      url: 'Must be URL',
      enterValidUrl: 'Type valid URL'
    },
    submit: 'Submit',
    send: 'Send',
    saveInformations: 'Save informations',
    register: {
      title: 'Register',
      description: 'Sign up to turn the internet into a comment board',
      provider: {
        google: {
          title: 'Sign up with Google'
        },
        apple: {
          title: 'Sign up with Apple'
        }
      },
      email: {
        placeholder: 'Email address'
      },
      username: {
        placeholder: 'Username'
      },
      password: {
        placeholder: 'Password'
      },
      rePassword: {
        placeholder: 'Retype your password'
      },
      terms: `By signing up, you agree to the {terms} and {privacyPolicy}, including {cookiePolicy}`,
      submit: {
        action: {
          title: 'Register'
        }
      },
      callback: {
        success: {
          title: 'Your account has been created',
          description: 'You are ready to turn it into an internet comment board'
        }
      }
    },
    login: {
      title: 'Login',
      description: 'Turn the internet into a comment board by logging in',
      provider: {
        google: {
          title: 'Login with Google'
        },
        apple: {
          title: 'Login with Apple'
        }
      },
      email: {
        placeholder: 'Email address'
      },
      username: {
        placeholder: 'Username or email'
      },
      password: {
        placeholder: 'Password'
      },
      submit: {
        action: {
          title: 'Login'
        }
      },
      iForgotMyPassword: 'Refresh my mind'
    },
    forgotPassword: {
      title: `Don't worry, be happy!`,
      description: 'Type your email address or username below for reset your password',
      username: {
        placeholder: 'Username'
      },
      email: {
        placeholder: 'Email address'
      },
      submit: {
        action: {
          title: 'Reset password'
        }
      },
      iRemembered: 'Oh! I remembered',
      sent: {
        title: 'We sent you an email',
        description: 'We have sent a link to your email address to reset the password'
      }
    },
    resetPassword: {
      title: 'Reset password',
      description: 'You can reset your password using the form',
      success: {
        title: 'Your password has been reset',
        description: 'You have reset your password, now you can login with your new password'
      }
    },
    reviewSearch: {
      url: 'Type or paste a link',
      description: 'Comment or react to any link and contribute to transforming the internet into a comment board',
      submit: 'Go'
    },
    comment: {
      title: 'Type your review about the thing in the link',
      content: {
        placeholder: {
          loggedIn: 'You typing as {username}',
          nonLoggedIn: 'Type your comment'
        }
      },
      hint: '* Avoid profanity, hate speech, derogatory and misleading comments.',
      post: {
        callback: {
          success: {
            title: 'OK',
            description: 'Your comment has been submitted'
          }
        }
      }
    },
    settings: {
      settingsForUser: `{text} {nbsp} {user}`,
      profile: {
        user: {
          title: 'User',
          phone: {
            helperText: `Don't worry we won't send you spam messages, we will use it for your safety.`
          }
        },
        basic: {
          title: 'Basic',
          isEmailPublic: {
            label: 'Show your e-mail address on your profile?'
          },
          birthDate: {
            label: 'Birthdate',
            helperText: ''
          }
        }
      },
      account: {
        password: {
          title: 'Change Password',
          change: {
            oldPassword: 'Old password',
            password: 'New password',
            confirmPassword: 'Retype your new password'
          }
        }
      }
    },
    linkCollection: {
      title: 'Create link collection',
      description: 'Create a link collection, save your favorite links and share with your friends',
      field: {
        title: {
          label: 'Collection title',
          placeholder: 'Collection title'
        },
        description: {
          label: 'Collection description',
          placeholder: 'Collection description'
        },
        submit: {
          action: {
            title: 'Create collection'
          }
        }
      }
    }
  },
  reply: {
    loadMore: 'Load more reply',
    seeAllReplies: 'See all replies',
    repliesIsFinished: 'All replies returned'
  },
  reviews: {
    site: {
      meta: {
        tooltip: {
          allowed: `The data of the web page of this link has been retrieved`,
          noAllow: `The web page information for the link could not be retrieved because it is not allowed, so you only see the URL`,
          inDetector: `The actual web page information of the link could not be retrieved because permission was denied`
        }
      }
    }
  },
  createReviewsEmbed: {
    title: 'Create comments embed',
    description: 'Create a comments embed for your website. Add free comments embed for your web page',
    options: {
      link: 'Link',
      perPage: 'Per page',
      page: 'Page',
      urlReactions: 'Link Reactions',
      commentListHead: 'Comment List Head',
      avatar: 'Avatar',
      like: 'Like',
      reply: 'Replies',
      commentFormAvatar: 'Comment Form Avatar',
      commentForm: 'Comment Form'
    },
    submit: {
      action: {
        title: 'Create embed'
      }
    },
    embed: {
      title: 'Your embed',
      hint: 'The dashed border will not appear in your web page'
    }
  },
  linkCollection: {
    linkCollection: 'Link collection',
    linkCollections: 'Link collections',
    myLinkCollections: 'My link collections',
    selectedLink: 'You are saving this link',
    seeLinkCollection: 'See link collection',
    privacy: {
      meOnly: 'Only me',
      linkOnly: 'Link only',
      public: 'Public'
    },
    field: {
      description: {
        placeholder: 'Note (Optional)'
      }
    },
    create: 'Create',
    createNew: 'Create new',
    createLinkCollection: 'Create link collection',
    editLinkCollection: 'Edit link collection',
    deleteLinkCollection: 'Delete link collection',
    addToLinkCollection: 'Add to link collection',
    removeFromLinkCollection: 'Remove from link collection',
    seeLink: 'See link reviews'
  },
  state: {
    empty: {
      noResults: {
        title: 'This place looks empty',
        description: ''
      },
      noMoreResults: {
        title: 'Nothing more to show',
        description: ''
      },
      listEmpty: {
        title: 'The list is currently empty',
        description: ''
      },
      empty: {
        title: 'This place looks empty',
        description: ''
      },
      noComments: {
        title: 'No comments yet',
        description: ''
      },
      noMoreComments: {
        title: 'No more comments',
        description: ''
      },
      noReviews: {
        title: 'No reviews yet',
        description: ''
      },
      noReviewComments: {
        title: 'No comments',
        description: 'No comments have been made about the thing in the link yet'
      },
      profileNoReviewComments: {
        title: 'No Comments',
        description: 'This profile has not yet reviewed a link'
      },
      noMoreReviews: {
        title: 'No more reviews',
        description: ''
      },
      noLinkCollection: {
        title: 'No link collection',
        description: 'No link collection has been created yet'
      }
    }
  },
  reaction: {
    heart: 'Cool!',
    bookmark: 'Useful',
    dislike: 'Dislike',
    smile: 'Funny',
    wow: 'WOW',
    thinking: 'Engrossing',
    angry: 'Terrible'
  },
  widget: {
    applicationDialog: {
      nav: {
        createReviewsEmbed: {
          title: 'Add comments to your website'
        },
        webext: {
          title: 'Install chrome extension'
        }
      }
    },
    siteExtra: {
      title: 'More about the link',
      nav: {
        webArchive: {
          title: 'Web archive'
        },
        widget: {
          priceHistory: {
            title: 'Price history',
            showPriceHistory: 'Show price history'
          },
          announcementPriceHistory: {
            title: 'Announcement price history',
            showPriceHistory: 'Show announcement price history'
          }
        }
      }
    },
    siteSummary: {
      title: 'About the domain',
      loading: {
        title: 'Loading',
        description: 'AI prepares domain summary...'
      }
    },
    cmsPages: {
      title: 'Pages'
    }
  },
  cms: {
    about: {
      title: 'About us',
      route: 'about-us'
    },
    terms: {
      title: 'Terms',
      route: 'terms'
    },
    privacyPolicy: {
      title: 'Privacy policy',
      route: 'privacy-policy'
    },
    cookiePolicy: {
      title: 'Cookie policy',
      route: 'cookie-policy'
    },
    revilinkDataScraper: {
      title: 'Revilink Data Scraper',
      route: 'revilink-data-scraper'
    }
  },
  cookie: {
    title: 'Cookie Policy',
    description:
      '🍪 We use cookies to offer an improved online experience and offer you content and services adopted to your interests. By using Revilink you are giving your consent to our <a href="/cms/page/cookie-policy" title="Cookie policy" target="_blank">cookie policy</a>.'
  },
  seo: {
    reviews: {
      title: 'Reviews about link: {link}',
      description: 'What people are saying about this link? See comments and reactions about the link: {link}'
    },
    createReviewsEmbed: {
      title: 'Create comments embed, add free comments embed to your web page',
      description: 'Create a comments embed for your website. Add free comments embed for your web page'
    }
  }
}
