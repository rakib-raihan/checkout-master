import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import RadioGroup from '@material-ui/core/RadioGroup'
import { Form, Field } from 'react-final-form'
import Typography from '@material-ui/core/Typography'
import { ArrowForward } from '@material-ui/icons'
import ErrorsComponent from 'components/Form/Errors'
import RadioComponent from 'components/Form/Radio'
import ActionComponent from 'components/CheckoutContainer/Action'

const useStyles = makeStyles(theme => ({
  action: {
    marginTop: theme.spacing(3),
  },
  actionIcon: {
    marginLeft: theme.spacing(2),
  },
}))

const NextDayDeliveryOptionComponent = ({
  option,
}) => (
  <Grid container justify="space-between" direction="row">
    <Grid item>
      <Typography color="textPrimary" variant="subtitle2">{option.description}</Typography>
    </Grid>
    {/* <Grid item>
      <Typography variant="caption" color="textPrimary"></Typography>
    </Grid>
    <Grid item>
      <Typography color="textPrimary" variant="subtitle2">{option.cost}</Typography>
    </Grid> */}

    <Grid item xs={12}>
      <Typography color="textSecondary">{option.cost}</Typography>
    </Grid>
  </Grid>
)

const ShippingFormComponent = ({
  shippingOptions,
  form: {
    handleSubmit,
    submitFailed,
    invalid,
    errors,
    submitting,
    ...props
  },
}) => {
  const classes = useStyles()
  return (
    <form onSubmit={handleSubmit}>
      <ErrorsComponent errors={errors} submitFailed={submitFailed} />

      {!shippingOptions.length ?
        <Typography variant="body1" color="textSecondary">
          No shipping options are currently supported for country you selected
        </Typography>
      : null}

      {shippingOptions.length ?
        <RadioGroup value={null}>
          <Grid container spacing={1}>
            {shippingOptions.map(option => (
              <Grid item xs={12} key={option.id}>
                <Field name="shipping" type="radio" value={option.id} component={RadioComponent} label={<NextDayDeliveryOptionComponent option={option} />} />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      : null}

      <Grid container justify="center" className={classes.action}>
        <Grid item>
          <ActionComponent onClick={handleSubmit} loading={submitting}>
            Continue to payment
            <ArrowForward fontSize="small" className={classes.actionIcon} />
          </ActionComponent>
        </Grid>
      </Grid>
    </form>
  )
}

ShippingFormComponent.defaultProps = {
  shippingOptions: [],
}

export default (props) => (
  <Form
    {...props}
    render={form => <ShippingFormComponent form={form} {...props} />}
  />
)
