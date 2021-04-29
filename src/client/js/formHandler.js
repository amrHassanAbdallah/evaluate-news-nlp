import validURL from "../../validURL"

function handleSubmit(event) {
    console.log("yeeeeeeeeeeeeeeesseeah")
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (!validURL(formText)){
        document.getElementById('results').innerHTML = "the value entered is not a valid url"
    }else{
        console.log("::: Form Submitted :::")
        fetch('http://localhost:8080/api/v1/sentiment-analysis',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({url:formText})
        })
        .then(res => res.json())
        .then(function(res) {
            console.log(res)
            if (res != null){
                document.getElementById('results').innerHTML = ""
                for (let i =0;i<res.sentence_list.length;i++){
                    document.getElementById('results').innerHTML += `<br>text:${res.sentence_list[i].text}, agreement:${res.sentence_list[i].agreement},confidence:${res.sentence_list[i].confidence},score_tag:${res.sentence_list[i].score_tag}`
        
                }
            }else{
                document.getElementById('results').innerHTML = "failed to get the data try again later"
    
            }
    
        }).catch(function(err){
            console.log(err);
            document.getElementById('results').innerHTML = "you seem disconnected try again later."
            
        })
    }

  
}

var form = document.getElementById('my-form');
form.addEventListener("submit", handleSubmit);


export { handleSubmit }
