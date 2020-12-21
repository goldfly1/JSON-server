const express = require("express");
const axios = require("axios").default;
const fs = require("fs");
const app = express();
const port = 3000;
let sorted=[];

//Middleware
app.set("view engine", "ejs");
app.use(express.static("./public"));
//Routes

//root route
app.get("/", function (req, res) {
  fs.readFile("./data/sorted.json", function (err, data) {
    if (err) {
      console.log("Error while reading file " + err);
    }
    let sorted=(JSON.parse(data));
  });
  res.render("midnight",{  list: sorted } );
});

//midnight route
app.get("/midnight", function (req, res) {

  res.render("midnight.ejs", { news: newsfeed, list: sorted, ticker: tickString });
});
//listings route
app.get("/listings", function (req, res) {
  res.render("listings",{  list: sorted });
});
//accountabout route
app.get("/account", function (req, res) {
  res.render("account");
});
//about route
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(port, function () {
  console.log("server is live on port:" + port);
});

let buyList=[];
let sellList=[];
let nuetralList=[];
let Xsymbol=[];

  fs.readFile("./data/picks.json", function (err, data) {
    if (err) {
      console.log("Error while reading file " + err);
    }
    let jsonData=(JSON.parse(data));
    let jvDATA= jsonData.values;

    // Prepare the listings
    for (Xsymbol of jsonData){
      let listData={}
      listData.buy=Xsymbol.buy;
      listData.symbol=Xsymbol.symbol;
      listData.close=Xsymbol.data.close;
      listData.volume=Xsymbol.data.volume;
      if (listData.buy === 1){ buyList.push(listData)}
      else if (listData.buy === 2){ sellList.push(listData)}
        else if(listData.buy === 3){ nuetralList.push(listData) }

          console.log(buyList)
          console.log("kale was buying here")
          console.log(sellList)
          console.log("kale was selling here")
          console.log(nuetralList)
          console.log("kale was not here")
    }
    //The lists are ready to publish
    sorted=buyList.concat(sellList,nuetralList);
    console.log(sorted);


    fs.writeFileSync(
      "./data/sorted.json",
      JSON.stringify(sorted,null,2),
      (err) => {
        if (err) console.log("Error writing file:", err);
      }
    );
  });

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
