exports.helloWorld = (req, res) => {

  const MongoClient = require('mongodb').MongoClient;
  var id = parseInt(req.query.id);

  async function mongo(){
  const uri = "<mongodb-url>"; 
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });
  await client.connect();
  const collection = client.db("<db-name>").collection("<collection-name>");
  const query = { "tokenid": id };
  const metadata = await collection.findOne(query);
  console.log(metadata);
  res.send(metadata);
  client.close();
  }
  mongo();
};
