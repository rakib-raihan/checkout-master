import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Helmet } from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import theme from 'services/theme'
import 'typeface-cabin'
import 'index.css'

const req = require.context('../src', true, /\.story\.js$/)
function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator(withKnobs)
addParameters({
  options: {
    panelPosition: 'right',
  },
})
addDecorator(getStory => (
  <div style={{ padding: 20 }}>
    <Helmet>
      <title>Quick Checkout</title>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0HDekZyCAyDNNKgs2oE1n55OjtSD8ahE&libraries=places" />
    </Helmet>
    <CssBaseline />
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  </div>
))

configure(loadStories, module)
