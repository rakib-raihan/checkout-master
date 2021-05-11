import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import pathOr from "ramda/src/pathOr";
import { app as appLogger } from "services/logger";
import App from "components/App";
import Frame from "components/Frame";
import Modal from "components/Modal";
import theme from "services/theme";
import { Helmet } from "react-helmet";
import "index.css";

const Root = ({ googleMapsKey, defaultPalette, logoUrl, methodId }) => (
  <MuiThemeProvider theme={theme({ defaultPalette })}>
    <Helmet>
      {/* <title>Quick Checkout</title> */}
      <link
        href="https://fonts.googleapis.com/css?family=Cabin&display=swap"
        rel="stylesheet"
      />
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places`}
      />
      <link
        href="https://s3.amazonaws.com/ec-checkout-prod/bundle.css"
        rel="stylesheet"
      />
      <link
        href="https://s3.amazonaws.com/ec-checkout-prod/main.css"
        rel="stylesheet"
      />
    </Helmet>

    <Frame
      style={{ width: window.innerWidth, height: window.innerHeight }}
      component={(props) => (
        <App {...props} logoUrl={logoUrl} methodId={methodId} />
      )}
      head={
        <React.Fragment>
          <link
            href="https://fonts.googleapis.com/css?family=Cabin&display=swap"
            rel="stylesheet"
          />

          {!(
            typeof window.google === "object" &&
            typeof window.google.maps === "object"
          ) && (
            <script
              src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places`}
            />
          )}

          <link
            href="https://s3.amazonaws.com/ec-checkout-prod/bundle.css"
            rel="stylesheet"
          />
          <link
            href="https://s3.amazonaws.com/ec-checkout-prod/main.css"
            rel="stylesheet"
          />
        </React.Fragment>
      }
      iframe
      name="name"
    />
  </MuiThemeProvider>
);

/**
 * googleMapsKey: AIzaSyC0HDekZyCAyDNNKgs2oE1n55OjtSD8ahE
 */
window.QUICK_CHECKOUT = (_element, config = {}) => {
  console.log({ navigator, window, document });

  appLogger.info({ method: "app:render" });
  console.log("launching checkout", { config });

  document.body.scrollTo(0, 0);
  // document.body.style.overflow = "hidden";

  const googleMapsKey = pathOr("", ["googleMapsKey"], config);
  const defaultPalette = pathOr({}, ["defaultPalette"], config);
  const logoUrl = pathOr("", ["logoUrl"], config);
  const methodId = pathOr("usaepay", ["methodId"], config);

  // render to body
  const element = document.createElement("div");
  element.id = 'QUICK_CHECKOUT'
  document.body.appendChild(element);

  ReactDOM.render(
    <div
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Modal>
        <Root
          googleMapsKey={googleMapsKey}
          defaultPalette={defaultPalette}
          logoUrl={logoUrl}
          methodId={methodId}
        />
      </Modal>
    </div>,
    element
  );
};

// if (process.env.NODE_ENV) {
//   console.log("dev mode");

//   window.QUICK_CHECKOUT("root", {
//     googleMapsKey: "AIzaSyC0HDekZyCAyDNNKgs2oE1n55OjtSD8ahE",
//   });
// }
