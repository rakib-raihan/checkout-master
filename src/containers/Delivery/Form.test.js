const frontStoreUrl = 'https://test1832.mybigcommerce.com'

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
   * Format Phone Input
   */
  it('should check phone formatter works', async () => {
    /**
     * Page init
     */
    await (async (pageInstance) => {
      await pageInstance.waitForSelector('#quickcheckout-init')
      await pageInstance.$eval('#quickcheckout-init', el => el.click())

      await pageInstance.waitForSelector('#quickcheckout-app')
      await pageInstance.waitForSelector('#quickcheckout-delivery')
    })(page)

    /**
     * Google address autocomplete form
     */
    await (async (pageInstance) => {
      /**
       * Filling out regular forms
       */
      await pageInstance.$eval('input[name="phone"]', el => el.value = '')
      await pageInstance.$eval('input[name="phone"]', el => el.click())
      await pageInstance.type('input[name="phone"]', '+48537884247')

      /**
       * Waiting until postalCode is loaded means autosuggest select from google maps from previous transaction
       * loaded postal code value for provided address
       */
      await pageInstance.waitFor(selector => !!document.querySelector(selector).value, {}, 'input[name="phone"]')

      /**
       * Check for return values from google autocomplete
       */
      const phone = await pageInstance.$eval('input[name="phone"]', el => el.value === '+48 537 884 247')

      expect(phone).toBeTruthy()
    })(page)
  })

  /**
   * Autosuggest country
   */
  it('should check countries autosuggest work', async () => {
    /**
     * Page init
     */
    await (async (pageInstance) => {
      await pageInstance.waitForSelector('#quickcheckout-init')
      await pageInstance.$eval('#quickcheckout-init', el => el.click())

      await pageInstance.waitForSelector('#quickcheckout-app')
      await pageInstance.waitForSelector('#quickcheckout-delivery')
    })(page)

    /**
     * Country dropdown form
     */
    await (async (pageInstance) => {
      /**
       * Filling out regular forms
       */
      await pageInstance.$eval('input[name="country"]', el => el.value = '')
      await pageInstance.$eval('input[name="country"]', el => el.click())
      await pageInstance.type('input[name="country"]', 'United States')
      await pageInstance.waitForSelector('#quickcheckout-countries > ul > li:first-child')
      await pageInstance.$eval('#quickcheckout-countries > ul > li:first-child', el => el.click())

      /**
       * Waiting until postalCode is loaded means autosuggest select from google maps from previous transaction
       * loaded postal code value for provided address
       */
      await pageInstance.waitFor(selector => !!document.querySelector(selector).value, {}, 'input[name="country"]')

      /**
       * Check for return values from google autocomplete
       */
      const country = await pageInstance.$eval('input[name="country"]', el => el.value === 'United States')

      expect(country).toBeTruthy()
    })(page)
  })

  /**
   * Autosuggest state
   */
  it('should check state autosuggest work', async () => {
    /**
     * Page init
     */
    await (async (pageInstance) => {
      await pageInstance.waitForSelector('#quickcheckout-init')
      await pageInstance.$eval('#quickcheckout-init', el => el.click())

      await pageInstance.waitForSelector('#quickcheckout-app')
      await pageInstance.waitForSelector('#quickcheckout-delivery')
    })(page)

    /**
     * Country dropdown form
     */
    await (async (pageInstance) => {
      /**
       * Making sure that states are fetched per country that has them
       */
      await pageInstance.$eval('input[name="country"]', el => el.value = '')
      await pageInstance.$eval('input[name="country"]', el => el.click())
      await pageInstance.type('input[name="country"]', 'United States')
      await pageInstance.waitForSelector('#quickcheckout-countries > ul > li:first-child')
      await pageInstance.$eval('#quickcheckout-countries > ul > li:first-child', el => el.click())

      /**
       * Filling out regular forms
       */
      await pageInstance.$eval('input[name="stateOrProvince"]', el => el.value = '')
      await pageInstance.$eval('input[name="stateOrProvince"]', el => el.click())
      await pageInstance.type('input[name="stateOrProvince"]', 'Alabama')
      await pageInstance.waitForSelector('#quickcheckout-stateOrProvince > ul > li:first-child')
      await pageInstance.$eval('#quickcheckout-stateOrProvince > ul > li:first-child', el => el.click())

      /**
       * Waiting until postalCode is loaded means autosuggest select from google maps from previous transaction
       * loaded postal code value for provided address
       */
      await pageInstance.waitFor(selector => !!document.querySelector(selector).value, {}, 'input[name="stateOrProvince"]')

      /**
       * Check for return values from google autocomplete
       */
      const stateOrProvince = await pageInstance.$eval('input[name="stateOrProvince"]', el => el.value === 'Alabama')

      expect(stateOrProvince).toBeTruthy()
    })(page)
  })

  /**
   * Autosuggest google maps
   */
  it('should check google address autosuggest work', async () => {
    /**
     * Page init
     */
    await (async (pageInstance) => {
      await pageInstance.waitForSelector('#quickcheckout-init')
      await pageInstance.$eval('#quickcheckout-init', el => el.click())

      await pageInstance.waitForSelector('#quickcheckout-app')
      await pageInstance.waitForSelector('#quickcheckout-delivery')
    })(page)

    /**
     * Google address autocomplete form
     */
    await (async (pageInstance) => {
      /**
       * Filling out regular forms
       */
      await pageInstance.$eval('input[name="address1"]', el => el.value = '')
      await pageInstance.$eval('input[name="address1"]', el => el.click())
      await pageInstance.type('input[name="address1"]', '84 E9th St.')
      await pageInstance.waitForSelector('#quickcheckout-addresses > ul > li:first-child')
      await pageInstance.$eval('#quickcheckout-addresses > ul > li:first-child', el => el.click())

      /**
       * Waiting until postalCode is loaded means autosuggest select from google maps from previous transaction
       * loaded postal code value for provided address
       */
      await pageInstance.waitFor(selector => !!document.querySelector(selector).value, {}, 'input[name="country"]')
      await pageInstance.waitFor(selector => !!document.querySelector(selector).value, {}, 'input[name="city"]')
      await pageInstance.waitFor(selector => !!document.querySelector(selector).value, {}, 'input[name="stateOrProvince"]')
      await pageInstance.waitFor(selector => !!document.querySelector(selector).value, {}, 'input[name="postalCode"]')

      /**
       * Check for return values from google autocomplete
       */
      const country = await pageInstance.$eval('input[name="country"]', el => el.value === 'United States')
      const city = await pageInstance.$eval('input[name="city"]', el => el.value === 'New York')
      const stateOrProvince = await pageInstance.$eval('input[name="stateOrProvince"]', el => el.value === 'NY')
      const postalCode = await pageInstance.$eval('input[name="postalCode"]', el => el.value === '10003')

      expect(country && city && stateOrProvince && postalCode).toBeTruthy()
    })(page)
  })
})