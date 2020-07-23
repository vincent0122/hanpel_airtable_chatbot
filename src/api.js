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
  var content = JSON.stringify(req.body.userRequest.utterance); // "하나\n"
  var content = content.substring(1,content.length-3);
  var writer = JSON.stringify(req.body.userRequest.user.id);  // "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343"

  switch (writer){
     case "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343" : 
        var wri = "임진강";
        break;
   }
  
  await base('영업').create({
     "날짜": date,
     "작성자": wri,
     "내용" : content
      });  
  
 
  

    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "입력되었습니다"
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
  var x = JSON.stringify(req.body.userRequest.utterance);
  var y = JSON.stringify(req.body.userRequest.user.id);  // "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343"
  //var y = JSON.stringify(req.body);  // "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343"
  
  const responseBody = {

    version: "2.0",
    template: {
      outputs: [
        {
          //simpleImage : {
          //  imageUrl: "https://t1.daumcdn.net/friends/prod/category/M001_friends_ryan2.jpg",
          //  altText: "HELLO"
          simpleText: {
            text: y 
           
          }
        }
      ]
    }
  };

  res.status(200).send(responseBody);
});

module.exports.handler = serverless(app);
