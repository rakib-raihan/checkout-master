import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import PaymentComponent from 'components/Payment'
import InfoComponent from 'components/Payment/Info'
import PaymentFormComponent from 'components/Payment/PaymentForm'

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

storiesOf('Payment', module)
  .add('default', () => (
    <PaymentComponent
      onSubmit={action('onSubmit')}
      validate={action('validate')}
      shippingAddress={shippingAddress}
    />
  ))

storiesOf('Payment:Form', module)
  .add('form', () => (
    <PaymentFormComponent
      onSubmit={action('onSubmit')}
      validate={action('validate')}
    />
  ))


storiesOf('Payment:Info', module)
  .add('default', () => (
    <InfoComponent
      shippingAddress={shippingAddress}
    />
  ))