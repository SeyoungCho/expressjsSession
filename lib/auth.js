module.exports = {
  authIsOwner:function(req, res){
    console.log(req.session);
    if(req.session.isLoggedIn){
        return true;
    }else{
        return false;
    }
  },
  authStatusUI:function(req, res){
    var authStatusUI = this.authIsOwner(req, res) ? 
    `${req.session.nickname} | <a href="/auth/logout_process">logout</a>`
    :
    `<a href="/auth/login">login</a>`;

    return authStatusUI;
  }
}