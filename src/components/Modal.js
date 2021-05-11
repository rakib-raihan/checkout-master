import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiModal from "@material-ui/core/Modal";

export const ModalContext = React.createContext();

const Modal = ({ children, classes }) => {
  const [visible, setVisible] = useState(false);

  const onSetVisible = (visible) => {
    if (visible) {
      setVisible(true);
    } else {
      console.log("navigating back");
      // window.location.replace("/");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!visible && document.location.pathname === "/checkout") {
        console.log("opening checkout");
        onSetVisible(true);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div className={classes.container}>
      <div id="qc-background" className={classes.background}></div>

      <MuiModal
        open={visible}
        className={classes.modal}
        onClose={() => onSetVisible(false)}
        style={{ zIndex: "9998" }}
      >
        <div className={classes.root}>
          <ModalContext.Provider value={{ visible, setVisible: onSetVisible }}>
            {children}
          </ModalContext.Provider>
        </div>
      </MuiModal>
    </div>
  );
};

const styles = (theme) => ({
  container: {
    position: "absolute",

    width: "100vw",
    height: "100vh",
    left: "0",
    top: "0",

    overflow: "hidden",
  },

  background: {
    position: "absolute",

    width: "100vw",
    height: "100vh",

    // background: "rgb(130, 130, 130, 0.98)",

    overflow: "hidden",
  },

  root: {
    position: "absolute",
    outline: "none",

    height: "100%",
    width: "100%",

    overflow: "hidden",
    background: "rgb(100, 100, 100, 0.98)",
  },

  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    overflow: "scroll",
    height: "100%",

    border: "1px solid red",
  },
});

export default withStyles(styles)(Modal);
