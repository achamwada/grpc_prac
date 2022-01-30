const grpc = require("grpc")
const calcService = require("./protos/calculator_grpc_pb")
const calc = require("./protos/calculator_pb")

const main = () => {
    const calculateAverage = (call, callback) => {

        let total = 0
        let count = 0

        call.on("data", request => {

            const inputVal = request.getInputValue()
            console.log("inputVal ===>", inputVal)
            total += inputVal
            console.log("total ===>", total)
            count += 1;

        })

        call.on("error", error => {
            console.log(error);
        });
        // call.on("status", error => console.error("status on ===> ", error))

        call.on("end", () => {
            const average = total / count;
            console.log("average ===>", average)
            const response = new calc.AverageCalcResponse()

            response.setResult(average)
            console.log("response ===>", response.getResult())
            callback(null, response)

        })


    }

    const server = new grpc.Server()
    server.addService(calcService.CalculatorServiceService, {
        calculateAverage
    })

    server.bind("localhost:50051", grpc.ServerCredentials.createInsecure())

    server.start()
}

main()