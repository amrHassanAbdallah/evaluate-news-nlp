const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
var cors = require('cors')

const express = require('express')


const SentimentalAnalysisController = require('./sentiment-analysis-controller')
const sentimentalAnalysisControllerInstance = new SentimentalAnalysisController(process.env.API_ID)
console.log(process.env.API_ID,SentimentalAnalysisController,sentimentalAnalysisControllerInstance.token)

const app = express()
app.use(cors())


app.use(express.static('dist'))
console.log(__dirname)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

app.post('/api/v1/sentiment-analysis', sentimentalAnalysisControllerInstance.Analyize)



// designates what port the app will listen to for incoming requests
var server = app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})
server.setTimeout(35 *1000)
process.on('SIGINT', signal => {
    console.log(`Process ${process.pid} has been interrupted`)
    process.exit(0)
  })
process.on('exit', code => {
    // Only synchronous calls
    console.log(`Process exited with code: ${code}`)
})