import {PlaneGeometry} from '../../../lib/three.module.js'
import BABYLON_METHOD from '../../../method/method.babylon.js'

export default class{
    constructor({scene}){
        this.param = {

        }

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

        const geometry = new PlaneGeometry(2, 1, 1)
        const positions = [...geometry.attributes.position.array]
        const indices = [...geometry.index.array]
        const colors = Array.from({length: positions.length / 3}, () => [1, 1, 1, 1]).flat()

        // var positions =  [-5, 5, 0, 0, 5, 0, 5, 5, 0, -5, -5, 0, 0, -5, 0, 5, -5, 0]0: -51: 52: 03: 04: 55: 06: 57: 58: 09: -510: -511: 012: 013: -514: 015: 516: -517: 0length: 18[[Prototype]]: Array(0);
        // var indices = [0, 1, 2];
        // var colors = [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1]; 

        console.log(positions, indices, colors)
        console.log(geometry)

        const plane = BABYLON_METHOD.createCustomMesh({name: 'plane', material, positions, indices, colors, scene})

        // console.log(plane.getVerticesData(BABYLON.VertexBuffer.PositionKind))
    }


    // resize
    resize(){

    }


    // animate
    animate(){

    }
}