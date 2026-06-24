module.exports = (eleventyConfig) => {
	const handlebars = require("handlebars");
	const fs = require("fs");
	const path = require("path");

	eleventyConfig.addExtension("hbs", {
		key: "hbs",
		compile: function (str) {
			let template = handlebars.compile(str);
			return (data) => template(data);
		},
	});

	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("src/robots.txt");
	eleventyConfig.addPassthroughCopy("src/favicon.png");
	eleventyConfig.addPassthroughCopy("src/admin/");

	handlebars.registerHelper("limit", function (arr, limit) {
		if (!Array.isArray(arr)) { return []; }
		return arr.slice(0, limit);
	});

	handlebars.registerHelper("isActive", function (pageUrl, link) {
		function normalize(u) {
			if (!u) return "/";
			u = String(u);
			u = u.split(/[?#]/)[0];
			if (!u.startsWith("/")) u = "/" + u;
			u = u.replace(/\/index\.html$/i, "");
			u = u.replace(/\/+$/g, "");
			return u === "" ? "/" : u;
		}

		return normalize(pageUrl) === normalize(link) ? "tab-active" : "";
	});

	handlebars.registerHelper("year", function () {
		return new Date().getFullYear();
	});

	handlebars.registerHelper("date", function (date) {
		return new Date(date).toDateString();
	});

	handlebars.registerHelper("dateISO", function (date) {
		return new Date(date).toISOString();
	});

	handlebars.registerHelper("reverse", function (arr) {
		return arr.reverse();
	});

	const includesDir = path.join(__dirname, "src", "_includes");
	if (fs.existsSync(includesDir)) {
		for (const file of fs.readdirSync(includesDir)) {
			if (file.endsWith(".hbs")) {
				const name = path.basename(file, ".hbs");
				const content = fs.readFileSync(path.join(includesDir, file), "utf8");
				handlebars.registerPartial(name, content);
			}
		}
	}

	return {
		dir: {
			input: "src",
		},
		templateFormats: ["hbs", "html", "liquid", "njk", "md", "11ty.js"],
		passthroughFileCopy: true,
	};
};
