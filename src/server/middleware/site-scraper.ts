import fetch from 'node-fetch'
import { Request, Response } from 'express'
import { withProtocol } from 'ufo'

const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

app.all('/', (req: Request, res: Response) => {
  const url = withProtocol(req.query.url as string, 'http://')

  const fetchSite = async (url: string) => {
    try {
      const response = await fetch(url)
      const body = await response.text()
      res.json(body)
    } catch (error) {
      res.send(error)
    }
  }

  fetchSite(url)
})

module.exports = app
