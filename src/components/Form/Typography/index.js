import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { darken } from '@material-ui/core/styles/colorManipulator'

const useStyles = makeStyles(theme => ({
  textInvertedPrimary: {
    color: theme.palette.common.white,
  },
  textInvertedSecondary: {
    color: darken(theme.palette.common.white, 0.4),
  },
}))

export default function TypographyComponent({ color, ...props }) {
  const classes = useStyles()

  const explicitColorStyle = (() => {
    if (color === 'textInvertedPrimary') {
      return classes.textInvertedPrimary
    }
    if (color === 'textInvertedSecondary') {
      return classes.textInvertedSecondary
    }
  })()

  return (
    <Typography className={explicitColorStyle} {...props}>
      {props.children}
    </Typography>
  )
}