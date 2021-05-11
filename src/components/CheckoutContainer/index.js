import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useToggle, useWindowSize } from "react-use";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
  Lock,
  CloseOutlined,
  ShoppingCart,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
} from "@material-ui/icons";
import SummaryComponent from "components/Summary";
import { ModalContext } from "components/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
    display: "flex",
    alignItems: "center",
    alignContent: "flex-start",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      margin: 0,
    },
  },
  paper: {
    background: theme.palette.checkoutContainer.main,
    maxWidth: 560,
    borderTop: `5px solid ${theme.palette.checkoutContainer.border}`,
    borderRadius: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
    },
  },
  header: {
    padding: theme.spacing(0.8),
    paddingBottom: 0,
    display: "flex",
    justifyContent: "flex-end",
  },
  closeIcon: {
    fontSize: theme.spacing(2),
  },
  center: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: 0,

    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      justifyContent: "space-between",
    },
  },
  component: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
  },

  lockIcon: {
    fontSize: "0.8rem",
    marginRight: theme.spacing(0.5),
  },
  copyrightText: {
    paddingBottom: theme.spacing(3),
    fontWeight: "bold",
  },
  cartIcon: {
    fontSize: "1.2rem",
  },
  cartText: {
    padding: theme.spacing(0.5),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  cartToggle: {
    fontSize: "1.4rem",
  },
  logo: {
    width: 190,
    display: "block",
    [theme.breakpoints.down("xs")]: {
      width: 140,
    },
  },
  cartWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  summary: {
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      top: 95,
      left: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 3,
    },
  },
}));

const ShoppingCartComponent = ({ checkout, onClick, summaryVisible }) => {
  const classes = useStyles();

  return (
    <Button variant="contained" size="small" onClick={onClick}>
      <ShoppingCart
        fontSize="small"
        color="secondary"
        className={classes.cartIcon}
      />
      <Typography variant="subtitle2" className={classes.cartText}>
        {checkout.grandTotal}
      </Typography>
      {summaryVisible ? (
        <KeyboardArrowLeftOutlined
          fontSize="small"
          color="secondary"
          className={classes.cartToggle}
        />
      ) : null}

      {!summaryVisible ? (
        <KeyboardArrowRightOutlined
          fontSize="small"
          color="secondary"
          className={classes.cartToggle}
        />
      ) : null}
    </Button>
  );
};

ShoppingCartComponent.propTypes = {
  checkout: PropTypes.shape().isRequired,
};

ShoppingCartComponent.defaultProps = {
  checkout: {
    grandTotal: "$0.00",
  },
};

const CheckoutContainer = ({ children, cart, checkout, config, logoUrl }) => {
  const classes = useStyles();
  const { width } = useWindowSize();
  const [summaryVisible, toggleSummaryVisible] = useToggle(width > 600);
  const Modal = useContext(ModalContext);
  const handleClose = () => Modal.setVisible(false);

  const logoURL =
    document.querySelector(".header-logo-image")?.src ||
    document.querySelector(".header-logo img")?.src ||
    document.querySelector("#LogoImage")?.src ||
    document.querySelector("#logoImage")?.src;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <CloseOutlined
            fontSize="small"
            color="secondary"
            onClick={handleClose}
            className={classes.closeIcon}
          />
        </div>
        <div className={classes.center}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={6} className={classes.logoWrapper}>
              {logoURL && (
                <img src={logoURL} alt="logo" className={classes.logo} />
              )}
            </Grid>
            <Grid item xs={6} className={classes.cartWrapper}>
              <ShoppingCartComponent
                checkout={checkout}
                onClick={toggleSummaryVisible}
                summaryVisible={summaryVisible}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.component}>{children}</div>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item>
            <Typography
              variant="caption"
              color="textSecondary"
              className={classes.copyrightText}
              align="center"
            >
              <Lock
                fontSize="small"
                color="textSecondary"
                className={classes.lockIcon}
              />
              Secured by Eye4Fraud
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <div className={classes.summary}>
        <SummaryComponent
          cart={cart}
          checkout={checkout}
          open={summaryVisible}
          config={config}
        />
      </div>
    </div>
  );
};

CheckoutContainer.propTypes = {
  checkout: PropTypes.shape().isRequired,
  cart: PropTypes.shape().isRequired,
};

CheckoutContainer.defaultProps = {
  checkout: {
    grandTotal: "$0.00",
  },
};

export default CheckoutContainer;
