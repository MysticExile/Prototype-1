import * as PIXI from "pixi.js"

//import sprites and textures
import fishSprite from "./images/fish.png"
import bgImageStart from "./images/startscreen.png"
import sharkSprite from "./images/shark.png"
import bgImageWater2 from "./images/screen2.png"
import startImage from "./images/start knop.png"
import bgImageWater from "./images/water.jpg"

//import classes
import { Log } from './Log'
import { Menu } from './Menu'
import { Farm } from './Farm'
import { LogButton } from './LogButton'
import { moestuinButton } from './moestuinButton'
import { environmentButton } from './environmentButton'
import { startKnop } from './startKnop'
import { Environment } from './environment'
import { Plant } from './Plant'
import { Pot } from './Pot'
import { ENV } from "pixi.js"

export class Game {

    pixi: PIXI.Application
    loader: PIXI.Loader
    log: Log   // <- nu een Fish in plaats van een PIXI.Sprite
    menu: Menu
    startKnop: startKnop
    farm: Farm
    environment: Environment
    logButton: LogButton
    moestuinButton: moestuinButton
    environmentButton: environmentButton
    plant: Plant
    plants: Plant[] = []



    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("fishTexture", fishSprite)
            .add("backgroundTexture", bgImageWater2)
            .add("backgroundTexture2", bgImageStart)
            .add("backgroundTexture3", bgImageWater)
            .add("startButton", startImage)
            .add("sharkSprite", sharkSprite)
            .add("sharkButtonTexture", sharkSprite)
            

    this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        console.log("all textures loaded!")
        //load initial load screen
        this.menu = new Menu(this.loader.resources["backgroundTexture2"].texture!, this)
        this.pixi.stage.addChild(this.menu)

        this.startKnop = new startKnop(this.loader.resources["startButton"].texture!, this)
        this.pixi.stage.addChild(this.startKnop)

        //load textures that are to be eventually used

        this.farm = new Farm(this.loader.resources["backgroundTexture"].texture!, this)

        this.log = new Log(this.loader.resources["sharkSprite"].texture!, this)

        this.logButton = new LogButton(this.loader.resources["sharkButtonTexture"].texture!, this)
        this.moestuinButton = new moestuinButton(this.loader.resources["sharkButtonTexture"].texture!, this)
        this.environmentButton = new environmentButton(this.loader.resources["fishTexture"].texture!, this)

        this.environment = new Environment(this.loader.resources["backgroundTexture3"].texture!, this)

        for (let i = 0; i < 5; i++) {
            let plant = new Plant(this.loader.resources["fishTexture"].texture!, this)
            this.plants.push(plant)
        }

        //start gameloop
        
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    update(delta: number) {
    }

    loadLog() {
        this.pixi.stage.addChild(this.log)
        console.log("Log loaded")
    }

    loadFarmStage() {
        this.pixi.stage.addChild(this.farm);
        this.pixi.stage.addChild(this.logButton);
        this.pixi.stage.addChild(this.moestuinButton);
        this.pixi.stage.addChild(this.environmentButton);
        console.log("Farm stage loaded")
    }

    loadEnvironmentStage() {
        this.pixi.stage.addChild(this.environment)
        this.pixi.stage.addChild(this.logButton);
        this.pixi.stage.addChild(this.moestuinButton);
        this.pixi.stage.addChild(this.environmentButton);
        for (let i = 0; i < this.plants.length; i++) {
            this.pixi.stage.addChild(this.plants[i]);
        }
        console.log("Environment stage loaded")
    }

    destroyChildren() {
        for (let i = 0; i <= this.pixi.stage.children.length; i++) {
            this.pixi.stage.removeChild(this.pixi.stage.children[i])
            this.pixi.stage.removeChild(this.pixi.stage.children[i])
            this.pixi.stage.removeChild(this.pixi.stage.children[i])
            this.pixi.stage.removeChild(this.pixi.stage.children[i])
        }
        console.log(this.pixi.stage.children.length);
    }
    //Make an easier randomised integer function, call this if you need a random integer
    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}

new Game()