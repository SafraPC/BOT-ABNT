//CONSULTA NACIONAL https://www.abntonline.com.br/consultanacional/default.aspx
//COMITÊS TÉCNICOS http://www.abnt.org.br/normalizacao/comites-tecnicos
const puppeteer = require("puppeteer");
const INITIAL_URL =
  "https://www.abntonline.com.br/consultanacional/default.aspx";

//rpItem  classList that we need to open and click in the element
async function abnt() {
  //Main function that will run the project
  //Put some functions over here for get the data

  async function getList(page) {
    const macrossetores = await page.evaluate(() => {
      const macrossetores = [];
      const lisParents = document.querySelectorAll(".rpRootGroup > li");

      lisParents.forEach((liParent) => {
        console.log(
          [].map.call(
            liParent.children[1].children[0].children,
            (child) => child.innerText
          )
        );
        // macrossetores.push({
        //   title: liParent.children[0].innerText,
        //   comite: [].map.call(
        //     liParent.children[1].children[0].children,
        //     (child) => child.innerText
        //   ),
        // });
      });
      return macrossetores;
    });
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
