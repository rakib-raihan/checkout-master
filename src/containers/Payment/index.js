import React, { useContext } from 'react'
import CheckoutContainerComponent from 'components/CheckoutContainer'
import PaymentComponent from 'components/Payment'
import { CheckoutContext } from 'services/bigcommerce'

const PaymentContainer = ({
  history,
  logoUrl,
  methodId,
}) => {
  const Checkout = useContext(CheckoutContext)
  const billingAddress = Checkout.data.getBillingAddress()
  const initialValues = {
    ccName: `${billingAddress.firstName} ${billingAddress.lastName}`
  }
  const countries = Checkout.data.getBillingCountries()
  const cart = Checkout.data.getCart()
  const checkout = Checkout.data.getCheckout()
  const shippingAddress = Checkout.data.getShippingAddress()
  const selectedShippingOption = Checkout.data.getSelectedShippingOption()
  const config = Checkout.data.getConfig()

  return (
    <CheckoutContainerComponent
      cart={cart}
      checkout={checkout}
      config={config}
      logoUrl={logoUrl}
    >
      <PaymentComponent
        initialValues={initialValues}
        onSubmit={Checkout.interactions.handlePaymentSubmit(history, methodId)}
        validate={Checkout.interactions.handlePaymentValidate}
        handleCouponSubmit={Checkout.interactions.handleCouponSubmit(history)}
        handleCouponValidate={Checkout.interactions.handleCouponValidate}
        handleDeliveryInfoEdit={Checkout.interactions.handleDeliveryInfoEdit(history)}
        handleShippingInfoEdit={Checkout.interactions.handleShippingInfoEdit(history)}
        countries={countries}
        cart={cart}
        checkout={checkout}
        shippingAddress={shippingAddress}
        selectedShippingOption={selectedShippingOption}
      />
    </CheckoutContainerComponent>
  )
}

export default PaymentContainer
