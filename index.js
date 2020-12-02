const ig = require("./crea");

(async () => {
	await ig.init();
	await ig.login(process.env.LOGIN, process.env.PASSWORD);
	debugger;
})();
