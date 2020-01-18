const puppeteer = require("puppeteer");

let login = async () => {
  const puppeteer = require("puppeteer");
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const navigationPromise = page.waitForNavigation();

    await page.goto("https://lobby.ogame.gameforge.com/es_ES/");

    await page.setViewport({ width: 1920, height: 937 });

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
    var page2 = await clickAndWaitForTarget(
      ".open > .rt-tr > .rt-td > .btn > span",
      page,
      browser
    );
    //now we are on main menu

    // await page2.waitForSelector(
    //   "#links > #menuTable > li:nth-child(10) > .menubutton > .textlabel"
    // );
    // await page2.click(
    //   "#links > #menuTable > li:nth-child(10) > .menubutton > .textlabel"
    // );

    // await navigationPromise;

    // await page2.waitForSelector(
    //   "#galaxycomponent > #inhalt > #galaxyHeader > form > .galaxy_icons:nth-child(8)"
    // );
    // await page2.click(
    //   "#galaxycomponent > #inhalt > #galaxyHeader > form > .galaxy_icons:nth-child(8)"
    // );

    // await page2.waitForSelector(
    //   "#galaxycomponent > #inhalt > #galaxyHeader > form > .galaxy_icons:nth-child(8)"
    // );
    // await page2.click(
    //   "#galaxycomponent > #inhalt > #galaxyHeader > form > .galaxy_icons:nth-child(8)"
    // );

    //open chat with viktorJJF
    await page2.waitForSelector(
      "#headerbarcomponent > #bar > ul > li:nth-child(5) > .overlay"
    );
    await page2.click(
      "#headerbarcomponent > #bar > ul > li:nth-child(5) > .overlay"
    );

    await page2.waitForSelector("#searchText");
    await page2.click("#searchText");

    await page2.type("#searchText", "ViktorJJF");

    await page2.waitForSelector(
      "tbody > tr > .ptb10 > #searchForm > .btn_blue"
    );
    await page2.click("tbody > tr > .ptb10 > #searchForm > .btn_blue");
    console.log("se dara click en escribir mensaje al jugador");
    await page2.waitForSelector("tbody > .alt > .action > .tooltip > .icon");
    await page2.click("tbody > .alt > .action > .tooltip > .icon");

    await navigationPromise;

    await page2.waitForSelector(
      "#contentWrapper > #chatContent > .content > .editor_wrap > .new_msg_textarea"
    );
    await page2.click(
      "#contentWrapper > #chatContent > .content > .editor_wrap > .new_msg_textarea"
    );

    await page2.type(
      "#contentWrapper > #chatContent > .content > .editor_wrap > .new_msg_textarea",
      "hola que hace"
    );

    await page2.waitForSelector(
      "#contentWrapper > #chatContent > .content > .editor_wrap > .btn_blue"
    );
    await page2.click(
      "#contentWrapper > #chatContent > .content > .editor_wrap > .btn_blue"
    );

    // await browser.close();
  })();
};

login();

let clickAndWaitForTarget = async (clickSelector, page, browser) => {
  const pageTarget = page.target(); //save this to know that this was the opener
  await page.click(clickSelector); //click on a link
  const newTarget = await browser.waitForTarget(
    target => target.opener() === pageTarget
  ); //check that you opened this page, rather than just checking the url
  const newPage = await newTarget.page(); //get the page object
  // await newPage.once("load",()=>{}); //this doesn't work; wait till page is loaded
  await newPage.waitForSelector("body"); //wait for page to be loaded

  return newPage;
};
