import React from 'react'
import './Section.css'

const Section = ({list , title , listInput ,onClick, data , value}) => {
  let style = {
    backgroundColor: 'var(--green)'

  }

  return (
    <div className='Section'>
        <h4 className='Section_title'>{title}</h4>
        {list &&
        <nav>
            <ul>
                {list.map((element , index) => {
                    return <li key={index}><button onClick={() => onClick(data , index)} style={value === index ? style : null}>{element}</button></li>
                })}
            </ul>
        </nav>
         }
        {listInput && 
          <div className='Section_listinput'>
            {listInput.map((element , index) => {
              return(
                <div className='Section_listinput_input'  key={index}>
                  <h6>{element}</h6>
                  <input 
                      type='number' 
                      inputMode='decimal'   
                      placeholder='0'
                      value={value[index]}
                      onChange={(e) => onClick(data[index] ,e.target.value)}
                      />
                </div>
              )
            })}
          
          </div>
        }
        {!list && !listInput && 
          <div className='Section_input'>
            <input  
                type='number' 
                inputMode='decimal'  
                placeholder='0'
                value={value}
                onChange={(e) => onClick(data ,e.target.value)}/>
          </div>
        
        }
        <div className="line" > </div>





    </div>
  )
}

export default Section