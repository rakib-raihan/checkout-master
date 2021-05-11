import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import ShippingInfoComponent from 'components/ShippingInfo'

storiesOf('ShippingInfo', module)
  .add('default', () => (
    <ShippingInfoComponent
      title="Title"
      firstLine="First line will be here"
      secondLine='And second as well. This text will be wrapped.'
      onEdit={action('on edit')}
    />
  ))
