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
	async function getList(page) {
		const macros = await page.evaluate((macrossetores) => {
			const lists = document.querySelectorAll("li.rpItem");
			const lis = document.querySelectorAll(".rpItem .rpExpandable");
			
			 lis.forEach((link) => {
        
				console.log(link.innerText);
				link.click();
					// // const as = document.querySelector(`${link} a`);
					// console.log(as);
					
					// macrossetores.push({ macrossetor: link.innerText });
				}); ;

		}, macrossetores);
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

	//Only list macrosetor labels
	//Can use:  a,span, ul, li
	// const listDiv = await getList(page,'#tabs-1 a')
   await getList(page);
 
	//List macrosetor labels and what have inside him
	//  await clickElement(page,'#tabs-1 a');

	// browser.close()
}
module.exports = abnt;