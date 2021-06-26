import { useSnackbar, SnackbarProvider } from 'notistack';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const InnerSnackbarUtilsConfigurator = ({ setUseSnackbarRef }) => {
  setUseSnackbarRef(useSnackbar());
  return null;
};

let useSnackbarRef;
const setUseSnackbarRef = useSnackbarRefProp => {
  useSnackbarRef = useSnackbarRefProp;
};

export const SnackbarUtilsConfigurator = () => {
  return <InnerSnackbarUtilsConfigurator setUseSnackbarRef={setUseSnackbarRef} />;
};

const useStyles = makeStyles(theme => ({
  root: {
    '& > div': {
      fontSize: 14,
    },
    '& button > span': {
      color: theme.palette.secondary.main,
    },
  },
  variants: {
    '& button > span': {
      color: '#fff',
    },
  },
}));

export function Snackbar({ children }) {
  const up600 = useMediaQuery('(min-width:600px)', { noSsr: true });
  const classes = useStyles();

  const notistackRef = React.createRef();

  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  };

  const action = key => <Button onClick={onClickDismiss(key)}>Dismiss</Button>;

  const snackbarConfig = {
    classes: {
      root: classes.root,
      variantSuccess: classes.variants,
      variantError: classes.variants,
    },
    maxSnack: 2,
    anchorOrigin: {
      vertical: up600 ? 'bottom' : 'top',
      horizontal: 'left',
    },
    action,
    ref: notistackRef,
  };

  return (
    <SnackbarProvider {...snackbarConfig}>
      <SnackbarUtilsConfigurator />
      {children}
    </SnackbarProvider>
  );
}

export default {
  success(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'success' });
  },
  warning(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'warning' });
  },
  info(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'info' });
  },
  error(msg, options = {}) {
    this.toast(msg, { ...options, variant: 'error' });
  },
  toast(msg, options = {}) {
    useSnackbarRef.enqueueSnackbar(msg, options);
  },
};
