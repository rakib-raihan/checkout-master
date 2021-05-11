import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import ProgressComponent from 'components/CheckoutContainer/Progress'
import BreadcrumbsComponent from 'components/Breadcrumbs'
import DeliveryFormComponent from 'components/Delivery/DeliveryForm'

const useStyles = makeStyles(theme => ({
  navigation: {
  },
  form: {
    marginBottom: theme.spacing(1),
  },
}))

const DeliveryComponent = ({
  cart,
  initialValues,
  onSubmit,
  validate,
  countries,
}) => {
  const classes = useStyles()

  return (
    <div id="quickcheckout-delivery">
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.navigation}>
          <BreadcrumbsComponent step={1} />
        </Grid>

        <Grid item xs={12} className={classes.form}>
          <DeliveryFormComponent
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            countries={countries}
          />
        </Grid>

        <Grid item xs={12}>
          <ProgressComponent value={30} />
        </Grid>
      </Grid>
    </div>
  )
}

export default DeliveryComponent
