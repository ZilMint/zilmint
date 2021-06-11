exports.helloWorld = async (req, res) => {

  const request = require('request');
  const fleekStorage = require('@fleekhq/fleek-storage-js');
  const fs = require('fs'); 
  const fetch = require('node-fetch');

  var chat_id = req.query.chat_id;
  var title = req.query.title;
  var description = req.query.description;
  var file_id = req.query.file_id;
  var user = req.query.address;
  var image;



  async function fleek(){
  var url = "https://api.telegram.org/bot<token>/getFile?file_id="+file_id+"";
  request.get(url, async (error, resp, body)  => {
  let json = JSON.parse(body);
  
  var filepath = "https://api.telegram.org/file/bot<token>/"+json.result.file_path+"";

  const response = await fetch(filepath);
  const buffer = await response.buffer();

  fs.writeFile('/tmp/data', buffer, () => 
  {});

    fs.readFile('/tmp/data', async (error, fileData) => {
    const uploadedFile = await fleekStorage.upload({
    apiKey: '<token>',
    apiSecret: '<token>',
    key: ''+file_id+'',
    data: fileData,});
   
    image = "ipfs://"+uploadedFile.hash+"";
    var url = "https://api.telegram.org/bot<token>/sendMessage?chat_id="+chat_id+"&text=Media Uploaded to IPFS";
    request.get(url);
    var url = "<mint-api-url>?user="+user+"&image="+image+"&name="+title+"&description="+description+"&chat_id="+chat_id+"";
    request.get(url);
    console.log(image);
    res.status(200).send();
    
  });
  });
  }

  fleek();

};
