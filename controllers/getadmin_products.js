const dbaproduct=require("./dbaproduct");
const find_all=dbaproduct.find_all;

module.exports=(req,res)=>{
    let data=find_all()
    data.then(function(data)
    {
        res.send(JSON.stringify(data));
    })
}