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

function stockData(){axios.request(options).then(function (response) {
  console.log(response.data);
  {var strJSON = JSON.stringify(response.data);
    strJSON = strJSON.replace(/"},{"datetime":"/g, ",")
    strJSON = strJSON.replace(/","open":"/g, ",")
    strJSON = strJSON.replace(/","high":"/g, ",")
    strJSON = strJSON.replace(/","low":"/g, ",")
    strJSON = strJSON.replace(/","close":"/g, ",")
    strJSON = strJSON.replace(/","volume":"/g, ",")
    strJSON = strJSON.replace(/"},{"/g, ",")
    strJSON = strJSON.replace(/{"meta":{/g, "")
    strJSON = strJSON.replace(/"}],"status":"ok"}/g, "")
    console.log(( strJSON) );

    fs.writeFileSync('./StocksParsed.txt', strJSON, function (err) {
        console.log(err);
    });
    console.log("printed");
    }
}).catch(function (error) {
	console.error(error);
});





}


//stockData("hog","10min","10","json");
stockData();{
console.log("piggy");
}
