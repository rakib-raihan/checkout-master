import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Autosuggest from "react-autosuggest";
import TextFieldComponent from "components/Form/TextField";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useStyles } from "components/Form/Suggest/shared";

/**
 *
 */
const getSuggestionValue = (suggestion) => suggestion;

function renderSuggestion(suggestion, { query, isHighlighted }) {
  if (suggestion.name) {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        {parts.reduce((acc, cur) => acc + cur.text || cur.description, "")}
      </MenuItem>
    );
  } else {
    console.log({ suggestion, query, isHighlighted });

    return (
      <MenuItem selected={isHighlighted} component="div">
        {suggestion.description}
      </MenuItem>
    );
  }
}

const renderSuggestionsContainer = ({ containerProps, children, query }) => {
  if (!query || !query.length) {
    return null;
  }

  return (
    <Paper {...containerProps}>
      <MenuList component="div" disablePadding id="quickcheckout-addresses">
        {children}
      </MenuList>
    </Paper>
  );
};

/**
 *
 */
const SuggestAddressesComponent = (props) => {
  const classes = useStyles();

  const searchOptions = {
    // types: ['(cities)'],
  };

  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    if (typeof props.onSuggestionSelected === "function") {
      props.onSuggestionSelected(suggestion);
    }
  };

  /**
   * Loading initial value
   */
  const [value, setValue] = useState(props.input.value);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  /**
   * Allow value updating only when entering text manually,
   * Prevent updates coming from arrow up/down + mouse select from dropdown
   * on main input component
   */
  const onChange = (nextValue) => {
    const mappedValue = (() => {
      try {
        const mappedValue = JSON.parse(nextValue);
        return mappedValue;
      } catch (error) {
        return;
      }
    })();

    if (typeof mappedValue === "object" && mappedValue.shouldUpdate) {
      props.input.onChange(mappedValue.value);
      setValue(mappedValue.value);
    }
  };

  const autocompleteOnChange = ({ onChange, onBlur }) => (event, prop) => {
    const mappedEvent = (value, shouldUpdate = false) => {
      const mappedValue = JSON.stringify({
        value,
        shouldUpdate,
      });
      event.target.value = mappedValue;
      return event;
    };

    if (prop.method === "type") {
      setSuggestionsVisible(true);

      /**
       * Updating react-final-form when typed value changed
       */
      props.input.onChange(event.target.value);

      /**
       * Updating TextField when typed value changed
       */
      setValue(event.target.value);

      /**
       * Updating PlacesAutocomplete when typed value changed
       */
      onChange(mappedEvent(event.target.value, true));
      return;
    }

    if (prop.method === "click" || prop.method === "enter") {
      setSuggestionsVisible(false);

      /**
       * Updating react-final-form when typed value changed
       */
      props.input.onBlur();
      props.input.onChange(prop.newValue.formattedSuggestion.mainText);

      /**
       * Updating TextField when typed value changed
       */
      setValue(prop.newValue.formattedSuggestion.mainText);

      /**
       * Updating PlacesAutocomplete when typed value changed
       */
      onBlur();
      onChange(mappedEvent(prop.newValue.formattedSuggestion.mainText, true));
      return;
    }

    onChange(mappedEvent(event.target.value, false));
  };

  return (
    <PlacesAutocomplete
      {...props.input}
      onChange={onChange}
      value={value}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <Autosuggest
            id="addresses-autosuggest"
            suggestions={suggestions}
            onSuggestionsFetchRequested={() => {}}
            onSuggestionsClearRequested={() => {}}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            shouldRenderSuggestions={() => suggestionsVisible}
            renderSuggestion={renderSuggestion}
            inputProps={{
              ...getInputProps(),
              onChange: autocompleteOnChange(getInputProps()),
              value,
              label: props.label,
              meta: props.meta,
              name: props.input.name,
              classes: { root: classes.input },
            }}
            renderSuggestionsContainer={renderSuggestionsContainer}
            renderInputComponent={TextFieldComponent}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
          />
        );
      }}
    </PlacesAutocomplete>
  );
};

export default SuggestAddressesComponent;
