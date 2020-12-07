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
  const projetoMacrossetores = [];
  const mesclaMacrosetores = [];
  async function getList(page) {
    await page.evaluate(
      (macrossetores, projetoMacrossetores, mesclaMacrosetores) => {
        const lis = document.querySelectorAll(".rpItem .rpExpandable");
        //path ".rpSlide >.rpGroup > .rpLevel1 > .rpItem > .rpFirst > .rpLast > .rpLink > .rpOut > .rpText"
        // const lisParents = document.querySelectorAll(".rpSlide");
        const lisParents = document.querySelectorAll(".rpRootGroup > li");
        lis.forEach((link) => {
          link.click();
          macrossetores.push({
            macrossetor: link.textContent,
          });
        });
        lisParents.forEach((liParent) => {

		const teste = [].map.call(
				liParent.children[1].children[0].children,
				(child) => child.innerText
			  );

          projetoMacrossetores.push({
            comites: teste,
            
          });
			
	});
        for (let i = 0; i < macrossetores.length; ) {
          mesclaMacrosetores.push({
            macrossetor: macrossetores[i],
            projeto: projetoMacrossetores[i],
          });
          i++;
        }
        console.log(mesclaMacrosetores);
      },
      macrossetores,
      projetoMacrossetores,
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
