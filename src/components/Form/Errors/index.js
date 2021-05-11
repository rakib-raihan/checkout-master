import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}))

export default function SimpleSnackbar({
  submitFailed,
  errors,
}) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const list = Object.keys(errors).map(key => (
    <Typography key={key}>{errors[key]}</Typography>
  ))

  if (!submitFailed || !list.length) {
    return null
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={600000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={list}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  )
}

