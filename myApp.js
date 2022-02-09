var express = require('express');
var app = express();

var bodyParser = require('body-parser')

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

app.use('/public', express.static(__dirname + "/public"))

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/json', function(req, res) {
  const hellojson="Hello json";
  const message= process.env.MESSAGE_STYLE === 'uppercase' ? hellojson.toUpperCase() : hellojson;
  res.json({"message": message});
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res){
  res.json({"time": req.time})
})

app.get('/:word/echo', function(req, res){
  word=req.params.word;
  res.json({echo: word})
})

app.route('/name')
  .get(function(req, res){
    name=`${req.query.first} ${req.query.last}`;
    res.json({'name':name});
    })
  .post(function(req, res){
    name=`${req.body.first} ${req.body.last}`;
    res.json({'name':name});
  })
































 module.exports = app;
