import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; 
import session from 'express-session';
import { MongoClient } from 'mongodb';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
/*
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});
*/
app.all('/search', (req, res) => {
    console.warn('Blocked all requests to /search!');
    res.status(404).send('Not Found');
});

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 

//the public folder will contain all static files(images and videos)

//To connect mongodb to our nodejs code
const uri = "mongodb://localhost:27017/"; 
const client = new MongoClient(uri);
let collection;
async function connectToDatabase() {
try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    const database = client.db('myDB');
    collection = database.collection('myCollection');
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the database connection fails
}
}
await connectToDatabase();
//await client.connect();
//const database = client.db('myDB'); 
//const collection = database.collection('myCollection');

process.on('SIGINT', async () => {
    console.log("Closing MongoDB connection...");
    await client.close();
    process.exit(0);
});

// Middleware to show search bar on relevant pages
app.use((req, res, next) => {
    const excludedPaths = ['/registration', '/login'];
    if (!excludedPaths.includes(req.path)) {
        res.locals.showSearchBar = true;
    } else {
        res.locals.showSearchBar = false;
    }
    next();
});
// Search results route
app.get('/getsearch', async (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery || searchQuery.trim() === '') {
        return res.json({ results: [] });
    }

    try {
        const regex = new RegExp(searchQuery.trim(), 'i');
        const results = await collection.find({ name: { $regex: regex } }).toArray();
        res.json({ results });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: 'An error occurred while searching.' });
    }
});

app.post('/getsearch', (req, res) => {
    console.warn('POST request to /getsearch detected!');
    res.status(405).send('POST method not allowed.');
});




// Example destination routes
['annapurna', 'bali', 'inca', 'paris', 'rome', 'santorini'].forEach((destination) => {
    app.get(`/${destination}`, (req, res) => {
        res.render(destination);
    });
});

// 'Want to go' update route
app.post('/wanttogo', async (req, res) => {
    const { username, destination } = req.body;

    if (!username || !destination) {
        return res.status(400).send('Invalid request.');
    }

    try {
        await collection.updateOne(
            { username },
            { $push: { wanttogo: destination } },
            { upsert: true } // Create user record if it doesn't exist
        );
        res.status(200).send('Destination added to want-to-go list.');
    } catch (error) {
        console.error('Error updating want-to-go list:', error);
        res.status(500).send('An error occurred.');
    }
});







/*===========================================================================================
Regarding Any commented lines, they were being used for dubbging problems and tracing errors
 (Ignore) or remove indeed if needed :)
=============================================================================================
*/














/*
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, URL: ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});
app.use((req, res, next) => {
    if (req.method === 'POST' && req.url === '/getsearch') {
        console.warn(`Blocked POST request to ${req.url}`);
        return res.status(405).send('POST not allowed. Use GET.');
    }
    next();
});
*/
/*
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

*/
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
/*
app.get('/registration',function(req,res){
    res.render('registration');
});
*/
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
/*
// Base route
app.get('/', (req, res) => {
    res.render('home');
});
*/
/*
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});
*/
app.listen(3000);//we are telling the express server to receive the requests coming to the local host on port # 3000
