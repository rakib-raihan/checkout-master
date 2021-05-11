import React, { useContext } from 'react'
import CheckoutContainerComponent from 'components/CheckoutContainer'
import ConfirmationComponent from 'components/Confirmation'
import { CheckoutContext } from 'services/bigcommerce'

const ConfirmationContainer = ({
  history,
  logoUrl,
}) => {
  const Checkout = useContext(CheckoutContext)
  const cart = Checkout.data.getCart()
  const shippingAddress = Checkout.data.getShippingAddress()
  const checkout = Checkout.data.getCheckout()
  const config = Checkout.data.getConfig()

  return (
    <CheckoutContainerComponent
      cart={cart}
      checkout={checkout}
      config={config}
      logoUrl={logoUrl}
    >
      <ConfirmationComponent
        onSubmit={Checkout.interactions.handleDeliverySubmit(history)}
        shippingAddress={shippingAddress}
        cart={cart}
        checkout={checkout}
      />
    </CheckoutContainerComponent>
  )
}

export default ConfirmationContainer