import React from "react";
import { useToggle } from "react-use";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LabelLineComponent from "components/Form/LabelLine";
import Typography from "@material-ui/core/Typography";
import { Lock } from "@material-ui/icons";
import ProgressComponent from "components/CheckoutContainer/Progress";
import BreadcrumbsComponent from "components/Breadcrumbs";
import PaymentFormComponent from "components/Payment/PaymentForm";
import CouponFormComponent from "components/Payment/CouponForm";
import InfoComponent from "components/Payment/Info";

const useStyles = makeStyles((theme) => ({
  navigation: {
    marginBottom: theme.spacing(1),
  },
  info: {
    marginBottom: theme.spacing(2),
  },
  form: {
    marginBottom: theme.spacing(1),
  },
  lockIcon: {
    marginRight: theme.spacing(1),
  },
  formCaption: {
    marginBottom: theme.spacing(1),
  },
}));

const PaymentComponent = ({
  cart,
  checkout,
  shippingAddress,
  initialValues,
  onSubmit,
  validate,
  selectedShippingOption,
  handleDeliveryInfoEdit,
  handleShippingInfoEdit,
  handleCouponSubmit,
  handleCouponValidate,
}) => {
  const classes = useStyles();
  const [couponLineVisible, toggleCouponLineVisible] = useToggle(false);

  return (
    <div id="quickcheckout-payment">
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.navigation}>
          <BreadcrumbsComponent step={3} />
        </Grid>

        <Grid item xs={12} className={classes.info}>
          <InfoComponent
            shippingAddress={shippingAddress}
            selectedShippingOption={selectedShippingOption}
            handleDeliveryInfoEdit={handleDeliveryInfoEdit}
            handleShippingInfoEdit={handleShippingInfoEdit}
          />
        </Grid>
      </Grid>

      <Grid container justify="space-between" className={classes.formCaption}>
        <Grid item>
          <Typography variant="h5" align="center">
            <Lock fontSize="inherit" className={classes.lockIcon} />
            Payment
          </Typography>
        </Grid>
        <Grid item>
          <LabelLineComponent
            label="ADD COUPON CODE"
            onClick={toggleCouponLineVisible}
          />
        </Grid>
      </Grid>

      {couponLineVisible ? (
        <Grid item xs={12} className={classes.form}>
          <CouponFormComponent
            onSubmit={handleCouponSubmit}
            validate={handleCouponValidate}
            initialValues={{}}
          />
        </Grid>
      ) : null}

      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.form}>
          <PaymentFormComponent
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
            checkout={checkout}
          />
        </Grid>

        <Grid item xs={12}>
          <ProgressComponent value={98} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PaymentComponent;
