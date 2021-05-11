import React, { useState } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextFieldComponent from 'components/Form/TextField'
import {
  formatNumber,
  guessType,
} from 'services/card'
import images from 'components/Form/Card/images'

const CardComponent = ({
  input,
  label,
  meta,
  ...props
}) => {
  const [value, setValue] = useState(input.value)
  const onChange = (event) => {
    setValue(formatNumber(event.target.value))
    input.onChange(formatNumber(event.target.value))
  }
  const cardType = guessType(value)
  const cardIcon = images[cardType] || images.placeholder

  return (
    <TextFieldComponent
      {...input}
      onChange={onChange}
      value={value}
      label={label}
      meta={meta}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <img src={cardIcon} alt={cardType} style={{ width: 24, height: 24 }} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

CardComponent.defaultProps = {
  input: {
    value: '',
  },
  label: '',
}

export default CardComponent
