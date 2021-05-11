import React, { useState } from "react";
import pathOr from "ramda/src/pathOr";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Form, Field } from "react-final-form";
import { ArrowForward } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import ErrorsComponent from "components/Form/Errors";
import ActionComponent from "components/CheckoutContainer/Action";
import TextFieldComponent from "components/Form/TextField";
import CardComponent from "components/Form/Card";
import { formatYear, formatMonth, formatCVV } from "services/card";

const useStyles = makeStyles((theme) => ({
  action: {
    marginTop: theme.spacing(3),
  },
  actionIcon: {
    marginLeft: theme.spacing(2),
  },
  formCaption: {
    marginBottom: theme.spacing(2),
  },
  errors: {
    marginTop: theme.spacing(2),
  },
}));

const PaymentFormComponent = ({
  checkout,
  form: {
    handleSubmit,
    submitFailed,
    invalid,
    errors,
    submitting,
    submitSucceeded,
    submitErrors,
    values,
    ...props
  },
}) => {
  const classes = useStyles();
  const [agreementChecked, setAgreementChecked] = useState(true);

  return (
    <div>
      <ErrorsComponent errors={errors} submitFailed={submitFailed} />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Field
            name="ccNumber"
            label="Card Number"
            component={CardComponent}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="ccName"
            label="Name as it appears on card"
            component={TextFieldComponent}
          />
        </Grid>
        <Grid item sm={2} xs={4}>
          <Field
            name="ccExpiryMonth"
            label="mm"
            component={TextFieldComponent}
            format={formatMonth}
          />
        </Grid>
        <Grid item sm={2} xs={4}>
          <Field
            name="ccExpiryYear"
            label="yy"
            component={TextFieldComponent}
            format={formatYear}
          />
        </Grid>
        <Grid item sm={2} xs={4}>
          <Field
            name="ccCvv"
            label="CVV"
            component={TextFieldComponent}
            format={formatCVV(values.ccNumber)}
          />
        </Grid>
      </Grid>

      {!submitSucceeded && submitErrors ? (
        <div className={classes.errors}>
          <Typography variant="body1" color="error" gutterBottom>
            Card Declined
          </Typography>
        </div>
      ) : null}

      <Grid item xs={12} className={classes.form}>
        <FormControlLabel
          control={
            <Checkbox
              checked={agreementChecked}
              onChange={(e) => setAgreementChecked(e.target.checked)}
              name="agreementChecked"
              color="primary"
            />
          }
          label={
            <div>
              Agree to{" "}
              <Link href="https://eye4fraud.com/cookiepolicy" target="_blank">
                terms and conditions
              </Link>{" "}
              and{" "}
              <Link href="https://eye4fraud.com/privacy" target="_blank">
                privacy policy
              </Link>
            </div>
          }
        />
      </Grid>

      <Grid container justify="center" className={classes.action}>
        <Grid item>
          {agreementChecked && (
            <ActionComponent
              onClick={handleSubmit}
              color="primary"
              loading={submitting}
            >
              {`Pay ${pathOr("$0.00", ["grandTotal"], checkout)} securely`}
              <ArrowForward fontSize="small" className={classes.actionIcon} />
            </ActionComponent>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default (props) => (
  <Form
    {...props}
    render={(form) => <PaymentFormComponent form={form} {...props} />}
  />
);
