const chainlist = [{"chain":"ada","name":"Cardano"},{"chain":"ar","name":"Arweave"},{"chain":"arbitrum","name":"Arbitrum"},{"chain":"asm","name":"ASM"},{"chain":"atom","name":"Cosmos"},{"chain":"aurora","name":"Aurora"},{"chain":"avax_c","name":"AVAX-C"},{"chain":"avax_x","name":"AVAX-X"},{"chain":"bch","name":"smartBCH"},{"chain":"bgh","name":"BGH"},{"chain":"bhp","name":"bhp"},{"chain":"bnb","name":"BSC"},{"chain":"boba","name":"Boba Network"},{"chain":"btc","name":"Bitcoin"},{"chain":"btt","name":"BitTorrent"},{"chain":"celo","name":"Celo"},{"chain":"ckb","name":"Nervos CKB"},{"chain":"ckbl2","name":"Nervos CKB EVM"},{"chain":"clo","name":"Callisto Mainent"},{"chain":"cmp","name":"Caduceus"},{"chain":"cro","name":"Crypto.com"},{"chain":"crol2","name":"Cronos"},{"chain":"cspr","name":"Casper"},{"chain":"cube","name":"CUBE"},{"chain":"czz","name":"ClassZZ"},{"chain":"dash","name":"Dash"},{"chain":"doge","name":"DOGE"},{"chain":"dot","name":"Polkadot"},{"chain":"dscc","name":"New Dimension"},{"chain":"dscc1","name":"Dimension"},{"chain":"egld","name":"Elrond"},{"chain":"eos","name":"EOS"},{"chain":"etc","name":"Ethereum Classic"},{"chain":"eth","name":"Ethereum"},{"chain":"evm","name":"evm"},{"chain":"fil","name":"Filecoin"},{"chain":"fio","name":"FIO"},{"chain":"fra","name":"fra"},{"chain":"ftm","name":"Fantom"},{"chain":"fuse","name":"Fuse"},{"chain":"gt","name":"GateChain"},{"chain":"hbc","name":"HBC"},{"chain":"ho","name":"HALO"},{"chain":"ht","name":"Heco"},{"chain":"htdf","name":"htdf"},{"chain":"icp","name":"Internet Computer"},{"chain":"inj","name":"Injective Protocol"},{"chain":"iost","name":"IOST"},{"chain":"iotx","name":"IoTeX"},{"chain":"kai","name":"KAI"},{"chain":"kcs","name":"KCC"},{"chain":"khc","name":"KHC"},{"chain":"klay","name":"KLAY"},{"chain":"lat","name":"PlatON"},{"chain":"lgcy","name":"LGCY Network"},{"chain":"lucky","name":"Lucky Chain"},{"chain":"luna","name":"Terra Classic"},{"chain":"lunav2","name":"Terra"},{"chain":"matic","name":"Polygon"},{"chain":"mtr","name":"Meter Mainnet"},{"chain":"near","name":"Near"},{"chain":"neo","name":"neo"},{"chain":"nuls","name":"nuls"},{"chain":"okt","name":"OEC"},{"chain":"one","name":"Harmony"},{"chain":"ont","name":"ont"},{"chain":"optimism","name":"Optimism"},{"chain":"plugcn","name":"Plug Chain"},{"chain":"qtum","name":"Qtum"},{"chain":"scdo","name":"SCDO"},{"chain":"sgb","name":"SGB"},{"chain":"sol","name":"Solana"},{"chain":"sys","name":"sys"},{"chain":"tomo","name":"TomoChain"},{"chain":"true","name":"TRUE"},{"chain":"trx","name":"Tron"},{"chain":"ulam","name":"ulam"},{"chain":"usdt","name":"usdt"},{"chain":"vlx","name":"Velas"},{"chain":"vs","name":"vs"},{"chain":"wax","name":"WAX"},{"chain":"wicc","name":"wicc"},{"chain":"xdai","name":"xDai"},{"chain":"yta","name":"Yotta"},{"chain":"zks","name":"zkSync"},{"chain":"ztb","name":"ZSC"}]

export function getChainName(coin) {
  let find = chainlist.find(item => item.chain == coin)
  return find?.name
}

export function getChainListName(coins) {
  let find = ''
  let list = coins.split(',')
  if (list.length > 0) {
    list.map(coinName => {
      if (find) {
        find += ','
      }
      find += getChainName(coinName)
    })
  }
  return find
}