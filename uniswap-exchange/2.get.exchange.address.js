// javascript:  query the new exchange contract address for given token contract

let fs = require("fs");
let Web3 = require("web3");
const HarryTokenAddress = '0x0a03DCb9B215f29528949Dd599C6A960bCdFD514'
const HRTOwnerAddress = '0x368625Db23Acbc91d23521A43EB19EB5855402bd'
const UniswapFactoryAddress = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36'

var abi = '[{"name":"NewExchange","inputs":[{"type":"address","name":"token","indexed":true},{"type":"address","name":"exchange","indexed":true}],"anonymous":false,"type":"event"},{"name":"initializeFactory","outputs":[],"inputs":[{"type":"address","name":"template"}],"constant":false,"payable":false,"type":"function","gas":35725},{"name":"createExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":false,"payable":false,"type":"function","gas":187911},{"name":"getExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":true,"payable":false,"type":"function","gas":715},{"name":"getToken","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"exchange"}],"constant":true,"payable":false,"type":"function","gas":745},{"name":"getTokenWithId","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"uint256","name":"token_id"}],"constant":true,"payable":false,"type":"function","gas":736},{"name":"exchangeTemplate","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":633},{"name":"tokenCount","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":663}]'

var token = HarryTokenAddress;
var address = UniswapFactoryAddress;
const account = HRTOwnerAddress;
let web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/26763e533f734041b01ddfc8c90d8824"));
const uniswap = new web3.eth.Contract(JSON.parse(abi), address);

async function call(transaction) {
    return await transaction.call({from: account});
}

async function getTokenExchange() {
    let exchange = await call(uniswap.methods.getExchange(token));
    console.log("the exchange address for ERC20 token is:" + exchange)
}
getTokenExchange()