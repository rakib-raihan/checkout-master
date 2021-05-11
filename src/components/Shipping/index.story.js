import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ShippingComponent from 'components/Shipping'
import InfoComponent from 'components/Shipping/Info'
import ShippingFormComponent from 'components/Shipping/ShippingForm'
import shippingOptions from 'components/Shipping/shippingOptions.json'

const shippingAddress = {
  firstName: 'David',
  lastName: 'Smith',
  email: 'david@eye4fraud.com',
  address1: '9th Avenue',
  address2: 'Block 4',
  city: 'New York',
  stateOrProvinceCode: 'NY',
  postalCode: '40-141',
}

storiesOf('Shipping', module)
  .add('default', () => (
    <ShippingComponent
      onSubmit={action('onSubmit')}
      validate={action('validate')}
      shippingAddress={shippingAddress}
      shippingOptions={shippingOptions}
    />
  ))

storiesOf('Shipping:Form', module)
  .add('form', () => (
    <ShippingFormComponent
      onSubmit={action('onSubmit')}
      validate={action('validate')}
      shippingOptions={shippingOptions}
    />
  ))

storiesOf('Shipping:Info', module)
  .add('default', () => (
    <InfoComponent
      shippingAddress={shippingAddress}
    />
  ))