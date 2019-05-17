const brain = require("brain.js/index")
const someData = require("./trainingData/multiLabel")
const fs = require("fs")

const betterData = someData.map( set => {
    return {
        input: set.slice(0, 9),
        output: set.slice(9)
    }
})
//console.log(betterData)
const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3],
    activation: 'sigmoid',
    leakyReluAlpha: 0.01
}

const net = new brain.NeuralNetwork(config);

net.train(betterData);

fs.writeFileSync('trained-net.js', `export default  ${ net.toFunction().toString() };`)
console.log('done!');