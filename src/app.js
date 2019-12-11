// ESM syntax is supported.
import express from 'express'
import bodyParser from 'body-parser'
import {databaseConnect} from './database'
import cors from 'cors'
import config from './config'
import {router} from './router'

const app = express()

//app.use(cors())

databaseConnect()
//app.get('/', (req, res) => res.send('it works'))

app.use(bodyParser.json()) // read json
app.use(bodyParser.urlencoded({extended: true})) // read urls

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, OPTIONS, DELETE")
    res.header("Access-Control-Allow-Headers", "Accept,Accept-Language,Content-Language,Content-Type")
    //res.header("Access-Control-Allow-Origin", "localhost:3100 ")
    next()
})
//app.use(function(req, res, next) { res.header("Access-Control-Allow-Origin", "localhost:3000")});


app.use('/', router)



const port = config.port
app.listen(port,() => console.log(`app has started on http://localhost:${port}`))
export {}
