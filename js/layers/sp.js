addLayer("sp", {
    symbol: "SP",
    name: "Subatomic Particles",
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        quarks: new Decimal(0),
        buyPercent: new Decimal(0),
        unlockOrder: new Decimal(0),
        alwaysShow: false
    }},



    color: "#ffffff",                       // The color for this layer, which affects many elements.
    resource: "Subatomic Particles",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "Light Energy",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.power },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e21),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
 






    upgrades:{
        11:{
        title: "Subatomic Breakthrough²",
        description: "Increase Subatomic Breakthrough effect based on Subatomic Particles and add a new effect.",
        cost: new Decimal(1), 
        effect() {
            return new Decimal(player[this.layer].points.add(1).times(3).pow(0.7))
        },
        effectDisplay() { return "^" + format(upgradeEffect(this.layer, this.id)) },   
    }, 
        12: {
            title: "Quark Fabrication",
            description: "Allows you to turn Subatomic Particles into Quarks.",
            cost() { return new Decimal(1e18) },
            currencyDisplayName: "light energy",
            currencyInternalName: "power",
            currencyLayer: "p",



        },       
         13: {
            title: "Buymax",
            description: "Allows you to buy max subatomic particles",
            cost() { return new Decimal(50) },


        },
        51: {
            title: "Entanglement",
            description: "Quarks boost quark effect.",
            cost() { return new Decimal(2) },
            currencyDisplayName: "quarks",
            currencyInternalName: "quarks",
            currencyLayer: "sp",

        },

    },

    

    canBuyMax() {

        if (hasUpgrade("sp", 13))return true
        return false
    },



    position: 3,
    milestones: {
        0: {requirementDescription: "1 Subatomic Particle",
            done() {return player.sp.total.gte(1)}, // Used to determine when to give the milestone
            effectDescription() { s = "Autobuy all previous buyables."
            return s
        } 
        },
        1: {requirementDescription: "5 Total Subatomic Particles",
        done() {return player.sp.total.gte(5)}, // Used to determine when to give the milestone
        effectDescription() { s = "Photon layer (excluding light energy) doesn't reset on reset"
        return s
        } 
        },
        2: {requirementDescription: "10 Total Subatomic Particles",
        done() {return player.sp.total.gte(10)}, // Used to determine when to give the milestone
        effectDescription() { s = "Unlock new Photon Upgrades."
        return s
        } 
        },
        },
    
    image(){
        if (player.sp.unlocked) {
        return "https://media1.giphy.com/media/moztbdp3Y93zlq7sIH/giphy.gif?cid=790b7611dc90382df7b886eee3fda23e71749404e9b6e703&rid=giphy.gif&ct=g"} },
    style() {
    return {"background-image" : "url('https://media3.giphy.com/media/UZLkKp1DiyP9LRmCcB/giphy.gif?cid=790b76119561afe82af5799af3760b150438217d11c28c33&rid=giphy.gif&ct=g')"
    }},
    
    microtabs: {
        main: {
            particles: {
                content: [
                    ["microtabs","subatomic"],


                ],
                buttonStyle(){

                  if (player.tab == "sp" && player.subtabs.sp.main == "particles" /*&& player.subtabs.e.mRNAupg == "Upgrades"*/) return {'background-color' : "#005418"}

                },

            },
            upgrades: {
                content: [
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13]]],





                ],
                buttonStyle(){

                    if (player.tab == "sp" && player.subtabs.sp.main == "upgrades" /*&& player.subtabs.e.mRNAupg == "Upgrades"*/) return {'background-color' : "#005418"}
  
                  },
            },
            milestones: {
                content: [
                    ["row",[
                        ["column", [["display-text", function() {
                
                            return "You have made <style>h2 {color:" + "#ffffff" + "} h2 {text-shadow: 0 0 10px " + "#ffffff" + ";} </style><h2>" + formatWhole(player.sp.total) + "</h2> Total Subatomic Particles.<p>"}]]],

                    //<p style='color:      ;'>
                    ],
                ],
                    "milestones"
                ],
                buttonStyle(){

                    if (player.tab == "sp" && player.subtabs.sp.main == "milestones" /*&& player.subtabs.e.mRNAupg == "Upgrades"*/) return {'background-color' : "#005418"}
  
                  },
            }
        },
        subatomic: {
            quarks: {
                content: [
                    ["row",[
                        ["column", [["display-text", function() {
                
                            return "You have <style>h2 {color:" + "#00ff00" + "} h2 {text-shadow: 0 0 10px " + "#00ff00" + ";} </style><h2>" + formatWhole(player.sp.quarks) + "</h2> Quarks.<p>" + "Your Quarks are buffing photonic accelerators by " + formatWhole(tmp.sp.quarkEff) + "%"}]]],

                    //<p style='color:      ;'>
                    ],

                            ],
                            "blank",
                            ["row", [["upgrade", 51]]],
                            "blank",

                ],
                buttonStyle(){

                    if (player.tab == "sp" && player.subtabs.sp.main == "particles" && player.subtabs.sp.subatomic == "quarks") return {'background-color' : "#00ff00"}
  
                  },
            },
            // There could be another set of microtabs here
        }
    },
    quarkEff(){

        if (hasUpgrade("sp", 51)) return new Decimal(player.sp.quarks/2).times(625).times(player.sp.quarks)
        return new Decimal(player.sp.quarks/2).times(625)

    },
    clickables: {
        11: {
            display() {return "<h3>Convert " + player.sp.buyPercent + "% of subatomic particles into quarks. <p>Currently: convert " + tmp.sp.clickables[11].effect + " particles into "+ tmp.sp.clickables[11].effect +" quarks."},
            unlocked() {if (hasUpgrade("sp" , 12)) return true},
            canClick() {if (hasUpgrade("sp" , 12)&&player.sp.points > 0) return true},
            onClick() {
                if (player.sp.points > 0){
                player.sp.quarks = new Decimal (player.sp.quarks.plus(tmp.sp.clickables[11].effect))
                player.sp.points = new Decimal (player.sp.points.sub(tmp.sp.clickables[11].effect))
                }
            },
            effect(){return formatWhole(new Decimal(player.sp.points*(player.sp.buyPercent/100)).max(1))},
        }
    },
    tabFormat: 

    ["main-display",
    "blank",
    "prestige-button",
    "blank",
    "resource-display",
    "blank",
    ["slider", ["buyPercent", "1", "100"]],
    "blank",
    "clickables",
    "blank",
    
    ["microtabs", "main"],
    "blank",

    "blank", "blank"
    ],

    layerShown() { 
        x = false
        if (player.p.unlocked||player.sp.alwaysShow == true) x = true
        return x },          // Returns a bool for if this layer's node should be visible in the tree.
        alwaysShow(){

            if(tmp.sp.layerShown) player.sp.alwaysShow = true
    
        },
    branches: ["p"],
    hotkeys: [
        {key: "s", description: "S: Reset for subatomic particles", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    increaseUnlockOrder: ["ma"]
})