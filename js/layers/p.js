addLayer("p", {
    name: "Photons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
        power: new Decimal(0),
        unlockOrder: new Decimal(0),
        frequency: 0.02,
        amplitude: 30,
        speed: 0.03,
    }},
    color: "#ffffff",
    resource: "Photons", // Name of prestige currency
    canBuyMax() {return false},
    branches: ["m"],
		enGainMult() {
			let mult = new Decimal(1);
			return mult;
		},

    upgrades:{
        11:{
        title: "Subatomic Breakthrough",
        description() {

        if (!hasUpgrade("sp", 11)) return "Increase fabric gain based on number of photons.";
        return "Increase fabric and synergy effect based on number of photons."
        }, 
        cost: new Decimal(1), 
        effect() {
            eff = player[this.layer].points.add(1).times(5)
            if (hasUpgrade('sp', 11)) eff = eff.pow(upgradeEffect('sp', 11))
            return eff
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },   
    }, 
        12: {
            title: "Discount One",
            description: "Photon Accelerators and Melge Fabricators are cheaper based on your light energy!",
            cost() { return new Decimal(1e11) },
            currencyDisplayName: "light energy",
            currencyInternalName: "power",
            currencyLayer: "p",
            effect() { 
                let eff = new Decimal(32).times(player.p.power.add(1).pow(0.25));
                if (hasUpgrade("p", 14)) eff = eff.times(upgradeEffect("p", 14))
                return eff;
            },
            unlocked() { return hasAchievement("a", 22)&&hasUpgrade("p", 11)&&getBuyableAmount("p", 11)>0},
            effectDisplay() { return "/"+format(tmp.p.upgrades[12].effect) },


        },
        13: {
            title: "Discount Two",
            description: "Photon Accelerator cost base is reduced based on light energy!",
            cost() { return new Decimal(1e18) },
            currencyDisplayName: "light energy",
            currencyInternalName: "power",
            currencyLayer: "p",
            effect() {
                let effBase = player.p.power
                let logBase = 10
                if (hasUpgrade("p", 14)) effBase = effBase.times(upgradeEffect("p", 14)); logBase = 9
                let eff = (effBase.add(1).log(logBase).div(3.5));

                return eff;
            },
            unlocked() { return hasAchievement("a", 24)&&hasUpgrade("p", 11)&&hasUpgrade("p", 12)&&getBuyableAmount("p", 11)>0},
            effectDisplay() { return "-"+format(tmp.p.upgrades[13].effect) },


        },
        14: {
            title: "Discount Three",
            description: "Discounts One & Two are multiplied by light energy effect at a reduced rate.",
            cost() { return new Decimal(1e18) },
            currencyDisplayName: "light energy",
            currencyInternalName: "power",
            currencyLayer: "p",
            effect() {
                let eff = format(tmp.p.powerEff.log(1.9))

                return eff;
            },
            unlocked() { return hasAchievement("a", 24)&&hasUpgrade("p", 11)&&hasUpgrade("p", 12)&&getBuyableAmount("p", 11)>0},
            effectDisplay() { return format(tmp.p.upgrades[14].effect) },


        },
        21: {
            title: "Refraction",
            description: "Subatomic Breakthrough multiplies light energy gain at a reduced rate.",
            cost() { return new Decimal(1e21) },
            currencyDisplayName: "light energy",
            currencyInternalName: "power",
            currencyLayer: "p",
            effect() { 
                let eff = tmp.p.upgrades[11].effect.log(2)
                if (hasUpgrade("p", 22)) eff = eff.times(upgradeEffect("p", 22))
                return eff;
            },
            unlocked() { return hasUpgrade("p", 12)&&getBuyableAmount("p", 11)>10&&player.sp.unlocked},
            effectDisplay() { return "x"+format(tmp.p.upgrades[21].effect) },


        },
        22: {
            title: "Prismatic Lens",
            description: "Light Energy multiplies Refraction at a reduced rate.",
            cost() { return new Decimal(1e40) },
            currencyDisplayName: "light energy",
            currencyInternalName: "power",
            currencyLayer: "p",
            effect() {
                let eff = format(tmp.p.powerEff.log(2))

                return eff;
            },
            unlocked() { return hasUpgrade("p", 12)&&getBuyableAmount("p", 11)>10&&player.sp.unlocked},
            effectDisplay() { return "x"+format(tmp.p.upgrades[22].effect) },


        },


    },
    requires() {
        x = new Decimal(800)
        y = new Decimal(1)
        if (player[this.layer].unlocked) y = player[this.layer].points.add(1).pow(1.5)
        if (player.p.unlockOrder > 0) x = new Decimal(5e11), y = y.times(3)
        if (player[this.layer].points>=10) y=y.times(x)
        x = x.times(y)
        return x }, // Can be a function that takes requirement increases into account
    baseResource: "fabric", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.15, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('i', 23)) mult = mult.times(upgradeEffect('i', 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    milestones: {
        0: {requirementDescription: "5 Photons",
            done() {return player.p.best.gte(5)}, // Used to determine when to give the milestone
            effectDescription() { s = "Melge upgrades don't reset on all resets on this layer or below."
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
    effBase() {
        let base = new Decimal(2);
        if (player.ee.unlocked) base = base.times(tmp.ee.earthEff)
        return base;
    },
    effect() {
        if (!player.p.unlocked) return new Decimal(0);
        let eff = Decimal.pow(this.effBase(), player.p.points.sub(1).max(0));
        if (!hasMilestone("p", 1)) eff = new Decimal (0)
        eff = eff.times(tmp.p.sliderEff)
        if (tmp.p.buyables[11].effect>=1) eff = eff.times(tmp.p.buyables[11].effect)
        if (hasUpgrade("p", 21)) eff = eff.times(upgradeEffect("p", 21))
        if (hasUpgrade("i", 32)) eff = eff.times(upgradeEffect("i", 32))
        return eff;
    },
    effectDescription() {
        if (hasMilestone("p", 1)) {return "which are generating "+format(tmp.p.effect)+" light energy/sec"} else {return ""}
    },
    update(diff) {
        if (player.p.unlocked&&hasMilestone("p", 1)) player.p.power = player.p.power.plus(tmp.p.effect.times(diff));
    },
    powerExp() {
        let exp = new Decimal(1/3);
        return exp;
    },
    powerEff() {
        if (!player.p.unlocked) return new Decimal(1);
        if (!hasMilestone("p", 1)) return new Decimal(1);
        x = player.p.power.plus(1).pow(this.powerExp()).times(tmp.p.sliderEff);
        if (player.ee.unlocked) x = x.times(tmp.ee.airEff)
        return x
        // 
    },

    tabFormat() { if (player.p.points < 10){ return ([["main-display"],
            "main-display",
            "prestige-button",
			"resource-display",
			"blank",

			"milestones",
			"blank",
            ["bar", "PhotonicSlider"],

            "blank",
            "blank",
			"upgrades",

			"blank", "blank"
		]
    )
}
        if (player.p.points > 9)  return ([
            "main-display",

            "resource-display",
            "blank",
            ["display-text", "You have " + formatWhole(player[this.layer].power) + " light energy, which multiplies fabric gain by " + formatWhole(tmp.p.powerEff) + "x!"],
            ["display-text", "Your light energy has additionally filled the Photon Bar to " + format(tmp.p.bars.PhotonicSlider.progress * 100) + "%, which multiplies the light energy gain and effect by " + format(tmp.p.sliderEff) ],
            "blank",
            ["bar", "PhotonicSlider"],

               /* ["wave", {
                    borderColor: '#4CAF50',
                    borderWidth: '2px',
                    borderRadius: '15px',
                    position: 'center',
                    width: "50%",
                    height: "60px",
                    strokeWidth: 3,
                    amplitude: 10,
                    frequency: 0.13,
                    speed: -15,
                    background: "linear-gradient(to right, #ffffff, #000000)",
                    waveGradient: {
                        type: "linear",
                        x0: 0, y0: 0.5, // Start at left center
                        x1: 1, y1: 0.5, // End at right center
                        stops: [
                            { offset: 0, color: "#4CAF50" },
                            { offset: 1, color: "#2196F3" }
                        ]
                    },
                    waveGradient: {
                        type: "radial",
                        x0: 0.5, y0: 0.5, r0: 0,    // Center start
                        x1: 0.5, y1: 0.5, r1: 0.5,  // Radius half of canvas
                        stops: [
                            { offset: 0, color: "#FF5722" },
                            { offset: 1, color: "#FFC107" }
                        ]
                    }
                }],*/

            "blank",

                "blank",
            "buyables",
            "blank",
            "blank",
            "upgrades",

            "blank", "blank",
    ]
        )
        
    },
    sliderEff () {
        x = new Decimal(player[this.layer].points/10) 
        if (hasMilestone("p", 1)) x = player.p.power.max(2).log(3).div(25)
        return x.times(100).times(5).pow(0.75).times(player.p.power.max(2).log(3).div(25).times(100)).times(15)
        //.times(100).times(y).pow(0.75)
    },
    wave: {
      VisibleSlider:{
          frequency: 0.13, amplitude: 52, speed: -15, color: "#0F0F0F"

      }
    },
    bars: {
        PhotonicSlider: {
            direction: RIGHT,
            width: 850,
            height: 85,
            progress() {
                x = new Decimal(player[this.layer].points/10) 
                if (hasMilestone("p", 1)) x = player.p.power.log(3).div(25)
                return x },
            unlocked: true,

            fillStyle() {
                x = {'background-color': '#0F0F0F'}
                let rgb = Math.ceil(255*tmp.p.bars.PhotonicSlider.progress) 
                return {"background-color": ("rgb("+rgb+", "+rgb+", "+rgb+")") } },
                display() {
                    if (hasMilestone("p" , 1)){
                return '<p style="color:#2e2e2e;">You have <h2 style="color:black;"><b>' + format(player.p.power) + ' light energy.</b><p style="color:#2e2e2e;"> '+format(tmp.p.powerEff)+'x fabric gen.</p>'
                    }else{return ""}
                }
        },
    
    },
    doReset(resettingLayer) {
        let keep = [];
        let keepupgrades = [];
        if (hasUpgrade("i", 401)) keepupgrades.push(11)
        if (hasUpgrade("i", 501)) keepupgrades.push(21,22,23)
        if (hasUpgrade("i", 502)) keepupgrades.push(12)
        if (hasUpgrade("i", 603)) keepupgrades.push(31)
        if (hasUpgrade("i", 604)) keepupgrades.push(32)
        if (hasMilestone("sp", 1)) keep.push("upgrades")
        if (hasMilestone("sp", 1)&& resettingLayer=="sp") keep.push("milestones"), keep.push("points")
        if (hasMilestone("ee", 2)) keep.push("milestones")
        if (player.m.upgrades.length<=1) tmp.i.achievement = true
        if (layers[resettingLayer].row > this.row){
            layerDataReset(this.layer, keep)
        }
    },
    buyables: {
        11: {
            title: "Photon Accelerator",
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(25) && tmp[this.layer].buyables[this.id].costScalingEnabled) x = x.pow(2).div(25)
                let k = 9.25
                if (hasUpgrade("i", 31)) k = k - 4
                base = x.add(k)
                if (hasUpgrade("p", 13)) base = base.sub(tmp.p.upgrades[13].effect)
                let cost = Decimal.pow(2, base.pow(1.25))
                if (hasUpgrade("p", 12)) cost = cost.div(upgradeEffect("p", 12))
                return formatWhole(cost)
            },
//leave this space herea
//what

            display() { return "Effect: Accelerates light energy gain by " + format(tmp.p.buyables[11].effect) + "x/s." + "\nBuy 1 Photon Accelerator\n Amount: " + getBuyableAmount(this.layer, this.id) + " Photon Accelerators" +"\nCost: " + formatWhole(this.cost(getBuyableAmount(this.layer, this.id))) + " light energy."},
            canAfford() { return player.p.power.gte(this.cost()) },
            effect() {
                let k = new Decimal(1)
                if (hasUpgrade("i", 31)) k = 4
                eff = new Decimal(5).times((getBuyableAmount(this.layer, 11).times(k)).times(3.5).pow(5.5)).max(1)

                if(player.sp.unlocked&&player.sp.quarks >= 0) eff = eff.times(1+tmp.sp.quarkEff/100)

                return eff

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
                if(hasUpgrade('i', 22)&&hasUpgrade('p', 11)&&hasMilestone('p', 1)) x = true
                return x
            },
        },
    },
    hotkeys: [
        {key: "p", description: "P: Reset for photons", onPress(){if (canReset(this.layer)&&player.p.points<11) doReset(this.layer)}},
    ],
    style() {
        x = {'background-color': '#0F0F0F'}
        let rgb = Math.ceil(2*player[this.layer].points+(player[this.layer].buyables[11]/5)) 
        if (rgb>100) rgb= rgb = 100+Math.ceil(player[this.layer].buyables[11]/5)
        if (rgb>125) rgb= 125
        return {"background-color": ("rgb("+rgb+", "+rgb+", "+rgb+")") } },
    layerShown(){return true},
    increaseUnlockOrder: ["i"],

})




