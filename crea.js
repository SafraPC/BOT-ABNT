//CONSULTA NACIONAL https://www.abntonline.com.br/consultanacional/default.aspx
//COMITÊS TÉCNICOS http://www.abnt.org.br/normalizacao/comites-tecnicos
const puppeteer = require("puppeteer");
const BASE_URL = "https://www.abntonline.com.br/consultanacional/default.aspx";


const crea = {
  browser: null,
  page: null,

  
  init: async () => {
    crea.browser = await puppeteer.launch({
      headless: false,
    });
    crea.page = await crea.browser.newPage();
  },

  login: async (username, password) => {
    await crea.page.goto(BASE_URL, { waitUntil: "networkidle2" });

    //await crea.page.waitForNavigation({ waitUntil: "networkidle2" });//só usa isso se for mudar de página

    await crea.page.waitFor(1000);
  
    //write the username and the password
    // await crea.page.type('input[name="username"]', username, {
    //   delay: 50,
    // });
    // await crea.page.type('input[name="password"]', password, {
    //   delay: 50,
    // });

    // await crea.page.$eval("button[type='submit']", (el) => el.click());
    debugger;
  },
};

module.exports = crea;

