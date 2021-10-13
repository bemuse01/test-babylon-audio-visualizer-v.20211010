import {PlaneGeometry} from '../../../lib/three.module.js'
import BABYLON_METHOD from '../../../method/method.babylon.js'
import METHOD from '../method/visualizer.child.method.js'

export default class{
    constructor({scene}){
        this.param = {
            fps: 60,
            step: 12,
            width: 6,
            height: 0.05,
            maxHeight: 1,
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
        const material = new BABYLON.StandardMaterial('material', scene)
        material.emissiveColor = new BABYLON.Color3(1, 1, 1)

        // const pcs = new BABYLON.PointsCloudSystem("pcs", 5, scene)
        // // pcs.material = material

        // const myfunc = (particle, i, s) => {
        //     particle.position = new BABYLON.Vector3(0.5 + 0.25 * Math.random(), i / 5000, 0.25 * Math.random())
        //     particle.color = new BABYLON.Color4(Math.random(), Math.random(), Math.random(), Math.random())
        // }

        // pcs.addPoints(1000, myfunc)

        // console.log(pcs)

        // this.plane = new BABYLON.MeshBuilder.CreatePlane('plane', {width: 10, height: 0.1, updatable: true, sideOrientation: BABYLON.Mesh.BACKSIDE}, scene)

        // this.plane.forceSharedVertices()
        // this.plane.increaseVertices(20)

        // this.plane.position.y = 0
        // this.plane.material = material

        // const path = []
    
        // const size = 10
        // const offset = size / -2
        // const count = 2 - 1
        // const width = size / count
    
        // for(let i = 0; i <= count; i++){
        //     const x = offset + width * i 
        //     const y = 0
        //     const z = 0
        //     const v = new BABYLON.Vector3(x, y, z)
        //     path.push(v)
        // }

        // const line = BABYLON_METHOD.line2D('line', {path, width: 0.1}, scene)
        // line.material = material

        // const position = this.plane.getVerticesData(BABYLON.VertexBuffer.PositionKind)
        // console.log(position)

        const geometry = new PlaneGeometry(this.param.width, this.param.height, this.param.seg)
        const positions = [...geometry.attributes.position.array]
        const indices = [...geometry.index.array]
        const colors = Array.from({length: positions.length / 3}, () => [1, 1, 1, 1]).flat()

        this.mesh = BABYLON_METHOD.createCustomMesh({name: 'plane', material, positions, indices, colors, scene})

        console.log(this.mesh)
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

        // this.mesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, position)
    }
}