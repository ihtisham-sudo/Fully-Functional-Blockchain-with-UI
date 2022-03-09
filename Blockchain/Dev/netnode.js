const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid').v1;
const port = process.argv[2];
const rp = require('request-promise');
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
    if (alfacoin.networkNodes.indexOf(newNodeUrl) == -1) alfacoin.networkNodes.push(newNodeUrl); 
    const regNodePromises = [];
    alfacoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body : { newNodeUrl : newNodeUrl},
            json : true
        };
        regNodePromises.push(rp(requestOptions));
    });
    Promise.all(regNodePromises)
    .then(data => {
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method : 'POST',
            body : { allNetworkNodes : [...alfacoin.networkNodes, alfacoin.currentNodeUrl]},
            json : true
        };
        return rp(bulkRegisterOptions);
    })
    .then (data => {
        res.json({ note : "New node registered with network successfully."});
    });
}); 

app.post('/register-node', function(req, res){
    const newNodeUrl = req.body.newNodeUrl;
    const nodeNotAlreadyPresent = alfacoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = alfacoin.currentNodeurl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) alfacoin.networkNodes.push(newNodeUrl);
    res.json({note : 'New node registered successfully.'});

});

app.post('/register-nodes-bulk', function(req, res){
    const allNetworkNodes =  req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl =>{
        const nodeNotAlreadyPresent = alfacoin.networkNodes.indexOf(networkNodeUrl) == -1; 
        const notCurrentNode = alfacoin.currentNodeurl !== networkNodeUrl;
        if(nodeNotAlreadyPresent && notCurrentNode) alfacoin.networkNodes.push(networkNodeUrl);
    });
    res.json({ note: 'Bulk Registration Successfull' });
});



app.listen(port, function(){
    console.log(`listening on port ${port}...`);
});