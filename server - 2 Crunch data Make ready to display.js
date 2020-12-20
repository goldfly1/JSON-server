const express = require("express");
const axios = require("axios").default;
const fs = require("fs");
const app = express();
const port = 3000;

//Middleware
app.set("view engine", "ejs");
app.use(express.static("./public"));
//Routes

//root route
app.get("/", function (req, res) {
  res.send("Hello World");
  res.render("index", { ticker: tickString, news: newsfeed, sort: pickem });
});

//midnight route
app.get("/midnight", function (req, res) {
  res.render("index.ejs");
});

app.listen(port, function () {
  console.log("server is live on port:" + port);
});

//stock data open and calculate

// These 4 items will be inputs from DB/user
let symbolArray = [
  "AAPL","AAPL1",
  "AMZN","AMZN1",
  "IBM","IBM1",
  "MSFT","MSFT1",
  "AI","AI1",
  "TSLA","TSLA1",
  "HOG","HOG1",
  "FFIV","FFIV1",
  "HELE","HELE1",
  "KALA","KALA1",
  "ROG","ROG1",
];
let Xsymbol = [];
//These are here for future use
//let Xinterval = "1day";
//let Xoutputsize = 30;
let x = 0;
let counter=0;


sortem=[];
for (Xsymbol of symbolArray) {
  fs.readFile("./data/" + Xsymbol + ".json", function (err, data) {
    let pickem={};
    let jsonData=(JSON.parse(data));
    let jvDATA= jsonData.values;
    // Make the calculations and append it to the array
    pickem.buy = jvDATA[0].close > jvDATA[4].close &&
                      jvDATA[4].close > jvDATA[19].close ?  1 :// BUY
        pickem.buy = jvDATA[0].close < jvDATA[4].close && // SELL
                          jvDATA[4].close < jvDATA[19].close ?  2  : 3;// NEUTRAL

                          pickem.symbol= jsonData.meta.symbol;
                          pickem.data = jvDATA[x];

    sortem.push(pickem);
    if (Xsymbol==="ROG1") {sortem.sort();}







    if (err) {
      console.log("Error while reading file " + err);
    }
    fs.writeFileSync(
      "./data/Picks.json",
      JSON.stringify(sortem,null,2),
      (err) => {
        if (err) console.log("Error writing file:", err);
      }
    );
  });
}
/*  as you read file act on data   build sorted arrays of picked (buy or sell) stocks  OR display news / tickers    */
/* end of data close file /stream   */
/*    user buttons to accept stock picks  */
/*    check boxes to pick stocks  */
/*    ul for stock recommendations  */
/*    ul for stock list  */
/*    ul for news  */
/*    string for scrolling ticker  */
/*      */
/*    data storage for
      user info/stock portfolio/watch list
      server side  */
/*    track portfolio ups and downs  */
/*    track watchlist ups and downs  */
/*      */
/*      */

//function ticker(symbol,open,last){

//stockTicker();
/*it's a string crawling across the div when it gets long enough start clipping off it's nose*/

// }}
// function picks(symbol,name,weekly){
/* USE S&P 500 I GUESS
  Reommendations once per load. They are weekly after all

  read info      if it is up for the month and up for the week it is a buy
  if both are down it's a sell
  
  feed the first 5 or 10 lines to the Top Picks list on home page
  the rest go on the marketSheet page.
  
  on the home page they should each have a blurbLine  LOREM will do.
  
  when viewed individually the stock should have a blurbLine
  
  obj has ticker name buy/sell/nothing   blurb
  */
//  }

// function news(line){
/* news feed every 3=30? minutes
  read lines into object    object into array
  replace on news div every 30 seconds
  REMEMBER TOAST*/

// }
// function client(name){
/* kinda static kinda not
  client info obj    fName lName id# address email(s) phone(s)
  
  client portfolio obj id#   stock when bought  price when bought    current price
  
  clent watch obj id#   stock when picked  price when picked    current price
  
  acount obj     cash balance   value of portfolio   value of pseudo portfolio

  the system is a client and has it's own account with it's own portfolio of ALL THORETICAL trades*/
// }

/* function tickerData("hog","1day","30","json")

         tickerObjArray.push getData();
         tickerListArray = "IBM", "MSFT", "AI", "TSLA", "HOG", "NPM", "FFIV", "HELE", "KALA", "ROG",;
         Run the ticker use a string;
  }*/

//*End Function Declarations*//
