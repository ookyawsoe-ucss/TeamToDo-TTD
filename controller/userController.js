var userModel = require('../model/userModel')

exports.login = (req, res, next) => {
    if(req.method == 'POST'){
        var params = req.body;
        userModel.login(params, (err, results) => {
            if(err){
                console.log(err);
            }else{
                if(results[0]){
                    console.log(req.session);
                    req.session.user = results[0];
                    req.session.isLoggedIn = true;
                    console.log(req.session);
                    res.redirect('/');
                }else{
                    res.render('/login',{ message : "Username or Password is incorrect"})
                }  
            }
        })
    }else{
        res.render('login', {layout : false, message : ''});
    } 
}
exports.logout = (req, res) => {
    req.session.destroy();
    console.log("Session", req.session);
    res.redirect('/login');
}