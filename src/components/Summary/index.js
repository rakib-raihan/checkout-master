import React from 'react'
import PropTypes from 'prop-types'
import pathOr from 'ramda/src/pathOr'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Phone from '@material-ui/icons/Phone'
import Typography from 'components/Form/Typography'
import SummaryItemsComponent from 'components/Summary/SummaryItems'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
    background: theme.palette.dark.main,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 320,
    },
  },
  hidden: {
    visibility: 'hidden',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cardMedia: {
    width: 80,
    height: 80,
    borderRadius: theme.spacing(1),
    display: 'block',
    padding: 0,
    margin: 0,
  },
  phoneIcon: {
    transform: 'scale(-1, 1)',
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(0.8),
  },
}))

const SummaryComponent = ({
  checkout,
  config,
  open,
}) => {
  const classes = useStyles()
  const rootProps = !open ? { className: classes.hidden } : {}

  return (
    <div {...rootProps}>
      <Paper className={classes.paper} classes={[]}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Typography variant="subtitle1" color="textInvertedPrimary">Summary</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2" color="textInvertedSecondary">
              {pathOr([], ['cart', 'lineItems', 'physicalItems', 'length'], checkout)} items
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography color="textInvertedSecondary" variant="body2">Subtotal:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textInvertedSecondary" align="right" variant="body2">{pathOr('$0.00', ['subtotal'], checkout)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textInvertedSecondary" variant="body2">Delivery:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textInvertedSecondary" align="right" variant="body2">{pathOr('$0.00', ['shippingCostTotal'], checkout)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textInvertedSecondary" variant="body2">Tax:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textInvertedSecondary" align="right" variant="body2">{pathOr('$0.00', ['taxTotal'], checkout)}</Typography>
          </Grid>
          {pathOr(false, ['coupons', 'length'], checkout) ?
            <>
              <Grid item xs={6}>
                <Typography color="textInvertedSecondary" variant="body2">Discount:</Typography>
              </Grid>
              <Grid item xs={6}>
                {pathOr([], ['coupons'], checkout).map((coupon) => (
                  <Typography color="textInvertedSecondary" align="right" variant="body2">{coupon.discountedAmount}</Typography>
                ))}
              </Grid>
            </>
          : null}
          <Grid item xs={6}>
            <Typography color="textInvertedSecondary" variant="body2">Total:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography color="textInvertedPrimary" variant="subtitle1" align="right">{checkout.grandTotal}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="textInvertedSecondary" variant="body2">ITEMS</Typography>
          </Grid>

          <Grid item xs={12}>
            <SummaryItemsComponent items={pathOr([], ['cart', 'lineItems', 'physicalItems'], checkout)} />
          </Grid>
        </Grid>

        {pathOr(false, ['storeProfile', 'storePhoneNumber'], config) ?
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography color="textInvertedPrimary" variant="subtitle1">Need Help ?</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <Typography color="textInvertedPrimary" variant="subtitle1">
                    <Phone color="textInvertedPrimary" className={classes.phoneIcon} fontSize="inherit" />
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography color="textInvertedPrimary" variant="subtitle1">Call us on {pathOr(false, ['storeProfile', 'storePhoneNumber'], config)}</Typography>
                  <Typography color="textInvertedSecondary" variant="body2">Lines open Mon-Fri 9am-5pm ET</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        : null}
      </Paper>
    </div>
  )
}

SummaryComponent.propTypes = {
  cart: PropTypes.shape().isRequired,
  checkout: PropTypes.shape().isRequired,
}

SummaryComponent.defaultProps = {
  cart: {},
  checkout: {},
}

export default SummaryComponent
