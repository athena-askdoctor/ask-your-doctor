// server.js
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const PORT = 3000
const HOST = '192.168.31.12'

app.use(express.json())
app.use(cors())

app.get('/covid19', async (req, res)=>{
    const response = await axios.get(`https://covid19-api.weedmark.systems/api/v1/stats`)
    // const response = await axios.get(`https://covid19-api.weedmark.systems/api/v1/stats?country=${req.query.country}`)
    res.json(response.data)
    console.log(res.json(response.data))
})

app.listen(PORT, HOST,  ()=>{
    console.log(`Application running on host ${HOST} port ${PORT}`)
})
