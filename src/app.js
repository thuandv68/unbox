const { SaruBox } = require('./services/saruBox');
const { ExchangeNFT } = require('./services/exchangeNFT');
const { TOKENS } = require('./contracts');
const _ = require('lodash')


async function main(params) {
  let privateKey = ''
  if (params && params.length > 2) {
    privateKey = params[2]
  }
  if (!privateKey) {
    console.error("Input privateKey")
    process.exit(1);
  }
  const saruBox = new SaruBox(privateKey)
  const myAddress = saruBox.wallet.address
  console.log("UNPACK Wallet "+ myAddress);
  const total = await saruBox.balanceOf(myAddress)
  console.log("total box: ", Number(total));
  if (!(await saruBox.isApprovedForAll(myAddress, TOKENS.ExchangeNFT.address))) {
    await (await saruBox.setApprovalForAll(TOKENS.ExchangeNFT.address)).wait()
  }
  _.range(0, Number(total)).forEach(async index => {
    const tokenId = await saruBox.tokenOfOwnerByIndex(myAddress, index)
    const exchangeNFT = new ExchangeNFT(privateKey)
    await (await exchangeNFT.unPack(TOKENS.KuniSaru.address, tokenId)).wait()
    await new Promise(r => setTimeout(r, 1000))
  })
}

main(process.argv).then(() => console.log("==== SUCCESS ====")).catch(err => {
  console.log(err);
  process.exit(1)
})
