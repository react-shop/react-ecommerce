import React from 'react'

const inputText = ({
  input,
  label,
  type,
  classname,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className={classname} />
      {touched &&
        (error && <span>{error}</span>)
      }
    </div>
  </div>
)

export default inputText