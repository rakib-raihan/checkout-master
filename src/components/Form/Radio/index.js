import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

const RadioComponent = (props) => (
  <FormControlLabel
    control={
      <Radio color="primary" {...props.input} />
    }
    label={props.label}
  />
)

export default RadioComponent
