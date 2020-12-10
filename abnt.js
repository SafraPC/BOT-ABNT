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
    const macrossetoresFunc = await page.evaluate(async () => {
      const lisParents = [
        ...document.querySelectorAll("#tabs-1 .rpRootGroup > li"),
      ];
      const macrossetores = [];
      /*
     
      console.log(lisObjective);
      for (variant of lisObjective) {
        console.log(variant.children[0]);
        await variant.children[0].click();

    const macrossetores = [];
      console.log(lisObjective);
      for (variant of lisObjective) {
        await new Promise((resolve) => {
          setTimeout(resolve, 2500);
        });
        console.log(variant.children[0]);
        await variant.click();
      }

      }*/

      for (variant of lisParents) {
        variant.children[0].click();
      }

      let getArrayProject = [];
      lisParents.forEach((liParent) => {
        getArrayProject.push(
          [].map.call(
            liParent.children[1].children[0].children,
            (child) => child
          )
        );
      });
      // console.log(getArrayProject);
      // getArrayProject.forEach((liParent, i) => {
      //   liParent.forEach((child) => {
      //     await new Promise((resolve) => {
      //       setTimeout(resolve, 2500);
      //     });
      //     child.children[0].click();
      //     console.log("meu cu");
      //   });
      // });
      for (const liParent of getArrayProject) {
        for (const child of liParent) {
          await new Promise((resolve) => {
            setTimeout(resolve, 2500);
            child.children[0].click();
          });
          console.log(child.children[0]);
        }
      }
      lisParents.forEach((liParent) => {
        macrossetores.push({
          title: liParent.children[0].innerText,
          comite: [].map.call(
            liParent.children[1].children[0].children,
            (child) => child.innerText
          ),
        });
      });
      return macrossetores;
    });
    console.log(macrossetoresFunc);
  }

  //Start a browser
  //Browser will open a new page
  //Page will go to a link.
  const browser = await puppeteer.launch({ headless: false, devtools: true });
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
