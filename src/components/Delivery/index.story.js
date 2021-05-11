import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import DeliveryComponent from 'components/Delivery'
import DeliveryFormComponent from 'components/Delivery/DeliveryForm'
import countries from 'components/Delivery/countries.json'

storiesOf('Delivery', module)
  .add('default', () => (
    <DeliveryComponent
      onSubmit={action('onSubmit')}
      validate={action('validate')}
      countries={countries}
    />
  ))

storiesOf('Delivery:Form', module)
  .add('form', () => (
    <DeliveryFormComponent
      onSubmit={action('onSubmit')}
      validate={action('validate')}
      countries={countries}
    />
  ))