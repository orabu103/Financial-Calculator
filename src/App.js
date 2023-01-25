import React , {useEffect, useState} from 'react';
import {translate} from './translate/translate'
import Section from './components/Section/Section';
import {calculationEqualFund , calculationSpitzerFund} from './helper/index'
import './App.css';
import Table from './components/Table/Table';

const listRange = [translate.months[0] , translate.years[0]]
const typeList = [translate.type.list.one[0] ,
                  translate.type.list.two[0] , 
                  translate.type.list.three[0] , 
                  translate.type.list.four[0]]
const typeCalcList = [translate.typeCalc.list.one[0],
                      translate.typeCalc.list.two[0],
                      translate.typeCalc.list.three[0]]

function App() {
  const[data , setData] = useState({
    foundation: null,
    typeCalc: null,
    sum: 1000000,
    rangeYeaes: 5,
    rangeMonth: 60,
    rangeGraceYeaes: 0, 
    rangeGraceMonth: 0, 
    return: 0,
    interest: 5,
    measure: 2
  })

  const handleOnClick = (title , newData) => {
    let tempData = {...data}
    switch(title){
      case 'rangeYeaes':
        tempData.rangeMonth = newData * 12
        break;
      case 'rangeMonth':
        tempData.rangeYeaes = newData / 12
        break;
      case 'rangeGraceYeaes':
        tempData.rangeGraceMonth = newData * 12
        break;
      case 'rangeGraceMonth':
        tempData.rangeGraceYeaes = newData / 12
        break;  
    }  
    tempData[title] = newData
    setData(tempData)
  }

  const handleOnCalculation = () => {
    calculationSpitzerFund(data)
  }
  
  // useEffect(() => {
  //   console.log(data)
  // },[data])


  return (
    <div className="App">
      <header className="App_header"><h1>{translate.title[0]}</h1></header>
      <div className='App_info'>
          <div className='App_info_type'>
            <div>
              <Section  list={typeList} 
                        title={translate.type.title}
                        onClick={handleOnClick}
                        data='foundation'
                        value={data.foundation}/>
              <Section  list={typeCalcList} 
                        title={translate.typeCalc.title}
                        onClick={handleOnClick}
                        data='typeCalc'
                        value={data.typeCalc}/>
              <Section title={translate.sum.title[0]} 
                        onClick={handleOnClick}
                        data='sum'
                        value={data.sum}/>
              <Section title={translate.range.title[0]}
                        listInput={listRange}
                        onClick={handleOnClick}
                        data= {['rangeMonth' ,'rangeYeaes' ]}
                        value={[data.rangeMonth , data.rangeYeaes]}/>
              <Section title={translate.rangeGrase.title[0]}
                        listInput={listRange}
                        onClick={handleOnClick}
                        data={[ 'rangeGraceMonth' , 'rangeGraceYeaes' ]}
                        value={[data.rangeGraceMonth , data.rangeGraceYeaes]}/>
              <Section title={translate.return.title[0]}
                        onClick={handleOnClick}
                        data='return'
                        value={data.return}/>
              <Section title={translate.interest.title[0]}
                        onClick={handleOnClick}
                        data='interest'
                        value={data.interest}/>
              <Section title={translate.measure.title[0]}
                        onClick={handleOnClick}
                        data='measure'
                        value={data.measure}/>
              <div className='App_info_type_calc'>
                <button onClick={() => handleOnCalculation()}>{translate.calculation}</button>
              </div>
            </div>
          </div>
      </div>
      <div className='App-data'>
        <Table />
      </div>
    </div>
  );
}

export default App;

