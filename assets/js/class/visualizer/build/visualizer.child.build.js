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

        // const plane = new BABYLON.MeshBuilder.CreatePlane('plane', {width: 10, height: 0.1, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene)
        // plane.position.y = 1
        // plane.material = material

        const path = []
    
        const size = 10
        const offset = size / -2
        const count = 128 - 1
        const width = size / count
    
        for(let i = 0; i <= count; i++){
            const x = offset + width * i 
            const y = 0
            const z = 0
            const v = new BABYLON.Vector3(x, y, z)
            path.push(v)
        }

        const line = BABYLON_METHOD.line2D('line', {path, width: 0.1}, scene)
        line.material = material
    }


    // resize
    resize(){

    }


    // animate
    animate(){

    }
}