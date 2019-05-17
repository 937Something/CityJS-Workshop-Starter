import trainedNet from '../trained-net'

exports.handler = function (event, context, callback) {
    // If you are building something serious you should probably 
    // validate that request type :D
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const board = (event.body && event.body.length > 0) ? JSON.parse(event.body) : [];
    //console.log(board)
    const result = (board) ? trainedNet(board) : [];

    //console.log(result)

    const emptySpaces = board.map((space, index) => {
        return space === 0 ? result[index] : null
    }).filter(space => {
        return space !== null
    });        

    const response = {
        index: result.indexOf(emptySpaces.sort(function(a, b){return b - a})[0])
    }  
//console.log(response)
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
    });
}