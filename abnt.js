//CONSULTA NACIONAL https://www.abntonline.com.br/consultanacional/default.aspx
//COMITÊS TÉCNICOS http://www.abnt.org.br/normalizacao/comites-tecnicos
const puppeteer = require("puppeteer");
const INITIAL_URL = "https://www.abntonline.com.br/consultanacional/default.aspx";

async function abnt(){
const browser = await puppeteer.launch({
  headless: false,
})
const page  = await browser.newPage();
await page.goto(INITIAL_URL);
}

abnt();



module.exports = abnt;

