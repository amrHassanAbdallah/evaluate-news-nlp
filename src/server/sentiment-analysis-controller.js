var request = require('node-fetch');
const FormData = require('form-data')
const htmlParser = require('node-html-parser')
const urlValidator = require('../validURL')

let Token = ""
class SentimentalAnalysisController {
    constructor(token) {
        if (token == "") {
            console.log("API token is required make sure to add it to the .env file")
            process.exit()
        }
        Token = token
        this.token = token
    }
    // Getter
    async Analyize(req, res, next) {

        if (req.body == null) {
            return res.status(400).json({ error: "missing text in the request body or empty" })
        }
        let { url, text } = req.body;
        if (url == "" && text == "") {
            return res.status(400).json({ error: "missing text or url in the request body or empty" })
        }


        if (text == null && url != "" && urlValidator(url)) {

            try {
                console.log(url)
                let {result, err} = await performRequest(url)
                if (err != null){
                    console.log(err)
                    return res.status(500).json({ error: "internal error" })

                }
                text = htmlParser.parse(result).innerText

            } catch (err) {
                console.log(err)
                return res.status(500).json({ error: "internal error" })

            }


        } else if (text == "") {
            return res.status(400).json({ error: `url is not a valid url` });
        }
        let lang = "en"
        let bodyFormData = new FormData();
        bodyFormData.append("key", Token)
        bodyFormData.append("txt", text)
        bodyFormData.append("lang", lang)

        let {result,err} = await performRequest("https://api.meaningcloud.com/sentiment-2.1",{
            method: "post",
            body: bodyFormData,
        })
        if (err != null){
            console.error(err)
            return res.status(500).json({ error: "internal error" })
        }else{
            let json = JSON.parse(result);
            return res.status(200).json(json)
        }
    }

}


function performRequest(url,options) {
    return new Promise(function (resolve, reject) {
        request(url, options).then(res => res.text()).then((res)=>{
            return resolve({result:res,err:null})
        }).catch((err)=>{
            reject({result:null,err: err});
        });
    });
}

module.exports = SentimentalAnalysisController;