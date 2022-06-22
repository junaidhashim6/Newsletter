const bodyParser = require('body-parser')
const express = require('express')
var https = require('https');

console.log('Server running at http://127.0.0.1:8081/');
const app = express()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
const port = process.env.PORT;
app.get('/', (req, res) => 
res.sendFile(__dirname + "/signup.html"))
app.post('/', function (req, res) {
   const firstName = req.body.fname;
   const lastName = req.body.lname;
   const email = req.body.email; 
   const data = {
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
   };
   const jasonData = JSON.stringify(data);
   const url = "https://us7.api.mailchimp.com/3.0/lists/317ce8c1ad"
   const options = {
    method : "POST",
    auth : "junaid:02f7ddd5de60b52e6d13db8569b2a7e9-us6"
   }
    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")

        }else{
            res.sendFile(__dirname + "/failure.html")
        }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
   })
   request.write(jasonData);
   request.end();
})

app.post('/failure', function(req,res){
    res.redirect('/')
})

app.listen(port || 3000, () => 
console.log(`Example app listening on port 3000`))

// api key 
// 02f7ddd5de60b52e6d13db8569b2a7e9-us7
// newsletter list unique id 
// 317ce8c1ad