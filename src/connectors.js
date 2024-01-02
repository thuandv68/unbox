const { ethers, Wallet } = require('ethers');
const { NETWORK } = require('./contracts')


function createProvider() {
  return new ethers.JsonRpcProvider(NETWORK.url, NETWORK.options.chainId)
}

function createContractWithWallet(contractAddress, abi, wallet) {
  return new ethers.Contract(contractAddress, abi,  wallet)
}

module.exports.createProvider = createProvider
module.exports.createContractWithWallet = createContractWithWallet
module.exports.createContractWithPrivateKey = (contractAddress, abi, privateKey) => {
  const provider = createProvider()
  const wallet = new Wallet(privateKey, provider)
  return new ethers.Contract(contractAddress, abi,  wallet)
}
module.exports.createContractWithProvider = function(contractAddress, abi, provider) {
  return new ethers.Contract(contractAddress, abi,  provider)
}

module.exports.createWallet = function(privateKey, provider) {
  return new Wallet(privateKey, provider)
}

