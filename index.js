const express = require('express')
const cron = require("node-cron");
const {run}=require('./sendMail');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;
var list=[]
app.use(express.json())
app.get('/',(req,res)=>{
  res.send('Success');
})
app.post('/sc', (req, res) => {
  let url=req.body.url;
  let price=req.body.price;
  let email=req.body.email;
  // let flag=false;
  let timeout=60;
  list.push({url,price,email,timeout});  
  res.send('Success')
})
var output=false;
cron.schedule(
  // "0 0 * * *"
  
"*/1 * * * *"
,()=> {
    
    // for(let i=0;i<list.length;i++){
       
    //    output=run(list[i].url,list[i].price,list[i].email);
    //    output.then(
    //     (res)=>{
    //       console.log(res);
    //    if(res===true){
    //     list[i].timeout=0;
    //    }
    //    else
    //    list[i].timeout--;
    //     }
    //    );
    // }
    list = list.filter(function(item) {
      output=run(item.url,item.price,item.email);
       output.then(
        (res)=>{
          console.log(res);
       if(res===true){
        item.timeout=0;
       }
       else
       item.timeout--;

        console.log(item.timeout);
        }
       );

       

        return item.timeout !== 0;
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})