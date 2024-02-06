const dbaproduct=require("./dbaproduct");
const create_new=dbaproduct.create_new;
module.exports=(req,res)=>
{
    req.session.is_logged_in=true;
    req.session.user.isvalid=true;
    let img=req.file.filename;
    let new_pro={},new_arr=[];
    new_pro.productname=req.body.name;
    new_pro.price=`Rs.${req.body.price}`;
    new_pro.quantity=req.body.quantity;
    new_pro.product_id=Math.random();
    new_pro.details=req.body.discription;
    new_pro.image=`${img}`;
    let data=create_new(new_pro)
    data.then(function()
    {
        new_arr.push(new_pro);
        res.send(JSON.stringify(new_arr));
    })    
}