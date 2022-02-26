const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const alfacoin = new Blockchain();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blockchain', function (req, res) {
    res.send(alfacoin);
});

app.post('/transactions', function(req, res){
    console.log(req.body);
    res.send(`The amount of transaction is ${req.body.amount} Alfacoin`);
});

app.get('/mine', function(req, res){

});


app.listen(3000, function(){
    console.log('listening on port 3000');
});