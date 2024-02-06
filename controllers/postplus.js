const dbacart=require("./dbacart");
const update_one=dbacart.update_one;
const dbaproduct=require("./dbaproduct");
const findunique=dbaproduct.find_product;
module.exports=(req,res)=>{
    let value=parseInt(req.body.q);
    let products=findunique(req.body.id)
    products.then(function(product)
    { 
        if(product[0].quantity>=value)
        {
            let data=update_one(req.session.email,req.body.id,value)
            data.then(function()
            {
                    res.end("ok");
                    return;
            });
        }
        else{
            res.end("okk");
            return;
        }
    }) 
}