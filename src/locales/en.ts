export default {
  app: {
    name: 'Revilink',
    domain: 'revilink.io',
    description: 'See reviews on the thing in the link.',
    copyright: `revilink.io by <a href="https://selimdoyranli.com" title="selimdoyranli" target="_blank">@selimdoyranli</a>`,
    publisher: 'selimdoyranli'
  },
  error: {
    error: 'Error',
    anErrorOccurred: 'An error has occurred',
    tryAgain: 'Try again',
    chooseLanguage: 'Choose a language'
  },
  general: {
    loading: 'Loading',
    application: 'Application',
    login: 'Login',
    register: 'Register',
    yes: 'Yes',
    no: 'No',
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
    loadMore: 'Load more',
    avatar: 'Avatar',
    doYouHaveAnAccount: 'Do you have an account?',
    doNotYouHaveAnAccountYet: `Don't you have account yet?`,
    createAnAccount: 'Create an account',
    logout: 'Logout',
    settings: 'Settings',
    comment: 'Comment',
    comments: 'Comments'
  },
  hero: {
    home: {
      title: 'See <strong>reviews</strong> on the <br> thing in the <strong>link</strong>.',
      description: 'Comment or react to any link and contribute to transforming the internet into a comment board.'
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
    passwordsDoNotMatch: 'Passwords do not match',
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
    register: {
      title: 'Register',
      description: 'Sign up to turn the internet into a comment board',
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
    reviewSearch: {
      url: 'Paste URL',
      getReviews: 'Get Reviews'
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
    }
  },
  reply: {
    loadMore: 'Load more reply',
    seeAllReplies: 'See all replies',
    repliesIsFinished: 'All replies returned'
  }
}
