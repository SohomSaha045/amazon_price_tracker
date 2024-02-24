This is Amazon Price Tracker and Statistics Provider API
This is build using Node.js, EXPRESS.js, Puppeteer, Cheerio.
This uses Puppeteer for the web-scraping of data to provide info about a product,

Additional Features:
*Contains Mail Alert Functionality
(when ever a product fall below a certain price level a mail is send to the customers email ID as an alert notifying that price has dropped)

API Routes:

/sc [POST]: to set an alert requires data in the form of Json body, This will check the price every day and send when ever product below the alert price.

Body Json format:
{
 "url":       "/..  amazon product url    ../",
 "price":     "/..  alert price    ../",
 "email":     "/..  customers email    ../"
}

/api/stat [GET]: This route is to fetch the pervious record of the amazon product (current price, average price, highest price, lowest price). This route takes product url as json body.

Body json format:
{
"url":        "/..  amazon product url    ../"
}
