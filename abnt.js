//CONSULTA NACIONAL https://www.abntonline.com.br/consultanacional/default.aspx
//COMITÊS TÉCNICOS http://www.abnt.org.br/normalizacao/comites-tecnicos
const puppeteer = require("puppeteer");
const INITIAL_URL = "https://www.abntonline.com.br/consultanacional/default.aspx";

//rpItem  classList that we need to open and click in the element
async function abnt(){
  //Main function that will run the project

  //Put some functions over here for get the data
  async function getList(page){
  const totalEvaluate = await page.evaluate(()=>{
    const lis = document.querySelectorAll('.rpRootGroup li');
    console.log([].map.call(lis,(li)=>li.textContent));
    const list = [].map.call(lis,(li)=>li.textContent);
    return list;
   });
  return totalEvaluate;
  }
    //Start a browser
    //Browser will open a new page
    //Page will go to a link.
    const browser = await puppeteer.launch({headless:false})
    const page  = await browser.newPage();
    await page.goto(INITIAL_URL);
    const list = await getList(page)
    console.log(list);

    


// browser.close()
}
module.exports = abnt;

