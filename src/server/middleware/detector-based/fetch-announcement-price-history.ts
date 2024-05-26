import fetch from 'node-fetch'
import { Request, Response } from 'express'
const DOMParser = require('universal-dom-parser')
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

function extractTableHtml(html: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const table = doc.querySelector('table')

  return table ? table.outerHTML : ''
}

app.all('/', async (req: Request, res: Response) => {
  const provider = req.query.provider as string
  const announcementId = req.query.announcementId as string

  const fetchAnnouncementPriceHistory = async () => {
    const url = `${process.env.ANNOUNCEMENT_PRICE_HISTORY_API}/${provider}/${announcementId}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }
      const html = await response.text()
      const result = await extractTableHtml(html)

      res.send({
        data: result,
        error: null
      })
    } catch (error) {
      console.error('Error fetching HTML data:', error)
      res.status(500).send({
        data: '',
        error: 'Error fetching HTML data'
      })
    }
  }

  await fetchAnnouncementPriceHistory()
})

module.exports = app
