// create web server 
// 1. load modules
var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

// 2. set up middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// 3. set up routes
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/comments", function(req, res) {
  fs.readFile(__dirname + "/public/comments.json", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/comments", function(req, res) {
  fs.readFile(__dirname + "/public/comments.json", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(__dirname + "/public/comments.json", JSON.stringify(comments, null, 4), function(err) {
        if (err) {
          console.log(err);
        } else {
          res.send(comments);
        }
      });
    }
  });
});

// 4. start server
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});