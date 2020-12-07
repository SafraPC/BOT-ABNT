//CONSULTA NACIONAL https://www.abntonline.com.br/consultanacional/default.aspx
//COMITÊS TÉCNICOS http://www.abnt.org.br/normalizacao/comites-tecnicos
const puppeteer = require("puppeteer");
const INITIAL_URL =
  "https://www.abntonline.com.br/consultanacional/default.aspx";

//rpItem  classList that we need to open and click in the element
async function abnt() {
  //Main function that will run the project

  //Put some functions over here for get the data
  const macrossetores = [];
  const abntMacrossetores = [];
  const mesclaMacrosetores = [];
  async function getList(page) {
    await page.evaluate(
      (macrossetores, abntMacrossetores, mesclaMacrosetores) => {
        const lis = document.querySelectorAll(".rpItem .rpExpandable");
        //path ".rpSlide >.rpGroup > .rpLevel1 > .rpItem > .rpFirst > .rpLast > .rpLink > .rpOut > .rpText"
        const lisT = document.querySelectorAll(".rpSlide");

        lis.forEach((link) => {
          link.click();
          macrossetores.push({
            macrossetor: link.textContent,
          });
        });
        lisT.forEach((linkT) => {
          abntMacrossetores.push({
            grupo: linkT.textContent,
		  });
        });
		for (let i = 0; i < macrossetores.length; ) {
            mesclaMacrosetores.push({
              macrossetor: macrossetores[i],
              grupo: abntMacrossetores[i],
            });
            i++;
          }
        console.log(mesclaMacrosetores);
      },
      macrossetores,
      abntMacrossetores,
      mesclaMacrosetores
    );
  }

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

  //Start the method
  await getList(page);

  //Only list macrosetor labels
  //Can use:  a,span, ul, li
  // const listDiv = await getList(page,'#tabs-1 a')

  //List macrosetor labels and what have inside him
  //  await clickElement(page,'#tabs-1 a');

  // browser.close()
}
module.exports = abnt;
