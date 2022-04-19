addLayer("sp", {
    symbol: "SP",
    name: "Subatomic Particles",
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        quarks: new Decimal(0),
    }},



    color: "#ffffff",                       // The color for this layer, which affects many elements.
    resource: "Subatomic Particles",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "Light Energy",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.power },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e21),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },









    upgrades:{
        11:{
        title: "Subatomic Breakthrough²",
        description: "Increase previous layers gains based on Subatomic Particles.",
        cost: new Decimal(1), 
        effect() {
            return new Decimal(10).pow(player[this.layer].points.max(1))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },   
    }, 
        12: {
            title: "Quark Fabrication",
            description: "Allows you to turn Subatomic Particles into Quarks.",
            cost() { return new Decimal(1e18) },
            currencyDisplayName: "light energy",
            currencyInternalName: "power",
            currencyLayer: "p",
            effect() { 
                let eff = (player.p.power.add(1).log(10).div(3.5));
              
                return eff;
            },

            effectDisplay() { return "-"+format(tmp.p.upgrades[13].effect) },


        },


    },






    buyables: {
        11: {
            title: "Quarks",
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) x = x.pow(2).div(25)
                let cost = Decimal.pow(2, x.add(9.25).pow(1.25))
                return formatWhole(cost)
            },
//leave this space herea
//what

            display() { return "Effect: Accelerates light energy gain by " + format(tmp.p.buyables[11].effect) + "x/s." + "\nBuy 1 Photon Accelerator\n Amount: " + getBuyableAmount(this.layer, this.id) + " Photon Accelerators" +"\nCost: " + formatWhole(this.cost(getBuyableAmount(this.layer, this.id))) + " light energy."},
            canAfford() { return player.p.power.gte(this.cost()) },
            effect() {
                return new Decimal(5).times(getBuyableAmount(this.layer, 11).times(2.5).pow(5)).max(1)
            },
            style() { 
                rgb = new Decimal (tmp.p.power).log(2)
                if (rgb<101) rgb = 100
                if(rgb>254) rgb = 255  
                return {"background-color": ("rgb("+rgb+", "+rgb+", "+rgb+")"), } },
            buy() { //amonger type beat
                player[this.layer].power = player[this.layer].power.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                x = false
                if(hasUpgrade('i', 22)) x = true
                return x
            },
        },
    
    },   
    
    milestones: {
        0: {requirementDescription: "1 Subatomic Particle",
            done() {return player.p.best.gte(1)}, // Used to determine when to give the milestone
            effectDescription() { s = "Autobuy all previous buyables."
            return s
        } 
        },
        1: {requirementDescription: "10 Photons",
        done() {return player.p.best.gte(10)}, // Used to determine when to give the milestone
        effectDescription() { s = "Unlock the creation of light energy."
        return s
    } 
    }
    },
    
    
    
    
    
    tabFormat: 

    ["main-display",
    "blank",
    "prestige-button",
    "blank",
    "resource-display",
    "blank",
    "milestones",
    "blank",
    "upgrades",
    "blank",
    "buyables",
    "blank", "blank"
    ],
    layerShown() { 
        x = false
        if (player.p.unlocked) x = true
        return x },          // Returns a bool for if this layer's node should be visible in the tree.
    branches: ["p"],

})