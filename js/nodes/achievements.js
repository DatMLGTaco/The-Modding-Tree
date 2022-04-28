
addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        color: 1,
        bool: true
    }},
    colorBoolean(){
        if (player.a.color >= 1) player.a.bool = true
        if (player.a.color <= 0.05) player.a.bool = false

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
    if (player.a.bool == true){
        player.a.color = player.a.color - 0.003
        if (player.a.color < 0) player.a.color = 0
      return getGradientColor('#ff0000', '#00ff00', player.a.color);
    } else {
        player.a.color = player.a.color + 0.003
        if (player.a.color > 1) player.a.color = 1
        return getGradientColor('#ff0000', '#00ff00', player.a.color);
    }
    },                          // The color for this layer, which affects many elements.

    resource: "prestige points",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).
    tabFormat: [
        ["row",[
            ["column", [["display-text", function() {
    
                return "<h1><span style='color:#fefefe'>Achievements:</h1> <style>h1 {color:" + tmp.a.color + "} h1 {text-shadow: 0 0 10px " + tmp.a.color + ";} </style> <h1>" +player.a.achievements.length+"/"+(Object.keys(tmp.a.achievements).length-2)}]]]
        //<p style='color:      ;'>
        ]
                ],
                "blank",
                "blank",
                "blank",
                "achievements"

    ],
    baseResource: "fabric",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },

    achievements: {
        rows: 16,
        cols: 5,
        11: {
            name: "What Have You Done?",
            done() { return player.m.points.gt(0) },
            tooltip: "Perform a Melge reset.",

            style() {                     
                if(hasAchievement(this.layer, this.id)) return {
                    'background-color': tmp.a.color 
            }
        },
        },
        12: {
            name: "Again.",
            done() { return hasUpgrade("m", 21) },
            tooltip: "Buy Woven Thread.",

            style() {                     
                if(hasAchievement(this.layer, this.id)) return {
                    'background-color': tmp.a.color 
            }
        },
        },
        13: {
            name: "It's All Coming Together",
            done() { return hasUpgrade("m", 32) },
            tooltip: "Buy Alignment.",

            style() {                     
                if(hasAchievement(this.layer, this.id)) return {
                    'background-color': tmp.a.color 
            }
        },
        },
        14: {
            name: "I'm Improving Improver Improvers. ",
            done() { return player.m.points.gt(1e25) },
            tooltip() {return "Reach 1e25 Melge Essence. Improves Improver Improver Effect Based on Improvers. Currently: " + formatWhole(player.i.points.add(1).times(5).pow(new Decimal(0.85).pow(new Decimal(1).div(player.i.points.div(1000).max(1)))))+ "x" },

            style() {                     
                if(hasAchievement(this.layer, this.id)) return {
                    'background-color': tmp.a.color 
            }
        },

        },

        21: {
            name: "Uh oh...",
            done() { return player.i.unlocked||player.p.unlocked },
            tooltip: "Perform a Row 2 reset. Reward: Generate Fabric 10% faster.",

            style() {                     
                if(hasAchievement("a", 21)) return {
                    'background-color': tmp.a.color 
            }
        },
            
        },



    }
})

