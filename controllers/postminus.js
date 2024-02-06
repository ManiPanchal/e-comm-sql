const dbacart=require("./dbacart");
const update_one=dbacart.update_one;
module.exports=(req,res)=>{
    if(req.body.q>0)
    {
        let user=update_one(req.session.email,req.body.id,req.body.q)
        user.then(function(user)
        {
            if(user)
            {
                res.end("ok");
                return;
            }  
        })  
    }
    else
    {
        res.end("okk");
    } 
}