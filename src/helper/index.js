let period = {
    openingBalance : null ,
    closingBalance : null ,
    fundPayment : null ,
    interestPayment : null ,
    total : null ,
    interest : null ,
    measure : null
}
export const calculationEqualFund = (data) => {
    let result = []
    
    let monthPaymant = data.sum / data.rangeMonth
    let interesteMonth = data.interest/ 100/ 12
    let measureMonth = 1 + (data.measure / 100/ 12)
    let tempPeriod = {...period}
   
    tempPeriod.closingBalance = data.sum
    tempPeriod.interest = data.interest
    tempPeriod.measure = data.measure

    for(let i = 1 ; i <= data.rangeMonth ; i++){
        tempPeriod.openingBalance = tempPeriod.closingBalance;
        tempPeriod.fundPayment = monthPaymant * (measureMonth ** i)
        tempPeriod.interestPayment = interesteMonth * tempPeriod.openingBalance * measureMonth
        tempPeriod.total = tempPeriod.fundPayment + tempPeriod.interestPayment 
        tempPeriod.closingBalance = tempPeriod.openingBalance * measureMonth - tempPeriod.fundPayment
        let newData = {...tempPeriod}
        result.push(newData)
    }

    // console.log(result)
}


export const calculationSpitzerFund = (data) => { 
    let result = []
    let monthPaymant = PMT(data.sum , data.interest , data.rangeMonth)
    let interesteMonth = data.interest/ 100/ 12
    let measureMonth = 1 + (data.measure / 100/ 12)
    let tempPeriod = {...period}
    console.log(data.sum)
    tempPeriod.closingBalance = data.sum
    tempPeriod.interest = data.interest
    tempPeriod.measure = data.measure

    for(let i = 1 ; i <= data.rangeMonth ; i++){
        tempPeriod.openingBalance = tempPeriod.closingBalance;
        tempPeriod.total = monthPaymant * (measureMonth ** i)
        tempPeriod.interestPayment = interesteMonth * tempPeriod.openingBalance * measureMonth
        tempPeriod.fundPayment = tempPeriod.total - tempPeriod.interestPayment 
        tempPeriod.closingBalance = tempPeriod.openingBalance * measureMonth - tempPeriod.fundPayment
        let newData = {...tempPeriod}
        result.push(newData)
    }
        console.log(result)

}

function PMT(principal, rate, numPayments) {
    let r = rate / (12 * 100); // interest rate per period
    let n = numPayments; // number of payments
    return principal * r * (1 + r)**n / ((1 + r)**n - 1);
}