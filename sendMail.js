require('dotenv').config()
const cheerio  = require('cheerio');

const puppeteer = require('puppeteer');


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
  

  // Close browser.
  await browser.close();
}
catch(e){
    console.log(e);
}
}
module.exports={run};