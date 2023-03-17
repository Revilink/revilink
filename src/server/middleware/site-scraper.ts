import fetch from 'node-fetch'
import { Request, Response } from 'express'
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

app.all('/', (req: Request, res: Response) => {
  const url = <string>req.query.url

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
