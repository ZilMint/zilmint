exports.helloWorld = async (req, res) => {
  const MongoClient = require('mongodb').MongoClient;
  var id = Math.floor(Math.random()*899999999999+100000000000);
  var url = "<tokenuri-api-url>?id="+id+"";
  const request = require('request');

  const {BN, Long, bytes, units} = require('@zilliqa-js/util');
  const {Zilliqa} = require('@zilliqa-js/zilliqa');
  const {
    fromBech32Address,
    toBech32Address,
    getAddressFromPrivateKey,
} = require('@zilliqa-js/crypto');
  

  async function main() {
    const zilliqa = new Zilliqa('https://dev-api.zilliqa.com');
    const CHAIN_ID = 333;
    const MSG_VERSION = 1;
    const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);
    privkey = '<private key>';
    zilliqa.wallet.addByPrivateKey(
        privkey
    );
    const address = fromBech32Address(req.query.user);
    const myGasPrice = units.toQa('2000', units.Units.Li);

    const nftAddr = toBech32Address("<nft-contract-address>");
    try {
        const contract = zilliqa.contracts.at(nftAddr);
        const callTx = await contract.callWithoutConfirm(
            'Mint',
            [
                {
                    vname: 'to',
                    type: 'ByStr20',
                    value: `${address}`,
                },
                {
                    vname: 'token_uri',
                    type: 'String',
                    value: `${url}`,
                }
            ],
            {
                // amount, gasPrice and gasLimit must be explicitly provided
                version: VERSION,
                amount: new BN(0),
                gasPrice: myGasPrice,
                gasLimit: Long.fromNumber(25000),
            }
        );

        const confirmedTxn = await callTx.confirm(callTx.id);

        var link = "https://viewblock.io/zilliqa/tx/0x"+callTx.id+"?network=testnet";
        var telegramurl = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+req.query.chat_id+"&text=Your image has been minted as an NFT on Zilliqa testnet. \n\n"+link+"";
        request.get(telegramurl);
        res.send({"Transaction":link});

    } catch (err) {
        console.log(err);
    }
}


  async function mongo(){
  const uri = "<mongodb-url>"; 
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  await client.connect();
  const collection = client.db("<db-name>").collection("<collection-name>");
  const result = await collection.insertOne({tokenid:id,image:req.query.image,name:req.query.name,description:req.query.description});
  client.close();
  main();
  }
  mongo();
};
