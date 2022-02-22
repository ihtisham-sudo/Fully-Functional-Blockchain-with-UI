const blockchain = require('./blockchain');

const alfacoin = new blockchain;
const previousBlockHash = '09ASD09SD90F9ASJDKKJK090A';
const currentBlockData = [
    {
        amount : 10,
        sender : 'ALFACOIN',
        recipient : 'ALFACOIN'
    },
    {
        amount : 30,
        sender : 'ALFACOIN',
        recipient : 'ALFACOIN'
    },
    {
        amount : 50,
        sender : 'ALFACOIN',
        recipient : 'ALFACOIN'
    }
];

const nonce = 100;
console.log(alfacoin.hashBlock(previousBlockHash, currentBlockData, nonce));
//alfacoin.createNewBlock(2131, 'SA9S8DS90ASD01', 'SAO98D009112K');

//alfacoin.createNewTransaction(1982, 'SAJHD891209D', 'LJASDOIASU011');

//alfacoin.createNewBlock(2111, 'SA9S8DS90ASD0QW21', 'SAO98D009112QW97K');

//alfacoin.createNewTransaction(50, 'SA9S8DS90ASD0QW2AAS131', 'SAOASDSA98D009112QW97K');
//alfacoin.createNewTransaction(200, 'SA9S8DS90ASD0QWASD21', 'SAO98DFDSF009112QW97K');
//alfacoin.createNewBlock(0981, 'SA9S8DD0Q545W21', 'SAO98098112QW97K');
//console.log(alfacoin);          