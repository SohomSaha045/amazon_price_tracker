
const cheerio  = require('cheerio');
const sgMail=require("@sendgrid/mail");
if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  const chrome = require("chrome-aws-lambda");
 const puppeteer = require("puppeteer-core");
} else {
  const puppeteer = require("puppeteer");
}
// const puppeteer = require('puppeteer');
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
  let options = {};
  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }
   
try {
  // Launch the browser
  const browser = await puppeteer.launch(options);

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