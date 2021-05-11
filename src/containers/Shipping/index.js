import React, { useContext } from 'react'
import CheckoutContainerComponent from 'components/CheckoutContainer'
import ShippingComponent from 'components/Shipping'
import { CheckoutContext } from 'services/bigcommerce'

const getDefaultShipping = (values = []) => {
  const recommended = values.find(item => item.isRecommended)
  if (recommended) {
    return recommended.id
  }
  return false
}

const ShippingContainer = ({
  history,
  logoUrl,
}) => {
  const Checkout = useContext(CheckoutContext)
  const initialValues = (() => {
    const selectedShippingOption = Checkout.data.getSelectedShippingOption()
    const shippingOptions = Checkout.data.getShippingOptions()
    if (selectedShippingOption) {
      return { shipping: selectedShippingOption.id }
    }
    return { shipping: getDefaultShipping(shippingOptions) }
  })()
  const shippingAddress = Checkout.data.getShippingAddress()
  const cart = Checkout.data.getCart()
  const checkout = Checkout.data.getCheckout()
  const shippingOptions = Checkout.data.getShippingOptions()
  const config = Checkout.data.getConfig()

  return (
    <CheckoutContainerComponent
      cart={cart}
      checkout={checkout}
      config={config}
      logoUrl={logoUrl}
    >
      <ShippingComponent
        initialValues={initialValues}
        onSubmit={Checkout.interactions.handleShippingSubmit(history)}
        validate={Checkout.interactions.handleShippingValidate}
        cart={cart}
        shippingAddress={shippingAddress}
        shippingOptions={shippingOptions}
        handleDeliveryInfoEdit={Checkout.interactions.handleDeliveryInfoEdit(history)}
        handleShippingInfoEdit={Checkout.interactions.handleShippingInfoEdit(history)}
      />
    </CheckoutContainerComponent>
  )
}

export default ShippingContainer
