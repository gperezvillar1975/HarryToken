// javascript:  transact with deployed Uniswap exchange contract

let Web3 = require("web3");
const Tx = require('ethereumjs-tx')
const HRTExchangeAddress = '0x7E2E9594b9d25a01a2da15FF2A87B8C8Ae2aBA4c'
const HRTOwnerAddress = '0x368625Db23Acbc91d23521A43EB19EB5855402bd'
const HRTOwnerPK = '8d3c9281f6dd489294db376aa420d4004fb9a39350bf328b8942fe3e9d4eecc3'

const abi = [
    {
      name: "TokenPurchase",
      inputs: [
        { type: "address", name: "buyer", indexed: true },
        { type: "uint256", name: "eth_sold", indexed: true },
        { type: "uint256", name: "tokens_bought", indexed: true },
      ],
      anonymous: false,
      type: "event",
    },
    {
      name: "EthPurchase",
      inputs: [
        { type: "address", name: "buyer", indexed: true },
        { type: "uint256", name: "tokens_sold", indexed: true },
        { type: "uint256", name: "eth_bought", indexed: true },
      ],
      anonymous: false,
      type: "event",
    },
    {
      name: "AddLiquidity",
      inputs: [
        { type: "address", name: "provider", indexed: true },
        { type: "uint256", name: "eth_amount", indexed: true },
        { type: "uint256", name: "token_amount", indexed: true },
      ],
      anonymous: false,
      type: "event",
    },
    {
      name: "RemoveLiquidity",
      inputs: [
        { type: "address", name: "provider", indexed: true },
        { type: "uint256", name: "eth_amount", indexed: true },
        { type: "uint256", name: "token_amount", indexed: true },
      ],
      anonymous: false,
      type: "event",
    },
    {
      name: "Transfer",
      inputs: [
        { type: "address", name: "_from", indexed: true },
        { type: "address", name: "_to", indexed: true },
        { type: "uint256", name: "_value", indexed: false },
      ],
      anonymous: false,
      type: "event",
    },
    {
      name: "Approval",
      inputs: [
        { type: "address", name: "_owner", indexed: true },
        { type: "address", name: "_spender", indexed: true },
        { type: "uint256", name: "_value", indexed: false },
      ],
      anonymous: false,
      type: "event",
    },
    {
      name: "setup",
      outputs: [],
      inputs: [{ type: "address", name: "token_addr" }],
      constant: false,
      payable: false,
      type: "function",
      gas: 175875,
    },
    {
      name: "addLiquidity",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "min_liquidity" },
        { type: "uint256", name: "max_tokens" },
        { type: "uint256", name: "deadline" },
      ],
      constant: false,
      payable: true,
      type: "function",
      gas: 82605,
    },
    {
      name: "removeLiquidity",
      outputs: [
        { type: "uint256", name: "out" },
        { type: "uint256", name: "out" },
      ],
      inputs: [
        { type: "uint256", name: "amount" },
        { type: "uint256", name: "min_eth" },
        { type: "uint256", name: "min_tokens" },
        { type: "uint256", name: "deadline" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 116814,
    },
    {
      name: "__default__",
      outputs: [],
      inputs: [],
      constant: false,
      payable: true,
      type: "function",
    },
    {
      name: "ethToTokenSwapInput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "min_tokens" },
        { type: "uint256", name: "deadline" },
      ],
      constant: false,
      payable: true,
      type: "function",
      gas: 12757,
    },
    {
      name: "ethToTokenTransferInput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "min_tokens" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "recipient" },
      ],
      constant: false,
      payable: true,
      type: "function",
      gas: 12965,
    },
    {
      name: "ethToTokenSwapOutput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_bought" },
        { type: "uint256", name: "deadline" },
      ],
      constant: false,
      payable: true,
      type: "function",
      gas: 50455,
    },
    {
      name: "ethToTokenTransferOutput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_bought" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "recipient" },
      ],
      constant: false,
      payable: true,
      type: "function",
      gas: 50663,
    },
    {
      name: "tokenToEthSwapInput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_sold" },
        { type: "uint256", name: "min_eth" },
        { type: "uint256", name: "deadline" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 47503,
    },
    {
      name: "tokenToEthTransferInput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_sold" },
        { type: "uint256", name: "min_eth" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "recipient" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 47712,
    },
    {
      name: "tokenToEthSwapOutput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "eth_bought" },
        { type: "uint256", name: "max_tokens" },
        { type: "uint256", name: "deadline" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 50175,
    },
    {
      name: "tokenToEthTransferOutput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "eth_bought" },
        { type: "uint256", name: "max_tokens" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "recipient" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 50384,
    },
    {
      name: "tokenToTokenSwapInput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_sold" },
        { type: "uint256", name: "min_tokens_bought" },
        { type: "uint256", name: "min_eth_bought" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "token_addr" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 51007,
    },
    {
      name: "tokenToTokenTransferInput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_sold" },
        { type: "uint256", name: "min_tokens_bought" },
        { type: "uint256", name: "min_eth_bought" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "recipient" },
        { type: "address", name: "token_addr" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 51098,
    },
    {
      name: "tokenToTokenSwapOutput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_bought" },
        { type: "uint256", name: "max_tokens_sold" },
        { type: "uint256", name: "max_eth_sold" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "token_addr" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 54928,
    },
    {
      name: "tokenToTokenTransferOutput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_bought" },
        { type: "uint256", name: "max_tokens_sold" },
        { type: "uint256", name: "max_eth_sold" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "recipient" },
        { type: "address", name: "token_addr" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 55019,
    },
    {
      name: "tokenToExchangeSwapInput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_sold" },
        { type: "uint256", name: "min_tokens_bought" },
        { type: "uint256", name: "min_eth_bought" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "exchange_addr" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 49342,
    },
    {
      name: "tokenToExchangeTransferInput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_sold" },
        { type: "uint256", name: "min_tokens_bought" },
        { type: "uint256", name: "min_eth_bought" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "recipient" },
        { type: "address", name: "exchange_addr" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 49532,
    },
    {
      name: "tokenToExchangeSwapOutput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_bought" },
        { type: "uint256", name: "max_tokens_sold" },
        { type: "uint256", name: "max_eth_sold" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "exchange_addr" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 53233,
    },
    {
      name: "tokenToExchangeTransferOutput",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "uint256", name: "tokens_bought" },
        { type: "uint256", name: "max_tokens_sold" },
        { type: "uint256", name: "max_eth_sold" },
        { type: "uint256", name: "deadline" },
        { type: "address", name: "recipient" },
        { type: "address", name: "exchange_addr" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 53423,
    },
    {
      name: "getEthToTokenInputPrice",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [{ type: "uint256", name: "eth_sold" }],
      constant: true,
      payable: false,
      type: "function",
      gas: 5542,
    },
    {
      name: "getEthToTokenOutputPrice",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [{ type: "uint256", name: "tokens_bought" }],
      constant: true,
      payable: false,
      type: "function",
      gas: 6872,
    },
    {
      name: "getTokenToEthInputPrice",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [{ type: "uint256", name: "tokens_sold" }],
      constant: true,
      payable: false,
      type: "function",
      gas: 5637,
    },
    {
      name: "getTokenToEthOutputPrice",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [{ type: "uint256", name: "eth_bought" }],
      constant: true,
      payable: false,
      type: "function",
      gas: 6897,
    },
    {
      name: "tokenAddress",
      outputs: [{ type: "address", name: "out" }],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1413,
    },
    {
      name: "factoryAddress",
      outputs: [{ type: "address", name: "out" }],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1443,
    },
    {
      name: "balanceOf",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [{ type: "address", name: "_owner" }],
      constant: true,
      payable: false,
      type: "function",
      gas: 1645,
    },
    {
      name: "transfer",
      outputs: [{ type: "bool", name: "out" }],
      inputs: [
        { type: "address", name: "_to" },
        { type: "uint256", name: "_value" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 75034,
    },
    {
      name: "transferFrom",
      outputs: [{ type: "bool", name: "out" }],
      inputs: [
        { type: "address", name: "_from" },
        { type: "address", name: "_to" },
        { type: "uint256", name: "_value" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 110907,
    },
    {
      name: "approve",
      outputs: [{ type: "bool", name: "out" }],
      inputs: [
        { type: "address", name: "_spender" },
        { type: "uint256", name: "_value" },
      ],
      constant: false,
      payable: false,
      type: "function",
      gas: 38769,
    },
    {
      name: "allowance",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [
        { type: "address", name: "_owner" },
        { type: "address", name: "_spender" },
      ],
      constant: true,
      payable: false,
      type: "function",
      gas: 1925,
    },
    {
      name: "name",
      outputs: [{ type: "bytes32", name: "out" }],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1623,
    },
    {
      name: "symbol",
      outputs: [{ type: "bytes32", name: "out" }],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1653,
    },
    {
      name: "decimals",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1683,
    },
    {
      name: "totalSupply",
      outputs: [{ type: "uint256", name: "out" }],
      inputs: [],
      constant: true,
      payable: false,
      type: "function",
      gas: 1713,
    },
  ];

let web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/26763e533f734041b01ddfc8c90d8824"));
// the address that will send the test transaction
const addressFrom = HRTOwnerAddress
const privKey = HRTOwnerPK
// the exchange contract address
const addressTo = HRTExchangeAddress
const contract = new web3.eth.Contract(
  abi,
  addressTo
);
const DEADLINE = 1742680400 // deadline = w3.eth.getBlock(w3.eth.blockNumber).timestamp
const ETH_ADDED = web3.utils.toHex(1*10**17) // 0.1 ETH
const TOKEN_ADDED = web3.utils.toHex(100*10**18) // 15  tokens
const tx = contract.methods.addLiquidity(1, TOKEN_ADDED, DEADLINE);
const encodedABI = tx.encodeABI();

// Signs the given transaction data and sends it.
function sendSigned(txData, cb) {
  const privateKey = new Buffer(privKey, 'hex')
  const transaction = new Tx(txData)
  transaction.sign(privateKey)
  const serializedTx = transaction.serialize().toString('hex')
  web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
}

// get the number of transactions sent so far so we can create a fresh nonce
web3.eth.getTransactionCount(addressFrom).then(txCount => {

  // construct the transaction data
  const txData = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(6000000),
    gasPrice: web3.utils.toHex(10000000000), // 10 Gwei
    to: addressTo,
    from: addressFrom,
    data: encodedABI,
    value: ETH_ADDED
  }

  // fire away!
  sendSigned(txData, function(err, result) {
    if (err) return console.log('error', err)
    console.log('sent', result)
  })

})