import fetch from 'node-fetch'
import { Request, Response } from 'express'

const bodyParser = require('body-parser')
const DOMParser = require('universal-dom-parser')
const robotsParser = require('robots-parser')
const app = require('express')()

app.use(bodyParser.json())

app.all('/', (req: Request, res: Response) => {
  const url = req.query.url as string
  const origin = new URL(url).origin
  const userAgent = 'RevilinkBot'
  const robotsUrl = `${origin}/robots.txt`

  const fetchAndReadRobots = async (url: string) => {
    const checkRobotsTxt = async () => {
      let isAllowed

      try {
        const response = await fetch(robotsUrl, {
          headers: {
            'User-Agent': userAgent
          }
        })

        const body = await response.text()

        const robots = robotsParser(robotsUrl, body)
        const _isAllowed = robots.isAllowed(url, userAgent)

        console.log(`${_isAllowed ? '✅' : '⚠️'}  Is allowed by robots.txt: ${_isAllowed}`)

        isAllowed = _isAllowed
      } catch (error) {
        console.error('Robots.txt fetch error.')

        isAllowed = false
      }

      return isAllowed
    }

    const checkRevilinkBotMeta = async () => {
      let isAllowed

      try {
        const htmlResponse = await fetch(url, {
          headers: {
            'User-Agent': userAgent
          }
        })

        const html = await htmlResponse.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const metaRevilinkBot = doc.querySelector('meta[name="RevilinkBot"]')

        // Check RevilinkBot meta
        if (metaRevilinkBot) {
          const content = metaRevilinkBot.getAttribute('content')
          const noScrape = content.toLowerCase().includes('no-scrape')

          if (noScrape) {
            isAllowed = false

            console.warn(`⚠️ Meta [RevilinkBot]: no-scrape: ${noScrape}`)
          } else {
            isAllowed = true

            console.log('✅ Meta [RevilinkBot] no-scrape not setted')
          }
        } else {
          console.log('✅ Meta [RevilinkBot] tag not found')

          isAllowed = true
        }
      } catch (error) {
        console.error('Robots meta fetch error')

        isAllowed = false
      }

      return isAllowed
    }

    const isAllowedRobotsTxt = await checkRobotsTxt()

    if (isAllowedRobotsTxt) {
      const isAllowedRevilinkBotMeta = await checkRevilinkBotMeta()

      if (isAllowedRevilinkBotMeta) {
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
