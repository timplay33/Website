module.exports = (eleventyConfig) => {
	const handlebars = require("handlebars");
	eleventyConfig.setLibrary("hbs", handlebars);

	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("src/robots.txt");
	eleventyConfig.addPassthroughCopy("src/favicon.png");

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
