import React from 'react'
import pathOr from 'ramda/src/pathOr'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from 'components/Form/Typography'

const useStyles = makeStyles(theme => ({
  cardMedia: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
}))

const SummaryItemsComponent = ({
  items,
}) => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      {!pathOr(0, ['length'], items) ?
        <Grid item xs={12}>
          <Typography color="textInvertedSecondary" variant="body2">No items present in cart</Typography>
        </Grid>
      : null}

      {pathOr([], [], items).map((line, key) => (
        <Grid item xs={12} key={key}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CardMedia
                image={line.imageUrl}
                className={classes.cardMedia}
              />
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography color="textInvertedPrimary" variant="subtitle1" noWrap>{line.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="textInvertedSecondary" variant="body2">Qty: {line.quantity}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="textInvertedSecondary" variant="body2">Price: {line.listPrice}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default SummaryItemsComponent
