var express = require('express');
var mysql = require('mysql');
var bodyParser= require('body-parser');
var server =express();
const session=require('express-session');
var passwordHash = require('password-hash');


server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("public"));
server.listen(8080);

const TWO_HOURS = 1000*60*60*2
const {
  NODE_ENV='development',
  SESS_NAME='sid',
  SESS_SECRET='bouh',
  SESS_LIFETIME=TWO_HOURS,
}=process
const IN_PROD=NODE_ENV==='production'

//session
server.use(session({
  name:SESS_NAME,
  resave:false,
  saveUninitialized:false,
  secret:SESS_SECRET,

  cookie:{
    maxAge:SESS_LIFETIME,
    sameSite:true,
    secure:IN_PROD
  }
}))

const redirection= (req ,res,next)=>{
  if(!req.session.user){
    res.redirect('/profil')
  }else{
    next()
  }
}


function db_connect(){
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : ''
    // database : 'epitech'
  });
  connection.connect((err) => {
  if(err){
    throw err;

  }
  console.log("connexion établie");
  //console.log('MySql Connected...');
});
return connection
}

 var db=db_connect();
 create_bdd();

 function create_bdd(){
   db.query("CREATE DATABASE IF NOT EXISTS "+ "epitech1"+ ";",
 function(err,res,fields){
   if (err) throw err;
   db.query("USE " + "epitech1" + ";", function(err, results, fields) {
     if (err) throw err;
 });
 db.query(
   "CREATE TABLE IF NOT EXISTS `profil` (`Name` VARCHAR(255) NOT NULL,`Company_name` VARCHAR(255) NOT NULL,`Email` VARCHAR(255) NOT NULL,`Telephone` INT NOT NULL,`Password` varchar(255) ,PRIMARY KEY (`Email`));",
     function(err, results, fields) {
       if(err)throw err;
     })
 })
}

function insert_User(a,b,c,d,e){



  var Name=arguments[0];
  var Company=arguments[1];
  var Email=arguments[2];
  var Telephone=arguments[3];
  var password=arguments[4];

  var hashedPassword = passwordHash.generate(password);
  var data=[Name,Company,Email,Telephone,hashedPassword]

  db.query('INSERT INTO profil SET Name=?,Company_name=?,Email=?,Telephone=?,Password=?',data,(err,profil,field)=>{
      if(err) console.log(err);
  })

  db.query('SELECT * from profil',function(err,res,fields){
    if(err) throw err;
    console.log(res);
  })
};


server.get('',function(req,res){
res.sendFile(__dirname+'/profil.html');
});

server.get('/Accueil',function(req,res){
  if(!req.session.user)res.redirect('/profil');
})
// server.post('/Accueil',function(req,res){
//   res.render('/Accueil.ejs',{user :req.body.})
// })

server.post('/profil',function(req,res){
  insert_User(req.body.Name,req.body.Company_name,req.body.email,req.body.Tel,req.body.password);
  res.render('Accueil.ejs',{user : req.body.Name});
});

server.get('/profil',function(req,res){
  res.sendFile(__dirname+'/profil.html');
});

server.get('/deconnexion',function(req,res){
  req.session.destroy(function(err) {
    res.redirect('/profil');
  })
})

server.get('/connexion',function(req,res){
  res.sendFile(__dirname+'/connexion.html');
});

server.post('/connexion',function(req,res){
  //db.query('SELECT Name,Password FROM profil WHERE Password=? && Email=?',[req.body.password,req.body.email])
  db.query('SELECT Name,password FROM profil WHERE Email=?',[req.body.email],(err,profil,field)=>{
    if (err) throw err;
    hashedPassword=profil[0].password;
    if(passwordHash.verify(req.body.password,hashedPassword)){

      req.session.user=req.body.email
      return res.render('Accueil.ejs',{user :profil[0].Name});
    }else{
      res.redirect('/connexion');
    }
  })
})
