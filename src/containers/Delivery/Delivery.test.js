const frontStoreUrl = 'https://eye4fraud-sandbox1.mybigcommerce.com'

describe('quickcheckout', () => {
  beforeAll(async () => {
    await jest.setTimeout(10 * 60000)
    
    /**
     * Set default viewport
     * Dismiss alert dialogs
     */
    await (async (pageInstance) => {
      await pageInstance.setViewport({
        width: 1024,
        height: 768
      })
      pageInstance.on('dialog', async dialog =>
        await dialog.dismiss()
      )
    })(page)

    /**
     * Enable interception requests on this page
     * Setup interceptor so that browser will follow redirect chain
     */
    await (async (pageInstance) => {
      await pageInstance.setRequestInterception(true)
      pageInstance.on('request', request => {
        if (request.isNavigationRequest() && request.redirectChain().length) {
          request.abort()
        } else {
          request.continue()
        }
      })
    })(page)

    /**
     * Set cookies for CSRF token and SESSION identificators
     */
    await (async (pageInstance) => {
      await pageInstance.goto(`${frontStoreUrl}/`)
      const cookies = await pageInstance.cookies()
      await pageInstance.setCookie(...cookies)
    })(page)

    /**
     * Add new product
     */
    await (async (pageInstance) => {
      await pageInstance.goto(`${frontStoreUrl}/pets/`)
      await pageInstance.waitForSelector('a[data-product-id="116"]')
      await pageInstance.$eval('a[data-product-id="116"]', el => el.click())
      await pageInstance.waitForSelector('a[data-product-id="116"]')
      await pageInstance.goto(`${frontStoreUrl}/cart.php`)
      await pageInstance.waitFor(3000)
    })(page)
  })

  /**
   * Successful order
   */
  it('should successfully build checkout process', async () => {
    /**
     * Page init
     */
    await (async (pageInstance) => {
      await pageInstance.waitForSelector('#quickcheckout-init')
      await pageInstance.$eval('#quickcheckout-init', el => el.click())

      await pageInstance.waitForSelector('#quickcheckout-app')
    })(page)

    /**
     * Delivery page
     */
    await (async (pageInstance) => {
      /**
       * Each page has an action button
       * Waiting until #action is available means that current page has been loaded
       */
      await pageInstance.waitForSelector('#quickcheckout-delivery')

      /**
       * Filling out regular forms
       */
      await pageInstance.$eval('input[name="email"]', el => el.value = '')
      await pageInstance.$eval('input[name="email"]', el => el.click())
      await pageInstance.type('input[name="email"]', 'me@azimgd.com')

      await pageInstance.$eval('input[name="phone"]', el => el.value = '')
      await pageInstance.$eval('input[name="phone"]', el => el.click())
      await pageInstance.type('input[name="phone"]', '+48537884247')

      await pageInstance.$eval('input[name="firstName"]', el => el.value = '')
      await pageInstance.$eval('input[name="firstName"]', el => el.click())
      await pageInstance.type('input[name="firstName"]', 'David')

      await pageInstance.$eval('input[name="lastName"]', el => el.value = '')
      await pageInstance.$eval('input[name="lastName"]', el => el.click())
      await pageInstance.type('input[name="lastName"]', 'Smith')

      await pageInstance.$eval('input[name="address1"]', el => el.value = '')
      await pageInstance.$eval('input[name="address1"]', el => el.click())
      await pageInstance.type('input[name="address1"]', '84 E9th St.')
      await pageInstance.waitForSelector('#quickcheckout-addresses > ul > li:first-child')
      await pageInstance.$eval('#quickcheckout-addresses > ul > li:first-child', el => el.click())

      /**
       * Waiting until postalCode is loaded means autosuggest select from google maps from previous transaction
       * loaded postal code value for provided address
       */
      await pageInstance.waitFor(selector => !!document.querySelector(selector).value, {}, 'input[name="postalCode"]')

      /**
       * Form submit
       */
      await pageInstance.$eval('#action', el => el.click())
    })(page)


    /**
     * Shipping page
     */
    await (async (pageInstance) => {
      /**
       * Each page has an action button
       * Waiting until #action is available means that current page has been loaded
       */
      await pageInstance.waitForSelector('#quickcheckout-shipping')

      /**
       * Wait until shipping options are selected from server
       */
      await pageInstance.waitForSelector('input[type="radio"]')

      /**
       * Filling out regular forms
       */
      await pageInstance.$eval('input[type="radio"]', el => el.click())

      /**
       * Form submit
       */
      await pageInstance.$eval('#action', el => el.click())
    })(page)

    /**
     * Payment page
     */
    await (async (pageInstance) => {
      /**
       * Each page has an action button
       * Waiting until #action is available means that current page has been loaded
       */
      await pageInstance.waitForSelector('#quickcheckout-payment')

      /**
       * Filling out regular forms
       */
      await pageInstance.waitForSelector('input[name="ccNumber"]')

      await pageInstance.$eval('input[name="ccNumber"]', el => el.value = '')
      await pageInstance.$eval('input[name="ccNumber"]', el => el.click())
      await pageInstance.type('input[name="ccNumber"]', '4000100011112224')

      await pageInstance.$eval('input[name="ccName"]', el => el.value = '')
      await pageInstance.$eval('input[name="ccName"]', el => el.click())
      await pageInstance.type('input[name="ccName"]', 'David Smith')

      await pageInstance.$eval('input[name="ccExpiryMonth"]', el => el.value = '')
      await pageInstance.$eval('input[name="ccExpiryMonth"]', el => el.click())
      await pageInstance.type('input[name="ccExpiryMonth"]', '09')

      await pageInstance.$eval('input[name="ccExpiryYear"]', el => el.value = '')
      await pageInstance.$eval('input[name="ccExpiryYear"]', el => el.click())
      await pageInstance.type('input[name="ccExpiryYear"]', '19')

      await pageInstance.$eval('input[name="ccCvv"]', el => el.value = '')
      await pageInstance.$eval('input[name="ccCvv"]', el => el.click())
      await pageInstance.type('input[name="ccCvv"]', '123')

      /**
       * Form submit
       */
      await pageInstance.$eval('#action', el => el.click())
    })(page)

    /**
     * Payment page
     */
    await (async (pageInstance) => {
      /**
       * Wait until payment is complete
       */
      await pageInstance.waitForSelector('#quickcheckout-confirmation')
    })(page)
  })
})