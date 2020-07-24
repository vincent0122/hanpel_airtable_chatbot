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
  var pic3 = pic2.substring(5,pic2.length-1);
  var pu = pic3.split(',');
  var pu2  = ["\"\"","\"\"","\"\"","\"\"","\"\"","\"\"","\"\"","\"\""];
  
  for (i=0 ; i<pu.length; i++)
   {
     pu2[i] = pu[i];
   };

  switch (wri){
     case "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343" : 
        var wri2 = "임진석";
        break;
     
      case "4f7a76d5ca088a897215c06004e3c9ef729b0af9b6d2e682c3abfea680c3114b28" : 
        var wri2 = "임진강";
        break;
      
      case "44ad8cc1cfa54644ca2b31d066884fe56e6e7f62e874f88d3d2b9031f286a7404b" : 
        var wri2 = "나준호";
        break;
      
      case "1cf2d917e4daaf63a762a8cb1db925e0bc70559fa1bf9e1fc5bdb6fb5a426f8e30" : 
        var wri2 = "정소영";
        break;
      
      case "7ade03d9eb16a38f45cc8f5855a368ad6a755f8480d80f794fee2631732514e1c0" : 
        var wri2 = "송혜주";
        break;
      
      case "66403b9819685f49eb67931a9d6ac55cde1cd5107fc47c33ee04d3b2ae710348b5" : 
        var wri2 = "이선화";
        break;
      
      case "13ee3d86de309d4ba5bc27f1fe8809747caac66c710e60f0dd5ad65d9dd36f125b" : 
        var wri2 = "추승혜";
        break;
      
      case "37f5153c8f36e0fe585605f71d2cf07ab609d58d2ad8b0e3d458b2f50b3bdb6778" : 
        var wri2 = "심동현";
        break;
      
      case "" : 
        var wri2 = "임진아";
        break;
      
      case "" : 
        var wri2 = "강대현";
        break;
      
   }
  
  await base('영업').create({
    "Attachments": [
      
      {"url": pu2[0]},
      {"url": pu2[1]},
      {"url": pu2[2]},
      {"url": pu2[3]},
      {"url": pu2[4]},    
    ], 
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
              text: "입력되었습니닷!"
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
  //var x = JSON.stringify(req.body);
  //var yy = JSON.stringify(req.body.userRequest.user.id);  // "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343"
  //var y = JSON.stringify(req.body.action.detailParams.type01_q01s01.origin);  // "2c2e571aa09087b61c573115011b68b41683e3634ca15ee80f7fb14c44765c4343"
  //var z = JSON.stringify(req.body.action.detailParams.pic.origin);
  var x = JSON.stringify(req.body.userRequest.user.id);
  
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
