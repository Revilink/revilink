import fetch from 'node-fetch'
import { Request, Response } from 'express'
import { withProtocol } from 'ufo'

const bodyParser = require('body-parser')
const DOMParser = require('universal-dom-parser')
const robotsParser = require('robots-parser')
const app = require('express')()

app.use(bodyParser.json())

app.all('/', (req: Request, res: Response) => {
  const url = withProtocol(req.query.url as string, 'http://')
  const origin = new URL(url).origin
  const userAgent = 'RevilinkBot'
  const robotsUrl = `${origin}/robots.txt`

  const fetchAndReadRobots = async (url: string) => {
    const checkRobotsTxt = async () => {
      let isAllowed

      try {
        const response = await fetch(robotsUrl)
        const body = await response.text()

        const robots = robotsParser(robotsUrl, body)
        const _isAllowed = robots.isAllowed(url, userAgent)

        console.log(`Is allowed by robots.txt: ${_isAllowed}`)

        isAllowed = _isAllowed
      } catch (error) {
        console.error('Robots.txt fetch error.')

        isAllowed = false
      }

      return isAllowed
    }

    const checkRobotsMeta = async () => {
      let isAllowed

      try {
        const htmlResponse = await fetch(url)
        const html = await htmlResponse.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const metaRobots = doc.querySelector('meta[name="robots"]')
        const metaRevilinkBot = doc.querySelector('meta[name="RevilinkBot"]')

        if (metaRobots) {
          const content = metaRobots.getAttribute('content')
          const noIndex = content.toLowerCase().includes('noindex')
          const none = content.toLowerCase().includes('none')

          if (noIndex || none) {
            isAllowed = false

            console.warn(`⚠️ Meta [Robots]: noindex: ${noIndex}, none: ${none}`)
          } else {
            isAllowed = true

            console.log('✅ Meta [Robots] noindex || none not setted.')
          }
        } else {
          console.log('✅ Meta [Robots] tag not found')

          isAllowed = true
        }

        // When is allowed from Meta [Robots], check for meta RevilinkBot
        if (isAllowed) {
          if (metaRevilinkBot) {
            const content = metaRevilinkBot.getAttribute('content')
            const noIndex = content.toLowerCase().includes('noindex')
            const none = content.toLowerCase().includes('none')

            if (noIndex || none) {
              isAllowed = false

              console.warn(`⚠️ Meta [RevilinkBot]: noindex: ${noIndex}, none: ${none}`)
            } else {
              isAllowed = true

              console.log('✅ Meta [RevilinkBot] noindex || none not setted.')
            }
          } else {
            console.log('✅ Meta [RevilinkBot] tag not found')

            isAllowed = true
          }
        }
      } catch (error) {
        console.error('Robots meta fetch error')

        isAllowed = false
      }

      return isAllowed
    }

    const isAllowedRobotsTxt = await checkRobotsTxt()

    if (isAllowedRobotsTxt) {
      const isAllowedRobotsMeta = await checkRobotsMeta()

      if (isAllowedRobotsMeta) {
        res.send({
          isAllowed: true
        })
      } else {
        res.send({
          isAllowed: false
        })
      }
    } else {
      res.send({
        isAllowed: false
      })
    }
  }

  fetchAndReadRobots(url)
})

module.exports = app
