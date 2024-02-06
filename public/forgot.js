let email=document.getElementById("email");
        let reset=document.getElementById("btn");
        let h3=document.getElementById("h3");
        let ptrn=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        reset.addEventListener("click",fun_reset);
        function fun_reset()
        {
            if(email.value.trim()=="")
             {
            alert("Please enter email");
            email.value="";
            }
            // else if(email.value.trim().match(ptrn))
            // {
            //     alert("please enter a valid email");
            // }
            else{
                const request=new XMLHttpRequest();
                 request.open("POST","/forgot");
                 request.setRequestHeader("content-type","application/json");
                //  console.log(JSON.stringify({value:email.value.trim()}));
                 request.send(JSON.stringify({value:email.value.trim()}));
                 request.addEventListener("load",function()
                 {
                    console.log(request.responseText);
                   if(request.responseText=="ok")
                   {
                     
                //      h3.style.display="block";
                       h3.classList.add("hh");
                       h3.classList.remove("h");
                    //    window.location.href="/forgot";
                   }
                  })
            }

        }
        