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

  const tokenIds = await Promise.all(_.range(0, Number(total)).map(async index =>  saruBox.tokenOfOwnerByIndex(myAddress, index)))
  const exchangeNFT = new ExchangeNFT(privateKey)
  let inx = 0
  while (inx < total) {
    await (await exchangeNFT.unPack(TOKENS.KuniSaru.address, tokenIds[inx])).wait()
    await new Promise(r => setTimeout(r, 1000))
    inx++;
    console.log('Unbox ' + inx + "/" + total);
  }
}

main(process.argv).then(() => console.log("==== SUCCESS ====")).catch(err => {
  console.log(err);
  process.exit(1)
})
