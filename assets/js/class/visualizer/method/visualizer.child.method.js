import METHOD from '../../../method/method.js'
import Spline from '../../../lib/cubic-spline.js'

export default {
    createStepAudioBuffer({sample, display, step}){
        const temp = []

        for(let i = 0; i < display; i++){
            temp.push(sample[i * step])
        }

        return temp
    },
    createAudioBuffer({sample, index, height, maxHeight, smooth}){
        const len = sample.length 
        let temp = []

        const xs = index
        const ys = sample
        const spline = new Spline(xs, ys)
        
        for(let i = 0; i < len; i++){
            temp.push(spline.at(i * smooth))
        }

        const avg = temp.reduce((x, y) => x + y) / len
        // temp = temp.map(e => Math.max(1, e - avg))
        temp = temp.map(e => METHOD.normalize(Math.max(0, e - avg), height / 2, maxHeight, 0, 255))

        return temp
    }
}