'use strict';
// reddit API
var RedditAPI = require('../reddit-nodejs-api/reddit');
// DB + comm
var request = require('request-promise');
var mysql = require('promise-mysql');
// Web
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/hello', function(request,response) {
  if (request.query.name !== undefined) {
    response.end("<h1>Hello " + request.query.name + "</h1>");
  }
  response.end('<h1>Hello World!</h1>');
});

app.get('/calculator/:operation', function(request, response) {
  var num1 = 0;
  var num2 = 0;
  if (request.query.num1 !== undefined) {
    num1 = Number(request.query.num1);
  }
  
  if (request.query.num2 !== undefined) {
    num2 = Number(request.query.num2);
  }
  
  var solution;
  switch(request.params.operation) {
    case 'add':
      solution = num1 + num2;
      break;
    case 'multiply':
      solution = num1 * num2;
      break;
    default:
      response.end("400 Bad Request");
  };
    
    var solutionObject = {
      operation: request.params.operation,
      firstOperand: request.query.num1,
      secondOperand: request.query.num2,
      solution: solution
    };
    
    response.end(JSON.stringify(solutionObject, null, 2));
});

app.get('/posts', function(request, response) {
  var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'reddit',
    connectionLimit: 10
  });

  // create a RedditAPI object. we will use it to insert new data
  var myReddit = new RedditAPI(connection);
  var myHTMLString = `
  <div id="posts">
    <h1>List of posts</h1>
    <ul class="posts-list">
  `;
  myReddit.getAllPosts()
  .then(dbPosts => {
    dbPosts.forEach(post => {
      myHTMLString += `
      <li class="post-item">
      <h2 class="post-item__title">
      <a href=`+ post.url + `>`+ post.title + `</a>
      </h2>
      <p>Created by ` + post.user.username + `</p>
      </li>`;
    });
  })
  .then(result => {
    myHTMLString += `
    </ul>
    </div>`;
    response.end(myHTMLString);
  })
});

app.get('/new-post', function(request, response) {
  var formHTML = `<!DOCTYPE html>
  <form action="/createPost" method="POST"><!-- why does it say method="POST" ?? -->
    <p>
      <input type="text" name="url" placeholder="Enter a URL to content">
    </p>
    <p>
      <input type="text" name="title" placeholder="Enter the title of your content">
    </p>
    <button type="submit">Create!</button>
  </form>`;
  response.end(formHTML);
});

app.post('/createPost', urlencodedParser, function(request, response) {
  if (request.body) {
    var connection = mysql.createPool({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database: 'reddit',
      connectionLimit: 10
    });

    // create a RedditAPI object. we will use it to insert new data
    var myReddit = new RedditAPI(connection);
    var myPost = {
      subredditId: 1,
      userId: 1,
      title: request.body.title,
      url: request.body.url
    };
    myReddit.createPost(myPost)
    .then(response.redirect('/posts'));
  }
});


/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
