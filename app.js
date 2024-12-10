var express = require('express');//express package that we imported
const { MongoDBCollectionNamespace } = require('mongodb');
var path = require('path');//path package
var app = express();//initiation for the express web server
//(we will use when we implement any function)

app.set('views', path.join(__dirname,'views'));//all html files in views folder
app.set('view engine','ejs');//extension of the html files

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));
//the public folder will contain all static files(images and videos)

//To connect mongodb to our nodejs code
var MongoClient = require('mongodb').MongoClient;//import the mongodb installed

MongoClient.connect("mongodb://127.0.0.1:27017", function(err,client){//port # => one found in mongodb when establlishing a connection
    if(err) throw error;
    var db = client.db('myDB');//type the database name
    db.collection('FirstCollection').insertOne({id:1,firstName: 'Hana',lastName: 'Ayman'});//type the collection name
    //this line adds an object(record) to our db 
    db.collection('FirstCollection').find().toArray(function (err, results){
        console.log(results);//find all records, converting them to an array and displaying them.
    });
});
//get requests
app.get('/',function(req,res){
    res.render('login')
});

app.get('/registration',function(req,res){
    res.render('registration');
});

app.get('/annapurna',function(req,res){
    res.render('annapurna');
});

app.get('/bali',function(req,res){
    res.render('bali');
});

app.get('/cities',function(req,res){
    res.render('cities');
});

app.get('/hiking',function(req,res){
    res.render('hiking');
});

app.get('/home',function(req,res){
    res.render('home');
});

app.get('/islands',function(req,res){
    res.render('islands');
});

app.get('/inca',function(req,res){
    res.render('inca');
});

app.get('/paris',function(req,res){
    res.render('paris');
});

app.get('/registration',function(req,res){
    res.render('registration');
});

app.get('/rome',function(req,res){
    res.render('rome');
});

app.get('/santorini',function(req,res){
    res.render('santorini');
});

app.get('/searchresults',function(req,res){
    res.render('searchresults');
});

app.get('/wanttogo',function(req,res){
    res.render('wanttogo');
});


//post requests
// app.post('/registration',function(req,res){
//     var username = req.body.username;
//     var password = req.body.password;

// });

app.listen(3000);//we are telling the express server to receive the requests coming to the local host on port # 3000