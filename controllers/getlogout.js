module.exports=(req, res) => {
    if(req.session.is_logged_in)
    {
        req.session.destroy();
        res.redirect("/");
    }
    else{
        res.redirect("/login");
    }

}