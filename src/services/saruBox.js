
const {TOKENS: {SaruBox}} = require('../contracts')
const { createContractWithProvider, createProvider, createContractWithWallet, createWallet } = require('../connectors')


module.exports.SaruBox = class {
  constructor(privateKey) {
    this.provider = createProvider()
    if (privateKey) {
      this.wallet = createWallet(privateKey, this.provider)
      this.contract = createContractWithWallet(SaruBox.address, SaruBox.abi, this.wallet)
    }
    else
      this.contract = createContractWithProvider(SaruBox.address, SaruBox.abi, this.provider) 
  }

  async approve(address, tokenId) {
    const tx = await this.contract.approve(address, tokenId)
    await tx.wait()
    return tx
  }


  isApprovedForAll(addr, operator) {
    return this.contract.isApprovedForAll(addr, operator);
  }

  setApprovalForAll(operator) {
    return this.contract.setApprovalForAll(operator, true, {
      gasPrice: 3000000005n
    })
  }

  async tokenOfOwnerByIndex(owner, index) {
    const tx = await this.contract.tokenOfOwnerByIndex(owner, index)
    return Number(tx)
  }

  async getApproved(tokenId) {
    const tx = await this.contract.getApproved(tokenId)
    return tx
  }

  balanceOf(address) {
    return this.contract.balanceOf(address)
  }
}
