addLayer("cp", {
    symbol: "CP",
    name: "Computational Power",
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#d97614",                       // The color for this layer, which affects many elements.
    resource: "Computational Power",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "Improvers",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.i.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e25),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    requires() {
        x = new Decimal(1e25)
        y = new Decimal(1)

        return x }, // Can be a function that takes requirement increases into account
        layerShown() { 
            x = false
            if (player.i.unlocked) x = true
            return x },            // Returns a bool for if this layer's node should be visible in the tree.
        
    branches: ["i"],
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})