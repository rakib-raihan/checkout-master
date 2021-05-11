import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  loading: {
    marginRight: theme.spacing(2),
  },
}))

const ButtonComponent = ({ onClick, children, loading, ...props }) => {
  const classes = useStyles()

  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      onClick={onClick}
      size="large"
      disabled={loading}
      {...props}
    >
      {loading ?
        <CircularProgress size={14} color="secondary" className={classes.loading} />
      : null}
      {props.label || children}
    </Button>
  )
}

ButtonComponent.defaultProps = {
  onClick: () => { },
  loading: false,
}

export default ButtonComponent