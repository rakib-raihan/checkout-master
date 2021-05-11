import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Done from "@material-ui/icons/Done";

const BreadcrumbsComponent = ({ step }) => (
  <Breadcrumbs separator="" aria-label="Breadcrumb">
    <Typography
      color={step === 1 ? "textPrimary" : "textSecondary"}
      variant={step === 1 ? "subtitle2" : "body1"}
      align="center"
    >
      <span>1. Delivery</span>
      {step > 1 ? <Done fontSize="small" color="primary" /> : null}
    </Typography>

    <Typography
      color={step === 2 ? "textPrimary" : "textSecondary"}
      variant={step === 2 ? "subtitle2" : "body1"}
      align="center"
    >
      <span>2. Shipping Method</span>
      {step > 2 ? <Done fontSize="small" color="primary" /> : null}
    </Typography>

    <Typography
      color={step === 3 ? "textPrimary" : "textSecondary"}
      variant={step === 3 ? "subtitle2" : "body1"}
      align="center"
    >
      <span>3. Payment</span>
      {step > 3 ? <Done fontSize="small" color="primary" /> : null}
    </Typography>
  </Breadcrumbs>
);

export default BreadcrumbsComponent;
