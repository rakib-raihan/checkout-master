import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ProgressComponent from 'components/CheckoutContainer/Progress'
import BreadcrumbsComponent from 'components/Breadcrumbs'
import ShippingFormComponent from 'components/Shipping/ShippingForm'
import InfoComponent from 'components/Shipping/Info'

const useStyles = makeStyles(theme => ({
  navigation: {
    marginBottom: theme.spacing(1),
  },
  info: {
    marginBottom: theme.spacing(2),
  },
  form: {
    marginBottom: theme.spacing(1),
  },
  formCaption: {
    marginBottom: theme.spacing(1),
  },
}))

const ShippingComponent = ({
  onSubmit,
  validate,
  initialValues,
  shippingAddress,
  shippingOptions,
  handleDeliveryInfoEdit,
  handleShippingInfoEdit,
}) => {
  const classes = useStyles()

  return (
    <div id="quickcheckout-shipping">
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.navigation}>
          <BreadcrumbsComponent step={2} />
        </Grid>

        <Grid item xs={12} className={classes.info}>
          <InfoComponent
            shippingAddress={shippingAddress}
            handleDeliveryInfoEdit={handleDeliveryInfoEdit}
            handleShippingInfoEdit={handleShippingInfoEdit}
          />
        </Grid>
      </Grid>

      <Grid container justify="space-between" className={classes.formCaption}>
        <Grid item>
          <Typography variant="h5" align="center">
            Choose your shipping method:
          </Typography>
        </Grid>
        <Grid item>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.form}>
          <ShippingFormComponent
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            shippingOptions={shippingOptions}
          />
        </Grid>

        <Grid item xs={12}>
          <ProgressComponent value={80} />
        </Grid>
      </Grid>
    </div>
  )
}

export default ShippingComponent