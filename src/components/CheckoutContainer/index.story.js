import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, text, boolean, optionsKnob as options } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import CheckoutContainerComponent from 'components/CheckoutContainer'
import ActionComponent from 'components/CheckoutContainer/Action'
import ProgressComponent from 'components/CheckoutContainer/Progress'

storiesOf('CheckoutContainer:index', module)
  .add('default', () => (
    <CheckoutContainerComponent
    />
  ))

storiesOf('CheckoutContainer:Action', module)
  .add('default', () => (
    <ActionComponent
      loading={boolean('Loading', false)}
      color={options(
        'colors',
        {
          primary: 'primary',
          secondary: 'secondary',
        },
        'primary',
        {
          display: 'radio'
        }
      )}
      onClick={action('Clicked')}
    >
      {text('children', 'Click here to proceed')}
    </ActionComponent>
  ))

storiesOf('CheckoutContainer:Progress', module)
  .add('default', () => (
    <ProgressComponent
      value={number('value', 30)}
    />
  ))