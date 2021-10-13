import VISUALIZER from '../visualizer/visualizer.js'

export default class{
    constructor(){
        this.modules = {
            visualizer: VISUALIZER
        }
        this.comp = {}

        this.init()
    }


    // init
    init(){
        const canvas = document.getElementById('canvas')

        this.engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true})

        this.scene = this.create(this.engine)

        // this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3.Zero(), this.scene)
        // this.camera.setTarget(BABYLON.Vector3.Zero())
        // this.camera.attachControl(canvas, true)

        this.camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, -10), this.scene)
        this.camera.setTarget(BABYLON.Vector3.Zero())
        // this.camera.attachControl(canvas, true)
    }


    // create
    create(engine){
        const scene = new BABYLON.Scene(engine)
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1)

        // for(const module in this.modules){
        //     const instance = this.modules[module]

        //     this.comp[module] = new instance(scene)
        // }
        
        return scene
    }


    // resize
    resize(){
        this.engine.resize()
    }


    // animate
    animate(){
        this.scene.render()
    } 
}