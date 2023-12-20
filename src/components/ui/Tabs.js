import React, {useState} from 'react'

export default (props) => {
  return(
    <ul className="tabs">
      {props.elements.map((element, i) => (
        <li key={i}>
          <a 
            onClick={() => props.onChange(i)}
            className={props.current == i ? 'active' : null}
          >
            {element}
          </a>
        </li>
      ))}
    </ul>
  )
}