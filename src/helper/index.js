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
    let interesteMonth = data.interest/ (100 * 12)
    let measureMonth = 1 + (data.measure / (100 * 12))

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

    return {result , monthPaymant}

    // console.log(result)
}


export const calculationSpitzerFund = (data) => { 
    let result = []
    let monthPaymant = PMT(data.sum , data.interest , data.rangeMonth)
    let interesteMonth = data.interest/ (100 * 12)
    let measureMonth = 1 + (data.measure / (100 * 12))
    let tempPeriod = {...period}

    tempPeriod.closingBalance = data.sum
    tempPeriod.interest = data.interest
    tempPeriod.measure = data.measure

    for(let i = 1 ; i <= data.rangeMonth ; i++){
        tempPeriod.openingBalance = tempPeriod.closingBalance;
        tempPeriod.interestPayment = interesteMonth * tempPeriod.openingBalance * measureMonth
        tempPeriod.total = monthPaymant * (measureMonth ** i)
        tempPeriod.fundPayment = tempPeriod.total - tempPeriod.interestPayment 
        tempPeriod.closingBalance = tempPeriod.openingBalance * measureMonth - tempPeriod.fundPayment
        let newData = {...tempPeriod}
        result.push(newData)
    }
        console.log(result)
        return {result , monthPaymant}
}

export const calculationGrace= (data) => { 
    let result = []
    let monthPaymant = PMT(data.sum , data.interest , data.rangeMonth)
    console.log(monthPaymant)
    // let monthPaymant = data.sum / data.rangeMonth
    let interesteMonth = data.interest/ (100 * 12)
    let measureMonth = 1 + (data.measure / (100 * 12))
    let tempPeriod = {...period}

    tempPeriod.closingBalance = data.sum
    tempPeriod.interest = data.interest
    tempPeriod.measure = data.measure

    for(let i = 1 ; i <= data.rangeMonth ; i++){
        tempPeriod.openingBalance = tempPeriod.closingBalance;
        tempPeriod.interestPayment = interesteMonth * tempPeriod.openingBalance * measureMonth
        tempPeriod.fundPayment = i > data.rangeGraceMonth  ? tempPeriod.total - tempPeriod.interestPayment : 0
        // tempPeriod.fundPayment  =i > data.rangeGraceMonth  ? monthPaymant * (measureMonth ** i) : 0
        tempPeriod.total =  i > data.rangeGraceMonth ? monthPaymant * (measureMonth ** i) : tempPeriod.interestPayment
        // tempPeriod.total = tempPeriod.fundPayment + tempPeriod.interestPayment 

        tempPeriod.closingBalance = tempPeriod.openingBalance * measureMonth - tempPeriod.fundPayment
        let newData = {...tempPeriod}
        result.push(newData)
    }
    // console.log(result)
    return {result , monthPaymant}

        
}


function PMT(principal, rate, numPayments) {
    let r = rate / (12 * 100); // interest rate per period
    let n = numPayments; // number of payments
    return principal * r * (1 + r)**n / ((1 + r)**n - 1);
}