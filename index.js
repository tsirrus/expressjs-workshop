var express = require('express');
var app = express();

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



/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Example app listening at http://%s', process.env.C9_HOSTNAME);
});
