import APP from './class/app/app.js'
import AUDIO from './class/audio/audio.js'
import VISUALIZER from './class/visualizer/visualizer.js'
import PROGRESS from './class/progress/progress.js'

new Vue({
    el: '#wrap',
    data(){
        return{
            element: {
                progress: new PROGRESS()
            }
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.initBabylon()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // babylon
        initBabylon(){
            OBJECT.app = new APP()

            this.createObject(OBJECT.app)
        },
        resizeBabylon(){
            const {app} = OBJECT

            for(let i in OBJECT){
                if(!OBJECT[i].resize) continue
                OBJECT[i].resize({app})
            }
        },
        renderBabylon(){
            const {app, audio} = OBJECT
            
            for(let i in OBJECT){
                if(!OBJECT[i].animate) continue
                OBJECT[i].animate({app, audio})
            }
        },
        createObject(app){
            this.createAudio()
            this.createVisualizer(app)
        },
        createAudio(){
            OBJECT.audio = new AUDIO()
        },
        createVisualizer(app){
            OBJECT.visualizer = new VISUALIZER(app)
        },


        // element
        animateElement(){
            for(let i in this.element){
                if(!this.element[i].animate) continue
                this.element[i].animate(OBJECT)
            }
        },
        onClickProgress(e){
            const {audio} = OBJECT
            this.element.progress.group.hover.onClick(e, audio)
        },


        // event
        onWindowResize(){
            this.resizeBabylon()
        },


        // render
        render(){
            this.renderBabylon()
        },
        animate(){
            this.render()
            this.animateElement()
            requestAnimationFrame(this.animate)
        }
    }
})