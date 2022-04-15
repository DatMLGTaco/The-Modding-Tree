addLayer("i", {
    name: "Improvers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#fff396",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Improvers", // Name of prestige currency
    canBuyMax() {return false},
    branches: ["m"],
		enGainMult() {
			let mult = new Decimal(1);
			return mult;
		},
        tabFormat: ["main-display",
        ["row",[
            ["column", [["display-text", function() {return "Your Improvers are currently multiplying your fabric gain by " + formatWhole(Math.round(Number((Math.abs(player.i.points.max(1).times(50).pow(0.99)) * 100).toPrecision(15))) / 100 * Math.sign(player.i.points.add(1).pow(0.3))) + "x!"}]]]
        
        ]
                ],
        "blank",
        "prestige-button",
        "blank",
        "resource-display",
        "blank",
        "milestones",
        "blank",
        "upgrades",
        "blank",
        "blank",
        "blank", "blank"
    ],
    upgrades:{
        11:{
        title: "Subatomic Breakthrough",
        description: "Further increase fabric gain based on number of Improvers.",
        cost: new Decimal(1), 
        effect() {
            return player[this.layer].points.add(1).times(5).pow(0.85)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },    
        style() {                     
            if(hasUpgrade(this.layer, this.id)) return {
                'background-color': '#e8e0a0' 
    }
  }
},
21:{
    title: "Melge Integration",
    description: "Unlock a new melge upgrade.",
    cost: new Decimal(3), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
}
  },
  22:{
    title: "Immaterial Fabrication",
    description: "Melge essence boost to fabric exponentially increased.",
    cost: new Decimal(3), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
},
    effect() {
        x = new Decimal(player.p.points.add(1))
        return x.pow(1.1)

    }
  },
    },
    requires() {
        x = new Decimal(1e9)
        y = new Decimal(1)
        if (player.i.unlocked) y = player[this.layer].points.add(1).pow(1.5)
        x = x.times(y)
        return x }, // Can be a function that takes requirement increases into account
    baseResource: "fabric", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('i', 23)) mult = mult.times(upgradeEffect('i', 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    milestones: {
        0: {requirementDescription: "20,000,000 Improvers",
        done() {return player.i.best.gte(20000000)}, // Used to determine when to give the milestone
        effectDescription() { s = "Keep Melge Fabricators on all resets."
        if (hasMilestone('p', 0)) s = "The Melge Layer does not reset on layer 2 resets."
        return s
    }, 
    unlocked () {x = false; if (player.i.best > 10000000) x = true; return x},
    }
    },
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],


    layerShown(){return true}
    

})