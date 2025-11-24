module.exports = (eleventyConfig) => {
	const handlebars = require("handlebars");
	eleventyConfig.setLibrary("hbs", handlebars);

	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("src/robots.txt");
	eleventyConfig.addPassthroughCopy("src/favicon.png");
	eleventyConfig.addPassthroughCopy("src/admin/");

	eleventyConfig.addHandlebarsHelper('limit', function (arr, limit) {
		if (!Array.isArray(arr)) { return []; }
		return arr.slice(0, limit);
	  });

	// helper to set `tab-active` on the current nav link
	eleventyConfig.addHandlebarsHelper('isActive', function (pageUrl, link) {
		function normalize(u) {
			if (!u) return "/";
			u = String(u);
			// strip query and hash
			u = u.split(/[?#]/)[0];
			if (!u.startsWith("/")) u = "/" + u;
			// remove trailing index.html
			u = u.replace(/\/index\.html$/i, "");
			// remove trailing slashes
			u = u.replace(/\/+$/g, "");
			return u === "" ? "/" : u;
		}

		return normalize(pageUrl) === normalize(link) ? "tab-active" : "";
	});

	eleventyConfig.addPairedShortcode("year", function () {
		return new Date().getFullYear();
	});
	eleventyConfig.addPairedShortcode("date", function (_, date) {
		return new Date(date).toDateString();
	});
	eleventyConfig.addPairedShortcode("dateISO", function (_, date) {
		return new Date(date).toISOString();
	});

	eleventyConfig.addPairedShortcode("reverse", function (_, arr) {
		return arr.reverse();
	});
	return {
		dir: {
			input: "src",
		},
		passthroughFileCopy: true,
	};
};
