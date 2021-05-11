import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const CheckboxComponent = (props) => (
  <FormControlLabel
    control={
      <Checkbox color="primary" />
    }
    label={props.label}
  />
)

export default CheckboxComponent
