import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 
import session from 'express-session';
import { MongoClient } from 'mongodb';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 

//the public folder will contain all static files(images and videos)

//To connect mongodb to our nodejs code
const uri = "mongodb://localhost:27017/"; 
const client = new MongoClient(uri);

await client.connect();
const database = client.db('myDB'); 
const collection = database.collection('myCollection');

//trial
const result = await collection.insertOne({username:'Hana.Ayman',password:'hanoon33',wanttogo:[]});    

client.close();

const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body>
        <div id="Annapurna"></div> 
      </body>
    </html>
  `);
const document = dom.window.document; 

const list = document.getElementById('wanttogo_list');

const annapurna = document.getElementById('Annapurna');
annapurna.addEventListener('click', () => {
    collection.find({
        username:document.getElementsByName("username"),
        password:document.getElementsByName("password"),
        wanttogo:document.getElementsByName("wtg")
    });

    const text = document.createElement('div');
    text.textContent("Annapurna");
    const item = document.createElement('li');
    item.append(text);
    list.append(item);

    collection.updateOne({
        username:document.getElementsByName(username),
        password:document.getElementsByName(password)},
        {$push:{wanttogo:"Annapurna"}});
});

const bali = document.getElementById('Bali');

annapurna.addEventListener('click', () => {
    const text = document.createElement('div');
    text.textContent("Bali");
    const item = document.createElement('li');
    item.append(text);
    list.append(item);

    collection.updateOne({
        username:document.getElementsByName(username),
        password:document.getElementsByName(password)},
        {$push:{wanttogo:"Bali"}});
});

const inca = document.getElementById('Inca');

annapurna.addEventListener('click', () => {
    const text = document.createElement('div');
    text.textContent("Inca");
    const item = document.createElement('li');
    item.append(text);
    list.append(item);

    collection.updateOne({
        username:document.getElementsByName(username),
        password:document.getElementsByName(password)},
        {$push:{wanttogo:"Inca"}});
});
const paris = document.getElementById('Paris');

annapurna.addEventListener('click', () => {
    const text = document.createElement('div');
    text.textContent("Paris");
    const item = document.createElement('li');
    item.append(text);
    list.append(item);

    collection.updateOne({
        username:document.getElementsByName(username),
        password:document.getElementsByName(password)},
        {$push:{wanttogo:"Paris"}});
});
const rome = document.getElementById('Rome');

annapurna.addEventListener('click', () => {
    const text = document.createElement('div');
    text.textContent("Rome");
    const item = document.createElement('li');
    item.append(text);
    list.append(item);

    collection.updateOne({
        username:document.getElementsByName(username),
        password:document.getElementsByName(password)},
        {$push:{wanttogo:"Rome"}});
});

const santorini = document.getElementById('Santorini');

annapurna.addEventListener('click', () => {
    const text = document.createElement('div');
    text.textContent("Santorini");
    const item = document.createElement('li');
    item.append(text);
    list.append(item);

    collection.updateOne({
        username:document.getElementsByName(username),
        password:document.getElementsByName(password)},
        {$push:{wanttogo:"Santorini"}});
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


app.listen(3000);//we are telling the express server to receive the requests coming to the local host on port # 3000
