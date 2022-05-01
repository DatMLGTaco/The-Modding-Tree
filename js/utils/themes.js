// ************ Themes ************
var themes = ["default","lightmode"]

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#8c8570",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},



	lightmode: {
		1: "#00FF00",
		2: "#FF0000",
		3: "#0000FF",
		color: "#FF00FF",
		points: "#FFFF00",
		locked: "#00FFFF",
		background: "#B00BEE",
		background_image: "https://tenor.com/view/le-fishe-au-chocolat-gif-24351030",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		
	},
}

function changeTheme() {

	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background_image', colors_theme["background_image"]);
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
}
function getThemeName() {
	return options.theme? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
		options.theme = themes[1];
	}
	changeTheme();
	resizeCanvas();
}
