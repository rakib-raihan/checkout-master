import { makeStyles } from '@material-ui/core/styles'

export const getCountryOrStateSuggestions = (options, value) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0 ? [] : options.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  )
}

export const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: 250,
    overflow: 'scroll',
  },
  container: {
    position: 'relative',
    maxHeight: 250,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    maxHeight: 250,
    overflow: 'scroll',
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  input: {
    zIndex: 1,
  },
}))