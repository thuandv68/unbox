
const ExchangeNFT = require('./ExchangeNFT.json')
const KuniSaru = require('./KuniSaru.json')

const SaruBox = require('./SaruBox.json')

module.exports.TOKENS = {
  ExchangeNFT: { address: '0x28593a3c606be72e15688d35aecd0774e2bbc73e', abi: ExchangeNFT.abi },
  KuniSaru: { address: '0x5fa891e95c948288A376C92fbd3AFc83D488d5a8', abi: KuniSaru.abi },
  SaruBox: { address: '0xEe4c4626d8406807461377F594dfc55168292912', abi: SaruBox.abi },
}

module.exports.NETWORK = {
  url: 'https://bsc-dataseed.binance.org/',
  options: {
    chainId: 56,
    gas: 2100000, 
    gasPrice: 20000000000
  }
}

// 1648821600