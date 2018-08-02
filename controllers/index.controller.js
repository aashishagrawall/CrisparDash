


var path  = require('path');
var request=require('request');
var http=require('http');
var passport=require('passport');








exports.homePage=function (req,res) {
  res.json(req.user);

	//res.sendFile(path.join(__dirname, '../public', 'index.html'));
	// body...
}
exports.homePage2=function (req,res) {

	 res.sendFile(path.join(__dirname, '../public', 'hello.html'));
	// body...
}

exports.dashboard=function (req,res) {

	 res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
	// body...
}

exports.someData=function(req,res){

	res.json("someData");
}

exports.verifyAdminDetails=function(req,res){
	console.log(req.params);
  //res.redirect('/');
	
   var string="http://139.59.13.122/api/user/verifyAdmin/" + req.params.username + "/" + req.params.password;
   console.log(string);
   http.get(string, (resp) => {
    let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {

    var resObj=JSON.parse(data);
   
    if(resObj.status==1){
        res.json(resObj);

    }else{
      
       req.login(resObj.user.id,function(err){
        if(!err){
           res.json(resObj);
           
          
        } 
     

    })

    }
   

   
    //console.log(JSON.parse(data));
  
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

}

passport.serializeUser(function(user_id,done){
  done(null,user_id);
})

passport.deserializeUser(function(user_id,done){
  done(null,user_id);
})

exports.getAllOrder=function(req,res){



   var string="http://139.59.13.122/api/restaurant/" + req.user + "/orders";
   http.get(string, (resp) => {
    let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    //console.log(JSON.parse(data));
    res.json(JSON.parse(data));
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});



}

exports.getAllTable=function(req,res){



	 var string="http://139.59.13.122/api/restaurant/" + req.user + "/tables";
   http.get(string, (resp) => {
    let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    //console.log(JSON.parse(data));
    res.json(JSON.parse(data));
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});



}

