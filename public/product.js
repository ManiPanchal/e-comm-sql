let id,count=0;
const request=new XMLHttpRequest();
request.open("POST","/addproducts");
request.setRequestHeader("content-type","application/json");
request.send(JSON.stringify({x:count}));
request.addEventListener("load",()=>
{
  // let start=0,end=5;
    const data=JSON.parse(request.responseText);
     count=count+data.length;
     load_item(data);

function load_item(data)
{
      for(let i=0;i<data.length;i++)
      {
      
       let product=document.getElementById("products");
        let item=document.createElement("div");
        item.setAttribute("class","img_div");
        let img=document.createElement("img");
        let img1=data[i].image;
        img.setAttribute("src",`profile/${img1}`);
        item.appendChild(img);
        let p1=document.createElement("p");
        p1.innerHTML=data[i].productname;
        item.appendChild(p1)
        let p2=document.createElement("p");
        p2.innerHTML=data[i].price;
        item.appendChild(p2);
        let p3=document.createElement("p");
        p3.innerHTML=data[i].details;
         p3.style.display="none";
        item.appendChild(p3);
        let btn2=document.createElement("input");
        btn2.setAttribute("type","button");
        btn2.value="Add To Cart";
        btn2.setAttribute("id",data[i].product_id);
        item.appendChild(btn2);
        btn2.addEventListener("click",add_to_cart);
        let btn=document.createElement("input");
        btn.setAttribute("type","button");
        btn.setAttribute("id",Math.random());
        btn.value="View Details";
        p3.setAttribute("id",btn.id+1);
        item.appendChild(btn);
        btn.addEventListener("click",view);
        product.appendChild(item);
        // if(i+1==data.length)
        // {
        //   document.getElementById("view").style.display="none";
        // }
      }
}
function add_to_cart(e)
{
      const request=new XMLHttpRequest();
      request.open("POST","/cart");
      request.setRequestHeader("content-type","application/json");
      request.send(JSON.stringify({product_id:e.target.id}));
       request.addEventListener("load",()=>{
        if(request.responseText==="already")
        {
           swal({
            title:"Item already in cart",
            icon:"warning"
           })
        }
        else if(request.responseText==="okk")
        {
          swal({
                 title:"Item is added to cart",
                 icon:"success"
                })
        }
        else{
          window.location.href="/login";
        }
       }) 
}
function view(e)
{
  let value=e.target.parentNode.getElementsByTagName("p");
  swal({
    title:"Product Details",
    text:`${value[2].innerHTML} for ${value[1].innerHTML}`,
   })
  
}
let view_btn=document.getElementById("view");
// console.log(view_btn);
view_btn.addEventListener("click",()=>{
 const request=new XMLHttpRequest();
 request.open("POST","/addproducts");
 request.setRequestHeader("content-type","application/json");
 request.send(JSON.stringify({x:count}));
 request.addEventListener("load",()=>{
  const data=JSON.parse(request.responseText);
  if(data.length<5)
  {
    document.getElementById("view").style.display="none";
  }
  count=count+data.length;
  load_item(data);
 })
})
    
})
