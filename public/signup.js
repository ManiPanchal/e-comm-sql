let p=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,15}$/;
        let p2=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let pass=document.getElementById("pass");
        let fname=document.getElementById("name");
        let email=document.getElementById("email_i");
        let password=document.getElementById("pass");
        let submit=document.getElementById("submit_signup")
        submit.addEventListener("click",()=>{
            if(fname.value.trim()==""&&email.value.trim()==""&&password.value.trim()=="")
            {
                alert("Please fill out all the fields");
            }
            else if(!pass.value.trim().match(p))
            {
            alert("please choose a strong password");
            }
            else if(!email.value.trim().match(p2))
            {
                alert("please enter a valid email");
            }
            else 
            {
                const request=new XMLHttpRequest();
                request.open("POST","/signup");
                request.setRequestHeader("content-type","application/json");
                request.send(JSON.stringify({name:fname.value.trim(),email:email.value.trim(),password:password.value.trim()}));
                request.addEventListener("load",()=>
                {
                    if(request.responseText=="exist")
                    {
                       document.getElementById("e").style.display="block"; 
                       document.getElementById("c").style.display="none";
                    }
                    if(request.responseText=="check")
                    {
                        document.getElementById("c").style.display="block";
                        document.getElementById("e").style.display="none";
                    }
                })
            }
        })
        
