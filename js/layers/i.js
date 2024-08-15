addLayer("i", {
    name: "Improvers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        unlockOrder: new Decimal(0),
        achievement: false
    }},
    color: "#fff396",
    resource: "Improvers", // Name of prestige currency
    canBuyMax() {return false},
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("ee", 2))  keep.push("milestones")
        if (layers[resettingLayer].row > this.row) layerDataReset("i", keep)
        if (player.m.upgrades.length<=1) tmp.i.achievement = true
    },
    branches: ["m"],
		enGainMult() {
			let mult = new Decimal(1);
            if (player.ee.unlocked) mult = mult.times(tmp.ee.waterEff)
            if (hasUpgrade("i", 32)) mult = mult.times(upgradeEffect("i", 32))
			return mult;
		},
        improverEff(){
        eff = new Decimal(1)
        x = new Decimal(8.333)
        y = new Decimal(0.98)
        if (player.ee.unlocked) x = x.times(tmp.ee.earthEff)
        if (player.i.points.times(50).pow(0.5) >= 1) eff = (player.i.points.times(x)).pow(y)
        if (hasUpgrade("i", 33)) eff = eff.times(6)
        if (getBuyableAmount("ma", 31) > 0) eff = eff.times (tmp.ma.buyables[31].effect)
        return eff.pow(0.5)

        },
        tabFormat:{
            "Improvement":{
                content: [
            "main-display",
            ["row",[
                ["column", [["display-text", function() {return "Your Improvers are currently multiplying your fabric gain by " + formatWhole(tmp.i.improverEff.times(upgradeEffect("i", 11))) + "x!"}]]]
            
            ]
                    ],
            "blank",
            "prestige-button",
            "blank",
            "resource-display",
            "blank",
    
            "blank",
            ["row", [["upgrade", 11]]],
            ["row", [["upgrade", 21],["upgrade", 22]]],
            ["row", [["upgrade", 31],["upgrade", 32],["upgrade", 33]]],
            "blank",
            "blank",
            "milestones",
            "blank", "blank"
            ]},
        "Automation":{

            content: [ 
                "blank",
                ["row", [["upgrade", 101]]],
                ["row", [["upgrade", 201],["upgrade", 202]]],
            ],

        }
        },
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
    cost: new Decimal(30), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
}
  },
  22:{
    title: "Immaterial Fabrication",
    description: "Improvers cheapen the fabrication of melge essence",
    cost: new Decimal(200), 
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
  31:{
    title: "Upgrade 4.",
    description: "Removes 4 Photonic Accelerators from the cost base and adds 4 Photonic Accelerators to their effect.",
    cost: new Decimal(1e8), 
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
  32:{
    title: "Upgrade 5.",
    description: "Flat 5x Improver and Light Energy gain multiplier.",
    cost: new Decimal(2e6), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
},
    effect() {
        x = new Decimal(5)
        return x

    }
  },
  33:{
    title: "Upgrade 6.",
    description: "Multiplies the improver effect by 6x",
    cost: new Decimal(1e6), 
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
  101:{

    title: "Automation: 1",
    description: "Melge Upgrade 1 doesn't reset.",
    cost: new Decimal(2), 
    style() {   
        a={
        'border': '1px dotted',
        'border-radius': '2px',
        'width' : '500px',
        'height' : '25px',
        }
        if(hasUpgrade(this.layer, this.id)) a = {
            'background-color': '#e8e0a0', 
            'border-radius': '2px',
            'border': '1px dotted',
            'width' : '500px',
            'height' : '25px',

}
return a
},
  },
  201:{

    title: "Automation: 2",
    description: "Melge Upgrades 2, 3, and 4 don't reset.",
    cost: new Decimal(10), 
    style() {   
        a={
        'border': '1px dotted',
        'border-radius': '2px',
        'width' : '250px',
        'height' : '25px',
        }
        if(hasUpgrade(this.layer, this.id)) a = {
            'background-color': '#e8e0a0', 
            'border': '1px dotted',
            'border-radius': '2px',
            'width' : '250px',
            'height' : '25px',

}
return a
},
  },
  202:{

    title: "Automation: 3",
    description: "Unlocks a method to generate melge essence automatically...",
    cost: new Decimal(10), 
    style() {   
        a={
        'border': '1px dotted',
        'border-radius': '2px',
        'width' : '250px',
        'height' : '25px',
        }
        if(hasUpgrade(this.layer, this.id)) a = {
            'background-color': '#e8e0a0', 
            'border': '1px dotted',
            'border-radius': '2px',
            'width' : '250px',
            'height' : '25px',

}
return a
},
  },
    },
    requires() {
        x = new Decimal(1500)
        y = new Decimal(1)
        if (player.i.unlockOrder > 0 && !hasAchievement("a", 23)) x = new Decimal(5e11), y = y.times(3)
        x = x.times(y)
        if (hasAchievement("a", 23)) x = x.div(player.i.points.add(1).div(25).max(2).log(2).max(1)).max(1)
        return x }, // Can be a function that takes requirement increases into account
    baseResource: "fabric", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('i', 23)) mult = mult.times(upgradeEffect('i', 23))
        if (hasUpgrade("i", 32)) mult = mult.times(upgradeEffect("i", 32))
        if (player.ee.unlocked) mult = mult.times(tmp.ee.waterEff)
        if (getBuyableAmount("ma", 32) > 0) mult = mult.times (tmp.ma.buyables[32].effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    milestones: {
        0: {requirementDescription: "5 Total Improvers",
        done() {return player.i.total.gte(5)}, // Used to determine when to give the milestone
        effectDescription() { s = "Multiply Improver Effect by 10"

        return s
    }, 
    style() {                     
        if(hasMilestone(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
},
    unlocked () {x = true; return x},
    },
    1: {requirementDescription: "25 Total Improvers",
    done() {return player.i.total.gte(25)}, // Used to determine when to give the milestone
    effectDescription() { s = "among us placeholder sus!"

    return s
}, 
style() {                     
    if(hasMilestone(this.layer, this.id)) return {
        'background-color': '#e8e0a0' 
}
},
unlocked () {x = false; if (hasMilestone("i", 0)) x = true; return x},
}
    },
    hotkeys: [
        {key: "i", description: "I: Reset for Improvers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    increaseUnlockOrder: ["p"],
    layerShown(){return true}
    

})