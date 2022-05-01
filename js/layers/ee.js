

addLayer("ee", {
    symbol(){ 
    return "EE"
    },
    name: "Elemental Energy",
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        earth: new Decimal(0),
        fire: new Decimal(0),
        water: new Decimal(0),
        air: new Decimal(0),
        alwaysShow: false
    }},
    canBuyMax() {

        if (hasMilestone("ee", 3))return true
        return false
    },
    color(){
        var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        return randomColor
    },                   // The color for this layer, which affects many elements.
    resource: "Elemental Energy",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "melge essence",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.m.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e75),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    position: 2,
    /*

    Milestones

    */

    milestones: {
        0: {requirementDescription: "1 EE",
            done() {return player.ee.best.gte(1)}, // Used to determine when to give the milestone
            effectDescription() { s = "Kickstart the generation of Elemental Energies."
            return s
        } 
        },
        1: {requirementDescription: "3 EE",
        done() {return player.ee.best.gte(3)}, // Used to determine when to give the milestone
        effectDescription() { s = "Keep Melge upgrades and milestones on all row 3 resets or below."
        return s
        } 
        },
        2: {requirementDescription: "15 EE",
        done() {return player.ee.best.gte(15)}, // Used to determine when to give the milestone
        effectDescription() { s = "Keep all row 2 milestones on all row 3 resets."
        return s
        } 
        },
        3: {requirementDescription: "30 EE",
        done() {return player.ee.best.gte(30)}, // Used to determine when to give the milestone
        effectDescription() { s = "You can buy max Elemental Energy"
        return s
        } 
        },
    },








    /*

    Secondary Resource Generation

    */








    // Main elemental energy mult.

    
    effBase() {
        let base = new Decimal(4);
        return base;
    },

    effect() {
        if (!player.ee.unlocked) return new Decimal(0);
        let eff = Decimal.pow(this.effBase(), player.ee.points.sub(1).max(0));
        if (!hasMilestone("ee", 0)) eff = new Decimal (0)
        return eff;
    },



    update(diff) {
        if (player.ee.unlocked&&hasMilestone("ee", 0)) player.ee.fire = player.ee.fire.plus(tmp.ee.fireGen.times(diff));
        if (player.ee.unlocked&&hasMilestone("ee", 0)) player.ee.earth = player.ee.earth.plus(tmp.ee.earthGen.times(diff));
        if (player.ee.unlocked&&hasMilestone("ee", 0)) player.ee.water = player.ee.water.plus(tmp.ee.waterGen.times(diff));
        if (player.ee.unlocked&&hasMilestone("ee", 0)) player.ee.air = player.ee.air.plus(tmp.ee.airGen.times(diff));
    },


    // Fire Generation/Effect


    fireGen(){
    if (tmp.ee.effect < 1) return new Decimal (0)
    firegen = tmp.ee.effect.add(1).pow(3).log(1.1)

    return firegen
    },
    fireExp() {
        let exp = new Decimal(1/2.5);
        return exp;
    },
    fireEff() {
        if (!player.ee.unlocked) return new Decimal(1);
        if (!hasMilestone("ee", 0)) return new Decimal(1);
        x = player.ee.fire.plus(1).pow(this.fireExp())
        x = x.pow(2)


        return x
        // 
    },


  // Earth Generation/Effect


 earthGen(){
    if (tmp.ee.effect < 1) return new Decimal (0)
    return tmp.ee.effect.add(1).log(1.1)
},
 earthExp() {
    let exp = new Decimal(1/9);
    return exp;
},
 earthEff() {
    if (!player.ee.unlocked) return new Decimal(1);
    if (!hasMilestone("ee", 0)) return new Decimal(1);
    return player.ee.earth.plus(1).pow(this.earthExp())
    // 
},


 // Water Generation/Effect


 waterGen(){
    if (tmp.ee.effect < 1) return new Decimal (0)
    return tmp.ee.effect.add(1).pow(1.33).log(1.1)
},
 waterExp() {
    let exp = new Decimal(1/2);
    return exp;
},
 waterEff() {
    if (!player.ee.unlocked) return new Decimal(1);
    if (!hasMilestone("ee", 0)) return new Decimal(1);
    return player.ee.water.plus(1).pow(this.waterExp())
    // 
},


 // Air Generation/Effect


 airGen(){
    if (tmp.ee.effect < 1) return new Decimal (0)
    return tmp.ee.effect.times(15).log(1.1).times(15).max(0)
},
 airExp() {
    let exp = new Decimal(1/2);
    if (player.ee.air.log(100).sub(3).max(0)<1/2) {exp = exp.plus(player.ee.air.log(100).sub(3).max(0))} else {exp = exp.times(2)};
    return exp;
},
 airEff() {
    if (!player.ee.unlocked) return new Decimal(1);
    if (!hasMilestone("ee", 0)) return new Decimal(1);
    return player.ee.air.plus(1).pow(this.airExp())
    // 
},







    /*

    Final Stuff

    */




    tabFormat: ["main-display",
    ["row",[
        ["column", [["display-text", function() {
            var fireColor = "#ff0012".replace(/0/g,function(){return (~~(Math.random()*13)).toString(13);});
            let fire = "<span style='color:" + fireColor + "'>" + formatWhole(tmp.ee.fireGen) + " fire</span>"
            var earthColor = "#4f004f".replace(/0/g,function(){return (~~(Math.random()*10)).toString(10);});
            let earth = "<span style='color:" + earthColor + "'>" + formatWhole(tmp.ee.earthGen) + " earth</span>"
            var waterColor = "#4a4000".replace(/0/g,function(){return (~~(Math.random()*13)).toString(13);});
            let water = "<span style='color:" + waterColor + "'>" + formatWhole(tmp.ee.waterGen) + " water</span>"
            var airColor = "#ffff00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
            let air = "<span style='color:" + airColor + "'>" + formatWhole(tmp.ee.airGen) + " air</span>"
            
            return "Your Elemental energy is producing " + earth + ", " + fire + ", " + water + ", and " + air + "/s "}]]]
    
    ]
            ],
    "blank",
    "prestige-button",
    "blank",
    "resource-display",
    "blank",
    ["row",[
        ["column", [["display-text", function() {
            var fireColor = "#ff0012".replace(/0/g,function(){return (~~(Math.random()*13)).toString(13);});
            let fire = "<span style='color:" + fireColor + "'>" + formatWhole(player.ee.fire) + " fire</span>"
            var earthColor = "#4f004f".replace(/0/g,function(){return (~~(Math.random()*10)).toString(10);});
            let earth = "<span style='color:" + earthColor + "'>" + formatWhole(player.ee.earth) + " earth</span>"
            var waterColor = "#4a4000".replace(/0/g,function(){return (~~(Math.random()*13)).toString(13);});
            let water = "<span style='color:" + waterColor + "'>" + formatWhole(player.ee.water) + " water</span>"
            var airColor = "#ffff00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
            let air = "<span style='color:" + airColor + "'>" + formatWhole(player.ee.air) + " air</span>"
            
            return "Your " + earth + " is providing a " + formatWhole(tmp.ee.earthEff) + "x multiplier to the improver effect and the light energy gain base, your " + fire + " is providing a " + formatWhole(tmp.ee.fireEff) + "x boost to fabric and melge essence gain, your " + water + " is providing a " + formatWhole(tmp.ee.waterEff) + "x bonus to improver gain, and your " + air + " is providing a " + format(tmp.ee.airEff) + "x boost to the light energy effect."}]]]
    
    ]
            ],
            "blank",
            "blank",
    "milestones",
    "blank",
    "upgrades",
    "blank",
    "blank",
    "blank", "blank"
],




    layerShown() { 
        x = false
        if (player.i.unlocked&&player.p.unlocked&&getBuyableAmount("m", 11)>0||player.ee.unlocked||player.ee.alwaysShow == true) x = true

        return x 
    },            // Returns a bool for if this layer's node should be visible in the tree.
    alwaysShow(){

        if(tmp.ee.layerShown) player.ee.alwaysShow = true

    },

    branches: ["m", "p", "i"],
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})