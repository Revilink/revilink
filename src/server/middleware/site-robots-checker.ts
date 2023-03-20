import { Request, Response } from 'express'
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

app.all('/', (req: Request, res: Response) => {
  const url = <string>req.query.url

  const fetchAndReadRobots = async (url: string) => {
    await res.send({
      isAllowed: true,
      url
    })
  }

  fetchAndReadRobots(url)
})

module.exports = app
