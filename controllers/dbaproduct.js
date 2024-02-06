const connection=require("./connection");
function product_five(x)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM products limit 5 offset ${x}`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(JSON.parse(JSON.stringify(result)));
              }
            
            });
          });
    })

}
function find_all()
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`SELECT * FROM products`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(JSON.parse(JSON.stringify(result)));
              }
            
            });
          });
    })
}
function create_new(ob)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`Insert into products values("${ob.productname}","${ob.price}",${ob.price,ob.quantity},"${ob.product_id}","${ob.details}","${ob.image}")`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(1);
              }
            
            });
          });
    })
}
function delete_one(id)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            
            if (err) throw err;
            con.query(`delete from products where product_id="${id}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(1);
              }
            
            });
          });
    })
}
function update_one(id,productname,discription,price,quantity)
{
    return new Promise(function(resolve,reject)
    {
      var con=connection();
          con.connect(function(err) {
            if (err) throw err;
            con.query(`update products set productname="${productname}",details="${discription}",price="${price}",quantity="${quantity}" where product_id="${id}"`, function (err, result, fields) {
              if (err) return reject(err);
              if(result)
              {
                 resolve(1);
              }
            
            });
          });
    })
}
function find_product(id)
{
  return new Promise(function(resolve,reject)
  {
    var con=connection();
        con.connect(function(err) {
          if (err) throw err;
          con.query(`select * from products where product_id="${id}"`, function (err, result, fields) {
            if (err) return reject(err);
            if(result)
            {
              // console.log(result,JSON.parse(JSON.stringify(result)));
               resolve(JSON.parse(JSON.stringify(result)));
              // resolve(result);
            }
          
          });
        });
  })
}
module.exports={product_five,find_all,create_new,delete_one,update_one,find_product};