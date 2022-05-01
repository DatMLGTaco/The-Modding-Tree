
addLayer("ma", {
    symbol: "Ma",
    name: "The Machine",
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        unlockOrder: new Decimal(0),
        color: 1,
        bool: true,
        alwaysShow: false
    }},



    colorBoolean(){
        if (player.ma.color >= 1) player.ma.bool = true
        if (player.ma.color <= 0) player.ma.bool = false

    },

    color(){


            getGradientColor = function(start_color, end_color, percent) {
                // strip the leading # if it's there
                start_color = start_color.replace(/^\s*#|\s*$/g, '');
                end_color = end_color.replace(/^\s*#|\s*$/g, '');
             
                // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
                if(start_color.length == 3){
                  start_color = start_color.replace(/(.)/g, '$1$1');
                }
             
                if(end_color.length == 3){
                  end_color = end_color.replace(/(.)/g, '$1$1');
                }
             
                // get colors
                var start_red = parseInt(start_color.substr(0, 2), 16),
                    start_green = parseInt(start_color.substr(2, 2), 16),
                    start_blue = parseInt(start_color.substr(4, 2), 16);
             
                var end_red = parseInt(end_color.substr(0, 2), 16),
                    end_green = parseInt(end_color.substr(2, 2), 16),
                    end_blue = parseInt(end_color.substr(4, 2), 16);
             
                // calculate new color
                var diff_red = end_red - start_red;
                var diff_green = end_green - start_green;
                var diff_blue = end_blue - start_blue;
             
                diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
                diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
                diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];
             
                // ensure 2 digits by color
                if( diff_red.length == 1 ) diff_red = '0' + diff_red
                if( diff_green.length == 1 ) diff_green = '0' + diff_green
                if( diff_blue.length == 1 ) diff_blue = '0' + diff_blue

                return '#' + diff_red + diff_green + diff_blue;
              };
        if (player.ma.bool == true){
            player.ma.color = player.ma.color - 0.01
            if (player.ma.color < 0) player.ma.color = 0
          return getGradientColor('#00eee8', '#00ffaa', player.ma.color);
        } else {
            player.ma.color = player.ma.color + 0.01
            if (player.ma.color > 1) player.ma.color = 1
            return getGradientColor('#00eee8', '#00ffaa', player.ma.color);
        }
        },                     // The color for this layer, which affects many elements.
    resource: "Computational Power",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).
    position: 1,
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
            if (player.i.unlocked||player.ma.alwaysShow == true) x = true
            return x },            // Returns a bool for if this layer's node should be visible in the tree.
            alwaysShow(){

                if(tmp.ma.layerShown) player.ma.alwaysShow = true
        
            },
    
        
    branches: ["i"],
    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    buyables: {
        11: {
            title: "CPU",
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) x = x.pow(2).div(25)
                base = x.add(8.25)
                if (hasUpgrade("p", 13)) base = (base.sub(tmp.p.upgrades[13].effect))
                let cost = Decimal.pow(2, base.pow(2.25))
                if (hasUpgrade("p", 12)) cost = cost.div(upgradeEffect("p", 12))
                return cost.floor()
            },
        11: {
            title: "GPU",
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) x = x.pow(2).div(25)
                base = x.add(8.25)
                if (hasUpgrade("p", 13)) base = (base.sub(tmp.p.upgrades[13].effect))
                let cost = Decimal.pow(2, base.pow(2.25))
                if (hasUpgrade("p", 12)) cost = cost.div(upgradeEffect("p", 12))
                return cost.floor()
            },
        11: {
            title: "RAM",
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) x = x.pow(2).div(25)
                base = x.add(8.25)
                if (hasUpgrade("p", 13)) base = (base.sub(tmp.p.upgrades[13].effect))
                let cost = Decimal.pow(2, base.pow(2.25))
                if (hasUpgrade("p", 12)) cost = cost.div(upgradeEffect("p", 12))
                return cost.floor()
            },
        },
    tabFormat: [
    ["row",[
        ["column", [["display-text", function() {

            return "<style>h1 {color:" + tmp.ma.color + "} h1 {text-shadow: 0 0 10px " + tmp.ma.color + ";} </style><h1>The Machine"}]]]
    //<p style='color:      ;'>
    ]
            ],
    "blank",
    "main-display",
    "blank",
    "prestige-button",
    "blank",
    "resource-display",
    "blank",


            "blank",
            "blank",
    "milestones",
    "buyables",
    "upgrades",
    "blank",
    "blank",
    "blank", "blank"
],
})