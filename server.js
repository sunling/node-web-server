const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname+'/public/'));
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
 
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to write log to server.log');
        }
    });
    next();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        currentYear:new Date().getFullYear(),
        welcomeMsg:'Welcome to Node.js world'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Pate Title',
        currentYear:new Date().getFullYear()
    }); 
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});