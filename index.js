const express = require('express')
const cron = require("node-cron");
const {run}=require('./sendMail');
const app = express();

const port = 3000
var list=[]
app.use(express.json())
app.post('/sc', (req, res) => {
  let url=req.body.url;
  let price=req.body.price;
  let email=req.body.email;
  let timeout=3
  list.push({url,price,email,timeout});  
  res.send('Success')
})

cron.schedule("*/60 * * * * *",()=> {
    for(var i=0;i<list.length;i++){
       run(list[i].url,list[i].price,list[i].email);
       list[i].timeout--;
    }
    list = list.filter(function(item) {
        return item.timeout !== 0
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})