const puppeteer = require("puppeteer");

let bookingUrl =
  "https://www.booking.com/searchresults.es.html?label=gen173nr-1FCAEoggI46AdIM1gEaLEBiAEBmAEKuAEXyAEM2AEB6AEB-AELiAIBqAIDuAKE6IrxBcACAQ&sid=33bde5b5cea814997e2ef437370b2de5&sb=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.es.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaLEBiAEBmAEKuAEXyAEM2AEB6AEB-AELiAIBqAIDuAKE6IrxBcACAQ%3Bsid%3D33bde5b5cea814997e2ef437370b2de5%3Bsb_price_type%3Dtotal%26%3B&sr_autoscroll=1&ss=Canc%C3%BAn%2C+Quintana+Roo%2C+M%C3%A9xico&is_ski_area=&checkin_year=&checkin_month=&checkout_year=&checkout_month=&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1&ss_raw=cancun&ac_position=0&ac_langcode=es&ac_click_type=b&dest_id=-1655011&dest_type=city&iata=CUN&place_id_lat=21.161314&place_id_lon=-86.834129&search_pageview_id=4f2634c24abc00a7&search_selected=true&search_pageview_id=4f2634c24abc00a7&ac_suggestion_list_length=5&ac_suggestion_theme_list_length=0";
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.on("console", consoleObj => console.log(consoleObj.text()));
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto(bookingUrl);

  // get hotel details
  let hotelData = await page.evaluate(() => {
    let hotels = [];
    // get the hotel elements
    let hotelsElms = document.querySelectorAll(
      "div.sr_property_block[data-hotelid]"
    );
    console.log("hotel elms es: ", JSON.stringify(hotelsElms));
    // get the hotel data
    hotelsElms.forEach((hotelelement, i) => {
      let hotelJson = {};
      try {
        hotelJson.id = i;
        hotelJson.name = hotelelement.querySelector(
          "span.sr-hotel__name"
        ).innerText;
        hotelJson.rating = hotelelement.querySelector(
          ".bui-review-score__badge"
        ).innerText;
        hotelJson.reviews = hotelelement.querySelector(
          "span.review-score-widget__subtext"
        ).innerText;

        if (hotelelement.querySelector("strong.price")) {
          hotelJson.price = hotelelement.querySelector(
            "strong.price"
          ).innerText;
        }
      } catch (exception) {}
      hotels.push(hotelJson);
    });
    return hotels;
  });

  console.dir(hotelData);
})();
