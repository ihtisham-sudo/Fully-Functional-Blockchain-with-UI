function blockchain(){
    this.chain = [];
    this.pendingTransactions = [];
}

blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, Hash){
    const newBlock = {
        index : this.chain.length + 1,
        timestamp : Date.now(),
        transactions : this.pendingTransactions,
        nonce : nonce,
        Hash : Hash,
        previousBlockHash : previousBlockHash
    }
    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
}

blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1]
}

blockchain.prototype.createNewTransaction = function(amount, fromAddress, toAddress){
    const newTransaction =
     {
    amount : amount,
    fromAddress : fromAddress,
    toAddress : toAddress
    }
    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock['index'] + 1;
}


module.exports = blockchain;    