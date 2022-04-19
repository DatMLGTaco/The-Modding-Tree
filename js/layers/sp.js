addLayer("sp", {
    symbol: "SP",
    name: "Subatomic Particles",
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
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

    layerShown() { 
        x = false
        if (player.p.unlocked) x = true
        return x },          // Returns a bool for if this layer's node should be visible in the tree.
    branches: ["p"],
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})