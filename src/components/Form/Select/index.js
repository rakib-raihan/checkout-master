import React from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const SelectComponent = (props) => {
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel ref={inputLabel}>
        {props.label}
      </InputLabel>
      <Select
        {...props.input}
        input={(
          <OutlinedInput
            labelWidth={labelWidth}
            name={props.label}
          />
        )}
        fullWidth
      >
        {props.options.map(option => (
          <MenuItem value={option.value} key={option.key}>{option.key}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

SelectComponent.defaultProps = {
  options: [],
}

export default SelectComponent
