addLayer("p", {
    name: "Photons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    resource: "Photons", // Name of prestige currency
    canBuyMax() {return false},
    branches: ["m"],
		enGainMult() {
			let mult = new Decimal(1);
			return mult;
		},
    upgrades:{
        11:{
        title: "Subatomic Breakthrough",
        description: "Increase fabric gain based on number of photons.",
        cost: new Decimal(1), 
        effect() {
            return player[this.layer].points.add(1).times(5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },    

},

    },
    requires() {
        x = new Decimal(1500000)
        y = new Decimal(1)
        if (player[this.layer].unlocked) y = player[this.layer].points.add(1).pow(1.5)
        if (player[this.layer].points>=10) y=y.times(x)
        x = x.times(y)
        return x }, // Can be a function that takes requirement increases into account
    baseResource: "fabric", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
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
        0: {requirementDescription: "1 Photon",
            done() {return player.p.best.gte(1)}, // Used to determine when to give the milestone
            effectDescription() { s = "Melge upgrades don't reset on all resets on this layer or below."
            return s
        } 
        },
        1: {requirementDescription: "10 Photons",
        done() {return player.p.best.gte(10)}, // Used to determine when to give the milestone
        effectDescription() { s = "Unlock the Photon Bar"
        return s
    } 
    }
    },
    tabFormat() { if (player.p.points < 10) return ([["main-display"],
            "main-display",
            "prestige-button",
			"resource-display",
			"blank",
			"milestones",
			"blank",
            ["bar", "PhotonicSlider"],
            "blank",
            "blank",
			"upgrades",

			"blank", "blank"
		]
    )
        if (player.p.points > 9)  return ([
            "main-display",
        "resource-display",
        "blank",
        ["bar", "PhotonicSlider"],
        "buyables",
        "blank",
        "blank",
        "upgrades",

        "blank", "blank"
    ]
)

    },
        
    bars: {
        PhotonicSlider: {
            direction: RIGHT,
            width: 750,
            height: 50,
            progress() { return player[this.layer].points/10 },
            unlocked: true,
            fillStyle() {
                x = {'background-color': '#0F0F0F'}
                let rgb = Math.ceil(255*tmp.p.bars.PhotonicSlider.progress) 
                return {"background-color": ("rgb("+rgb+", "+rgb+", "+rgb+")") } },
        },
    
    },
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    style() {
        x = {'background-color': '#0F0F0F'}
        let rgb = Math.ceil(5*player[this.layer].points) 
        if (rgb>100) rgb= Math.ceil(100+player[this.layer].points^0.3)
        if (rgb>150) rgb= 150
        return {"background-color": ("rgb("+rgb+", "+rgb+", "+rgb+")") } },
    layerShown(){return true}
    

})