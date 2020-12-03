//CONSULTA NACIONAL https://www.abntonline.com.br/consultanacional/default.aspx
//COMITÊS TÉCNICOS http://www.abnt.org.br/normalizacao/comites-tecnicos
const puppeteer = require("puppeteer");
const INITIAL_URL = "https://www.abntonline.com.br/consultanacional/default.aspx";

//rpItem  classList that we need to open and click in the element
async function abnt(){
  //Main function that will run the project

  //Put some functions over here for get the data

  // async function getList(page){
  // const totalEvaluate = await page.evaluate(()=>{
  //   const lis = document.querySelectorAll('.rpRootGroup li');
  //   console.log([].map.call(lis,(li)=>li.textContent));
  //   const list = [].map.call(lis,(li)=>li.textContent);
  //   return list;
  //  });
  // return totalEvaluate;
  // }


  async function getList(page,selector){
    const list = await page.$$eval(selector, links => links.map(link => link.innerText))
    return list;
   }
   async function clickElement(page,selector){
     const click = await page.$(selector);
     if(click){
       await click.click();
   
      }
   }

    //Start a browser
    //Browser will open a new page
    //Page will go to a link.
    const browser = await puppeteer.launch({headless:false})
    const page  = await browser.newPage();
    await page.goto(INITIAL_URL);
    
    
    
   
    //Onllist macrosetor labels
    //Can use a,span, ul, li
    const listDiv = await getList(page,'#tabs-1')
   //List macrosetor labels and what have inside him
     await clickElement(page,'#tabs-1');
   console.log(listDiv);



// browser.close()
}
module.exports = abnt;

