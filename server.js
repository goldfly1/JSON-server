const express = require('express');
const app = express();
const  port = 3000;

//Middleware
app.set('view engine', "ejs");

//Routes

//root route
app.get('/', function (req, res) {
  res.send('Hello World')
});

//boogers route
app.get('/boogers', function(req,res){
    res.render('index.ejs');
});

app.listen(port, function () {
    console.log("server is live on port:" + port)
});

//stock data aggretion

var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/time_series',
  params: {symbol: 'AMZN', interval: '1day', outputsize: '30', format: 'json'},
  headers: {
    'x-rapidapi-key': '30b20b11demshf65fd60638895c6p17e8ccjsn0b391d09b80f',
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
  }
};
let obj={};

function stockData(){axios.request(options).then(function (response) {
  //console.log(response.data);
  {var strJSON = JSON.stringify(response.data);
    strJSON = strJSON.replace(/{"meta":/, "")
    strJSON = strJSON.replace(/}/, "")
    strJSON = strJSON.replace(/,"status":"ok"/, "")
    //console.log(( strJSON) );
    strJSON = JSON.parse(strJSON);
    //console.log(( strJSON) );
    //let x;
    //for (x in strJSON);{
      /*obj= {strJSON.symbol,strJSON.interval,strJSON.currency,strJSON.exchange_timezone,strJSON.exhange,strJSON.type,strJSON.values.datetime,strJSON.values.open,strJSON.values.high,strJSON.values.low,strJSON.values.close,strJSON.values.volume;}*/
    //}
    strJSON.values.forEach(function(element){
      obj= {symbol,interval,currency,exchange_timezone,exhange,type,datetime,open,high,low,close,volume}
  })
    console.log(obj);

  }

}).catch(function (error) {
	console.error(error);
});
}


//stockData("hog","10min","10","json");
stockData();{
console.log("piggy");
}
