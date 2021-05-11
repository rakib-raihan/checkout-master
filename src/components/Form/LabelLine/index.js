import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    cursor: 'pointer',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.checkoutContainer.border,
  },
  label: {
    fontFamily: 'Cabin',
  },
}))

const LabelLineComponent = ({
  label,
  onClick,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root} onClick={onClick}>
      <AddCircleOutline fontSize="small" className={classes.icon} />
      <Typography variant="subtitle3" className={classes.label}>{label}</Typography>
    </div>
  )
}

export default LabelLineComponent