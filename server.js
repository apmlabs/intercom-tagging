const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./private/main.js')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.post('/', function(req, res) {
    api.apiCall(req.body.email,req.body.sort,req.body.state,req.body.order, function(chat, total){
        console.log(chat.length);
        res.send({chats: chat, total: total});
    });
});


app.listen(3000,function(){
    console.log("We have started our server on port 3000");
});

//api.apiCall()