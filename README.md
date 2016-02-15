# ExpressJS Workshop for DecodeMTL Full-Stack Bootcamp
*Your express way to the web development world!*

## Basic instructions
* Fork this repository and create a new Cloud9 project by cloning your fork
* Each exercise should be done in a separate branch, **branched off of master**, with a descriptive name of your choice
* Completed exercises should be submitted as pull requests. The pull request name should be "Exercise #: " followed by the exercise's title
* Different exercises will require different NPM packages. This will require you to use `npm install --save` to get these packages. The `package.json` should be part of the same commit where you start using the required package(s). For example, if one of the exercises requires the use of the [`request`](https://github.com/request/request) library, then the `package.json` for that submission should contain the dependency, and it should be committed at the same time as the code that `require`s it.
* An **`index.js`** file is made available to you. You should be able to do all the exercises by changing the contents of this file. If you feel like adding modules to make your code clearer, don't hesitate to do it. It's not *always* necessary.

## Exercise 1: Getting started!
Create a web server that can listen to requests for `/hello`, and respond with some HTML that says `<h1>Hello World!</h1>`

## Exercise 2: A wild parameter has appeared!
Create a web server that can listen to requests for `/hello/:firstName`, and respond with some HTML that says `<h1>Hello _name_!</h1>`. For example, if a client requests `/hello/John`, the server should respond with `<h1>Hello John!</h1>`

## Exercise 3: Operations
Create a web server that can listen to requests for `/op/:operation/:number1/:number2` and respond with a JSON object that looks like the following. For example, `/op/add/100/200`:
```json
{
  "operator": "add",
  "firstOperand": 100,
  "secondOperand": 200,
  "solution": 300
}
```
Your program should work for `add`,`sub`,`mult`,`div` and return the appropriate solution using `response.json` (this function will automatically `JSON.stringify` anything you give it). If `operation` is something other than these 4 values, you should use [`res.sendStatus`](http://expressjs.com/4x/api.html#res.sendStatus) to send an appropriate [error code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). First, figure out the category of error code you need to send, then find an appropriate code using the provided link.

## Exercise 4: Retrieving data from our database
Before doing this exercise, go back to your reddit clone MySQL database from the CLI. Using a few `INSERT` statements, put up a few content pieces in the `contents` table. Have at least 10-15 posts in there with various `title`s and `url`s. For the `userId`, set it to 1. Also create a user with ID 1 and call him Anonymous.

Once you have inserted a few contents in the database, it's now time to retrieve the contents from our web server and display them to the user using an HTML `<ul>` list with a bunch of `<li>`s.

[Using Sequelize, create a query](http://docs.sequelizejs.com/en/latest/docs/querying/) to retrieve the latest 5 contents by `createdAt` date, [including the user who created the content](http://docs.sequelizejs.com/en/latest/docs/querying/#relations-associations).

Once you have the query, create an endpoint in your Express server which will respond to `GET` requests to `/contents`. The Express server will use the Sequelize query to retrieve the array of contents. Then, you should build a string of HTML that you will send with the `request.send` function.

Your HTML should look like the following:

```html
<div id="contents">
  <h1>List of contents</h1>
  <ul class="contents-list">
    <li class="content-item">
      <h2 class="content-item__title">
        <a href="http://the.post.url.value/">The content title</a>
      </h2>
      <p>Created by CONTENT AUTHOR USERNAME</p>
    </li>
    ... one <li> per content that your Sequelize query found
  </ul>
</div>
```

## Exercise 5: Creating a "new content" form
In this exercise, we're going to use Express to simply send an HTML file to our user containing a `<form>`. To do this, let's write a little HTML file that looks like this:

```html
<form action="/createContent" method="post">
  <div>
    <input type="text" name="url" placeholder="Enter a URL to content">
  </div>
  <div>
    <input type="text" name="title" placeholder="Enter the title of your content">
  </div>
  <button type="submit">Create!</button>
</form>
```

Save this file as `form.html` somewhere in your project. Then, using ExpressJS create a `GET` endpoint called `createContent`. We will use the [Express `res.sendFile` function](http://expressjs.com/en/api.html#res.sendFile) to serve the `form.html` file when someone requests the `/createContent` resource with a `GET`.

## Exercise 6: Receiving data from our form
In this exercise, we will write our first `POST` endpoint. The resource will be the same, `/createContent`, but we will be writing a second endpoint using `app.post` instead.

In the code of `app.post('/createContent')`, we will be receiving the form data from step 5. This will get sent when the user presses the submit button. The form will instruct the browser to make a `POST` request (because of the `method`), and the resource will still be `/createContent` because of the `action` parameter.

To parse this data into our request, the easiest way is to have an [ExpressJS middleware](http://expressjs.com/en/guide/using-middleware.html). Start by reading up about middleware and what they do.

One particular middleware, called [Express bodyParser](https://github.com/expressjs/body-parser) can make sense of form data that is sent by a browser. Before reading the form data, you will have to install the bodyParser middleware with NPM, require it in your server code, then load it with `app.use`.

Form data is sent by default using the **urlencoded** format. The documentation explains [how to make bodyParser read urlencoded request body](https://github.com/expressjs/body-parser#bodyparserurlencodedoptions). After adding this middleware, the form data will be available thru `req.body`. Start by doing a `console.log` of it to see what you get.

Once you are familiar with the contents of `req.body`, use Sequelize to create a new content that has the URL and Title passed to you in the HTTP request. For the moment, set the user as being Anonymous.

Once the data is inserted successfully, respond to the user with a simple "OK".

If you want a challenge, try to [redirect the user to the home page](http://expressjs.com/en/api.html#res.redirect) after processing the `POST` of their form.
