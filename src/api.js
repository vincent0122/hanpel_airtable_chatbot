const express = require('express');
const serverless = require('serverless-http');

const app = express();
const apiRouter = express.Router();

const logger = require('morgan');
const bodyParser = require('body-parser');

const Airtable = require('airtable');
const base = new Airtable({apiKey: 'keynCOHYwnnoQZDeB'}).base('appxIyPS5VeOEsoEX');

app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/.netlify/functions/api', apiRouter);
var aaa = "test";

apiRouter.post('/sayHello', function(req, res) {
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: aaa
          }
        }
      ]
    }
  };

  res.status(200).send(responseBody);

    base('test').create({
      "이름": "가",
      "내용": "나"
    }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
    });  
});

apiRouter.post('/showHello', function(req, res) {
  console.log(req.body);
  var x = JSON.stringify(req.body);
  //var x = JSON.stringify(req.body.action.detailParams.value);
  
  const responseBody = {

    version: "2.0",
    template: {
      outputs: [
        {
          //simpleImage : {
          //  imageUrl: "https://t1.daumcdn.net/friends/prod/category/M001_friends_ryan2.jpg",
          //  altText: "HELLO"
          simpleText: {
            text: x
           
          }
        }
      ]
    }
  };

  res.status(200).send(responseBody);
});

module.exports.handler = serverless(app);