let br=document.createElement("br");
let total=document.getElementById("total");
let sub_total=0;
const request=new XMLHttpRequest();
request.open("POST","/create_cart");
request.setRequestHeader("Content-Type","application/json");
request.send();
request.addEventListener("load",()=>
{
                
    const data=JSON.parse(request.responseText);
    //   console.log(data);
    for(let i=0;i<data.length;i++)
    {
        // let amount=document.getElementById("amount");
        // let label=document.createElement("label");
        // label.innerHTML="Total Amount";
        // amount.appendChild(label);
        // let sp=document.createElement("span");
        // sp.setAttribute("id","total");
        // amount.appendChild(sp);
        // let total=document.getElementById("total");
        let product=document.getElementById("cart_prod");
        let item=document.createElement("div");
        item.setAttribute("class","img_div");
        item.setAttribute("id",data[i].product_id);
        let img=document.createElement("img");
        let img1=data[i].image;
        img.setAttribute("src",`profile/${img1}`);
        item.appendChild(img);
        let p1=document.createElement("p");
        p1.innerHTML=data[i].productname;
        item.appendChild(p1)
        let p2=document.createElement("p");
        p2.innerHTML=data[i].price;
        let pri=data[i].price.split(".");
        pri=pri[1];
        
        item.appendChild(p2);
        let p3=document.createElement("p");
        p3.innerHTML=data[i].details;
        p3.style.display="none";
        item.appendChild(p3);
        let minus=document.createElement("input");
        minus.setAttribute("type","button");
        minus.setAttribute("id","minus-"+Math.random());
        minus.setAttribute("class","button");
        minus.value="-";
        item.appendChild(minus);
        minus.addEventListener("click",fun_minus);
        let quantity=document.createElement("span");
        quantity.innerHTML=data[i].curr_quantity;
        sub_total=sub_total+(pri*data[i].curr_quantity);
        quantity.setAttribute("id","quantity-"+Math.random());
        quantity.setAttribute("class","s");
        item.appendChild(quantity);
        let plus=document.createElement("input");
        plus.setAttribute("type","button");
        plus.value="+";
        plus.setAttribute("id","plus-"+Math.random());
        plus.setAttribute("class","button");
        item.appendChild(plus);
        plus.addEventListener("click",fun_plus);
        let p=document.createElement("p");
        p.innerHTML="Stocks not available";
        p.setAttribute("id","para");
        p.style.display="none";
        item.appendChild(p);
        let btn=document.createElement("input");
        btn.setAttribute("type","button");
        btn.setAttribute("id",Math.random());
        btn.value="View Details";
        p3.setAttribute("id",btn.id+1);
        btn.setAttribute("class","button2");
        item.appendChild(btn);
        let del_btn=document.createElement("input");
        del_btn.setAttribute("type","button");
        del_btn.value="Remove";
        del_btn.setAttribute("id","del_btn-"+Math.random());
        del_btn.setAttribute("class","button2");
        item.appendChild(del_btn);
        del_btn.addEventListener("click",del_from_cart);
        btn.addEventListener("click",view);
        product.appendChild(item);
        total.innerHTML="Rs."+sub_total;

    }

    function view(e)
    {
        let value=e.target.parentNode.getElementsByTagName("p");
        swal({
         title:"Product Details",
         text:`${value[2].innerHTML} for ${value[1].innerHTML}`,
        })
    }
    function del_from_cart(e)
    {
        
        const request=new XMLHttpRequest();
        request.open("POST","/delete_from_cart");
        request.setRequestHeader("Content-Type","application/json");
        request.send(JSON.stringify({value:e.target.parentNode.id}));
        request.addEventListener("load",()=>
        {
            if(request.responseText=="ok")
            {
                e.target.parentNode.remove();
                let x=e.target.parentNode.getElementsByTagName("p")[1].innerHTML.split(".")[1];
                x=parseInt(x);
                let y=e.target.parentNode.getElementsByTagName("span")[0].innerHTML ;
                y=parseInt(y);
                y=x*y;
                // console.log(y);
                sub_total=sub_total-y;
                total.innerHTML="Rs."+sub_total;
                swal({
              title:"Item removed successfully",
              icon:"success",
               })
            }
        })
    }
    function fun_plus(e)
    {
    //    console.log(e.target.parentNode.getElementsByTagName("span"));
       let span=e.target.parentNode.getElementsByTagName("span") ;
       value=span[0].innerHTML; 
       value=parseInt(value); 
       const request=new XMLHttpRequest();
       request.open("POST","/plus");
       request.setRequestHeader("content-type","application/json");
       request.send(JSON.stringify({q:value+1,id:e.target.parentNode.id}));
       request.addEventListener("load",()=>
       {
        // console.log(request.responseText);
       if(request.responseText=="ok")
       {
          span[0].innerHTML=value+1;
          let x=e.target.parentNode.getElementsByTagName("p")[1].innerHTML.split(".")[1];
          sub_total=sub_total+parseInt(x);
          total.innerHTML="Rs."+sub_total;
       }
       else{
        swal({
         title:"More Quantity is not available",
         icon:"warning"
        })
       }
       })
       
    }
    function fun_minus(e)
    {
        // console.log(e.target.parentNode.getElementsByTagName("span"));
       let span=e.target.parentNode.getElementsByTagName("span") ;
       value=span[0].innerHTML;
        value=parseInt(value);
      if(value-1==0)
      {
        swal({
         title:"Add atleast one quantity",
         icon:"warning"
        })
      }
      else{
        const request=new XMLHttpRequest();
       request.open("POST","/minus");
       request.setRequestHeader("content-type","application/json");
       request.send(JSON.stringify({q:value-1,id:e.target.parentNode.id}));
       request.addEventListener("load",()=>
       {
           if(request.responseText==="ok")
           {
              span[0].innerHTML=value-1;
              let x=e.target.parentNode.getElementsByTagName("p")[1].innerHTML.split(".")[1];
              sub_total=sub_total-parseInt(x);
              total.innerHTML="Rs."+sub_total;
           }
       })
       }
    }
})

