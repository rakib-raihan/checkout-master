import React from 'react'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const ShippingInfoComponent = ({
  title,
  firstLine,
  secondLine,
  onEdit,
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item>
          <Typography color="textPrimary" variant="subtitle2" noWrap>{title}</Typography>
        </Grid>
        <Grid item>
          <Link variant="caption" underline="always" align="center" onClick={onEdit}>Edit</Link>
        </Grid>
      </Grid>
      <Typography color="textSecondary" noWrap>{firstLine}</Typography>
      <Typography color="textSecondary" noWrap>{secondLine}</Typography>
    </div>
  )
}

export default ShippingInfoComponent