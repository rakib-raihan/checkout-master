import React from 'react'
import { storiesOf } from '@storybook/react'
import ConfirmationComponent from 'components/Confirmation'

storiesOf('Confirmation', module)
  .add('default', () => (
    <ConfirmationComponent
    />
  ))
