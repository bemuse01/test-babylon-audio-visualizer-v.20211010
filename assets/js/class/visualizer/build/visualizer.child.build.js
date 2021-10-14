import {PlaneGeometry} from '../../../lib/three.module.js'
import BABYLON_METHOD from '../../../method/method.babylon.js'
import METHOD from '../method/visualizer.child.method.js'

export default class{
    constructor({scene}){
        this.param = {
            fps: 60,
            step: 12,
            width: 5,
            height: 0.05,
            maxHeight: 2,
            display: 16 ** 2,
            seg: 16 ** 2 - 1,
            size: 16,
            color: 0xffffff,
            smooth: 0.14,
            smoothingTimeConstant: 0.85,
        }

        this.index = Array.from({length: this.param.seg + 1}, (_, i) => i)

        this.init(scene)
    }


    // init
    init(scene){
        this.create(scene)
    }


    // create
    create(scene){
        this.createMesh(scene)
    }
    createMesh(scene){
        const {positions, indices, colors} = this.createGeometry()
        const material = this.createMaterial()
        this.mesh = BABYLON_METHOD.createCustomMesh({name: 'plane', material, positions, indices, colors, scene})
    }
    createGeometry(){
        const geometry = new PlaneGeometry(this.param.width, this.param.height, this.param.seg)
        const positions = [...geometry.attributes.position.array]
        const indices = [...geometry.index.array]
        const colors = Array.from({length: positions.length / 3}, () => [1, 1, 1, 1]).flat()

        return {positions, indices, colors}
    }
    createMaterial(){
        const material = new BABYLON.StandardMaterial('material', scene)
        material.emissiveColor = new BABYLON.Color3(1, 1, 1)
        return material
    }


    // resize
    resize(){

    }


    // animate
    animate({audioData, context}){
        if(!audioData) return

        const startOffset = Math.floor(1 / this.param.fps * context.sampleRate)
        const offset = audioData.slice(startOffset)
        const sample = METHOD.createStepAudioBuffer({sample: offset, ...this.param})
        const buffer = METHOD.createAudioBuffer({sample, index: this.index, ...this.param})

        const array = this.mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind)
        const half = array.length / 3 / 2

        for(let i = 0; i < half; i++){
            const idx1 = i * 3
            const idx2 = (i + half) * 3

            const dist = buffer[i] * 1

            array[idx1 + 1] = dist
            array[idx2 + 1] = -dist
        }

        this.mesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, array)
    }
}