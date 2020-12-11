//CONSULTA NACIONAL https://www.abntonline.com.br/consultanacional/default.aspx
//COMITÊS TÉCNICOS http://www.abnt.org.br/normalizacao/comites-tecnicos

const puppeteer = require("puppeteer");
const INITIAL_URL =
  "https://www.abntonline.com.br/consultanacional/default.aspx";
const SECUNDARY_URL =
  "https://www.abntonline.com.br/consultanacional/projetat.aspx";
//rpItem  classList that we need to open and click in the element
async function abnt() {
  //Main function that will run the project
  //Put some functions over here for get the data

  const browser = await puppeteer.launch({ headless: false, devtools: true });
  // const page = await browser.newPage();
  const secondary_page = await browser.newPage();
  // await page.goto(INITIAL_URL);
  await secondary_page.goto(SECUNDARY_URL);

  async function getList(secondary_page) {
    //Trying get projects by comite in primary url

    // const runInProjects = await page.evaluate(async () => {
    //   const testing = [
    //     ...document.querySelectorAll("#tabs-1 .rpRootGroup > li"),
    //   ];

    //   let getArrayProject = [];
    //   testing.forEach((liParent) => {
    //     getArrayProject.push(
    //       [].map.call(
    //         liParent.children[1].children[0].children,
    //         (child) => child
    //       )
    //     );
    //   });
    //   for (variant of testing) {
    //     variant.children[0].click();
    //   }
    //   for (const liParent of getArrayProject) {
    //     for (const child of liParent) {
    //       await new Promise((resolve) => {
    //         setTimeout(resolve, 400);
    //       });
    //       await child.children[0].click();
    //     }
    //   }
    // });

    //Try to get project´s by all project page

    await secondary_page.evaluate(async () => {
      const getOrderClick = document.querySelector(
        "#ctl00_ContentPlaceHolder1_gridProjeto_ctl00 > thead > tr > th:nth-child(4) > a"
      );
      await getOrderClick.click();

      //get projects
      setTimeout(() => {
        const abntProjects = [
          ...document.querySelectorAll(
            "#ctl00_ContentPlaceHolder1_gridProjeto_ctl00 > tbody > tr"
          ),
        ];
        const getProjects = [];
        abntProjects.forEach((project) => {
          console.log(project.children[3].innerText);
          // console.log(project.innerText);
        });
      }, 3000);
    });

    // const macrossetoresFunc = await page.evaluate(async () => {
    //   const lisParents = [
    //     ...document.querySelectorAll("#tabs-1 .rpRootGroup > li"),
    //   ];
    //   const macrossetores = [];
    //   lisParents.forEach((liParent) => {
    //     macrossetores.push({
    //       macrossetor: liParent.children[0].innerText,
    //       comite: [].map.call(
    //         liParent.children[1].children[0].children,
    //         (child) => child.innerText
    //       ),
    //     });
    //   });
    //   return macrossetores;
    // });
    // console.log(macrossetoresFunc);
  }

  //Start a browser
  //Browser will open a new page
  //Page will go to a link.

  //Start the method
  await getList(secondary_page);

  //Only list macrosetor labels
  //Can use:  a,span, ul, li
  // const listDiv = await getList(page,'#tabs-1 a')

  //List macrosetor labels and what have inside him
  //  await clickElement(page,'#tabs-1 a');

  // browser.close()
}
module.exports = abnt;
