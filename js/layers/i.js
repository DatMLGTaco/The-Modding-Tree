addLayer("i", {
    name: "Improvers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#fff396",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Improvers", // Name of prestige currency
    canBuyMax() {return false},
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("ee", 2))  keep.push("milestones"), keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("i", keep)
    },
    branches: ["m"],
		enGainMult() {
			let mult = new Decimal(1);
            if (player.ee.unlocked) mult = mult.times(tmp.ee.waterEff)
			return mult;
		},
        improverEff(){
        eff = new Decimal(1)
        x = new Decimal(50)
        if (player.ee.unlocked) x = x.times(tmp.ee.earthEff)
        if (player.i.points.times(50).pow(0.5) >= 1) eff = player.i.points.times(x).pow(0.5)

        return eff

        },
        tabFormat: ["main-display",
        ["row",[
            ["column", [["display-text", function() {return "Your Improvers are currently multiplying your fabric gain by " + formatWhole(tmp.i.improverEff.times(upgradeEffect("i", 11))) + "x!"}]]]
        
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
        title: "Improver improver",
        description: "Further increase fabric gain based on number of Improvers.",
        cost: new Decimal(10), 
        effect() {
            x = new Decimal(1)
            if (hasAchievement("a", 14)) x = x.div(player.i.points.div(1000).max(1))
            return player[this.layer].points.add(1).times(1.2).pow(new Decimal(0.85).pow(x))
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
    cost: new Decimal(300), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
}
  },
  22:{
    title: "Immaterial Fabrication",
    description: "Improvers cheapen the fabrication of melge essence",
    cost: new Decimal(6000), 
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
        0: {requirementDescription: "1e11 Improvers",
        done() {return player.i.best.gte(1e11)}, // Used to determine when to give the milestone
        effectDescription() { s = "Keep Melge Fabricators on all resets."
        if (hasMilestone('p', 0)) s = "The Melge Layer does not reset on layer 2 resets."
        return s
    }, 
    unlocked () {x = false; if (player.i.best > 1000000000) x = true; return x},
    }
    },
    hotkeys: [
        {key: "i", description: "I: Reset for Improvers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],


    layerShown(){return true}
    

})