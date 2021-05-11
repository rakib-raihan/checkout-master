import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Add } from '@material-ui/icons'
import { Form, Field } from 'react-final-form'
import TextFieldComponent from 'components/Form/TextField'

const CouponFormComponent = ({
  form: { handleSubmit, pristine, invalid },
  props,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Field name="coupon" label="Coupon code" component={TextFieldComponent} InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="toggle password visibility"
              onClick={handleSubmit}
            >
              <Add />
            </IconButton>
          </InputAdornment>
        ),
      }} />
    </Grid>
  </Grid>
)

export default (props) => (
  <Form
    {...props}
    render={form => <CouponFormComponent form={form} {...props} />}
  />
)
