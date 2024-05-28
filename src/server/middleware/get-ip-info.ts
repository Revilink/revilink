import fetch from 'node-fetch'
import { Request, Response } from 'express'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all('/', async (req: Request, res: Response) => {
  const getIpInfo = async () => {
    try {
      const response = await fetch('https://api.userinfo.io/userinfos')

      if (!response.ok) {
        res.status(500).send({
          data: null,
          error: {
            code: 500,
            message: 'Error fetching IPData info'
          }
        })

        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const ipData = await response.json()

      res.send({
        data: ipData
      })
    } catch (error) {
      res.status(500).send({
        data: null,
        error: {
          code: 500,
          message: 'Error fetching IPData info'
        }
      })
    }
  }

  await getIpInfo()
})

module.exports = app
