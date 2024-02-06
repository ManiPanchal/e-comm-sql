let ptrn=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let email=document.getElementById("email_i");
        let btn=document.getElementById("data_submit");
        btn.addEventListener("click",function()
        {
            if(email.value.trim()==""&&name.value.trim()==""&&pass.value.trim()=="")
            {
                alert("enter data");
            }
            else if(!email.value.trim().match(ptrn))
            {
                alert("enter valid email");
            }
        })