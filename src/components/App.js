import React, { useState, useEffect } from "react";
import { MemoryRouter as Router, Route } from "react-router-dom";
import { initialize, subscribe, CheckoutProvider } from "services/bigcommerce";
import Delivery from "containers/Delivery";
import Shipping from "containers/Shipping";
import Payment from "containers/Payment";
import Confirmation from "containers/Confirmation";

/**
 * Initializes checkout process, subscribes to changes and passes
 * { data, errors, statuses } using Provider/Context pattern
 * returns status message component when data is not present or loading
 * result data could be accessed using useContext(CheckoutContext)
 */
const Application = ({ children }) => {
  const [checkout, setCheckout] = useState();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const { unsubscribe } = subscribe(setCheckout);
    return unsubscribe;
  }, []);

  if (!checkout) {
    return null;
  }

  /**
   * Check error state by list
   */
  if (
    checkout.errors.getLoadConfigError() ||
    checkout.errors.getLoadCheckoutError() ||
    checkout.errors.getLoadCartError()
  ) {
    return <div>Unexpected error occured</div>;
  }

  /**
   * Check loading state by list
   */
  if (
    checkout.statuses.isLoadingConfig() ||
    checkout.statuses.isLoadingCheckout() ||
    checkout.statuses.isLoadingCart()
  ) {
    return <div>Loading</div>;
  }

  if (
    checkout.data.getCheckout().payments?.[0]?.providerId ===
      "paypalcommerce" ||
    checkout.data.getCheckout().payments?.[0]?.providerId === "amazonpay"
  ) {
    console.log("launched via paypal or amazonpay, closing quick checkout");
    document.getElementById("QUICK_CHECKOUT").remove();
  }

  return (
    <CheckoutProvider value={checkout}>
      <div id="quickcheckout-app">{children}</div>
    </CheckoutProvider>
  );
};

const Routes = ({ logoUrl, methodId }) => (
  <Application>
    <Router>
      <Route
        path="/"
        exact
        component={(props) => (
          <Delivery {...props} logoUrl={logoUrl} methodId={methodId} />
        )}
      />
      <Route
        path="/shipping"
        exact
        component={(props) => (
          <Shipping {...props} logoUrl={logoUrl} methodId={methodId} />
        )}
      />
      <Route
        path="/payment"
        exact
        component={(props) => (
          <Payment {...props} logoUrl={logoUrl} methodId={methodId} />
        )}
      />
      <Route
        path="/confirmation"
        exact
        component={(props) => (
          <Confirmation {...props} logoUrl={logoUrl} methodId={methodId} />
        )}
      />
    </Router>
  </Application>
);

export default Routes;
