import React from 'react'
import PropTypes from 'prop-types'
import { create } from 'jss'
import { withStyles, useTheme } from '@material-ui/core/styles'
import { jssPreset, StylesProvider } from '@material-ui/styles'
import NoSsr from '@material-ui/core/NoSsr'
import rtl from 'jss-rtl'
import Frame from 'react-frame-component'

const styles = theme => ({
  root: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    border: 'none',
  },
});

function DemoFrame(props) {
  const { children, classes, ...other } = props;
  const theme = useTheme();
  const [state, setState] = React.useState({
    ready: false,
  });
  const instanceRef = React.useRef();

  const handleRef = React.useCallback(ref => {
    instanceRef.current = {
      contentDocument: ref ? ref.node.contentDocument : null,
      contentWindow: ref ? ref.node.contentWindow : null,
    };
  }, []);

  const onContentDidMount = () => {
    setState({
      ready: true,
      jss: create({
        plugins: [...jssPreset().plugins, rtl()],
        insertionPoint: instanceRef.current.contentWindow['demo-frame-jss'],
      }),
      sheetsManager: new Map(),
      container: instanceRef.current.contentDocument.body,
      window: () => instanceRef.current.contentWindow,
    });
  };

  const onContentDidUpdate = () => {
    instanceRef.current.contentDocument.body.dir = theme.direction;
  };

  // NoSsr fixes a strange concurrency issue with iframe and quick React mount/unmount
  return (
    <NoSsr>
      <Frame
        ref={handleRef}
        className={classes.root}
        contentDidMount={onContentDidMount}
        contentDidUpdate={onContentDidUpdate}
        {...other}
      >
        <div id="demo-frame-jss" />
        {state.ready ? (
          <StylesProvider jss={state.jss} sheetsManager={state.sheetsManager}>
            {React.cloneElement(children, {
              container: state.container,
              window: state.window,
            })}
          </StylesProvider>
        ) : null}
      </Frame>
    </NoSsr>
  );
}

DemoFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

const StyledFrame = withStyles(styles)(DemoFrame);

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
function DemoSandboxed(props) {
  const { component: Component, iframe, name, ...other } = props;
  const Sandbox = iframe ? StyledFrame : React.Fragment;
  const sandboxProps = iframe ? { title: `${name} demo`, ...other } : {};

  return (
    <Sandbox {...sandboxProps}>
      <Component />
    </Sandbox>
  );
}

DemoSandboxed.propTypes = {
  component: PropTypes.elementType.isRequired,
  iframe: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default React.memo(DemoSandboxed)
