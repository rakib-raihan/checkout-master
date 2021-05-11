import React, { useContext } from 'react'
import { useInterval } from 'react-use'
import pathOr from 'ramda/src/pathOr'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ProgressComponent from 'components/CheckoutContainer/Progress'
import ActionComponent from 'components/CheckoutContainer/Action'
import BreadcrumbsComponent from 'components/Breadcrumbs'
import { ModalContext } from 'components/Modal'
import confirmationPng from 'components/Confirmation/confirmationPng.js'

const useStyles = makeStyles(theme => ({
  navigation: {
    marginBottom: theme.spacing(1),
  },
  form: {
    marginBottom: theme.spacing(2),
  },
  action: {
    marginBottom: theme.spacing(3),
  },
  image: {
    justifyContent: 'center',
    display: 'flex',
  },
  confirmationPng: {
    width: 100,
    height: 100,
    margin: theme.spacing(4),
  },
}))

const ConfirmationComponent = ({
  shippingAddress,
}) => {
  const classes = useStyles()
  const Modal = useContext(ModalContext)
  const [count, setCount] = React.useState(3)

  useInterval(() => {
    if (count > 0) {
      setCount(count - 1)
      return
    }
    Modal.setVisible(false)
    window.location.assign('/finishorder.php')
  }, 1000)

  return (
    <div id="quickcheckout-confirmation">
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.navigation}>
          <BreadcrumbsComponent step={4} />
        </Grid>

        <Grid item xs={12} className={classes.image}>
          <img src={confirmationPng} alt="confirmation" className={classes.confirmationPng} />
        </Grid>

        <Grid item xs={12} className={classes.form}>
          <Typography color="textPrimary" variant="subtitle1" align="center">Your order is complete!</Typography>
          <Typography color="textSecondary" variant="subtitle2" align="center">An email confirmation has been sent to {pathOr('your [email address]', ['shippingAddress'], shippingAddress)}</Typography>
        </Grid>

        <Grid item xs={12} className={classes.action}>
          <ActionComponent color="primary">
            Save my details for a faster checkout
          </ActionComponent>
        </Grid>

        <Grid item xs={12}>
          <ProgressComponent value={100} />
        </Grid>

        <Grid item xs={12}>
          <Typography color="textSecondary" variant="body2" align="center">Continuing to order details in {count} seconds...</Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default ConfirmationComponent