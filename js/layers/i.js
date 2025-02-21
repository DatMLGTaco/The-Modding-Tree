addLayer("i", {
    name: "Improvers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        unlockOrder: new Decimal(0),
        achievement: false
    }},
    color: "#fff396",
    resource: "Improvers", // Name of prestige currency
    canBuyMax() {return false},
    doReset(resettingLayer) {
        let keep = [];
        let keepupgrades = [];
        keep.push("milestones")
        if (hasMilestone("ee", "3")) keep.push("upgrades")
        if (hasMilestone("ee", "1") && hasUpgrade("i", 101))keepupgrades.push(101)
        if (hasMilestone("ee", "1") && hasUpgrade("i", 201))keepupgrades.push(201)
        if (hasMilestone("ee", "1") && hasUpgrade("i", 202))keepupgrades.push(202)
        if (hasMilestone("ee", "1") && hasUpgrade("i", 301))keepupgrades.push(301)
        if (hasMilestone("ee", "1") && hasUpgrade("i", 302))keepupgrades.push(302)
        if (hasMilestone("ee", "1") && hasUpgrade("i", 303))keepupgrades.push(303)
        if (hasMilestone("ee", "1") && hasUpgrade("i", 304))keepupgrades.push(304)
        if (layers[resettingLayer].row <= layers["ee"].row) {
            if(hasUpgrade("i", 401)) keepupgrades.push(401)
            if(hasUpgrade("i", 501)) keepupgrades.push(501)
            if(hasUpgrade("i", 502)) keepupgrades.push(502)
            if(hasUpgrade("i", 601)) keepupgrades.push(601)
            if(hasUpgrade("i", 602)) keepupgrades.push(602)
            if(hasUpgrade("i", 603)) keepupgrades.push(603)
            if(hasUpgrade("i", 604)) keepupgrades.push(604)
        }
        if (layers[resettingLayer].row > this.row) {
            layerDataReset("i", keep)
            player[this.layer].upgrades = keepupgrades
        }

        if (player.m.upgrades.length<=1) tmp.i.achievement = true
    },
    branches: ["m"],
		enGainMult() {
			let mult = new Decimal(1);
            if (player.ee.unlocked) mult = mult.times(tmp.ee.waterEff)
            if (hasUpgrade("i", 32)) mult = mult.times(upgradeEffect("i", 32))
			return mult;
		},
        improverEff(){
        if (player.i.points < 1) return new Decimal(1);
        eff = new Decimal(1)
        x = new Decimal(8.333)
        y = new Decimal(0.98)
        if (player.ee.unlocked) x = x.times(tmp.ee.earthEff)
        if (player.i.points.times(50).pow(0.5) >= 1) eff = (player.i.points.times(x)).pow(y)
        if (hasUpgrade("i", 33)) eff = eff.times(6)
        if (getBuyableAmount("ma", 31) > 0) eff = eff.times (tmp.ma.buyables[31].effect)
        return eff.pow(0.5)

        },
        tabFormat:{
            "Improvement":{
                content: [
            "main-display",
            ["row",[
                ["column", [["display-text", function() {return "Your Improvers are currently multiplying your fabric gain by " + formatWhole(tmp.i.improverEff.times(upgradeEffect("i", 11))) + "x!"}]]]
            
            ]
                    ],
            "blank",
            "prestige-button",
            "blank",
            "resource-display",
            "blank",
    
            "blank",
            ["row", [["upgrade", 11]]],
            ["row", [["upgrade", 21],["upgrade", 22]]],
            ["row", [["upgrade", 31],["upgrade", 32],["upgrade", 33]]],
            "blank",
            "blank",
            "milestones",
            "blank", "blank"
            ]},
        "Automation":{

            content: [
                ["row",[
                    ["column", [["display-text", function() {return "<style>imp {font-size: 60px} imp {color:" + tmp.i.color + "} imp {text-shadow: 2px 0 #000, -2px 0 #fff1a8, 0 2px #fff1a8, 0 -2px #fff1a8, 1px 1px #fff1a8, -1px -1px #fff1a8, 1px -1px #fff1a8, -1px 1px " + tmp.i.color + ",0px 20px 20px " + tmp.i.color + ";} </style><imp>. . . Automation . . .</imp>"}]]]
                ]],
                "blank",
                "blank",
                ["row",[
                    ["column", [["display-text", function() {return "<style>melg {font-size: 60px} melg {color:" + "#ffe438" + "} melg {text-shadow: 2px 0 #000, -2px 0 #bfa, 0 2px #bfa, 0 -2px #bfa, 1px 1px #bfa, -1px -1px #bfa, 1px -1px #bfa, -1px 1px " + tmp.ma.color + ",0px 20px 20px " + tmp.ma.color + ";} </style><melg>. . Automelge . .</melg>"}]]]
                ]],
                ["row",[
                    ["column", [["display-text", function() { let x = 3; if (hasMilestone("ee", "1")) {x = 4} return "<span style = 'font-size: 20px'><span style='color:" + "#ffe438" + "'><span style = 'text-shadow: 2px 0 #000'>Upgrades in this section reset on row " + x + " reset.</span></span>"}]]]
                ]],
                "blank",
                ["row", [["upgrade", 101]]],
                ["row", [["upgrade", 201],["upgrade", 202]]],
                ["row", [["upgrade", 301],["upgrade", 302],["upgrade", 303],["upgrade", 304]]],
                "blank",
                ["row",[
                    ["column", [["display-text", function() {if (hasMilestone("sp", "1"))return "<span style = 'font-size: 60px'><span style = 'text-shadow: 2px 0 #000, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff, 0px 10px 20px #ffffff '>. . Autophoto . .</span></span>"}]]]
                ]],
                ["row",[
                    ["column", [["display-text", function() {if (hasMilestone("sp", "1"))return "<span style = 'font-size: 20px'><span style = 'text-shadow: 2px 0 #000'>Upgrades in this section reset on row 4 reset.</span></span>"}]]]
                ]],
                "blank",
                ["row", [["upgrade", 401]]],
                ["row", [["upgrade", 501],["upgrade", 502]]],
                ["row", [["upgrade", 601],["upgrade", 602],["upgrade", 603],["upgrade", 604]]],
            ],

        }
        },
    upgrades:{
        11:{
        title: "Improver improver",
        description: "Further increase fabric gain based on number of Improvers.",
        cost: new Decimal(10), 
        effect() {
            x = new Decimal(1)
            if (hasAchievement("a", 14)) x = x.div(player.i.points.div(1000).max(1))
            return player[this.layer].points.add(1).times(1.2).pow(new Decimal(0.85).pow(x))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },    
        style() {                     
            if(hasUpgrade(this.layer, this.id)) return {
                'background-color': '#e8e0a0' 
    }
  }
},
21:{
    title: "Melge Integration",
    description: "Unlock a new melge upgrade.",
    cost: new Decimal(30), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
}
  },
  22:{
    title: "Immaterial Fabrication",
    description: "Improvers cheapen the fabrication of melge essence",
    cost: new Decimal(200), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
},
    effect() {
        x = new Decimal(player.p.points.add(1))
        return x.pow(1.1)

    }
  },
  31:{
    title: "Upgrade 4.",
    description: "Removes 4 Photonic Accelerators from the cost base and adds 4 Photonic Accelerators to their effect.",
    cost: new Decimal(1e8), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
},
    effect() {
        x = new Decimal(player.p.points.add(1))
        return x.pow(1.1)

    }
  },
  32:{
    title: "Upgrade 5.",
    description: "Flat 5x Improver and Light Energy gain multiplier.",
    cost: new Decimal(2e6), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
},
    effect() {
        x = new Decimal(5)
        return x

    }
  },
  33:{
    title: "Upgrade 6.",
    description: "Multiplies the improver effect by 6x",
    cost: new Decimal(1e6), 
    style() {                     
        if(hasUpgrade(this.layer, this.id)) return {
            'background-color': '#e8e0a0' 
}
},
    effect() {
        x = new Decimal(player.p.points.add(1))
        return x.pow(1.1)

    }
  },
  101:{
    fullDisplay() {
       return "<h3><b>Automation: 1</b></h3><p>Melge Upgrade 1 doesn't reset</p><br><p>Cost: 200 Melge Essence</p>"

    },
    canAfford() {
        if ( player.m.points.greaterThan(new Decimal(200))) return true
        return false
    },

    pay() {
        //player["i"].points = player["i"].points.sub(new Decimal(1))
        player.m.points = player.m.points.sub(new Decimal(200))
    },

    style() {
        a={
        'border': '1px dotted',
        'border-radius': '2px',
        'width' : '500px',
        'height' : '25px',
        }
        if(hasUpgrade(this.layer, this.id)) a = {
            'background-color': '#e8e0a0',
            'border-radius': '2px',
            'border': '1px dotted',
            'width' : '500px',
            'height' : '25px',

}
return a
},
  },
  201:{

      fullDisplay() {
          return "<h3><b>Automation: 2</b></h3><p>Melge Upgrades 2, 3, and 4 don't reset</p><br><p>Cost: 1 Improver & 2000 Melge Essence</p>"

      },
      canAfford() {
          if (player.i.points.greaterThan(new Decimal(1)) && player.m.points.greaterThan(new Decimal(200))) return true
          return false
      },

      pay() {
          player["i"].points = player["i"].points.sub(new Decimal(1))
          player.m.points = player.m.points.sub(new Decimal(2000))
      },
      unlocked() { return hasUpgrade("i", 101)},
    style() {
        a={
        'border': '1px dotted',
        'border-radius': '2px',
        'width' : '250px',
        'height' : '25px',
        }
        if(hasUpgrade(this.layer, this.id)) a = {
            'background-color': '#e8e0a0',
            'border': '1px dotted',
            'border-radius': '2px',
            'width' : '250px',
            'height' : '25px',

}
return a
},
  },
  202:{

      fullDisplay() {
          return "<h3><b>Automation: 3</b></h3><p>Melge Upgrade 5 doesn't reset.</p><br><p>Cost: 15 Improvers & 1e6 Melge Essence</p>"

      },
      canAfford() {
          if (player.i.points.greaterThan(new Decimal(14)) && player.m.points.greaterThan(new Decimal(1e6))) return true
          return false
      },

      pay() {
          player["i"].points = player["i"].points.sub(new Decimal(15))
          player.m.points = player.m.points.sub(new Decimal(1e6))
      },
      unlocked() { return hasUpgrade("i", 101)},
    style() {
        a={
        'border': '1px dotted',
        'border-radius': '2px',
        'width' : '250px',
        'height' : '25px',
        }
        if(hasUpgrade(this.layer, this.id)) a = {
            'background-color': '#e8e0a0',
            'border': '1px dotted',
            'border-radius': '2px',
            'width' : '250px',
            'height' : '25px',

}
return a
},
  },
  301:{

      fullDisplay() {
          return "<h3><b>Automation: 4</b></h3><p>Unlocks a method to generate melge essence...</p><br><p>Cost: 15 Improvers & 7500 Melge Essence</p>"

      },
      canAfford() {
          if (player.i.points.greaterThan(new Decimal(15)) && player.m.points.greaterThan(new Decimal(7500))) return true
          return false
      },

      pay() {
          player["i"].points = player["i"].points.sub(new Decimal(15))
          player.m.points = player.m.points.sub(new Decimal(7500))
      },
      unlocked() { return hasUpgrade("i", 201) && hasUpgrade("i", 202)},
      style() {
          a={
              'border': '1px dotted',
              'border-radius': '2px',
              'width' : '125px',
              'height' : '25px',
          }
          if(hasUpgrade(this.layer, this.id)) a = {
              'background-color': '#e8e0a0',
              'border': '1px dotted',
              'border-radius': '2px',
              'width' : '125px',
              'height' : '25px',

          }
          return a
      },
        },
        302:{

            fullDisplay() {
                return "<h3><b>Automation: 5</b></h3><p>You can buy 10 Melge Fabricators.</p><br><p>Cost: 999 Improvers & 1 Photon</p>"

            },
            canAfford() {
                if (player.i.points.greaterThan(new Decimal(999)) && player.p.points.greaterThan(new Decimal(0))) return true
                return false
            },

            pay() {
                player["i"].points = player["i"].points.sub(new Decimal(999))
                if (!hasMilestone("p", 2)) {
                player.p.points = player.p.points.sub(new Decimal(1))
                }
            },
            unlocked() { return hasUpgrade("i", 201) && hasUpgrade("i", 202)},
            style() {
                a={
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',
                }
                if(hasUpgrade(this.layer, this.id)) a = {
                    'background-color': '#e8e0a0',
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',

                }
                return a
            },
        },
        303:{

            fullDisplay() {
                return "<h3><b>Automation: 6</b></h3><p>Unlocks (and keeps) a new melge upgrade.</p><br><p>Cost: 999 Improvers & 1e15 Melge Essence</p>"

            },
            canAfford() {
                if (player.i.points.greaterThan(new Decimal(999)) && player.m.points.greaterThan(new Decimal(1e15))) return true
                return false
            },

            pay() {
                player["i"].points = player["i"].points.sub(new Decimal(999))
                player.m.points = player.m.points.sub(new Decimal(1e15))
            },
            unlocked() { return hasUpgrade("i", 201) && hasUpgrade("i", 202)},
            style() {
                a={
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',
                }
                if(hasUpgrade(this.layer, this.id)) a = {
                    'background-color': '#e8e0a0',
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',

                }
                return a
            },
        },
        304:{

            fullDisplay() {
                return "<h3><b>Automation: 7</b></h3><p>Unlocks (and keeps) another new melge upgrade.</p><br><p>Cost: 999 Improvers & 1e15 Melge Essence</p>"

            },
            canAfford() {
                if (player.i.points.greaterThan(new Decimal(999)) && player.m.points.greaterThan(new Decimal(1e15))) return true
                return false
            },

            pay() {
                player["i"].points = player["i"].points.sub(new Decimal(999))
                player.m.points = player.m.points.sub(new Decimal(1e15))
            },
            unlocked() { return hasUpgrade("i", 201) && hasUpgrade("i", 202)},
            style() {
                a={
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',
                }
                if(hasUpgrade(this.layer, this.id)) a = {
                    'background-color': '#e8e0a0',
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',

                }
                return a
            },
        },
        401:{
            fullDisplay() {
                return "<h3><b>Automation: 8</b></h3><p>Keep Subatomic Breakthrough on reset</p><br><p>Cost: 1e30 Light Energy</p>"

            },
            canAfford() {
                if ( player.p.power.gte(new Decimal(1e30))) return true
                return false
            },

            pay() {
                //player["i"].points = player["i"].points.sub(new Decimal(1))
                player.p.power = player.p.power.sub(new Decimal(1e30))
            },

            style() {
                a={
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'border-color': '#ffffff',
                    'width' : '500px',
                    'height' : '25px',
                }
                if(hasUpgrade(this.layer, this.id)) a = {
                    'background-color': '#e8e0a0',
                    'border-radius': '2px',
                    'border': '3px dotted',
                    'border-color': '#ffffff',
                    'width' : '500px',
                    'height' : '25px',

                }
                return a
            },
        },
        501:{

            fullDisplay() {
                return "<h3><b>Automation: 9</b></h3><p>Autobuy Photons</p><br><p>Cost: 1 Subatomic Particle & 1e35 light energy</p>"

            },
            canAfford() {
                if (player.sp.points.gte(new Decimal(1)) && player.p.power.gte(new Decimal(1e35))) return true
                return false
            },

            pay() {
                player["sp"].points = player["sp"].points.sub(new Decimal(1))
                player[p].power = player[p].power.sub(new Decimal(1e35))
            },
            unlocked() { return hasUpgrade("i", 101)},
            style() {
                a={
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '250px',
                    'height' : '25px',
                }
                if(hasUpgrade(this.layer, this.id)) a = {
                    'background-color': '#e8e0a0',
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '250px',
                    'height' : '25px',

                }
                return a
            },
        },
        502:{

            fullDisplay() {
                return "<h3><b>Automation: 3</b></h3><p>Melge Upgrade 5 doesn't reset.</p><br><p>Cost: 15 Improvers & 1e6 Melge Essence</p>"

            },
            canAfford() {
                if (player.i.points.greaterThan(new Decimal(14)) && player.m.points.greaterThan(new Decimal(1e6))) return true
                return false
            },

            pay() {
                player["i"].points = player["i"].points.sub(new Decimal(15))
                player.m.points = player.m.points.sub(new Decimal(1e6))
            },
            unlocked() { return hasUpgrade("i", 101)},
            style() {
                a={
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '250px',
                    'height' : '25px',
                }
                if(hasUpgrade(this.layer, this.id)) a = {
                    'background-color': '#e8e0a0',
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '250px',
                    'height' : '25px',

                }
                return a
            },
        },
        601:{

            fullDisplay() {
                return "<h3><b>Automation: 4</b></h3><p>Unlocks a method to generate melge essence...</p><br><p>Cost: 15 Improvers & 7500 Melge Essence</p>"

            },
            canAfford() {
                if (player.i.points.greaterThan(new Decimal(15)) && player.m.points.greaterThan(new Decimal(7500))) return true
                return false
            },

            pay() {
                player["i"].points = player["i"].points.sub(new Decimal(15))
                player.m.points = player.m.points.sub(new Decimal(7500))
            },
            unlocked() { return hasUpgrade("i", 201) && hasUpgrade("i", 202)},
            style() {
                let a={
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',
                }
                if(hasUpgrade(this.layer, this.id)) a = {
                    'background-color': '#e8e0a0',
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',

                }
                return a
            },
        },
        602:{

            fullDisplay() {
                return "<h3><b>Automation: 5</b></h3><p>You can buy 10 Melge Fabricators.</p><br><p>Cost: 999 Improvers & 1 Photon</p>"

            },
            canAfford() {
                if (player.i.points.greaterThan(new Decimal(999)) && player.p.points.greaterThan(new Decimal(0))) return true
                return false
            },

            pay() {
                player["i"].points = player["i"].points.sub(new Decimal(999))
                if (!hasMilestone("p", 2)) {
                    player.p.points = player.p.points.sub(new Decimal(1))
                }
            },
            unlocked() { return hasUpgrade("i", 201) && hasUpgrade("i", 202)},
            style() {
                a={
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',
                }
                if(hasUpgrade(this.layer, this.id)) a = {
                    'background-color': '#e8e0a0',
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',

                }
                return a
            },
        },
        603:{

            fullDisplay() {
                return "<h3><b>Automation: 6</b></h3><p>Unlocks (and keeps) a new melge upgrade.</p><br><p>Cost: 999 Improvers & 1e15 Melge Essence</p>"

            },
            canAfford() {
                if (player.i.points.greaterThan(new Decimal(999)) && player.m.points.greaterThan(new Decimal(1e15))) return true
                return false
            },

            pay() {
                player["i"].points = player["i"].points.sub(new Decimal(999))
                player.m.points = player.m.points.sub(new Decimal(1e15))
            },
            unlocked() { return hasUpgrade("i", 201) && hasUpgrade("i", 202)},
            style() {
                a={
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',
                }
                if(hasUpgrade(this.layer, this.id)) a = {
                    'background-color': '#e8e0a0',
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',

                }
                return a
            },
        },
        604:{

            fullDisplay() {
                return "<h3><b>Automation: 7</b></h3><p>Unlocks (and keeps) another new melge upgrade.</p><br><p>Cost: 999 Improvers & 1e15 Melge Essence</p>"

            },
            canAfford() {
                if (player.i.points.greaterThan(new Decimal(999)) && player.m.points.greaterThan(new Decimal(1e15))) return true
                return false
            },

            pay() {
                player["i"].points = player["i"].points.sub(new Decimal(999))
                player.m.points = player.m.points.sub(new Decimal(1e15))
            },
            unlocked() { return hasUpgrade("i", 201) && hasUpgrade("i", 202)},
            style() {
                a={
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',
                }
                if(hasUpgrade(this.layer, this.id)) a = {
                    'background-color': '#e8e0a0',
                    'border': '1px dotted',
                    'border-radius': '2px',
                    'width' : '125px',
                    'height' : '25px',

                }
                return a
            },
        },
    },
    requires() {
        x = new Decimal(800)
        y = new Decimal(1)
        if (player.i.unlockOrder > 0 && !hasAchievement("a", 23)) x = new Decimal(5e11), y = y.times(3)
        x = x.times(y)
        if (hasAchievement("a", 23)) x = x.div(player.i.points.add(1).div(25).max(2).log(2).max(1)).max(1)
        return x }, // Can be a function that takes requirement increases into account
    baseResource: "fabric", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('i', 23)) mult = mult.times(upgradeEffect('i', 23))
        if (hasUpgrade("i", 32)) mult = mult.times(upgradeEffect("i", 32))
        if (player.ee.unlocked) mult = mult.times(tmp.ee.waterEff)
        if (getBuyableAmount("ma", 32) > 0) mult = mult.times (tmp.ma.buyables[32].effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    milestones: {
        0: {requirementDescription: "5 Total Improvers",
        done() {return player.i.total.gte(5)}, // Used to determine when to give the milestone
        effectDescription() { s = "Multiply Improver Effect by 10"

        return s
    },
    style() {
        if(hasMilestone(this.layer, this.id)) return {
            'background-color': '#e8e0a0'
}
},
    unlocked () {x = true; return x},
    },
    1: {requirementDescription: "25 Total Improvers",
    done() {return player.i.total.gte(25)}, // Used to determine when to give the milestone
    effectDescription() { s = "among us placeholder sus!"

    return s
},
style() {
    if(hasMilestone(this.layer, this.id)) return {
        'background-color': '#e8e0a0'
}
},
unlocked () {x = false; if (hasMilestone("i", 0)) x = true; return x},
}
    },
    hotkeys: [
        {key: "i", description: "I: Reset for Improvers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    increaseUnlockOrder: ["p"],
    layerShown(){return true}


})