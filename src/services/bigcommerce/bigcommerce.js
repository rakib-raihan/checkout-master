import { createCheckoutService } from '@bigcommerce/checkout-sdk'
import { checkout as logger } from 'services/logger'

const service = (() => {
  /**
   * Following proxy catcher allows us to log all intermediate requests
   */
  const handler = {
    apply: function (target, thisArg, argumentsList) {
      logger.info({ method: `checkout:createCheckoutService` })
      return target(...argumentsList)
    }
  }

  return new Proxy(createCheckoutService, handler)
})()

const serviceInstance = service()

export { serviceInstance as service }

export default () => {
  /**
   * Following proxy catcher allows us to log all intermediate requests
   */
  const handler = {
    get: (target, propKey) => (...args) => {
      logger.info({ method: `checkout:${propKey}`, args: JSON.stringify(args) })
      return target[propKey].call(null, ...args)
    }
  }

  return new Proxy(serviceInstance, handler)
}
