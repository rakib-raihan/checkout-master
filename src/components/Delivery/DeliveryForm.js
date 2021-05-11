import React from "react";
import { useToggle } from "react-use";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { Form, Field } from "react-final-form";
import { ArrowForward } from "@material-ui/icons";
import { geocodeByPlaceId } from "react-places-autocomplete";
import ActionComponent from "components/CheckoutContainer/Action";
import ErrorsComponent from "components/Form/Errors";
import WhenFieldChangesComponent from "components/Form/WhenFieldChanges";
import TextFieldComponent from "components/Form/TextField";
import PhoneNumberComponent from "components/Form/PhoneNumber";
import LabelLineComponent from "components/Form/LabelLine";
import SuggestAddressesComponent from "components/Form/Suggest/Addresses";
import SuggestCountriesComponent from "components/Form/Suggest/Countries";
import SuggestStatesComponent from "components/Form/Suggest/States";

const useStyles = makeStyles((theme) => ({
  action: {
    marginTop: theme.spacing(3),
  },
  actionIcon: {
    marginLeft: theme.spacing(2),
  },
  emptySpace: {
    padding: theme.spacing(0.5),
  },
}));

const getCountry = (countries, country) => {
  const selected = countries.find((element) => element.name === country);
  return (selected || {}).code;
};

const DeliveryFormComponent = ({
  countries,
  form: { handleSubmit, submitFailed, invalid, errors, submitting, ...props },
}) => {
  const classes = useStyles();
  const [addressLineVisible, toggleAddressLineVisible] = useToggle(
    props.values.address2 && props.values.address2.length
  );
  const [companyLineVisible, toggleCompanyLineVisible] = useToggle(
    props.values.company && props.values.company.length
  );

  const stateOptions = (() => {
    const country = countries.find(
      (country) => country.name === props.values.country
    );
    return (country || {}).subdivisions || [];
  })();

  const onAddressSuggestionSelected = async (suggestion = {}) => {
    const fullDetails = await geocodeByPlaceId(suggestion.placeId);

    if (!fullDetails.length) {
      return;
    }

    const formatted = fullDetails[0].address_components.reduce(
      (acc, component) => {
        if (
          component.types.includes("locality") ||
          component.types.includes("sublocality")
        ) {
          acc.push({ field: "city", value: component.long_name });
        }
        if (component.types.includes("administrative_area_level_1")) {
          acc.push({ field: "stateOrProvince", value: component.short_name });
        }
        if (component.types.includes("postal_code")) {
          acc.push({ field: "postalCode", value: component.long_name });
        }
        if (component.types.includes("country")) {
          acc.push({ field: "country", value: component.long_name });
          acc.push({ field: "countryCode", value: component.short_name });
        }
        return acc;
      },
      []
    );

    formatted.forEach((element) =>
      props.form.change(element.field, element.value)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <ErrorsComponent errors={errors} submitFailed={submitFailed} />

      <WhenFieldChangesComponent
        field="country"
        becomes={props.values.country !== null}
        set="countryCode"
        to={getCountry(countries, props.values.country)}
      />

      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Field
            name="email"
            label="Email Address"
            component={TextFieldComponent}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="phone"
            label="Phone Number"
            component={PhoneNumberComponent}
            country="US"
          />
        </Grid>
        <Grid item sm={6} xs={6}>
          <Field
            name="firstName"
            label="First Name"
            component={TextFieldComponent}
          />
        </Grid>
        <Grid item sm={6} xs={6}>
          <Field
            name="lastName"
            label="Last Name"
            component={TextFieldComponent}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <LabelLineComponent
            label="ADD COMPANY NAME"
            onClick={toggleCompanyLineVisible}
          />
        </Grid>
        {companyLineVisible ? (
          <Grid item xs={12}>
            <Field
              name="company"
              label="Company name"
              component={TextFieldComponent}
            />
            <div className={classes.emptySpace} />
          </Grid>
        ) : null}
      </Grid>

      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Field
            name="address1"
            label="Address Line 1"
            component={SuggestAddressesComponent}
            onSuggestionSelected={onAddressSuggestionSelected}
          />
        </Grid>

        <Hidden only={["xs"]}>
          <Grid item sm={6}>
            <Field
              name="country"
              label="Country"
              component={SuggestCountriesComponent}
              suggestions={countries}
            />
          </Grid>
        </Hidden>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <LabelLineComponent
            label="ADD ADDRESS LINE 2"
            onClick={toggleAddressLineVisible}
          />
        </Grid>
        {addressLineVisible ? (
          <Grid item xs={12}>
            <Field
              name="address2"
              label="Address Line 2"
              component={TextFieldComponent}
            />
            <div className={classes.emptySpace} />
          </Grid>
        ) : null}
      </Grid>

      <Grid container spacing={1}>
        <Hidden smUp>
          <Grid item xs={6}>
            <Field
              name="country"
              label="Country"
              component={SuggestCountriesComponent}
              suggestions={countries}
            />
          </Grid>
        </Hidden>

        <Grid item sm={4} xs={6}>
          <Field name="city" label="City" component={TextFieldComponent} />
        </Grid>
        <Grid item sm={4} xs={6}>
          <Field
            name="stateOrProvince"
            label="Select State"
            component={SuggestStatesComponent}
            suggestions={stateOptions}
          />
        </Grid>
        <Grid item sm={4} xs={6}>
          <Field
            name="postalCode"
            label="ZIP Code"
            component={TextFieldComponent}
          />
        </Grid>
      </Grid>

      <Grid container justify="center" className={classes.action}>
        <Grid item>
          <ActionComponent onClick={handleSubmit} loading={submitting}>
            Continue to shipping method
            <ArrowForward fontSize="small" className={classes.actionIcon} />
          </ActionComponent>
        </Grid>
      </Grid>
    </form>
  );
};

DeliveryFormComponent.defaultProps = {
  countries: [],
};

export default (props) => (
  <Form
    {...props}
    render={(form) => <DeliveryFormComponent form={form} {...props} />}
  />
);
