const express = require('express');
const axios = require("axios").default;
const fs = require('fs');
const app = express();
const  port = 3000;
let tickString;

//Middleware
app.set('view engine', "ejs");
app.use(express.static("./public"));
//Routes

//root route
app.get('/', function (req, res) {
  res.send('Hello World')
  res.render('index',{ticker:tickString});
});

//boogers route
app.get('/midnight', function(req,res){
    res.render('index.ejs');

});

app.listen(port, function () {
    console.log("server is live on port:" + port)
});

// These 4 items will be inputs from DB/user
let symbolArray=['AAPL']//, 'AMZN', 'IBM', 'MSFT', 'AI', 'TSLA', 'HOG', 'FFIV', 'HELE', 'KALA', 'ROG']
let Xsymbol ;
let Xinterval = "1day";
let Xoutputsize = 30;

for(Xsymbol of symbolArray){
  Xsymbol;
  console.log(Xsymbol +" kale");
  Xinterval = "1day";
  Xoutputsize = 30;


var options = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/time_series',
  //'AAPL, AMZN, IBM, MSFT, AI, TSLA, HOG, FFIV, HELE, KALA, ROG'
  params: {symbol: Xsymbol, interval: Xinterval, outputsize: Xoutputsize, format: 'json'},
  headers: {
    'x-rapidapi-key': '30b20b11demshf65fd60638895c6p17e8ccjsn0b391d09b80f',
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
  }
};


axios.request(options).then(function (response) {
  write(JSON.stringify(response.data,null,2),Xsymbol);


  console.log(Xsymbol);


}).catch(function (error) {
    console.error(error);
  });
;}


  function write(writeThis,filename){
  fs.writeFileSync("./data/"+filename+'.json', writeThis, function(err) {
    if (err) {
       return console.error(err);
    }
    console.log("Data written successfully!");
       if (err) {
          return console.error(err);
       }
      });
  }
