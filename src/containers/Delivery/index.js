import React, { useContext } from "react";
import CheckoutContainerComponent from "components/CheckoutContainer";
import DeliveryComponent from "components/Delivery";
import { CheckoutContext } from "services/bigcommerce";

const DeliveryContainer = ({ history, logoUrl }) => {
  const Checkout = useContext(CheckoutContext);
  const initialValues = Checkout.data.getShippingAddress();
  const countries = Checkout.data.getBillingCountries();
  const cart = Checkout.data.getCart();
  const checkout = Checkout.data.getCheckout();
  const config = Checkout.data.getConfig();

  return (
    <CheckoutContainerComponent
      cart={cart}
      checkout={checkout}
      config={config}
      logoUrl={logoUrl}
    >
      <DeliveryComponent
        initialValues={initialValues}
        onSubmit={Checkout.interactions.handleDeliverySubmit(history)}
        validate={Checkout.interactions.handleDeliveryValidate}
        countries={countries}
        cart={cart}
      />
    </CheckoutContainerComponent>
  );
};

export default DeliveryContainer;
