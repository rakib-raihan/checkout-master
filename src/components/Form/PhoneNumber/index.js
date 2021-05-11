import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  parseIncompletePhoneNumber,
  formatIncompletePhoneNumber,
} from "libphonenumber-js";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextFieldComponent from "components/Form/TextField";

/**
 * https://raw.githubusercontent.com/catamphetamine/react-phone-number-input/master/source/InputBasic.js
 */
class CustomComponent extends React.PureComponent {
  state = {};

  static getDerivedStateFromProps({ value }) {
    return { value };
  }

  onChange = (event) => {
    const phone = event.target.value;

    const newValue = ((value) => {
      const modifiedValue = parseIncompletePhoneNumber(phone);

      if (
        modifiedValue === value &&
        this.format(modifiedValue).indexOf(phone) === 0
      ) {
        return modifiedValue.slice(0, -1);
      }

      return modifiedValue;
    })(this.state.value).substring(0, 12);

    this.setState({ value: newValue }, () => this.props.onChange(newValue));
  };

  onBlur = (event) => {
    if (this.props.onBlur) {
      const customEvent = {
        ...event,
        target: {
          ...event.target,
          value: this.state.value,
        },
      };

      customEvent.stopPropagation = event.stopPropagation;
      customEvent.preventDefault = event.preventDefault;

      return this.props.onBlur(customEvent);
    }
  };

  format(value) {
    return formatIncompletePhoneNumber(
      value,
      this.props.country,
      this.props.metadata
    );
  }

  focus = () => {
    if (!this.input) {
      return;
    }
    this.input.focus();
  };

  storeInput = (ref) => (this.input = ref);

  render() {
    console.log({ state: this.state, props: this.props });
    return (
      <TextFieldComponent
        type="tel"
        autoComplete="tel"
        {...this.props}
        ref={this.storeInput}
        value={this.format(this.state.value)}
        onChange={this.onChange}
        onFocus={this.props.onFocus}
        onBlur={this.onBlur}
        variant="outlined"
        fullWidth
        InputProps={this.props.InputProps}
      />
    );
  }
}

const PhoneNumberComponent = ({ input, ...props }) => {
  const inputProps =
    input.value && input.value.length
      ? {
          startAdornment: (
            <InputAdornment position="start">
              <div style={{ width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }
      : {};

  const additionalProps =
    input.value && input.value.length
      ? {}
      : {
          countrySelectComponent: () => null,
        };

  return (
    <PhoneInput
      {...input}
      {...props}
      {...additionalProps}
      inputComponent={CustomComponent}
      InputProps={inputProps}
    />
  );
};

PhoneNumberComponent.defaultProps = {
  input: {
    value: null,
    onChange: () => {},
    onBlur: () => {},
  },
};

export default PhoneNumberComponent;
