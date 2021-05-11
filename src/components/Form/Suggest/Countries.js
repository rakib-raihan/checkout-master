import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import TextFieldComponent from "components/Form/TextField";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import {
  useStyles,
  getCountryOrStateSuggestions,
} from "components/Form/Suggest/shared";

/**
 *
 */
const getSuggestionValue = (suggestion) => suggestion.name;

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      {parts.reduce((acc, cur) => acc + cur.text, "")}
    </MenuItem>
  );
}

const renderSuggestionsContainer = ({ containerProps, children, query }) => {
  if (!query || !query.length) {
    return null;
  }

  return (
    <Paper {...containerProps}>
      <MenuList component="div" disablePadding id="quickcheckout-countries">
        {children}
      </MenuList>
    </Paper>
  );
};

/**
 *
 */
const PlacesComponent = (props) => {
  const classes = useStyles();
  const [suggestions, setSuggestions] = useState(props.suggestions);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getCountryOrStateSuggestions(props.suggestions, value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    props.input.onChange(suggestionValue);
  };

  console.log("PlacementComponent", { suggestions });

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        ...props.input,
        input: props.input,
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
};

export default PlacesComponent;
