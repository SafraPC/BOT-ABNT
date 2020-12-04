//CONSULTA NACIONAL https://www.abntonline.com.br/consultanacional/default.aspx
//COMITÊS TÉCNICOS http://www.abnt.org.br/normalizacao/comites-tecnicos
const puppeteer = require("puppeteer");
const INITIAL_URL =
  "https://www.abntonline.com.br/consultanacional/default.aspx";

//rpItem  classList that we need to open and click in the element
async function abnt() {
  //Main function that will run the project

  //Put some functions over here for get the data

  /*
    async function getList(page) {
    const totalEvaluate = await page.evaluate(() => {
      const lis = document.querySelectorAll(".rpItem a.rpExpandable");
      const list = [].slice.call(lis, 0, 12);
      list.forEach(link =>{
        console.log(link.classList[2].toString());
        const teste = document.querySelectorAll(`${link.classList[2]}`);
        console.log(teste);
      }
      );
    });
    //  await totalEvaluate.map(link => {
    //     console.log(link);
    //  });
  }
  */ 

  async function getList(page) {
    const totalEvaluate = await page.evaluate(() => {
      const lis = document.querySelectorAll(".rpItem a.rpExpandable");
      const list = [].slice.call(lis, 0, 12);
      const teste = list.map(link =>{
        link
      });
      return teste;
    });
    console.log(await totalEvaluate);
    //  await totalEvaluate.map(link => {
    //     console.log(link);
    //  });
  }

  // async function getList(page,selector){
  //   const list = await page.$$eval(selector, links => links.map(link => link.innerText))
  //   list.splice(12,list.lenght-1);
  //   return list;
  //  }
  async function clickElement(page, selector) {
    const click = await page.$(selector);
    await click.click();
  }

  //Start a browser
  //Browser will open a new page
  //Page will go to a link.
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(INITIAL_URL);

  //Only list macrosetor labels
  //Can use:  a,span, ul, li
  // const listDiv = await getList(page,'#tabs-1 a')
  await getList(page);
  //List macrosetor labels and what have inside him
  //  await clickElement(page,'#tabs-1 a');

  // browser.close()
}
module.exports = abnt;
