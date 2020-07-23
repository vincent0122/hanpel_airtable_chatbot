const express = require('express');
const asyncify = require('express-asyncify');
const serverless = require('serverless-http');

const app = asyncify(express());
const apiRouter = express.Router();

const logger = require('morgan');
const bodyParser = require('body-parser');

const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keynCOHYwnnoQZDeB'}).base('appbTFRhBuji7NNco');

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/.netlify/functions/api', apiRouter);

apiRouter.post('/sayHello', async (req, res) => {

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();//
  
  var content = JSON.stringify(req.body.action.detailParams.type01_q01s01.origin); // "하나\n"
  var writer = JSON.stringify(req.body.userRequest.user.id);  // "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343"
  var pic = JSON.stringify(req.body.action.detailParams.pic.origin);
  
  var contents = content.replace(/\"/g, "");
  var wri = writer.replace(/\"/g, "");
  var pic2 = pic.replace(/\"/g, "");
  var pic2 = pic2.substring(5,pic2.length-1);
  //var pic2 = '"' + pic + '"';
  //var pic3 = JSON.stringify(req.body);

  switch (wri){
     case "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343" : 
        var wri2 = "임진강";
        break;
   }
  
  await base('영업').create({
    "Attachments": [{"url": pic2}], 
    "날짜": date,
     "작성자": wri2,
     "내용" : contents
      });  
  
 
  

    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: pic2
            }
          }
        ]
      }
    };
  
    res.status(200).send(responseBody);
   
    
});

apiRouter.post('/showHello', function(req, res) {
  console.log(req.body);
  //var x = JSON.stringify(req.body.);
  var x = JSON.stringify(req.body);
  //var yy = JSON.stringify(req.body.userRequest.user.id);  // "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343"
  //var y = JSON.stringify(req.body.action.detailParams.type01_q01s01.origin);  // "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343"
  var z = JSON.stringify(req.body.action.detailParams.pic.origin);
  
  const responseBody = {

    version: "2.0",
    template: {
      outputs: [
        {
          //simpleImage : {
          //  imageUrl: "https://t1.daumcdn.net/friends/prod/category/M001_friends_ryan2.jpg",
          //  altText: "HELLO"
          simpleText: {
            text: z
           
          }
        }
      ]
    }
  };

  res.status(200).send(responseBody);
});

module.exports.handler = serverless(app);
