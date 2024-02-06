const dbacart=require("./dbacart");
const find_one=dbacart.find;
const create_new=dbacart.addtocart;
module.exports=(req,res)=>{
            if(req.session.is_logged_in)
            {
              
                let product=find_one(req.body.product_id,req.session.email)
                product.then(function(product)
                {
                  
                    if(product.length!=0)
                      {
                         res.end("already");
                         return;
                      }
                      else {
                        let data=create_new(req.session.email,req.body.product_id,1)
                         data.then(function()
                         {
                            res.end("okk");
                          })
                        }
                  })   
            }
            else{
                res.end("ok");
                
            }
    }
    