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
  const page = await browser.newPage();
  await page.goto(SECUNDARY_URL);
  const page2 = await browser.newPage();
  await page2.goto(INITIAL_URL);

  async function getList(page, page2) {
    //Try to get project´s by all project page
    const getProjectsFunc = await page.evaluate(async () => {
      const getOrderClick = document.querySelector(
        "#ctl00_ContentPlaceHolder1_gridProjeto_ctl00 > thead > tr > th:nth-child(4) > a"
      );

      function delay(time) {
        return new Promise(function (resolve) {
          setTimeout(resolve, time);
        });
      }

      await getOrderClick.click();
      //need to wait a little bit
      const getProjects = [];

      await delay(4000);
      //get projects
      let abntProjects = [
        ...document.querySelectorAll(
          "#ctl00_ContentPlaceHolder1_gridProjeto_ctl00 > tbody > tr"
        ),
      ];
      abntProjects.forEach((project) => {
        getProjects.push({
          macrossetor: project.children[3].innerText,
          comite: {
            title: project.children[2].innerText,
            projeto: {
              titulo: project.children[1].innerText,
              numero: project.children[0].innerText,
              data: project.children[4].innerText,
              link: project.children[1].children[0].href,
            },
          },
        });
      });
      //remove an index " " of array
      await delay(1000);
      function checkUndefined(parameter) {
        return parameter.macrossetor.trim() === "";
      }
      let getIndex = getProjects.findIndex(checkUndefined);
      console.log(getIndex);
      getProjects.splice(getIndex, getIndex);

      return getProjects;
    });
    getProjectsFunc.push({ ativos: getProjectsFunc.length });
    const unique = getProjectsFunc.filter(
      ((set) => (f) => !set.has(f.macrossetor) && set.add(f.macrossetor))(
        new Set()
      )
    );

    unique.shift();

    //getting fitlters
    const macrossetoresFunc = await page2.evaluate(async () => {
      const lisParents = [
        ...document.querySelectorAll("#tabs-1 .rpRootGroup > li"),
      ];
      const macrossetores = [];
      lisParents.forEach((liParent) => {
        macrossetores.push({
          macrossetor: liParent.children[0].innerText,
          filter: [].map.call(
            liParent.children[1].children[0].children,
            (child) => child.innerText
          ),
        });
      });
      return macrossetores;
    });

    //Data passing
    console.log(JSON.stringify(unique, null, 2));
    console.log(macrossetoresFunc);
  }

  //Start a browser
  //Browser will open a new page
  //Page will go to a link.

  //Start the method
  await getList(page, page2);
  // browser.close()
}
module.exports = abnt;
