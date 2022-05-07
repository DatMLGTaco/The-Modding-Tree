
addLayer("ma", {
    symbol: "Ma",
    name: "The Machine",
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        unlockOrder: new Decimal(0),
        color: 1,
        bool: true,
        alwaysShow: false,
        threads: new Decimal (3),
        ramDisplay: "1KB",
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
          return getGradientColor('#00eee8', '#00ff00', player.ma.color);
        } else {
            player.ma.color = player.ma.color + 0.01
            if (player.ma.color > 1) player.ma.color = 1
            return getGradientColor('#00eee8', '#00ff00', player.ma.color);
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
        x = new Decimal(1e19)
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
    style() {
        return {"background-image" : "url('https://i.gifer.com/NvL.gif')"
        }},
    buyables: {
        24: {
            title: "DISPLAY",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return formatWhole(1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return "Add an additional DISPLAY to the machine.\n Amount: " + getBuyableAmount(this.layer, this.id)},
            // END DESCRIPTION

            canAfford() { return player.ma.threads.gte(this.cost()) },

            effect() {
                effect = new Decimal(0)
                
                return effect
            },

            style() { 

                return {"background-color": tmp.ma.color, 
                "border": "4px dotted",
                "width" : "150px",
                "height" : "150px",} },
            buy() { //amonger type beat
                player[this.layer].power = player[this.layer].power.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                x = false
                
                return x
            },
        },
        25: {
            title: "Motherboard",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return formatWhole(1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return "The brain and heart of The Machine.\n Amount: " + getBuyableAmount(this.layer, this.id)},
            // END DESCRIPTION

            canAfford() { return false },

            effect() {
                effect = new Decimal(0)
                
                return effect
            },
            branches(){ return [[31, tmp.ma.color],[32, tmp.ma.color],[33, tmp.ma.color],[24, tmp.ma.color],]},

            style() { 

                return {"background-color": tmp.ma.color, 
            
                "width" : "150px",
                "height" : "150px",} },
            buy() { //amonger type beat
                player[this.layer].power = player[this.layer].power.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                x = false
                if(hasUpgrade('i', 22)&&hasUpgrade('p', 11)&&hasMilestone('p', 1)) x = true
                return x
            },
        },
        31: {
            title: "CPU",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return new Decimal (x + 1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return "Add an additional CPU to the machine.\n Amount: " + getBuyableAmount(this.layer, this.id) + "\n Cost:" + tmp.ma.buyables[31].cost},
            // END DESCRIPTION

            canAfford() { return player.ma.threads.gte(tmp.ma.buyables[31].cost) },

            effect(x=player[this.layer].buyables[this.id]) {
                effect = new Decimal(2).pow(x)
                effect = effect.log(1.2).max(1)
                return effect
            },

            style() { 

                return {"background-color": tmp.ma.color, 
                "border": "4px dotted",
                "width" : "150px",
                "height" : "150px",} },
            buy() { //amonger type beat
                player[this.layer].threads = player[this.layer].threads.sub(tmp.ma.buyables[31].cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                x = false
                if(hasUpgrade('i', 22)&&hasUpgrade('p', 11)&&hasMilestone('p', 1)) x = true
                return true
            },
        },
        32: {
            title: "GPU",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return formatWhole(1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return "Add an additional GPU to the machine.\n Amount: " + getBuyableAmount(this.layer, this.id)},
            // END DESCRIPTION

            canAfford() { return player.ma.threads.gte(this.cost()) },

            effect() {
                effect = new Decimal(0)
                
                return effect
            },

            style() { 

                return {"background-color": tmp.ma.color, 
                "border": "4px dotted",
                "width" : "150px",
                "height" : "150px",} },
            buy() { //amonger type beat
                player[this.layer].power = player[this.layer].power.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                x = false
                if(hasUpgrade('i', 22)&&hasUpgrade('p', 11)&&hasMilestone('p', 1)) x = true
                return x
            },
        },
        33: {
            title: "RAM",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return formatWhole(1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return "Add an additional " + tmp.ma.ramDisplay + " RAM to the machine.\n Amount: " + getBuyableAmount(this.layer, this.id)},
            // END DESCRIPTION

            canAfford() { return player.ma.threads.gte(this.cost()) },

            effect() {
                effect = new Decimal(0)
                
                return effect
            },

            style() { 

                return {"background-color": tmp.ma.color, 
                "border": "4px dotted",
                "width" : "150px",
                "height" : "150px",} },
            buy() { //amonger type beat
                player[this.layer].power = player[this.layer].power.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                x = false
                if(hasUpgrade('i', 22)&&hasUpgrade('p', 11)&&hasMilestone('p', 1)) x = true
                return x
            },
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

    ["row",[
        ["column", [["display-text", function() {
            motherboards = getBuyableAmount(this.layer, 25).add(1)
            cpus = getBuyableAmount(this.layer, 31)
            cpuPlural = "is"
            if (isPlural(cpus)=="s") cpuPlural = "are collectively"
            gpus = getBuyableAmount(this.layer, 32)
            gpuPlural = "is"
            if (isPlural(gpus)=="s") gpuPlural = "are collectively"
            ram = getBuyableAmount(this.layer, 32)
            ramPlural = "is"
            if (isPlural(ram)=="s") ramPlural = "are"
            displayText = "<style>p {color:" + "#ffffff" + "} p {text-shadow: 0 0 10px " + tmp.ma.color + ";} </style><p>You have " + player.ma.threads +" thread" + isPlural(player.ma.threads) + ".</p> <p>Components and Effects: </p><p>" + motherboards + " Motherboard"+isPlural(motherboards)+": provides functionality to the machine. </p><p> "
            displayText = displayText + cpus+ " CPU"+isPlural(cpus)+": Your CPU"+isPlural(cpus)+" "+cpuPlural+"  running at " + formatUnit(new Decimal(2).pow(cpus).sub(1).max(0).times(1048576), "Hz.") + " The improver effect is multiplied by " + tmp.ma.buyables[31].effect+"x"
            displayText = displayText +"</p><p>"+ gpus+ " GPU"+isPlural(gpus)+": Your GPU"+isPlural(gpus)+" "+gpuPlural+"  providing a capacity of " + formatUnit(new Decimal(2).pow(gpus).sub(1).max(0).times(1048576), "B") + " of VRAM. VRAM is multiplying improver gain by " + tmp.ma.buyables[32].effect+"x"
            displayText = displayText +"</p><p>"+ ram+ " RAM: Your RAM Stick" +isPlural(ram)+ " " +ramPlural+ " providing " + formatUnit(new Decimal(2).pow(ram).sub(1).max(0).times(1048576), "B") + " of ram, which provides a " + tmp.ma.buyables[32].effect + "x buff to your CPU"+isPlural(cpus)+" and GPU"+isPlural(gpus)+"."
            return displayText}]]]
    //<p style='color:      ;'>
    ]
            ],
            "blank",
            "blank",
    "milestones",
    ["row", [["buyable", 24],"blank","blank",["buyable", 25],"blank","blank", ["buyable", 26],]],
    "blank",     
    ["row", [["buyable", 31], "blank","blank", ["buyable", 32], "blank","blank",["buyable", 33],]],
    "upgrades",
    "blank",
    "blank",
    "blank", "blank"
],
})