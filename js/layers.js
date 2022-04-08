addLayer("m", {
    name: "melge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ffe438",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "melge essence", // Name of prestige currency
    passiveGeneration() {
        x = false
        if (hasMilestone("i", 0)&&hasMilestone("p", 0)) x = true 
        return x},
        tabFormat: ["main-display",
        "prestige-button",
        "blank",
        "resource-display",

        "milestones",
        "blank",
        "upgrades",
        "blank",
        "blank",
        "blank", "blank"
    ],
    upgrades:{
        11:{
        title: "Melge Factor",
        description: "Kickstart the generation of fabric.",
        cost: new Decimal(1),     
        style() {                     
            if(hasUpgrade(this.layer, this.id)) return {
                'background-color': '#ffcb52' 
        }
    },
},
        21:{
    title: "Woven Thread",
    description: "Fabric boosts the creation of fabric.",
    cost: new Decimal(1),
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#ffcb52' 
    }
},
    effect() {
        let x = 2
        if (hasUpgrade(this.layer, 12)) x = 1.35
        return player.points.times(5).add(1).log(x).add(1)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    unlocked() {
        let unlocked1 = false
        if (hasUpgrade('m', 11)) unlocked1 = true
        return unlocked1
    }
    
        },
    22:{
    title: "Synergy",
    description: "Melge essence boosts the creation of fabric.",
    cost: new Decimal(3),
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#ffcb52' 
    }
},
    unlocked() {
        let unlocked1 = false
        if (hasUpgrade('m', 21)) unlocked1 = true
        return unlocked1
    },
    effect() {
        let x = new Decimal(1.25)
        y = new Decimal(0.9)
        z = new Decimal(player[this.layer].points.add(1))
        l = new Decimal (1.25)
        if (hasUpgrade(this.layer, 12)) x = new Decimal(1.35)
        if (hasUpgrade('i' , 22)) x = new Decimal(1.75)
        if (hasUpgrade('i' , 22)) l = new Decimal(1.05)
        if (hasUpgrade(this.layer, 31)) if (z>2000) y = new Decimal(y.div(z.log(l*1.6))) 
        return z.add(1).pow(x).log(l.pow(y))
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },

    23:{
        title: "Duality",
        description: "Fabric boosts melge essence gain.",
        cost: new Decimal(4),
        style() {                     
            if(hasUpgrade(this.layer, this.id)) return {
                'background-color': '#ffcb52' 
        }
    },
        unlocked() {
            let unlocked1 = false
            if (hasUpgrade('m', 22)) unlocked1 = true
            return unlocked1
        },
        effect() {
            let x = new Decimal(0.25)
            if (hasUpgrade(this.layer, 12)) x = new Decimal(0.3)
            y = new Decimal(1)
            z = new Decimal(1.45).div(player.points.max(1).log(2))
            if (hasUpgrade(this.layer, 32)) y = new Decimal(1.4), z = z.times(0.1) 
            return player.points.add(1).pow(x.times(y)).log(new Decimal(2).pow(z))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

            31:{
                title: "Cohesion",
                description: "Boosts the effect of Synergy past 2,000 melge essence.",
                cost: new Decimal(750),
                style() {                     
                    if(hasUpgrade(this.layer, this.id)) return {
                        'background-color': '#ffcb52' 
                }
            },
                unlocked() {
                    let unlocked1 = false
                    if (hasUpgrade('m', 22)) unlocked1 = true
                    return unlocked1
                },
                },
                32:{
                    title: "Alignment",
                    description: "Boosts the effect of Duality",
                    cost: new Decimal(850),
                    style() {                     
                        if(hasUpgrade(this.layer, this.id)) return {
                            'background-color': '#ffcb52' 
                    }
                },
                    unlocked() {
                        let unlocked1 = false
                        if (hasUpgrade('m', 23)) unlocked1 = true
                        return unlocked1
                    },
                    },
        12:{
            title: "Woven Fabric",
            description: "Melge upgrades 2, 3, and 4 all use a better formula.",
            cost: new Decimal(2),
            style() {                     
                if(hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffcb52' 
            }
        },

            unlocked() {
                let unlocked1 = false
                if (hasUpgrade('i', 21)) unlocked1 = true
                return unlocked1
            }
            
                },
    },

    baseResource: "fabric", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('m', 23)) mult = mult.times(upgradeEffect('m', 23))
        if (player.i.unlocked) mult = mult.times(player.i.points.add(1));
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for melge points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true}
    

})




// LAYER BREAK // LAYER BREAK // LAYER BREAK // LAYER BREAK //

//Layer I, or Improvements


addLayer("i", {
    name: "Improvements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#fff396",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Improvements", // Name of prestige currency
    canBuyMax() {return false},
    branches: ["m"],
		enGainMult() {
			let mult = new Decimal(1);
			return mult;
		},
        tabFormat: ["main-display",
        ["row",[
            ["column", [["display-text", function() {return "Your improvements are currently multiplying your fabric gain by " + Math.round(Number((Math.abs(player.i.points.add(1).pow(0.3)) * 100).toPrecision(15))) / 100 * Math.sign(player.i.points.add(1).pow(0.3)) + "x!"}]]]
        
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
        description: "Increase fabric gain based on number of quarks.",
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
        x = new Decimal(1500000)
        y = new Decimal(1)
        if (player.i.unlocked) y = player[this.layer].points.add(1).pow(1.5)
        x = x.times(y)
        return x }, // Can be a function that takes requirement increases into account
    baseResource: "fabric", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
        0: {requirementDescription: "1 Improvement",
            done() {return player.i.best.gte(1)}, // Used to determine when to give the milestone
            effectDescription() { s = "Fabric gain x5"
            if (hasMilestone('p', 0)) s = "Gain 100% of melge essence gain/s"
            return s
        } 
        }
    },
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],


    layerShown(){return true}
    

})
addLayer("p", {
    name: "Photons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ffffff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
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
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
    tabFormat: ["main-display",
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
		],
        
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

