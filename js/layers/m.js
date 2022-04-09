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
        x = new Decimal(1)
        if(getBuyableAmount(this.layer, 11) > 0 ) x = x.times(getBuyableAmount(this.layer, 11).add(1).log(2))
        return x 
    },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for melge points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true},


    buyables: {
        11: {
            title: "Melge Fabricator",
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) x = x.pow(2).div(25)
                let cost = Decimal.pow(2, x.add(6.000000069).pow(1.69))
                return cost.floor()
            },
//leave this space herea
//what
            display() { return "\n" + "\n Amount: " + getBuyableAmount(this.layer, this.id) + " Melge Fabricators" +"\nCost: " + formatWhole(this.cost(getBuyableAmount(this.layer, this.id)))},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            style: {'height':'122px'},
            buy() { //amonger type beat
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                x = false
                if(hasUpgrade('i', 22)) x = true
                return x
            },
        },
    },
    tabFormat: ["main-display",
    "prestige-button",
    "resource-display",

    "milestones", //who's mile?
    //im mile(
//mile long datmlgfingering your datmlgmom😏)
    "blank",
    "upgrades", 
    /*"blank,"*/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          "blank",
   /**/ "blank"/**/,
    "buyables",

    "blank", "blank"
],


})