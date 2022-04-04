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
    resetsNothing() { return hasUpgrade("q", 3)},
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
    cost: new Decimal(2),
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#ffcb52' 
    }
},
    effect() {
        let x = 2
        if (hasUpgrade(this.layer, 12)) x = 1.45
        return player.points.add(1).log(x).add(1)
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
        let x = 0.5
        if (hasUpgrade(this.layer, 12)) x = 0.55
        return player[this.layer].points.add(1).pow(x)
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
            let x = 0.15
            if (hasUpgrade(this.layer, 12)) x = 0.175
            return player.points.add(1).pow(x)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
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
                if (hasUpgrade('m', 11, 'q', 21)) unlocked1 = true
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    resetsNothing() { return hasMilestone("q", 2)&&player.ma.current!="m" },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for melge points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
    

})
addLayer("q", {
    name: "Quarks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#ff91e9",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "quarks", // Name of prestige currency
    canBuyMax() {return false},
    branches: ["m"],
		enGainMult() {
			let mult = new Decimal(1);
			return mult;
		},
    upgrades:{
        11:{
        title: "Subatomic Breakthrough",
        description: "Vastly increase fabric gain based on number of quarks.",
        cost: new Decimal(1), 
        effect() {
            return player[this.layer].points.add(1).times(5).pow(0.85)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },    
        style() {                     
            if(hasUpgrade(this.layer, this.id)) return {
                'background-color': '#fbbfff' 
    }
  }
},
21:{
    title: "Melge Integration",
    description: "Unlock two new melge upgrades.",
    cost: new Decimal(3), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#fbbfff' 
}
}
  },
  22:{
    title: "Immaterial Fabrication",
    description: "Melge resets no longer reset anything.",
    cost: new Decimal(3), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#fbbfff' 
}
}
  },
    },
    requires() { return new Decimal(1500).times((player.q.unlockOrder&&!player.q.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    baseResource: "fabric", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('q', 23)) mult = mult.times(upgradeEffect('q', 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
    

})
addLayer("l", {
    name: "Leptons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#a2ff91",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "leptons", // Name of prestige currency
    canBuyMax() {return false},
    branches: ["m"],
		enGainMult() {
			let mult = new Decimal(1);
			return mult;
		},
    upgrades:{
        11:{
        title: "Subatomic Breakthrough",
        description: "Vastly increase fabric gain based on number of leptons.",
        cost: new Decimal(1), 
        effect() {
            return player[this.layer].points.add(1).times(5).pow(0.85)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },    

},
21:{
    title: "Melge Integration",
    description: "Unlock a new melge upgrade.",
    cost: new Decimal(3), 

  },
  22:{
    title: "Immaterial Fabrication",
    description: "Melge resets no longer reset anything.",
    cost: new Decimal(3), 

  },
    },
    requires() { return new Decimal(1500).times((player.q.unlockOrder&&!player.q.unlocked)?5000:1) }, // Can be a function that takes requirement increases into account
    baseResource: "fabric", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('q', 23)) mult = mult.times(upgradeEffect('q', 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
    

})

