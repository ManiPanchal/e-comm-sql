const dbauser=require("./dbauser");
const dbforgot_token=dbauser.findout;
module.exports=(req,res)=>
{
    const {token} =req.params;
    let data=dbforgot_token(token);
    data.then((data)=>
    {
        req.session.user=data[0];
        req.session.email=data[0].email;
        req.session.user.isvalid=true;
        req.session.is_logged_in=true;
        res.redirect("/changepassword");
    },()=>
    {
        // console.log("err");
        res.redirect("/forgot");
    })     
}
