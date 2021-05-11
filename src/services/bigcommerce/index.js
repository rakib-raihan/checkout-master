import React from "react";
import update from "immutability-helper";
import numeral from "numeral";
import * as yup from "yup";
import cardValidator from "card-validator";
// import { isValidPhoneNumber } from "react-phone-number-input";
import { isValidNumber } from "libphonenumber-js";
// import bigcommerce, { service } from "services/bigcommerce/bigcommerce";
import { bigcommerce as bigcommerceLogger } from "services/logger";
import { guessType } from "services/card";
import { errorMessages } from "utils/validation";
import { createCheckoutService } from "@bigcommerce/checkout-sdk";

export const bigcommerceInstance = createCheckoutService();
const service = bigcommerceInstance;

/**
 * Initial application load state
 */
const STATE = (() => {
  const initialState = new Map();
  initialState.set("checkoutId", false);
  initialState.set("loaded", false);
  initialState.set("loading", false);
  initialState.set("failed", false);
  return initialState;
})();

/**
 * Initializer if bigcommerce load state, prevents multiple state updates
 * Subscriber will listen for all bigcommerce transactions and pass
 * updated state on each update
 *
 * @param {*} subscriber listener for bigcommerce api
 */
export const initialize = async (subscriber) => {
  bigcommerceLogger.info({
    method: "bigcommerce:initialize",
    state: JSON.stringify(STATE),
  });
  const checkoutId = "c815f3cc-d485-406d-95c1-ca9681a6a3ee";

  if (!STATE.get("loading") && !STATE.get("loaded")) {
    STATE.set("loading", true);
    STATE.set("checkoutId", checkoutId);

    try {
      /**
       * Initial bigcommerce data requests
       */
      await Promise.all([
        bigcommerceInstance.loadCheckout(),
        bigcommerceInstance.loadShippingAddressFields(),
        bigcommerceInstance.loadShippingCountries(),
        bigcommerceInstance.loadShippingOptions(),
        bigcommerceInstance.loadBillingCountries(),
        bigcommerceInstance.loadPaymentMethods(),
      ]);
    } catch (error) {
      STATE.set("failed", true);
    } finally {
      STATE.set("loaded", true);
      STATE.set("loading", false);
    }
  }

  return STATE;
};

/**
 * Interactions
 */
const interactions = {
  /**
   *
   */
  handleDeliveryValidate: async (payload) => {
    console.log("handleDeliveryValidate", { payload });

    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      phone: yup
        .string()
        .test("phone", "Invalid phone number", (value) => isValidNumber(value))
        .required(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      address1: yup.string().required(),
      address2: yup.string(),
      company: yup.string(),
      country: yup.string().required(),
      countryCode: yup.string().required(),
      postalCode: yup.string().required(),
      city: yup.string().required(),
      stateOrProvince: yup.string().required(),
    });

    const errorSchema = [
      { path: "email", message: "Please enter a valid email address" },
      { path: "phone", message: "Invalid phone number format" },
      { path: "firstName", message: "Invalid firstname format" },
      { path: "lastName", message: "Invalid lastname format" },
      { path: "address1", message: "Invalid addressline 1 format" },
      { path: "address2", message: "Invalid addressline 2 format" },
      { path: "countryCode", message: "Invalid country code format" },
      { path: "country", message: "Invalid country string format" },
      { path: "postalCode", message: "Invalid postal code format" },
      { path: "city", message: "Invalid city format" },
      { path: "stateOrProvince", message: "Invalid state format" },
    ];

    try {
      console.warn("validating...", { payload });
      await validationSchema.validate(payload, { abortEarly: false });
    } catch ({ inner, ...etc }) {
      console.error("failed to validate", { inner, etc });

      if (inner) {
        return errorMessages(errorSchema, inner);
      }

      return errorSchema.reduce(
        (acc, { path, message }) =>
          !payload[path] || !String(payload[path]).trim()
            ? {
                ...acc,
                [path]: message,
              }
            : acc,
        {}
      );
    }

    console.log("finish handleDeliveryValidate", { payload });
  },
  handleDeliverySubmit: (history) => async (payload) => {
    console.log("handleDeliverySubmit", { payload });
    // return;
    await bigcommerceInstance.updateShippingAddress(payload);
    debugger;
    await bigcommerceInstance.updateBillingAddress(payload);
    debugger;
    history.push("/shipping");
    console.log("finish handleDeliverySubmit", { payload });
  },

  /**
   *
   */
  handleShippingValidate: async (payload) => {
    const validationSchema = yup.object().shape({
      shipping: yup
        .string()
        .min(32)
        .required(),
    });

    const errorSchema = [
      { path: "shipping", message: "Invalid shipping format" },
    ];

    try {
      await validationSchema.validate(payload, { abortEarly: false });
    } catch ({ inner }) {
      return errorMessages(errorSchema, inner);
    }
  },

  handleShippingSubmit: (history) => async (payload) => {
    await bigcommerceInstance.selectShippingOption(payload.shipping);
    history.push("/payment");
  },

  /**
   *
   */
  handlePaymentValidate: async (payload) => {
    console.log("validation", { payload });

    // remove invisible characters
    payload.ccExpiryMonth = payload.ccExpiryMonth?.substring(0, 2);
    payload.ccExpiryYear = payload.ccExpiryYear?.substring(0, 2);
    payload.ccCvv = payload.ccCvv?.substring(0, 4);

    const validationSchema = yup.object().shape({
      ccNumber: yup
        .string()
        .test(
          "ccNumber",
          "Invalid card number",
          (value) => cardValidator.number(value).isValid
        )
        .required(),
      ccExpiryYear: yup
        .string()
        .test(
          "ccExpiryYear",
          "Invalid expiry date",
          (value) => cardValidator.expirationYear(value).isValid
        )
        .required(),
      ccExpiryMonth: yup
        .string()
        .test(
          "ccExpiryMonth",
          "Invalid expiry date",
          (value) => cardValidator.expirationMonth(value).isValid
        )
        .required(),
      ccCvv: yup
        .string()
        .test(
          "ccCvv",
          "Invalid CC Number",
          (value) =>
            cardValidator.cvv(value).isValid ||
            cardValidator.cvv(value, 4).isValid
        )
        .required(),
      ccName: yup.string().required(),
    });

    const errorSchema = [
      { path: "ccNumber", message: "Invalid card number" },
      { path: "ccExpiryMonth", message: "Invalid expiry month" },
      { path: "ccExpiryYear", message: "Invalid expiry year" },
      { path: "ccCvv", message: "Invalid security code" },
      { path: "ccName", message: "Invalid name" },
    ];

    try {
      await validationSchema.validate(payload, { abortEarly: false });
    } catch ({ inner }) {
      return errorMessages(errorSchema, inner);
    }
  },

  handlePaymentSubmit: (history, methodId) => async (payload) => {
    console.log("submitting payment", { payload });

    // remove invisible characters
    payload.ccExpiryMonth = payload.ccExpiryMonth?.substring(0, 2);
    payload.ccExpiryYear = payload.ccExpiryYear?.substring(0, 2);
    payload.ccCvv = payload.ccCvv?.substring(0, 4);

    const ccNumber = payload.ccNumber.split(" ").join("");
    const ccType = guessType(ccNumber).toUpperCase();
    const payment = {
      methodId,
      paymentData: {
        ccExpiry: { month: payload.ccExpiryMonth, year: payload.ccExpiryYear },
        ccName: payload.ccName,
        ccNumber,
        ccType,
        ccCvv: payload.ccCvv,
      },
    };

    try {
      console.log(
        "available payment methods",
        (await service.loadPaymentMethods()).data.getPaymentMethods()
      );

      console.log("initializing payment", methodId, payment);
      await service.initializePayment({ methodId });
      await bigcommerceInstance.submitOrder({ payment });

      history.push("/confirmation");
    } catch (error) {
      console.error("handlePaymentSubmit error", error);

      return error.message;
    }
  },

  handleDeliveryInfoEdit: (history) => () => {
    history.push("/");
  },
  handleShippingInfoEdit: (history) => () => {
    history.push("/shipping");
  },

  /**
   *
   */
  handleCouponValidate: async (payload) => {
    const validationSchema = yup.object().shape({
      coupon: yup.string().required(),
    });

    const errorSchema = [{ path: "coupon", message: "Invalid coupon format" }];

    try {
      await validationSchema.validate(payload, { abortEarly: false });
    } catch ({ inner }) {
      return errorMessages(errorSchema, inner);
    }
  },
  handleCouponSubmit: (history) => async (payload) => {
    await bigcommerceInstance.applyCoupon(payload.coupon);
  },
};

/**
 * Transforms
 */
const transformGetCart = (cart) => {
  const cartAmount = numeral(cart.cartAmount).format("$0,0.00");
  const baseAmount = numeral(cart.baseAmount).format("$0,0.00");
  const physicalItems = cart.lineItems.physicalItems.map((line) =>
    update(line, {
      listPrice: { $set: numeral(line.listPrice).format("$0,0.00") },
      salePrice: { $set: numeral(line.salePrice).format("$0,0.00") },
      discountAmount: { $set: numeral(line.discountAmount).format("$0,0.00") },
      couponAmount: { $set: numeral(line.couponAmount).format("$0,0.00") },
    })
  );

  return update(cart, {
    cartAmount: { $set: cartAmount },
    baseAmount: { $set: baseAmount },
    lineItems: {
      physicalItems: { $set: physicalItems },
    },
  });
};

const transformShippingOptions = (shippingOptions = []) => {
  return shippingOptions.map((option) =>
    update(option, {
      cost: {
        $set: option.cost ? numeral(option.cost).format("$0,0.00") : "$0",
      },
    })
  );
};
const transformGetCheckout = (checkout) => {
  const subtotal = numeral(checkout.subtotal).format("$0,0.00");
  const grandTotal = numeral(checkout.grandTotal).format("$0,0.00");
  const shippingCostTotal = numeral(checkout.shippingCostTotal).format(
    "$0,0.00"
  );
  const taxTotal = numeral(checkout.taxTotal).format("$0,0.00");
  const coupons = checkout.coupons.map((coupon) =>
    update(coupon, {
      discountedAmount: {
        $set: numeral(coupon.discountedAmount).format("$0,0.00"),
      },
    })
  );

  return update(checkout, {
    subtotal: { $set: subtotal },
    grandTotal: { $set: grandTotal },
    shippingCostTotal: { $set: shippingCostTotal },
    taxTotal: { $set: taxTotal },
    coupons: { $set: coupons },
  });
};

/**
 * Removing empty field array elements fixes final-form re-render
 * when submitting a form
 */
const transformShippingAddress = (payload) => {
  return Object.keys(payload).reduce((acc, item) => {
    if (payload[item] && payload[item].length) {
      acc[item] = payload[item];
    }
    return acc;
  }, {});
};

export const subscribe = (subscriber) => {
  bigcommerceLogger.info({ method: "bigcommerce:subscribe" });
  return service.subscribe((payload) => {
    /**
     * Following proxy catcher allows us to log all intermediate requests
     */
    const handler = {
      get: (target, propKey) => (...args) => {
        const executor = target[propKey].call(null, ...args);

        if (propKey === "getCart") {
          return transformGetCart(executor);
        }

        if (propKey === "getCheckout") {
          return transformGetCheckout(executor);
        }

        if (propKey === "getShippingOptions") {
          return transformShippingOptions(executor);
        }

        if (propKey === "getShippingAddress") {
          return transformShippingAddress(executor);
        }

        return executor;
      },
    };

    return subscriber({
      ...payload,
      data: new Proxy(payload.data, handler),
      interactions,
    });
  });
};

export const CheckoutContext = React.createContext({});
export const CheckoutProvider = CheckoutContext.Provider;
export const CheckoutConsumer = CheckoutContext.Consumer;
