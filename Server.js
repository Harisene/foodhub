var http = require('http');
var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');

var ShopDetails = require('./ShopDetails.js');
var Items = require('./Items.js');
var CustomerDetails = require('./CustomerDetails.js');
var shopSearch = require('./Find_from_shop_location');
//var Register = require('./Register');
//store the express in a variable 
var app = express();

//configure body-parser for express

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
/*

var CustomerDetails = require('./CustomerDetails');
var ShopDetails = require('./ShopDetails');
var Register = require('./Register');
 *//*
var server = http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type': 'application.json'});
 
var path = url.parse(req.url).pathname;
switch(path){
            case '/customerdetails':
            CustomerDetails.customerdetails(req,res);
            break;

            case '/shopdetails':
            ShopDetails.shopdetails(req,res);
            break;

            case '/register':
            Register.register(req,res);
            break;
            
}


  })
  */

var shoplocation;
var foodName;



 app.get('/shopdetails',function(req,res){
  ShopDetails.shopdetails(req,res);
  
});


app.get('/customerdetails',function(req,res){
  CustomerDetails.customerdetails(req,res);
 
});

app.post('/takeshop',function(req,res){
  var shop=req.body.shop; 
  console.log("user selected shop is "+shop);    
});


  app.post('/register',function(req,res){
    var email=req.body.email;
    var username=req.body.username;
    var password = req.body.password;
    console.log("email = "+email+", username is "+username+",password is "+password);    
  });

  app.post('/shopLocation',function(req,res){
    shoplocation=req.body.shopLocation; 
    shopSearch.shopsearch(shoplocation,foodName,res);
    console.log(foodName); 
    //shopSearch.shopsearch(shopLocation,res);
     
  });
  
  app.post('/foodtype',function(req,res){
    var foodName=req.body.foodName;     
    shopSearch.shopsearch(shoplocation,foodName,res);
        console.log(foodName); 
    //shopSearch.shopsearch(shopLocation,res);
     
  });
   /*
  app.post('/selected_shop_name',function(req,res){
    selected_shop_name=req.body.selected_shop_name; 
   
    console.log(selected_shop_name);    
  });*/
  
app.post('/items',function(req,res){
var id = req.body.shop_id;
console.log(id);
  Items.items(id,res);
});
   
app.listen(3000,function(){
  console.log("listining...");
});

