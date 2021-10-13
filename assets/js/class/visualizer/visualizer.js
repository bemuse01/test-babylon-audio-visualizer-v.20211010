import PUBLIC_METHOD from '../../method/method.js'
import CHILD from './build/visualizer.child.build.js'

export default class{
    constructor({scene}){
        this.param = {
        }

        this.modules = {
            child: CHILD
        }
        this.comp = {}

        this.init(scene)
    }


    // init
    init(scene){
        this.initGroup()
        this.initRenderObject()
        this.create(scene)
        // this.add()
    }
    initGroup(){
        for(const module in this.modules){
            this.comp[module] = null
        }
    }
    initRenderObject(){
        // this.element = document.querySelector('.visualizer-object')

        // const {width, height} = this.element.getBoundingClientRect()

        // this.size = {
        //     el: {
        //         w: width,
        //         h: height
        //     },
        //     obj: {
        //         w: PUBLIC_METHOD.getVisibleWidth(this.camera, 0),
        //         h: PUBLIC_METHOD.getVisibleHeight(this.camera, 0)
        //     }
        // }
    }


    // add
    add(){
    }


    // create
    create(scene){
        for(const module in this.modules){
            const instance = this.modules[module]

            this.comp[module] = new instance({scene, size: this.size})
        }
    }


    // animate
    animate({app, audio}){
        this.render(app)
        this.animateObject(audio)
    }
    render(app){
    }
    animateObject(audio){
        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].animate) continue
            this.comp[i].animate(audio)
        }
    }


    // resize
    resize(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: PUBLIC_METHOD.getVisibleWidth(this.camera, 0),
                h: PUBLIC_METHOD.getVisibleHeight(this.camera, 0)
            }
        }

        this.resizeObject()
    }
    resizeObject(){
        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].resize) continue
            this.comp[i].resize(this.size)
        }
    }
}