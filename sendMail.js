require('dotenv').config()
const cheerio  = require('cheerio');

const puppeteer = require('puppeteer');

const run=async ()=>{
try {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();
  await page.goto('https://www.amazon.in/WildHorn-Blue-Mens-Wallet-WH2009/dp/B076ZMLBJJ/?_encoding=UTF8&pd_rd_w=Cms2p&content-id=amzn1.sym.5ee8c642-34d6-4cfc-933c-7214ec67ba53%3Aamzn1.symc.acc592a4-4352-4855-9385-357337847763&pf_rd_p=5ee8c642-34d6-4cfc-933c-7214ec67ba53&pf_rd_r=0545N47APYMAPG5JH3RZ&pd_rd_wg=3R7oM&pd_rd_r=e7ee5975-d447-49c8-83cd-0940e05ec230&ref_=pd_gw_ci_mcx_mr_hp_d&th=1'); 
 const htmlContent=await page.content();
  const $=cheerio.load(htmlContent);
  const temp=$('.a-price-whole');
  const value=parseFloat(temp[0].children[0].data)
  console.log(value);
  

  // Close browser.
  await browser.close();
}
catch(e){
    console.log(e);
}
}
run()