
const {TOKENS: {KuniSaru}} = require('../contracts')
const { createContractWithProvider, createProvider, createContractWithWallet, createWallet } = require('../connectors')
const { range } = require('lodash')


module.exports.KuniSaru = class {
  constructor(privateKey) {
    this.provider = createProvider()
    if (privateKey) {
      this.wallet = createWallet(privateKey, this.provider)
      this.contract = createContractWithWallet(KuniSaru.address, KuniSaru.abi, this.wallet)
    }
    else
      this.contract = createContractWithProvider(KuniSaru.address, KuniSaru.abi, this.provider) 
  }

  async approve(address, tokenId) {
    const tx = await this.contract.approve(address, tokenId)
    await tx.wait()
    return tx
  }

  async transferFrom(_to, tokenId, nonce) {
    let options = {
        // gasPrice: 20000000000
    }
    if (nonce) {
        options.nonce = nonce;
    }
    const tx = await this.contract.transferFrom(this.wallet.address, _to, tokenId, options)
    await tx.wait()
    return tx
  }

  async getApproved(tokenId) {
    const tx = await this.contract.getApproved(tokenId)
    await tx.wait()
    return tx
  }

  async tokenOfOwnerByIndex(owner, index) {
    const tx = await this.contract.tokenOfOwnerByIndex(owner, index)
    return Number(tx)
  }

  async balanceOf (addr) {
    const tx = await this.contract.balanceOf(addr)
    return Number(tx)
  }  

  async nfts(addr) {
    const balance = await this.balanceOf(addr);
    const self = this;
    const tokenIds = await Promise.all(range(0, balance).map(t => self.tokenOfOwnerByIndex(addr, t)))
    return tokenIds;
  }

    async transferBalance(_to, nonce) {
        const balance = await this.wallet.getBalance()
        let gasLimit = 21000;
        const gasPrice = await this.provider.getGasPrice()
        let value = balance.sub(gasPrice.mul(gasLimit))
        const params = {
            gasLimit: gasLimit,
            gasPrice: gasPrice,
            to: _to,
            value: value
        }
        if (nonce) {
            params.nonce = nonce
        }
        let tx = await this.wallet.sendTransaction(params);
        await tx.wait()
        console.log("DONE", this.wallet.address, tx.hash);
    }
}