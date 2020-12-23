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
let symbolArray=['AAPL', 'AMZN', 'IBM', 'MSFT', 'AI', 'TSLA', 'ROG', 'FFIV', 'HELE', 'KALA', 'HOG']
let Xsymbol ;
let Xinterval = "1day";
let Xoutputsize = 30;
let dataArray= [];
let x =0;

function getData() {axios.request(options).then(function (response) {

    dataArray.push(response.data)

  if (symbolArray.length===dataArray.length){
    for (Xsymbol of dataArray){
  fs.writeFileSync("./data/"+Xsymbol.meta.symbol+".json", JSON.stringify(Xsymbol,null,2), function(err) {

  if (err) {
       return console.error(err);
    }
    console.log("Data written successfully!");
       if (err) {
          return console.error(err);
       }
      });}}

  console.log(Xsymbol);


}).catch(function (error) {
    console.error(error);
  });
;}


  function write(writeThis,filename){
  fs.writeFile("./data/"+filename+'.json', writeThis, function(err) {
    if (err) {
       return console.error(err);
    }
    console.log("Data written successfully!");
       if (err) {
          return console.error(err);
       }
      });
  }


  for(Xsymbol of symbolArray){
    Xsymbol;
    console.log(Xsymbol +" kale");
    Xinterval = "1day";
    Xoutputsize = 30;
  
  
  var options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/time_series',
    params: {symbol: Xsymbol, interval: Xinterval, outputsize: Xoutputsize, format: 'json'},
    headers: {
      'x-rapidapi-key': '30b20b11demshf65fd60638895c6p17e8ccjsn0b391d09b80f',
      'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
    }
  };
 getData();

}