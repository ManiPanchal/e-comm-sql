const express = require("express");
const session = require("express-session");
// const db=require("./models/db");
const ejs=require("ejs");
const multer=require("multer");
const sql=require("mysql");
const dba=require("./sql/db");
const getlogin=require("./controllers/getlogin");
const postlogin=require("./controllers/postlogin");
const getsignup=require("./controllers/getsignup");
const postsignup=require("./controllers/postsignup");
const getlogout=require("./controllers/getlogout");
const getchangepassword=require("./controllers/getchangepassword");
const postchange=require("./controllers/postchange");
const getforgot=require("./controllers/getforgot");
const postforgot=require("./controllers/postforgot");
const getproduct=require("./controllers/getproduct");
const getviewcart=require("./controllers/getviewcart");
const postcreatecart=require("./controllers/postcreatecart");
const postcart=require("./controllers/postcart");
const postdeletefromcart = require("./controllers/postdeletefromcart");
const postplus=require("./controllers/postplus");
const postminus=require("./controllers/postminus");
const getadmin = require("./controllers/getadmin");
const postadminproduct = require("./controllers/postadminproduct");
const postdeleteproduct = require("./controllers/postdeleteproduct");
const postupdateproduct = require("./controllers/postupdateproduct");
const notfound = require("./controllers/notfound");
const getadmin_products = require("./controllers/getadmin_products");
const postaddproducts = require("./controllers/postaddproducts");
const getverifymail = require("./controllers/getverifymail");
const forgot_token = require("./controllers/forgot_token");
const homepage = require("./controllers/homepage");
const app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use('/',express.static('uploads'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true

}))
const storage=multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,"uploads/profile");
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname);
    }
})

const upload=multer({storage:storage});
app.use(express.json());
app.get("/", homepage);
app.get("/login",getlogin);
app.post("/login",postlogin);
app.get("/signup",getsignup);
app.post("/signup",postsignup);
app.get("/logout", getlogout);
app.get("/changepassword",getchangepassword);
app.post("/addproducts",postaddproducts);
app.get("/admin_products",getadmin_products);
app.get("/forgot",getforgot);
app.post("/forgot",postforgot);
app.post("/change_password",postchange);
app.get("/product",getproduct);
app.get("/verifymail/:token",getverifymail);
app.get("/forgot/:token",forgot_token);
app.get("/view_cart",getviewcart);
app.post("/create_cart",postcreatecart);
app.post("/cart",postcart);   
app.post("/delete_from_cart",postdeletefromcart);
app.post("/plus",postplus);
app.post("/minus",postminus);
app.get("/admin",getadmin);
app.post("/adminproduct",upload.single("pic"),postadminproduct);
app.post("/deleteproduct",postdeleteproduct);
app.post("/updateproduct",postupdateproduct);
app.get("*",notfound);
// dba.init()
// .then(function()
// {
//     console.log("Database connected");
//     app.listen(8000,()=>
//     {
//         console.log("server at 8000");
//     });
// })
// .catch(function(err)
//     {
//        console.log(err);
//     });
    app.listen(8000,()=>
    {
        console.log("server at 8000");
    });