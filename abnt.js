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

  const browser = await puppeteer.launch({ headless: true, devtools: true });
  const page = await browser.newPage();
  await page.goto(SECUNDARY_URL);

  //For get with filter
  //   const page2 = await browser.newPage();
  //   await page2.goto(INITIAL_URL);

  async function getList(page) {
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

      await delay(1500);
      //get projects
      let abntProjects = [
        ...document.querySelectorAll(
          "#ctl00_ContentPlaceHolder1_gridProjeto_ctl00 > tbody > tr"
        ),
      ];
      abntProjects.forEach((project) => {
        getProjects.push({
          macrossetor: project.children[3].innerText,
          comite: project.children[2].innerText,
          project: {
            numero: project.children[0].innerText,
            titulo: project.children[1].innerText,
            data: project.children[4].innerText,
            link: project.children[1].children[0].href,
          },
        });
      });
      //principal array
      getProjects.push({ ativos: getProjects.length });
      getProjects.shift();

      return getProjects;
    });
    const unique = getProjectsFunc.filter(
      ((set) => (f) => !set.has(f.macrossetor) && set.add(f.macrossetor))(
        new Set()
      )
    );
    //Try to get and desmenber all data
    let getMacrossetor = [];
    let gettingProject = [];
    let getScript = [];
    //put only macrossetor in a array
    unique.forEach((item) => {
      getMacrossetor.push({ macrossetor: item.macrossetor });
    });
    let stop = false;
    for (let i = 0; i <= getProjectsFunc.length; ) {
      if (stop === false) {
        for (let j = 0; j <= getMacrossetor.length - 1; ) {
          stop = true;
          if (getMacrossetor[j].macrossetor === undefined) {
            break;
          }
          if (
            getProjectsFunc[i].macrossetor === getMacrossetor[j].macrossetor
          ) {
            //getting projects into respective macrossetor
              gettingProject.push({project:getProjectsFunc[i]});
            i++;
          } else {
              if(getProjectsFunc[i-1].macrossetor === getMacrossetor[j].macrossetor){
                  getScript.push({macrossetor:getProjectsFunc[i-1].macrossetor,gettingProject});
                  gettingProject = [];
              }
            //  console.log(getMacrossetor[j].macrossetor);
            //already take all projects, pass to other macrossetor
            j++;
          }
        }
      } else {
        break;
      }
      console.log(JSON.stringify(getScript,null,2));
    }

    //array who get all and pass for a json file
   

    // let getScripts = JSON.stringify(getProjectsFunc, null, 2);
    // console.log(getScripts);

    //atribuate some data in filters
    // macrossetoresFunc.forEach((e) => {
    //   let getMacrossetorIndex = e.macrossetor;
    //   let getFilterIndex = e.filter;
    //   let indexMacro = getMacrossetorIndex.replace(/\D/g, "");
    //   let indexFilt = getFilterIndex.replace(/\D/g, "");
    //   console.log("indexMacro :" + indexMacro);
    //   console.log("indexFilter :" + indexFilt);
    // });

    //getting fitlters

    // const macrossetoresFunc = await page2.evaluate(async () => {
    //   const lisParents = [
    //     ...document.querySelectorAll("#tabs-1 .rpRootGroup > li"),
    //   ];
    //   const macrossetores = [];
    //   lisParents.forEach((liParent) => {
    //     macrossetores.push({
    //       macrossetor: liParent.children[0].innerText,
    //       filter: [].map.call(
    //         liParent.children[1].children[0].children,
    //         (child) => child.innerText
    //       ),
    //     });
    //   });
    //   return macrossetores;
    // });

    //Data passing
    // console.log(macrossetoresFunc);
  }

  //Start the method
  await getList(page);
}
module.exports = abnt;
