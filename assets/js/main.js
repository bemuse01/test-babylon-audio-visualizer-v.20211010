import APP from './class/app/app.js'

new Vue({
    el: '#wrap',
    data(){
        return{
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
            const {app} = OBJECT
            
            for(let i in OBJECT){
                if(!OBJECT[i].animate) continue
                OBJECT[i].animate({app})
            }
        },
        createObject(app){
        },


        // element
        animateElement(){
            for(let i in this.element){
                if(!this.element[i].animate) continue
                this.element[i].animate(OBJECT)
            }
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
            // this.animateElement()
            requestAnimationFrame(this.animate)
        }
    }
})