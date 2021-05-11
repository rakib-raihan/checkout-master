import React from 'react'
import pathOr from 'ramda/src/pathOr'
import Grid from '@material-ui/core/Grid'
import ShippingInfoComponent from 'components/ShippingInfo'

const InfoComponent = ({
  shippingAddress,
  handleDeliveryInfoEdit,
}) => (
  <Grid container spacing={2}>
    <Grid item sm={4} xs={12}>
      <ShippingInfoComponent
        title="Your info"
        firstLine={`${pathOr('', ['firstName'], shippingAddress) || ''} ${pathOr('', ['lastName'], shippingAddress)}`}
        secondLine={pathOr('', ['email'], shippingAddress)}
        onEdit={handleDeliveryInfoEdit}
      />
    </Grid>
    <Grid item sm={4} xs={12}>
      <ShippingInfoComponent
        title="Shipping to"
        firstLine={`${pathOr('', ['address1'], shippingAddress)} ${pathOr('', ['address2'], shippingAddress)}`}
        secondLine={`${pathOr('', ['city'], shippingAddress)} ${pathOr('', ['stateOrProvinceCode'], shippingAddress)} ${pathOr('', ['postalCode'], shippingAddress)}`}
        onEdit={handleDeliveryInfoEdit}
      />
    </Grid>
  </Grid>
)

export default InfoComponent
