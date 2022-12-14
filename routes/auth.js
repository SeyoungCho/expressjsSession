var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');

var authData = {
  email: "kennycho@naver.com",
  password: "111111",
  nickname: "kenny"
}

router.get('/login', function(request, response) {
    var title = 'WEB - login';
    var list = template.list(request.list);
    var html = template.HTML(title, list, `
        <form action="/auth/login_process" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="submit" value="login">
            </p>
        </form>
    `, '');
    response.send(html);
});

router.post('/login_process', function(request, response) {
    var post = request.body;
    var email = post.email;
    var password = post.password;
    if(email === authData.email && password === authData.password){
      request.session.isLoggedIn = true;
      request.session.nickname = authData.nickname;
      request.session.save(function() {
          response.redirect(`/`);
        }
      );
    }else{
      response.send("Who?");
    }
});

router.get('/logout_process', function(req, res){
  req.session.destroy(function(err){
    if(err){
      throw err;
    }
    res.redirect('/');
  })
});

module.exports = router;
