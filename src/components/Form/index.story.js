import React from 'react'
import { storiesOf } from '@storybook/react'
import ButtonComponent from 'components/Form/Button'
import CardComponent from 'components/Form/Card'
import TextFieldComponent from 'components/Form/TextField'
import LabelLineComponent from 'components/Form/LabelLine'
import PhoneNumberComponent from 'components/Form/PhoneNumber'

storiesOf('Form:Button', module)
  .add('default', () => (
    <ButtonComponent
      label="Hello"
    />
  ))

storiesOf('Form:Card', module)
  .add('default', () => (
    <div>
      <div style={{ marginBottom: 20 }}>
        <CardComponent
          label="Card number"
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <CardComponent
          label="Card number"
          input={{ value: '4111 1111 1111 1111' }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <CardComponent
          label="Card number"
          input={{ value: '5105 1051 0510 5100' }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <CardComponent
          label="Card number"
          input={{ value: '3782 822463 10005' }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <CardComponent
          label="Card number"
          input={{ value: '6011 0009 9013 9424' }}
        />
      </div>
    </div>
  ))

storiesOf('Form:TextField', module)
  .add('default', () => (
    <TextFieldComponent
      label="Hello"
    />
  ))

storiesOf('Form:LabelLine', module)
  .add('default', () => (
    <LabelLineComponent
      label="Add Company Name"
    />
  ))

storiesOf('Form:PhoneNumber', module)
  .add('default', () => (
    <PhoneNumberComponent country="US" />
  ))
  .add('filled', () => (
    <PhoneNumberComponent country="US" input={{ value: '+124' }} />
  ))
  