let lower=document.getElementById("lower");
        let upper=document.getElementById("upper");
        let length=document.getElementById("length");
        let num=document.getElementById("num");
        let special=document.getElementById("special");
        let new_pass=document.getElementById("pass");
        new_pass.onkeyup=function()
        {
             let ptr1=/[a-z]/;
             if(new_pass.value.match(ptr1))
             {
                lower.classList.remove("invalid");
                lower.classList.add("valid");
             }
             else{
                lower.classList.add("invalid");
                lower.classList.remove("valid");
             }
             let ptr2=/[A-Z]/;
             if(new_pass.value.match(ptr2))
             {
                upper.classList.remove("invalid");
                upper.classList.add("valid");
             }
             else{
                upper.classList.add("invalid");
                upper.classList.remove("valid");
             }
             let ptr3=/[0-9]/;
             if(new_pass.value.match(ptr3))
             {
                num.classList.remove("invalid");
                num.classList.add("valid");
             }
             else{
                num.classList.add("invalid");
                num.classList.remove("valid");
             }
             if(new_pass.value.trim().length>=8 && new_pass.value.trim().length<=15)
             {
                length.classList.remove("invalid");
                length.classList.add("valid");
             }
             else{
                length.classList.add("invalid");
                length.classList.remove("valid");
             }
             let ptr4=/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/;
             if(new_pass.value.match(ptr4))
             {
                 special.classList.remove("invalid");
                 special.classList.add("valid");
             }
             else{
                special.classList.remove("valid");
                special.classList.add("invalid");
             }
        }
        let con_pass=document.getElementById("conpass");
        let update=document.getElementById("update");
        let eye2=document.getElementById("eye2");
        eye2.addEventListener("click",fun_eye2);
        let eye=document.getElementById("eye");
        eye.addEventListener("click",eye_fun);
        let ptrn=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,15}$/;
        update.addEventListener("click",update_fun);
        function update_fun()
        {
            // console.log(new_pass.value,con_pass.value);
            if(new_pass.value.trim()===""&&con_pass.value.trim()==="")
             {
                swal({
                 title:"Please fill out both the fields",
                 icon:"warning"
                })
                   }
             else if(new_pass.value.trim()===con_pass.value.trim())
             {
                if(new_pass.value.trim().match(ptrn))
                {
                 const request=new XMLHttpRequest();
                 request.open("POST","/change_password");
                 request.setRequestHeader("content-type","application/json");
                 request.send(JSON.stringify({value:new_pass.value.trim()}));
                 request.addEventListener("load",function()
                 {
                if(request.responseText=="ok")
                {
                     window.location.href="/product";
                 }
                 else if(request.responseText=="okk")
                 {
                    window.location.href="/admin";
                 }
                  })
                }
                else{
                   
                swal({
                 title:"Choose a valid password",
                 icon:"warning"
                })
                    new_pass.value="";
                    con_pass.value="";
                }                   
             }
             else{
                document.getElementById("label").style.display="block";
             }
}
function eye_fun()
{
    if(new_pass.type=="password")
    {
        new_pass.setAttribute("type","text");
    }
    else{
        new_pass.setAttribute("type","password");
    }
}  
function fun_eye2()
{
    if(con_pass.type=="password")
    {
        con_pass.setAttribute("type","text");
    }
    else{
        con_pass.setAttribute("type","password");
    }
}
