const sendMail=require("../methods/sendmail");
const dbauser=require("./dbauser");
const find_email=dbauser.find;
module.exports=(req,res)=>{
    // console.log(req.body.value);
    let user=find_email(req.body.value)
    user.then(function(user2)
    {
        // console.log(user2);
        let data=user2[0].mailToken;
        // console.log(data);
        if(user2)
        {
            sendMail(user2[0].email,user2[0].mailToken,`<h1>Welcome </h1><h2>Click the link to reset your password</h2><a href="http://127.0.0.1:8000/forgot/${data}">clickhere...</a>`,function(err,data)
                {
                    if(err)
                    {
                        res.render("forgot",{data:"something went wrong"});
                        return;
                    }
                    req.session.is_logged_in=true;
                     res.end("ok");
                     return;
                })
        }
        else{
            res.render("forgot",{data:"something went wrong"});
            return;
        }           
    }) 
}