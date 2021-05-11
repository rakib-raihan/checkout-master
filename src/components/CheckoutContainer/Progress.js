import React from 'react'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

const normalise = value => (value - 0) * 100 / (100 - 0)

const ProgressComponent = ({
  value,
}) => (
  <Grid container justify="center">
    <Grid item sm={6} xs={12}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={11}>
          <LinearProgress variant="determinate" value={normalise(value)} />
        </Grid>
        <Grid item xs={1}>
          <Typography color="textSecondary" variant="caption">{normalise(value)}%</Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

ProgressComponent.defaultProps = {
  value: 0,
}

export default ProgressComponent