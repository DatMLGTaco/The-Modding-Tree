
addLayer("ma", {
    symbol: "Ma",
    name: "The Machine",
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        unlockOrder: new Decimal(0),
        color: 1,
        bool: true,
        research: new Decimal(0),
        alwaysShow: false,
        threads: new Decimal (3),
        threadsMax: new Decimal (3),
        ram: new Decimal(0),
        vram: new Decimal(0),
        hz: new Decimal(0)
    }},

    

    herts(){
        x = 2
        y = 1
        if (hasUpgrade("ma", 51)) x = 3
        if (hasUpgrade("ma", 42)) y = 1024
        if (getBuyableAmount(this.layer, 31) > 0){herts = new Decimal(x).pow(getBuyableAmount(this.layer, 31).add(1)).max(0).times(y)}
        else herts = new Decimal(0)
        if (hasUpgrade("ma", 62)) herts = herts.times(tmp.ma.upgrades[62].effect)
        player.ma.hz = herts
    },
    ram(){
        x = 2
        y = 1
        if (hasUpgrade("ma", 51)) x = 2.5
        if (hasUpgrade("ma", 42)) y = 1024
        if (getBuyableAmount(this.layer, 33) > 0){player.ma.ram = new Decimal(x).pow(getBuyableAmount(this.layer, 33)).sub(1).max(0).add(x).times(y)}
        else player.ma.ram = new Decimal(0)

    },
    vram(){
        x = 2
        y = 1
        if (hasUpgrade("ma", 51)) x = 2.5
        if (hasUpgrade("ma", 42)) y = 1024
        if (getBuyableAmount(this.layer, 32) > 0){player.ma.vram = new Decimal(x).pow(getBuyableAmount(this.layer, 32)).sub(1).max(0).add(x).times(y)}
        else player.ma.vram = new Decimal(0)
    },
    researchGen(){
        x = 2000
        y = 2
        z = 2
        l = 1
        if (hasUpgrade("ma", 53)) l = 10000, x = 10
        hz = 1
        if (hasUpgrade("ma", 52)) hz = 200
        return new Decimal(format((player.ma.points.times(l).times(player.ma.hz.times(hz).pow(y)).log(z).div(x))))

    },

    update(diff) {

        if (player.p.unlocked) player.ma.research = player.ma.research.plus(tmp.ma.researchGen.times(diff));
    },

    compBuff(){

        return format(player.ma.points.log(1.01).add(1).times(tmp.ma.upgrades[43].effect))

    },


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

    type: "normal",                         // Determines the formula used for calculating prestige currency.
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
        51: {
            title: "Chipset Integration",
            description: "Increases Hz/CPU",
            cost: new Decimal(0.1),   
            currencyDisplayName: "research points",
            currencyInternalName: "research",
            currencyLayer: "ma",  
            style() {                     
                if(hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffcb52' ,

            
            }
        },
        branches(){
            x = "#a0a0a0"
            if (hasUpgrade(this.layer, this.id)) x = tmp.ma.color
            return [[52, x, 30]]},
        },
        52: {
            title: "Better Hashing",
            description: "Increases Hz > research point gain.",
            cost: new Decimal(5),   
            currencyDisplayName: "research points",
            currencyInternalName: "research",
            currencyLayer: "ma",  
            style() {                     
                if(hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffcb52' ,


            }

        },

        branches(){
            x = "#a0a0a0"
            if (hasUpgrade(this.layer, this.id)) x = tmp.ma.color
            return [[42, x, 30]]},
        },
    53: {
        title: "Research extraordinaire",
        description: "Heavily improves research generation and unlocks new Tech Tree unlocks.",
        cost: new Decimal(85),   
        currencyDisplayName: "research points",
        currencyInternalName: "research",
        currencyLayer: "ma", 

        style() {                     
            if(hasUpgrade(this.layer, this.id)) return {
                'background-color': '#ffcb52' ,
                }
            },

        branches(){
            x = "#a0a0a0"
            if (hasUpgrade(this.layer, this.id)) x = tmp.ma.color
            return [[62, x, 30], [63, x, 30], [52, x, 30], [42, x, 30], [43, x, 30]]}, 

        },  

        54: {
            title: "LASER",
            description: "Unlock DISPLAYs.",
            cost: new Decimal(1000),   
            currencyDisplayName: "research points",
            currencyInternalName: "research",
            currencyLayer: "ma", 

            style() {                     
                if(hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffcb52' ,
                    }
                },

            branches(){
                x = "#a0a0a0"
                if (hasUpgrade(this.layer, this.id)) x = tmp.ma.color
                return [[53, x, 30], ]}, 

            }, 

        41: {
            fullDisplay: " ",   
            style() {                     
                 return {
                    'background-color': 'transparent' ,
                    'border':'0px',


            }
        },
        }, 


        42: {
            title: "Realistic Microprocessors",
            description: "Replaces the crappy 'micro' processors with actual microprocessors. RAM, VRAM, and Hz multiplied by 1024.",
            cost: new Decimal(10),   
            currencyDisplayName: "research points",
            currencyInternalName: "research",
            currencyLayer: "ma",  
            style() {                     
                if(hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffcb52' ,


            }
        },
        },

        43: {
            title: "Quantum What?",
            description: "Total Subatomic Particles increase Computational Power effect.",
            cost: new Decimal(20),   
            currencyDisplayName: "research points",
            currencyInternalName: "research",
            currencyLayer: "ma", 
            effect() {return format(player.sp.total.pow(0.8).div(5))}, 
            effectDisplay() {return tmp.ma.upgrades[43].effect + "x"},
            style() {                     
                if(hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffcb52' ,
                    }
                },

            branches(){
                x = "#a0a0a0"
                if (hasUpgrade(this.layer, this.id)) x = tmp.ma.color
                return [[42, x, 30]]}, 

            },    
            44: {
                title: "Subatomic Binding.",
                description: "Unlock the ability to synthesize atoms in the Isotopic Separator",
                cost: new Decimal(1000),   
                currencyDisplayName: "research points",
                currencyInternalName: "research",
                currencyLayer: "ma", 
    
                style() {                     
                    if(hasUpgrade(this.layer, this.id)) return {
                        'background-color': '#ffcb52' ,
                        }
                    },
    
                branches(){
                    x = "#a0a0a0"
                    if (hasUpgrade(this.layer, this.id)) x = tmp.ma.color
                    return [[54, x, 30], ]}, 
    
                }, 
            62: {
                title: "Where were the fans",
                description: "CPUs and GPUs produce more Hz and VRAM, respectively.",
                cost: new Decimal(15),   
                currencyDisplayName: "research points",
                currencyInternalName: "research",
                currencyLayer: "ma", 
                effect() {if (hasUpgrade("ma", 63))return format(new Decimal(144)); else return format(new Decimal(12))}, 
                effectDisplay() {return tmp.ma.upgrades[62].effect*100 + "% more efficient."},
                style() {                     
                    if(hasUpgrade(this.layer, this.id)) return {
                        'background-color': '#ffcb52' ,
                        }
                    },
    
                branches(){
                    x = "#a0a0a0"
                    if (hasUpgrade(this.layer, this.id)) x = tmp.ma.color
                    return [[52, x, 30]]}, 
    
                },  
        63: {
            title: "Better fans",
            description: "Improves fan effect.",
            cost: new Decimal(35),   
            currencyDisplayName: "research points",
            currencyInternalName: "research",
            currencyLayer: "ma", 

            style() {                     
                if(hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#ffcb52' ,
                    }
                },

            branches(){
                x = "#a0a0a0"
                if (hasUpgrade(this.layer, this.id)) x = tmp.ma.color
                return [[62, x, 30]]}, 

            },
            64: {
                title: "Shoot a hole into the surface of Mars.",
                description: "Unlock Hellish Energy.",
                cost: new Decimal(1000),   
                currencyDisplayName: "research points",
                currencyInternalName: "research",
                currencyLayer: "ma", 
    
                style() {                     
                    if(hasUpgrade(this.layer, this.id)) return {
                        'background-color': '#ffcb52' ,
                        }
                    },
    
                branches(){
                    x = "#a0a0a0"
                    if (hasUpgrade(this.layer, this.id)) x = tmp.ma.color
                    return [[54, x, 30], ]}, 
    
                },   
        // Look in the upgrades docs to see what goes here!
    },









/*     clickables: {
        11: {
            display() {return "<p class='outlinedBlack'>Disconnect components in order to respec.</p> </body>"},
            unlocked() {if (player.ma.unlocked) return true},
            canClick() {if (getBuyableAmount("ma", 31)>0||getBuyableAmount("ma", 32)>0||getBuyableAmount("ma", 33)>0||getBuyableAmount("ma", 24)>0) return true},
            onClick() {
               
                run(layers.ma.buyables.respec, layers.ma.buyables)
                updateBuyableTemp("ma")
                document.activeElement.blur()
            },
            effect(){return formatWhole(new Decimal(player.sp.points*(player.sp.buyPercent/100)).max(1))},
        }
    },
 */













    buyables: {
        11: {
            title: "",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return new Decimal (1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return ""},
            // END DESCRIPTION

            canAfford() { return false },

            effect(x=player[this.layer].buyables[this.id]) {
                effect = new Decimal(2).pow(player.ma.hz)
                effect = effect.log(1.2).max(1)
                if (getBuyableAmount("ma", 31) > 0) return new Decimal(format(effect)).times(tmp.ma.buyables[33].effect)
                return new Decimal(format(effect))
            },

            style() { 

                return {"background-color": "transparent", 
                "border": "0px dotted",
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
            sellOne() {
                let amount = getBuyableAmount(this.layer, this.id)
                if (amount>0){ 
                setBuyableAmount(this.layer, this.id, amount.sub(1))
                player[this.layer].threads = player[this.layer].threads.add(1);
            }},
            canSellOne() { return true },
        },
        24: {
            title: "DISPLAY",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return new Decimal (1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return "Add an additional DISPLAY to the machine.\n Amount: " + getBuyableAmount(this.layer, this.id) + "\n Cost: " + tmp.ma.buyables[31].cost+ " threads"},
            // END DESCRIPTION

            canAfford() { return player.ma.threads.gte(tmp.ma.buyables[24].cost) },

            effect(x=player[this.layer].buyables[this.id]) {
                effect = new Decimal(2).pow(getBuyableAmount("ma", 24).pow(20))
                effect = effect.log(1.1).max(1)
                if (getBuyableAmount("ma", 24) > 0) return new Decimal(format(effect)).times(tmp.ma.buyables[32].effect)
                return new Decimal(format(effect))
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
            sellOne() {
                let amount = getBuyableAmount(this.layer, this.id)
                if (amount>0){ 
                setBuyableAmount(this.layer, this.id, amount.sub(1))
                player[this.layer].threads = player[this.layer].threads.add(1);
            }},
            canSellOne() { return true },
        },
        25: {
            title: "Motherboard",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return new Decimal (x + 1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return "Heart and soul of the machine.\n"},
            // END DESCRIPTION

            canAfford() { return false},

            effect(x=player[this.layer].buyables[this.id]) {
                effect = new Decimal(2).pow(x)
                effect = effect.log(1.2).max(1)
                return effect
            },

            style() { 

                return {"background-color": tmp.ma.color, 
                "border": "2px solid",
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
            branches(){ return [[31, tmp.ma.color],[32, tmp.ma.color],[33, tmp.ma.color],[24, tmp.ma.color],]},
        },
        31: {
            title: "CPU",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return new Decimal (1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return "Add an additional CPU to the machine.\n Amount: " + getBuyableAmount(this.layer, this.id) + "\n Cost: " + tmp.ma.buyables[31].cost+ " threads"},
            // END DESCRIPTION

            canAfford() { return player.ma.threads.gte(tmp.ma.buyables[31].cost) },

            effect(x=player[this.layer].buyables[this.id]) {
                effect = new Decimal(2).pow(player.ma.hz)
                effect = effect.log(1.2).max(1)
                if (getBuyableAmount("ma", 31) > 0) return new Decimal(format(effect)).times(tmp.ma.buyables[33].effect)
                return new Decimal(format(effect))
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
            sellOne() {
                let amount = getBuyableAmount(this.layer, this.id)
                if (amount>0){ 
                setBuyableAmount(this.layer, this.id, amount.sub(1))
                player[this.layer].threads = player[this.layer].threads.add(1);
            }},
            canSellOne() { return true },
        },
        32: {
            title: "GPU",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return new Decimal (1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return "Add an additional GPU to the machine.\n Amount: " + getBuyableAmount(this.layer, this.id) + "\n Cost: " + tmp.ma.buyables[32].cost + " thread"},
            // END DESCRIPTION

            canAfford() { return player.ma.threads.gte(tmp.ma.buyables[32].cost) },

            effect() {
                effect = new Decimal(2).pow(player.ma.vram)
                effect = effect.log(1.1)
                y = effect
                return new Decimal(formatWhole(y)).times(tmp.ma.buyables[33].effect).max(1)
            },

            style() { 

                return {"background-color": tmp.ma.color, 
                "border": "4px dotted",
                "width" : "150px",
                "height" : "150px",} },
            buy() { //amonger type beat
                player[this.layer].threads = player[this.layer].threads.sub(tmp.ma.buyables[32].cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return true
            },
            sellOne() {
                let amount = getBuyableAmount(this.layer, this.id)
                if (amount>0){ 
                setBuyableAmount(this.layer, this.id, amount.sub(1))
                player[this.layer].threads = player[this.layer].threads.add(1);
            }},
            canSellOne() { return true },
        },
        33: {
            title: "RAM",
            // COST FUNCTION.
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                return new Decimal (1)
            },
            // END COST FUNCTION.

            // DESCRIPTION
            display() { return "Add an additional RAM Stick to the machine.\n Amount: " + getBuyableAmount(this.layer, this.id) + "\n Cost: " + tmp.ma.buyables[33].cost+ " threads"},
            // END DESCRIPTION

        canAfford() { return player.ma.threads.gte(tmp.ma.buyables[33].cost) },

            effect() {
                
                x = player.ma.ram.log(1.01).max(1)
                x = x.times(tmp.ma.compBuff)
                return new Decimal(format(x)).max(1)
            },

            style() { 

                return {"background-color": tmp.ma.color, 
                "border": "4px dotted",
                "width" : "150px",
                "height" : "150px",} },
            buy() { //amonger type beat
                player[this.layer].threads = player[this.layer].threads.sub(tmp.ma.buyables[33].cost)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                x = false
                if(hasUpgrade('i', 22)&&hasUpgrade('p', 11)&&hasMilestone('p', 1)) x = true
                return true
            },
            sellOne() {
                let amount = getBuyableAmount(this.layer, this.id)
                if (amount>0){ 
                setBuyableAmount(this.layer, this.id, amount.sub(1))
                player[this.layer].threads = player[this.layer].threads.add(1);
            }},
            canSellOne() { return true },
        },
    },
    tabFormat:{
        
    "The Machine":{
        content: [
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
            displayText = "<p>Your "+format(player.ma.points)+" computational power is buffing your machines by "+ tmp.ma.compBuff +"x.</p>"

            motherboards = getBuyableAmount(this.layer, 25).add(1)
            cpus = getBuyableAmount(this.layer, 31)
            cpuPlural = "is"
            if (isPlural(cpus)=="s") cpuPlural = "are collectively"
            gpus = getBuyableAmount(this.layer, 32)
            gpuPlural = "is"
            if (isPlural(gpus)=="s") gpuPlural = "are"
            ram = getBuyableAmount(this.layer, 32)
            ramPlural = "is"
            if (isPlural(ram)=="s") ramPlural = "are"
            displays = getBuyableAmount(this.layer, 24)
            displayPlural = "is"
            if (isPlural(displays)=="s") displayPlural = "are"
            displayText = displayText +"<style>p {color:" + "#ffffff" + "} p {text-shadow: 0 0 10px " + tmp.ma.color + ";} </style><p>You have " + player.ma.threads +" thread" + isPlural(player.ma.threads) + ".</p> <p>Components and Effects: </p><p>" + motherboards + " Motherboard"+isPlural(motherboards)+": provides functionality to the machine"+isPlural(motherboards)+". </p><p> "
            displayText = displayText + cpus+ " CPU"+isPlural(cpus)+": Your CPU"+isPlural(cpus)+" "+cpuPlural+"  running at " + formatUnit(player.ma.hz, "Hz.") + " The improver effect is multiplied by " + format(tmp.ma.buyables[31].effect)+"x"
            displayText = displayText +"</p><p>"+ gpus+ " GPU"+isPlural(gpus)+": Your GPU"+isPlural(gpus)+" "+gpuPlural+"  providing a capacity of " + formatUnit(player.ma.vram, "b") + " of VRAM which is multiplying improver gain by " + format(tmp.ma.buyables[32].effect)+"x"
            displayText = displayText +"</p><p>"+ ram+ " RAM: Your RAM Stick" +isPlural(ram)+ " " +ramPlural+ " providing " + formatUnit(player.ma.ram, "b") + " of RAM, which provides a " + format(tmp.ma.buyables[33].effect) + "x buff to your CPU"+isPlural(cpus)+" and your GPU"+isPlural(gpus)+"."
            if (hasUpgrade("ma", 54)) displayText = displayText +"</p><p>"+ displays+ " DISPLAY"+isPlural(displays)+": Your DISPLAY"+isPlural(displays)+" "+displayPlural+ " providing a " + format(tmp.ma.buyables[24].effect) + "x buff to light energy gain and effect."
            return displayText}]]]
    //<p style='color:      ;'>
    ]
            ],
            "blank",
            "blank",
            "clickables",
            "blank",
            ["row", ["blank","blank","blank","blank", ["buyable", 26],]],
            "blank",
    "milestones",
    ["row", ["blank","blank",["buyable", 25],"blank","blank", ["buyable", 26],]],
    "blank",     
    ["row", [["buyable", 31], "blank","blank", ["buyable", 32], "blank","blank",["buyable", 33],"blank","blank",["buyable", 24],]],

    "blank",
    "blank",
    "blank", "blank"
],

    },

"Tech Tree":{
content: [  ["row",[
    ["column", [["display-text", function() {
        cpus = getBuyableAmount(this.layer, 31)
        cpuPlural = "is"
        displayText = "<h3>Your "+player.ma.points+" computational power and your "+formatUnit(player.ma.hz, "Hz")+" are producing "+ tmp.ma.researchGen +" research points/sec.</h3>"
        displayText = displayText + "<h3> You have <h1>" + format(player.ma.research) + "</h1><h3> research points. "




        displayText = displayText +"<style>h3 {color:" + "#ffffff" + "} h3 {text-shadow: 0 0 10px " + tmp.ma.color + ";} </style> " 


        return displayText}]]]
        
//<p style='color:      ;'>
]
        ],
        "blank","blank","blank","blank","blank","blank","blank","blank",
        ["row", [["upgrade", 41],["upgrade", 41],"blank","blank","blank","blank",["upgrade", 42],"blank","blank",["upgrade", 43],"blank","blank",["upgrade", 44],]],
        "blank",
    ["row", [["upgrade", 51],"blank","blank",["upgrade", 52], "blank", "blank", ["upgrade", 53], "blank", "blank", ["upgrade", 54],]],
    "blank",
    ["row", [["upgrade", 41],["upgrade", 41],"blank","blank","blank","blank",["upgrade", 62],"blank","blank",["upgrade", 63],"blank","blank",["upgrade", 64],]],
        
    
    
    ],
        style() {
            return {"background-image" : "url('https://media.giphy.com/media/3CSDXE3UCIiWPdqwql/giphy.gif')"}
            },


},


}
})