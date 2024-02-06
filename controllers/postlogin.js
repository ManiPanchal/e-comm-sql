const dbauser=require("./dbauser");
const findunique=dbauser.find_user;
module.exports=function postlogin(req, res) {
    
       const name=req.body.name;
       const email=req.body.email;
       const password=req.body.password;
         let user=findunique(name,email,password)
       user.then(function(data)
       {
          if(data.length>0)
          {
            // console.log(data[0]);
            req.session.email=data[0].email;
            req.session.is_logged_in = true;
            req.session.user=data[0];
            if(req.session.user.email==="manishapanchal5591@gmail.com")
            {
               res.redirect("/admin");
            }
            else{
                res.redirect("/product"); 
                return;
            } 
          } 
          else
          {
            res.render("login",{data:"Enter valid data"});
          }
          
       },()=>{
         res.render("login",{data:"Something went wrong"});
       })
      
    //    var productModel=new ProductModel;
    //    productModel.productname="Cap";
    //    productModel.price="Rs.299";
    //         productModel.quantity="5";
    //         productModel.product_id="213012";
    //         productModel.details="Men Cap & Hat";
    //         productModel.image="cap.jpg";
    //         productModel.save();
                
            }
    