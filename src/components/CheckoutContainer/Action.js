import React from 'react'
import Grid from '@material-ui/core/Grid'
import ButtonComponent from 'components/Form/Button'

const ActionComponent = ({
  children,
  color,
  onClick,
  loading,
}) => (
  <Grid container spacing={2} justify="center">
    <Grid item>
      <ButtonComponent color={color} onClick={onClick} loading={loading} id="action">
        {children}
      </ButtonComponent>
    </Grid>
  </Grid>
)

ActionComponent.defaultProps = {
  color: 'secondary',
  onClick: () => {},
  loading: false,
}

export default ActionComponent
