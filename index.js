const puppeteer = require("puppeteer");
const moment = require("moment");

let login = async () => {
  // ViktorJJF
  const puppeteer = require("puppeteer");
  (async () => {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation();

    await page.goto("https://lobby.ogame.gameforge.com/es_ES/");

    await page.setViewport({ width: 1920, height: 937 });
    console.log("iniciando bot...");
    await page.waitForSelector(
      "div > #loginRegisterTabs > .tabsList > li:nth-child(2) > span"
    );
    await page.click(
      "div > #loginRegisterTabs > .tabsList > li:nth-child(2) > span"
    );

    await page.waitForSelector(
      "div > #loginRegisterTabs > .tabsList > li:nth-child(1) > span"
    );
    await page.click(
      "div > #loginRegisterTabs > .tabsList > li:nth-child(1) > span"
    );

    await page.waitForSelector(
      "#loginTab > #loginForm > .inputWrap:nth-child(1) > div > input"
    );
    await page.click(
      "#loginTab > #loginForm > .inputWrap:nth-child(1) > div > input"
    );
    await page.type(
      "#loginTab > #loginForm > .inputWrap:nth-child(1) > div > input",
      "victorjuanjf@gmail.com"
    );

    await page.waitForSelector(
      "#root > #content > div > div > div:nth-child(3)"
    );
    await page.click("#root > #content > div > div > div:nth-child(3)");
    await page.type(
      "#root > #content > div > div > div:nth-child(3)",
      "Sed4cfv52309$"
    );
    await page.waitForSelector(
      "#loginTab > #loginForm > p > .button-primary > span"
    );
    await page.click("#loginTab > #loginForm > p > .button-primary > span");

    await page.waitForSelector("div > #joinGame > a > .button > span");
    await page.click("div > #joinGame > a > .button > span");

    // await page.waitForSelector(".open > .rt-tr > .rt-td > .btn > span");
    // await page.click(".open > .rt-tr > .rt-td > .btn > span");

    await page.waitForSelector(".open > .rt-tr > .rt-td > .btn > span");
    var mainPage = await clickAndWaitForTarget(
      ".open > .rt-tr > .rt-td > .btn > span",
      page,
      browser
    );
    setInterval(() => {
      refreshPage(mainPage);
    }, 480000);
    // await goToSolarSystem("53", mainPage);
    // console.log("se termino de ir al sistema solar");
    // console.log("Empezando scraping...");
    // setTimeout(async () => {
    //   await solarSystemScraping(mainPage);
    //   console.log("se termino el scraping");
    // }, 5000);

    // await browser.close();
  })();
};

login();

let sendMessageToPlayer = async (nickname, msg, mainPage) => {
  const navigationPromise = mainPage.waitForNavigation();
  //open chat with viktorJJF
  await mainPage.waitForSelector(
    "#headerbarcomponent > #bar > ul > li:nth-child(5) > .overlay"
  );
  await mainPage.click(
    "#headerbarcomponent > #bar > ul > li:nth-child(5) > .overlay"
  );

  await mainPage.waitForSelector("#searchText");
  await mainPage.click("#searchText");

  await mainPage.type("#searchText", nickname);

  await mainPage.waitForSelector(
    "tbody > tr > .ptb10 > #searchForm > .btn_blue"
  );
  await mainPage.click("tbody > tr > .ptb10 > #searchForm > .btn_blue");
  await mainPage.waitForSelector("tbody > .alt > .action > .tooltip > .icon");
  await mainPage.click("tbody > .alt > .action > .tooltip > .icon");

  await navigationPromise;

  await mainPage.waitForSelector(
    "#contentWrapper > #chatContent > .content > .editor_wrap > .new_msg_textarea"
  );
  await mainPage.click(
    "#contentWrapper > #chatContent > .content > .editor_wrap > .new_msg_textarea"
  );

  await mainPage.type(
    "#contentWrapper > #chatContent > .content > .editor_wrap > .new_msg_textarea",
    msg
  );

  await mainPage.waitForSelector(
    "#contentWrapper > #chatContent > .content > .editor_wrap > .btn_blue"
  );
  await mainPage.click(
    "#contentWrapper > #chatContent > .content > .editor_wrap > .btn_blue"
  );
};

let checkActivity = async mainPage => {
  console.log("el jugador esta con minuero");
  console.log("el jugador esta activo");
};

let refreshPage = async page => {
  console.log(
    "refrescando ogame a las : ",
    moment().format("MMMM Do YYYY, h:mm:ss a")
  );
  await page.waitForSelector(
    "#links > #menuTable > li:nth-child(1) > .menubutton > .textlabel"
  );
  await page.click(
    "#links > #menuTable > li:nth-child(1) > .menubutton > .textlabel"
  );
};

let goToSolarSystem = async (ssNumber, page) => {
  await page.waitForSelector(
    "#toolbarcomponent > #links > #menuTable > li:nth-child(10) > .menubutton"
  );
  await page.click(
    "#toolbarcomponent > #links > #menuTable > li:nth-child(10) > .menubutton"
  );

  // await navigationPromise
  let galaxyInputSelector =
    "#galaxycomponent > #inhalt > #galaxyHeader #system_input";
  await page.waitForSelector(galaxyInputSelector);
  await page.click(galaxyInputSelector);
  await page.type(galaxyInputSelector, ssNumber);

  await page.waitForSelector(
    "#galaxycomponent > #inhalt > #galaxyHeader > form > .btn_blue:nth-child(9)"
  );
  await page.click(
    "#galaxycomponent > #inhalt > #galaxyHeader > form > .btn_blue:nth-child(9)"
  );
  await page.waitForSelector("tr.row");
};

let solarSystemScraping = async page => {
  await page.waitForSelector("tr.row");
  let ssData = await page.evaluate(() => {
    let planets = [];
    // get the hotel elements
    let planetsElms = document.querySelectorAll("tr.row");
    // get the planet data
    planetsElms.forEach(planet => {
      let planetJson = {};
      try {
        planetJson.name = planet.querySelector("td.planetname").innerText;
        planetJson.playerName = planet.querySelector(
          "td.playername>span.status_abbr_strong"
        ).innerText;
      } catch (exception) {}
      planets.push(planetJson);
    });
    return planets;
  });
  console.log("los datos son: ", ssData);
};

let clickAndWaitForTarget = async (clickSelector, page, browser) => {
  const pageTarget = page.target(); //save this to know that this was the opener
  await page.click(clickSelector); //click on a link
  const newTarget = await browser.waitForTarget(
    target => target.opener() === pageTarget
  ); //check that you opened this page, rather than just checking the url
  const newPage = await newTarget.page(); //get the page object
  // await newPage.once("load",()=>{}); //this doesn't work; wait till page is loaded
  await newPage.waitForSelector("body"); //wait for page to be loaded
  // newPage.on("console", consoleObj => console.log(consoleObj.text()));
  return newPage;
};
