const sha256 = require('sha256');
const currentNodeurl = process.argv[3];
const uuid = require('uuid').v1;

function blockchain(){
    this.chain = [];
    this.pendingTransactions = [];
    this.currentNodeurl = currentNodeurl;
    this.networkNodes = [];
    this.createNewBlock(100, '0', '0');
};

blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, Hash){
    const newBlock = {
        index : this.chain.length + 1,
        timestamp : Date.now(),
        transactions : this.pendingTransactions,
        nonce : nonce,
        Hash : Hash,
        previousBlockHash : previousBlockHash
    };
    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
};

blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1]
};

blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
    const newTransaction ={
    amount : amount,
    sender : sender,
    recipient : recipient,
    transactionId : uuid().split('-').join('')
    }
    return newTransaction;
};

blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj){
    this.pendingTransactions.push(transactionObj);
    return this.getLastBlock['index'] + 1;
};

blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce){

    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;

};

blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
    while(hash.substring(0, 4) !== '0000'){
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData,nonce);
            
    };
    return nonce;
};
module.exports = blockchain;   