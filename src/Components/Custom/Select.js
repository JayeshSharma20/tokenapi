import React from 'react'
import { Form } from 'react-bootstrap'

function Select(props) {
  const { value = "", options, setValue, name, placeholder = "", className } = props
  // console.log(options) 
  // console.log(typeof options)
  // console.log(value) 
  return (
    <div>
      <div>
        <select
          className={className}
          value={value}
          name={name}
          onChange={(e)=> setValue(e.target.value)}
          placeholder={placeholder}
        >
          <option value=''>
            {`Select ${placeholder}`}
          </option>
          {options.map((option) =>(
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Select
