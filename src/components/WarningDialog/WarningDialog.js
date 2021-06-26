import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grow from "@material-ui/core/Grow";
import useStyles from "./styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow {...props} ref={ref} />;
});

function WarningDialog({
  open,
  onClose,
  onProceed,
  closeLabel,
  proceedLabel,
  title,
  description,
  containedBtn,
}) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      TransitionProps={{
        mountOnEnter: true,
        unmountOnExit: true,
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.dialog}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          variant={containedBtn === "close" ? "contained" : "text"}
        >
          {closeLabel}
        </Button>
        <Button
          onClick={onProceed}
          variant={containedBtn === "proceed" ? "contained" : "text"}
          color="primary"
        >
          {proceedLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(WarningDialog);
