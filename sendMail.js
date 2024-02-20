require('dotenv').config()
const cheerio  = require('cheerio');
const sgMail=require("@sendgrid/mail");
const puppeteer = require('puppeteer');
sgMail.setApiKey(process.env.api_key);


function sendEmail(subject,body,em){
    const email={
        to: em,
        from: 'sohomsaha.cse2020@nsec.ac.in',
        subject:subject,
        text:body,
        html:body
    }
    return sgMail.send(email);
}


async function run(url,price,email)
{
   
try {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();
  await page.goto(url); 
 var htmlContent=await page.content();
  var $=cheerio.load(htmlContent);
  var temp=$('.a-price-whole').text();
  temp=temp.split(".");
  temp=parseFloat(temp[0].replace(/,/g, ''))  
//   const value=parseFloat(temp[0].children[0].data)
//   console.log(value);
  console.log(temp);
  if(temp<price){
     sendEmail(
        'Price is low',
        `The price on ${url} has dropped below ${price}`,
        email
    );
    
  
  

  // Close browser.
  await browser.close();
  return true;

   }
   
   return false;  
} 

catch(e){
    console.log(e);
} 
 

}
module.exports={run};