import React from 'react'
import winston from 'winston'
import Transport from 'winston-transport'
import ReactGA from 'react-ga'

class AnalyticsTransport extends Transport {
  constructor(opts) {
    super(opts)
    
    ReactGA.initialize('UA-144351416-1')
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info)
    })

    try {
      ReactGA.event({
        category: info.service,
        action: info.message.method,
        nonInteraction: true,
      })
    } catch (error) {
      console.log(error)
    }

    callback()
  }
}

export const checkout = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'checkout-service' },
  transports: [
    new winston.transports.Console(),
    new AnalyticsTransport(),
  ]
})

export const bigcommerce = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'bigcommerce-service' },
  transports: [
    new winston.transports.Console(),
    new AnalyticsTransport(),
  ]
})

export const view = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'view-service' },
  transports: [
    new winston.transports.Console(),
    new AnalyticsTransport(),
  ]
})

export const app = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'app-service' },
  transports: [
    new winston.transports.Console(),
    new AnalyticsTransport(),
  ]
})

export const LoggerContext = React.createContext()
