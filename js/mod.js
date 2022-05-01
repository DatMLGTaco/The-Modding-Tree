let modInfo = {
	name: "The Melge Tree",
	id: "melge011",
	author: "The Melge",
	pointsName:"fabric",
	modFiles: ["layers/i.js", "layers/p.js", "layers/m.js", "layers/ma.js", "layers/ee.js", "layers/sp.js", "tree.js", "nodes/achievements.js"],


	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Genesis",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Melge Tree Created.<br>
		- Removed 💀.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (!hasUpgrade('m', 11)) gain = new Decimal(0) 
	if (hasUpgrade('m', 21)) gain = gain.times(upgradeEffect('m', 21))
	if (hasUpgrade('m', 22)) gain = gain.times(upgradeEffect('m', 22))
	if (hasUpgrade('i', 11)) gain = gain.times(upgradeEffect('i', 11))
	if (hasUpgrade('p', 11)) gain = gain.times(upgradeEffect('p', 11))
	if (hasAchievement("a", 21)) gain = gain.times(1.1)
	if (hasAchievement("a", 31)) gain = gain.times(1.1)
	if (hasAchievement("a", 32)) gain = gain.times(1.1)
	if (hasMilestone('i', 0)) gain = gain.times(5)
	if (hasMilestone('p', 1)) gain = gain.times(tmp.p.powerEff)
	if (player.ee.unlocked) gain = gain.times(tmp.ee.fireEff)
	if (player.i.unlocked) gain = gain.times(tmp.i.improverEff);
	return gain
}
// Display extra things at the top of the page
var displayThings = [


]
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}