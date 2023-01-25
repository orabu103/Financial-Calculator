

import React, { useEffect, useState } from 'react';
import { translate } from '../../translate/translate';
import './Table.css'


function Table({ data }) {
  const [periods, setPeriods] = useState(data);
  useEffect(() => {
    setPeriods(data)
  },[data])

  return (
    <table className='Table'>
      <thead>
        <tr>
          <th>תקופה</th>
          <th>{translate.table.OB[0]}</th>
          <th>{translate.table.FP[0]}</th>
          <th>{translate.table.IP[0]}</th>
          <th>{translate.table.T[0]}</th>
          <th>{translate.table.CB[0]}</th>
          {/* <th>{translate.table.I[0]}</th>
          <th>{translate.table.M[0]}</th> */}
        </tr>
      </thead>
      <tbody>
        {periods.map((period , index) => (
          <tr key={index}>
             <td>{index + 1}</td>
            <td>{Number(period.openingBalance).toFixed(2)}</td>
            <td>{period.fundPayment.toFixed(2)}</td>
            <td>{period.interestPayment.toFixed(2)}</td>
            <td>{period.total.toFixed(2)}</td>
            <td>{period.closingBalance.toFixed(2)}</td>
            {/* <td>{period.interest}</td>
            <td>{period.measure}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
