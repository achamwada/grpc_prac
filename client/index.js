const grpc = require("grpc")
const calcService = require("../server/protos/calculator_grpc_pb")
const calc = require("../server/protos/calculator_pb")

const main = () => {
    const client = new calcService.CalculatorServiceClient("localhost:50051", grpc.credentials.createInsecure())
    const request = new calc.AverageCalcRequest()

    const call = client.calculateAverage(request, (error, res) => {
        if (error) return console.log("Error here =>", error);
        console.log("Success =====> ", res.getResult());
    })

    const marks = [5, 46, 78, 19, 9, 89, 3, 4, 7, 12, 9, 8, 7]



    // marks.forEach(mark => {
    //     const request = new calc.AverageCalcRequest()
    //     request.setInputValue(mark)
    //     console.log("Passed ====>", mark);
    //     call.write(request)

    // })

    for (i = 0; i < marks.length; i++) {
        const request = new calc.AverageCalcRequest()
        // const mark = marks[i]
        const mark = i
        request.setInputValue(mark)
        console.log("Passed ====>", mark);
        call.write(request)
    }

    call.end()
}

main()