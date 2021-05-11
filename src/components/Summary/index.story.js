import React from 'react'
import { storiesOf } from '@storybook/react'
import SummaryComponent from 'components/Summary'
import SummaryItemsComponent from 'components/Summary/SummaryItems'
import checkout from 'components/Summary/checkout.json'

storiesOf('Summary', module)
  .add('default', () => (
    <SummaryComponent
      open
      checkout={checkout}
    />
  ))

storiesOf('Summary:SummaryItems', module)
  .add('default', () => (
    <SummaryItemsComponent
      open
      items={checkout.cart.lineItems.physicalItems}
    />
  ))