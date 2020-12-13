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
var fs = require("fs");
var options = {
  method: 'GET',
  url: 'https://twelve-data1.p.rapidapi.com/time_series',
  params: {symbol: 'ibm', interval: '1day', outputsize: '5', format: 'json'},
  headers: {
    'x-rapidapi-key': '30b20b11demshf65fd60638895c6p17e8ccjsn0b391d09b80f',
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com'
  }
};
stockData(
axios.request(options).then(function (response) {
  //console.log((response.data) );
  const parsedJSON = JSON.stringify(response.data);

    {fs.writeFileSync('./StocksParsed.txt', parsedJSON, function (err) {
        console.log(err);
    });
    console.log("printed");
    }

  //console.log(( parsedJSON) );

  /*for( let prop in parsedJSON ){
    console.log( prop);
    Object.keys(parsedJSON).forEach(item => console.log(item))
}*/
}).catch(function (error) {
	console.error(error + "kale");
}));
//stockData("hog","10min","10","json");
function stockData(){
console.log("piggy");
}