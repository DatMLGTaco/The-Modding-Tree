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
        
        let gen = new Decimal(0)
        if(getBuyableAmount(this.layer, 11) > 0 ) gen = tmp.m.buyables[11].effect
        return gen
    },
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
    cost: new Decimal(1.5e8),
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
        let x = 3.5
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
        let x = new Decimal(1.35)
        y = new Decimal(0.8)
        z = new Decimal(player[this.layer].points.add(1))
        l = new Decimal (2.25)
        if (hasUpgrade(this.layer, 12)) x = new Decimal(1.5)
        if (hasUpgrade('i' , 22)) x = new Decimal(1.75)
        if (hasUpgrade('i' , 22)) l = new Decimal(1.15)
        if (hasUpgrade(this.layer, 31)) if (z>=50) y = new Decimal(y.div(z.log(l*1.6))) 
        eff = z.pow(x).log(l.pow(y)).max(1)
        if (hasUpgrade('m', 32)) eff = eff.times(upgradeEffect('m', 23))
        return eff
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
    },

    23:{
        title: "Duality",
        description: "Fabric boosts melge essence gain.",
        cost: new Decimal(10),
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
            z = new Decimal(1.45).div(player.points.max(1).log(2).max(1))
            if (hasUpgrade(this.layer, 32)) y = new Decimal(1.4), z = z.times(0.1)
            let i = new Decimal(1).plus(player.points.add(1).pow(x.times(y)).log(new Decimal(2).pow(z))).max(1).div(3)
            if (i < 1) i = 1
            return i
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

    31:{
        title: "Cohesion",
        description: "Boosts the effect of Synergy past 50 melge essence.",
        cost: new Decimal(75),
        style() {                     
            if(hasUpgrade(this.layer, this.id)) return {
                'background-color': '#ffcb52' 
                }
            },
        unlocked() {
            let unlocked1 = false
            if (hasUpgrade('m', 22)&&hasUpgrade("i", 303)) unlocked1 = true
            return unlocked1
        },
        },
    32:{
        title: "Alignment",
        description: "Boost the effects of Duality and Duality boosts Synergy.",
        cost: new Decimal(120),
        style() {                     
            if(hasUpgrade(this.layer, this.id)) return {
                'background-color': '#ffcb52' 
        }
    },
        unlocked() {
            let unlocked1 = false
            if (hasUpgrade('m', 23)&&hasUpgrade("i", 304)) unlocked1 = true
            return unlocked1
        },
        },

    },
    automate(){
        //if(player.tab == "m") makeParticles(coolParticle)
        if (hasMilestone('sp', 0)){
            if (canReset(this.layer)&&player.p.points<10) doReset(tmp.p.layer)
            if (canBuyBuyable("p", 11)) buyBuyable("p", 11)
        }

    },
/*    milestones: {
      
            0: {requirementDescription: "150 Melge Essence",
                done() {return player.m.buyables[11].gte(5)}, // Used to determine when to give the milestone,
                effectDescription() { s = "Melge Fabricators add to the melge essence multiplier" ; return s } ,
                unlocked() {
                    let unlocked1 = false
                    if (hasUpgrade('m', 23)&&(getBuyableAmount(this.layer, 11) > 3 )) unlocked1 = true
                    return unlocked1
                },
                style() { if (hasMilestone('m', 0)){
                    g = 100 - Math.ceil(6*getBuyableAmount(this.layer, 11)) 
                    b = 50 - Math.ceil(3*getBuyableAmount(this.layer, 11)) 
                    r = 100 + Math.ceil(10*getBuyableAmount(this.layer, 11)) 
                    if (b<1) b = 0
                    if (g<1) g = 0
                    if (r<101) r = 100, g = 100, b= 100
                    if(r>254) r = 255  } else {
                    g = 50 + Math.ceil(2*getBuyableAmount(this.layer, 11)) 
                    b = 50 + Math.ceil(2*getBuyableAmount(this.layer, 11)) 
                    r = 50 + Math.ceil(2*getBuyableAmount(this.layer, 11)) 
                    if (b<1) b = 0
                    if (g<1) g = 0
                    if (r<50) r = 50, g = 50, b= 50 
                    if(r>254) r = 255
                    }
                    return {"background-color": ("rgb("+r+", "+g+", "+b+")") } }, 
            },
            
        51:{

    
    
            style() { 
                g = 100 - Math.ceil(10*getBuyableAmount(this.layer, 11)) 
                b = 50 - Math.ceil(10*getBuyableAmount(this.layer, 11)) 
                r = 100 + Math.ceil(10*getBuyableAmount(this.layer, 11)) 
                if (b<1) b = 0
                if (g<1) g = 0
                if (r<101) r = 100, g = 100, b= 100
                if(r>254) r = 255  
                return {"background-color": ("rgb("+r+", "+g+", "+b+")") } }, 
            unlocked() {
                let unlocked1 = false
                if (hasUpgrade('m', 23)&&(getBuyableAmount(this.layer, 11) > 4 )) unlocked1 = true
                return unlocked1
            },
            }, 
    }, 	*/	
    doReset(resettingLayer) {
        let keep = [];
        let keepupgrades = [];

        if (hasUpgrade("i", 101)) keepupgrades.push(11)
        if (hasUpgrade("i", 201)) keepupgrades.push(21,22,23)
        if (hasUpgrade("i", 202)) keepupgrades.push(12)
        if (hasUpgrade("i", 303)) keepupgrades.push(31)
        if (hasUpgrade("i", 304)) keepupgrades.push(32)
        if (hasMilestone("i", 0)) keep.push("milestones")
        if (hasMilestone("ee", 1))keep.push("milestones"), keep.push("upgrades")
        if (layers[resettingLayer].row <= layers["i"].row) {
            keep.push("buyables")
        }
        if (layers[resettingLayer].row > this.row) {
            layerDataReset("m", keep)
            if (canReset(this.layer)&&player.p.points<10) doReset(this.layer)
        }
    },
    baseResource: "fabric", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('m', 23)&upgradeEffect('m', 23)>1) mult = mult.times(upgradeEffect('m', 23))
        if(getBuyableAmount(this.layer, 11) > 4 ) mult = mult.times(getBuyableAmount(this.layer, 11).add(1).times(2.5).pow(5))
        if (player.i.unlocked && hasUpgrade("i", "22")) mult = mult.times(player.i.points.add(1));
        if (player.ee.unlocked) mult = mult.times(tmp.ee.fireEff)
        if (hasUpgrade('sp', 11)) mult = mult.times(upgradeEffect('sp', 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        x = new Decimal(1)

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
                // if (x.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) x = x.pow(2).div(25)
                if (x == 0) return new Decimal(1)
                let base = x.add(10.25)
                if (hasUpgrade("p", 13)) base = base.sub(tmp.p.upgrades[13].effect)
                let cost = Decimal.pow(2, base.pow(1.625))
                if (hasUpgrade("p", 12)) cost = cost.div(upgradeEffect("p", 12))
                return cost
            },
//leave this space
//leave this space herea
//what      eff
            effect() {return new Decimal(2).times(getBuyableAmount(this.layer, 11).times(2.5).pow(5)).div(2000)},
            display() { return "Effect: Generates " + format((tmp.m.buyables[11].effect).times(100)) + "% of melge gain/second" + "\nBuy 1 Melge Fabricator\n Amount: " + getBuyableAmount(this.layer, this.id) + " Melge Fabricators" +"\nCost: " + formatWhole(this.cost(getBuyableAmount(this.layer, this.id))) + " Improvers"},
            canAfford() { return player["i"].points.gte(this.cost()) },
            style() { if (this.canAfford||tmp[this.layer].buyables[this.id]>0){
                g = 100 - Math.ceil(6*getBuyableAmount(this.layer, 11)) 
                b = 50 - Math.ceil(3*getBuyableAmount(this.layer, 11)) 
                r = 100 + Math.ceil(10*getBuyableAmount(this.layer, 11)) 
                if (b<1) b = 0
                if (g<1) g = 0
                if (r<101) r = 100, g = 100, b= 100
                if(r>254) r = 255  
                return {"background-color": ("rgb("+r+", "+g+", "+b+")"), } }},
            buy() { //amonger type beat
                player["i"].points = player["i"].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit() { let x = 1
                if (hasUpgrade('i', 302)) x = 10
                return x},
            unlocked() {
                let x = false
                if(hasUpgrade('i', 301)||tmp.m.buyables[11] > 0) x = true
                return x
            },
        },
    },
    bars: {
        MelgeBar: {
            direction: RIGHT,
            width: 200,
            height: 25,
            progress() { return getBuyableAmount(this.layer, 11)/10 },
            unlocked() {
                let x = false
                if(hasUpgrade('i', 301)||tmp.m.buyables[11] > 0) x = true
                return x
            },
            display() {let x = 1
                if (hasUpgrade('i', 302)) x = 10
                return getBuyableAmount(this.layer, 11) + "/" + x + " Fabricators"
            },
            fillStyle() {
                g = 100 - Math.ceil(6*getBuyableAmount(this.layer, 11)) 
                b = 50 - Math.ceil(3*getBuyableAmount(this.layer, 11)) 
                r = 100 + Math.ceil(10*getBuyableAmount(this.layer, 11)) 
                if (b<1) b = 0
                if (g<1) g = 0
                if (r<101) r = 100, g = 100, b= 100
                if(r>254) r = 255  
                return {"background-color": ("rgb("+r+", "+g+", "+b+")"), } },
        },
    
    },

    tabFormat: ["main-display",
    "prestige-button",
    "resource-display",


    //im mile(
//mile long datmlgfingering your datmlgmom😏)
    "blank",
    ["row", [["upgrade", 11], ["upgrade", 12]]],
    
    ["row", [["upgrade", 21], ["upgrade", 22], ["upgrade", 23]]],
    ["row", [["upgrade", 31], ["upgrade", 32]]],
    /*"blank,"*/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          "blank",
   /**/ "blank"/**/,
    "buyables",
    "blank", 
    ["bar", "MelgeBar"],
    "blank",
    ["row", [["milestone", 0]]],

    "blank",
    "bars",
    "blank"
],

})
/*style() {
g = 100 - Math.ceil(10*getBuyableAmount(this.layer, 11))
b = 50 - Math.ceil(10*getBuyableAmount(this.layer, 11))
r = 100 + Math.ceil(10*getBuyableAmount(this.layer, 11))
if (b<1) b = 0
if (g<1) g = 0
if (r<101) r = 100, g = 100, b= 100
if(r>254) r = 255
return {"background-color": ("rgb("+r+", "+g+", "+b+")") } }, */
