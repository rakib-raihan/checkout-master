import React from 'react'
import TextField from '@material-ui/core/TextField'

const TextFieldComponent = ({
  input,
  label,
  meta,
  ...props
}) => (
  <TextField
    {...input}
    placeholder={label}
    label={label}
    variant="outlined"
    fullWidth
    error={meta && meta.error && meta.touched && meta.invalid}
    {...props}
  />
)

TextFieldComponent.defaultProps = {
  meta: {},
}

export default TextFieldComponent
