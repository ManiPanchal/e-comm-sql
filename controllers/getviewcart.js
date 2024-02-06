const dbacart=require("./dbacart");
const find_item=dbacart.find_item;
module.exports=(req,res)=>{
    if(req.session.is_logged_in)
    {
        
        if(req.session.email=="manishapanchal5591@gmail.com")
        {
            res.redirect("/admin");
            return;
        }
        else{
                    res.render("cart");
                    return;
                }
    }
    else{
        res.redirect("/login");
    }
}