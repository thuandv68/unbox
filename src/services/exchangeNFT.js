
const {TOKENS: {ExchangeNFT}} = require('../contracts')
const { createContractWithProvider, createProvider, createContractWithWallet, createWallet } = require('../connectors')


module.exports.ExchangeNFT = class {
  constructor(privateKey) {
    this.provider = createProvider()
    if (privateKey) {
      this.wallet = createWallet(privateKey, this.provider)
      this.contract = createContractWithWallet(ExchangeNFT.address, ExchangeNFT.abi, this.wallet)
    }
    else
      this.contract = createContractWithProvider(ExchangeNFT.address, ExchangeNFT.abi, this.provider) 
  }

  async unPack (nftContract, tokenId) {
    const tx = await this.contract.unPack(nftContract, tokenId)
    await tx.wait()
    return tx
  }
}