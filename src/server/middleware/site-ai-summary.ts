import { Request, Response } from 'express'
import { NuxtOptionsEnv } from '@nuxt/types/config/env'
import nuxtConfig from '../../nuxt.config'

const bodyParser = require('body-parser')
const app = require('express')()
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
  apiKey: (nuxtConfig.privateRuntimeConfig as NuxtOptionsEnv).OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

app.use(bodyParser.json())

app.all('/', async (req: Request, res: Response) => {
  const domain = req.query.domain
  const locale = req.query.locale

  let describeLangPrompt = ''

  if (locale === 'tr') {
    describeLangPrompt = ''
  } else {
    describeLangPrompt = 'Tüm metni ingilizce yaz.'
  }

  const prompt = `${describeLangPrompt} Sana bir domain yazıyorum, domain bu: "${domain}" bu domain hakkında kısa özet bilgi ver eğer bir bilgiye sahip değilsen sadece "Bu domain hakkında yeterli bilgi bulunmuyor" cevabını ver başka hiç bir şey yazma.`

  try {
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'assistant', content: prompt }],
      max_tokens: 256
    })

    res.json({
      data: {
        message: result.data.choices[0].message,
        finishReason: result.data.choices[0].finish_reason
      }
    })
  } catch (error) {
    res.status(500).send({ error })
  }
})

module.exports = app
