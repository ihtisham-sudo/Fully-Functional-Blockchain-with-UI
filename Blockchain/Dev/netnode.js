const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid').v1;
const port = process.argv[2];
const nodeAddress = uuid().split('-').join('');

const alfacoin = new Blockchain();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/blockchain', function (req, res) {
    res.send(alfacoin);
});
  
app.post('/transaction', function(req, res){
    const blockIndex = alfacoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({ note: `Transaction will be added in block ${blockIndex}.`});
});

app.get('/mine', function(req, res){

    const lastBlock = alfacoin.getLastBlock();
    const previousBlockHash = lastBlock['Hash'];
    const currentBlockData = {
        transactions: alfacoin.pendingTransactions,
        index : lastBlock['index'] + 1
    };
    const nonce = alfacoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = alfacoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    alfacoin.createNewTransaction(12.5, "00", nodeAddress );
    const newBlock = alfacoin.createNewBlock(nonce, previousBlockHash, blockHash);
    res.json({
        note: "New Block mined successfully.",
        block: newBlock
    });
});


app.post('/register-and-broadcast-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl; 
}); 

app.post('/register-node', function(req, res){

});

app.post('/register-nodes-bulk', function(req, res){

});



app.listen(port, function(){
    console.log(`listening on port ${port}...`);
});