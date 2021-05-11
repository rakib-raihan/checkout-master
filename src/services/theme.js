import { createMuiTheme } from '@material-ui/core/styles'
import { darken } from '@material-ui/core/styles/colorManipulator'
import pathOr from 'ramda/src/pathOr'

/**
 * defaultPalette = {
 *   primary: '#ef4511',
 *   secondary: '#151f26',
 * }
 */
const theme = ({
  defaultPalette,
}) => {
  const palette = {
    primary: pathOr('#ef4511', ['primary'], defaultPalette),
    secondary: pathOr('#151f26', ['secondary'], defaultPalette),
  }

  return createMuiTheme({
    typography: {
      fontFamily: `'Cabin', sans-serif`,
    },
  
    /**
     * 
     */
    palette: {
      primary: { main: '#333333' },
      secondary: { main: '#6d7d84' },
      dark: { main: palette.secondary },
      checkoutContainer: {
        main: '#f4f5f8',
        border: palette.primary,
      },
      input: {
        placeholder: '#6d7d84',
      },
    },
  
    /**
     * 
     */
    overrides: {
      /**
      * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormControlLabel/FormControlLabel.js
      */
      MuiFormControlLabel: {
        label: {
          width: '100%',
        },
      },
  
      /**
       * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Typography/Typography.js
       */
      MuiTypography: {
        root: {
          textTransform: 'none',
          letterSpacing: 0.35,
        },
        colorTextInvertedPrimary: {
          color: '#ffffff',
        },
        colorTextInvertedSecondary: {
          color: darken('#ffffff', 0.4),
        },
        h5: {
          fontSize: '1.3rem',
          fontWeight: 600,
        },
        body2: {
          fontWeight: 600,
        },
        subtitle1: {
          fontSize: '1.2rem',
          fontWeight: 600,
        },
        subtitle2: {
          fontSize: '1rem',
          fontWeight: 600,
        },
        subtitle3: {
          fontSize: '0.8rem',
          fontWeight: 600,
        },
        alignCenter: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
  
      /**
       * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/SvgIcon/SvgIcon.js
       */
      MuiSvgIcon: {
        root: {
        },
        colorPrimary: {
          color: palette.primary,
        },
        colorTextInvertedPrimary: {
          color: '#ffffff',
        },
        colorSecondary: {
          color: '#333333',
        },
      },
  
      /**
       * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Radio/Radio.js
       */
      MuiRadio: {
        colorPrimary: {
          '&$checked': {
            color: palette.primary,
          },
        },
      },
  
      /**
       * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Checkbox/Checkbox.js
       */
      MuiCheckbox: {
        colorPrimary: {
          '&$checked': {
            color: palette.primary,
          },
        },
      },
  
      MuiInputLabel: {
        outlined: {
          transform: 'translate(14px, 16px) scale(1)',
        },
      },
  
      /**
       * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/OutlinedInput/OutlinedInput.js
       */
      MuiOutlinedInput: {
        root: {
          position: 'relative',
          '&:hover $notchedOutline': {
            borderColor: palette.secondary,
            borderWidth: 0.5,
          },
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            '&:hover $notchedOutline': {
              borderColor: palette.secondary,
              borderWidth: 1.5,
            },
          },
          '&$focused $notchedOutline': {
            borderColor: palette.secondary,
            borderWidth: 1.5,
          },
          '&$error $notchedOutline': {
            borderColor: 'red',
            borderWidth: 1.5,
          },
          '&$disabled $notchedOutline': {
            borderColor: 'red',
          },
        },
  
        notchedOutline: {
          backgroundColor: '#ffffff',
        },
  
        input: {
          zIndex: 1,
          padding: '15px 14px',
        },
      },
  
      MuiInputAdornment: {
        root: {
          zIndex: 1,
          marginLeft: 8,
          marginRight: 8,
        },
      },
  
      /**
       * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormLabel/FormLabel.js
       */
      MuiFormLabel: {
        root: {
          color: '#6d7d84',
          '&$focused': {
            color: '#6d7d84',
          },
          '&$disabled': {
            color: '#6d7d84',
          },
          '&$error': {
            color: '#cd0606',
          },
        },
      },
  
      /**
       * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Button/Button.js
       */
      MuiButton: {
        sizeSmall: {
          padding: '8px 24px',
        },
        sizeLarge: {
          padding: '11px 32px',
        },
        containedPrimary: {
          backgroundColor: palette.primary,
          color: 'white',
        },
        containedSecondary: {
          backgroundColor: palette.secondary,
          color: 'white',
        },
        label: {
          fontWeight: 600,
        },
        contained: {
          backgroundColor: '#e2e4ea',
          boxShadow: 'none',
        },
      },
  
      /**
       * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Link/Link.js
       */
      MuiLink: {
        root: {
          color: '#0072bc',
          cursor: 'pointer',
        },
  
        underlineAlways: {
          textDecoration: 'none',
          borderBottom: '1px dashed #0072bc',
        },
      },
  
      /**
       * https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/LinearProgress/LinearProgress.js
       */
      MuiLinearProgress: {
        root: {
          height: 8,
          borderRadius: 4,
        },
        barColorPrimary: {
          backgroundColor: '#3fce7c',
        },
      },
  
      MuiSnackbarContent: {
        root: {
          alignItems: 'flex-start',
        },
        action: {
          marginLeft: 24,
        }
      },
    },
  })
}

export default theme