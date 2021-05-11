import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import BreadcrumbsComponent from 'components/Breadcrumbs'

storiesOf('Breadcrumbs', module)
  .add('default', () => (
    <BreadcrumbsComponent
      step={number('Step', 2)}
    />
  ))
