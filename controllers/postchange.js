const sendMail=require("../methods/sendmail");
const dbauser=require("./dbauser");
const findemail=dbauser.finduser;
const updatepass=dbauser.update_pas;
module.exports=(req,res)=>
{
    let user=findemail(req.session.email)
    user.then(function(user)
    {
        if(user)
        {
            let user2=updatepass(req.session.email,req.body.value)
            user2.then(function(user2)
            {
              sendMail(req.session.email,user.mailToken,"<h1>Password change successfully</h1>",function(err,data)
              {
                  if(err)
                  {
                      res.render("changepassword",{data:"something went wrong"});
                      return;
                  }
                  req.session.is_logged_in=true;
                  req.session.user.isvalid=true;
                  if(req.session.email=="manishapanchal5591@gmail.com")
                  {
                    res.end("okk");
                    return;
                  }
                  else
                  {
                    res.end("ok");
                    return;
                  } 
              })
            },()=>{
              res.send("something went wrong");
              return;
            }) 
        }
        else{
            res.render("changepassword",{data:"something went wrong"});
            return;
        }   
    })
 }
