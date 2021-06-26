import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/core/Alert";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
// import firebase from "config/firebase";
import axios from "config/axios";
import snackbar from "utils/snackbar";
import { snackbarErrorMsg } from "config/constants";
import { useDispatch } from "react-redux";
import { endUpload, setProgress, startUpload } from "redux/features/upload.slice";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import _ from "lodash";

const roles = ["SUPER_ADMIN", "BASIC_USER"];
const statuses = ["ENABLED", "DISABLED"];

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px 20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "rgba(0,0,0,60)",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function AddUser({ open, setOpen, fetchUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [userImage, setUserImage] = useState(null);

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      /**
       * Add Create User Here
       */
      setOpen(false);
      dispatch(startUpload());

      let formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("status", status);
      formData.append("role", role);
      formData.append("password", password);
      formData.append("file", userImage);

      await axios.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          // setProgress(Math.round();
          const progress = Math.round((100 * data.loaded) / data.total);
          dispatch(setProgress(progress));
        },
      });
      fetchUsers();
    } catch (error) {
      console.log(error);
      snackbar.error(snackbarErrorMsg);
    } finally {
      resetForm();
    }
  };

  const resetForm = () => {
    dispatch(endUpload());
    setName("");
    setEmail("");
    setUserImage(null);
  };

  const isDisabled = !name || !email || !role || !userImage || !status || !password;

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setUserImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="add-user-title" aria-describedby="add-user-email">
      <DialogTitle id="add-user-title">Add New User</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mb: 2 }}
          autoFocus
          value={name}
          onChange={handleNameChange}
          id="name"
          label="User Name"
          fullWidth
          variant="outlined"
        />
        <TextField
          sx={{ mb: 2 }}
          autoFocus
          value={email}
          onChange={handleEmailChange}
          id="email"
          label="Email"
          fullWidth
          variant="outlined"
        />
        <TextField
          sx={{ mb: 2 }}
          autoFocus
          value={password}
          onChange={handlePasswordChange}
          id="password"
          type="password"
          label="Password"
          fullWidth
          variant="outlined"
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select sx={{ p: 1 }} labelId="role-select-label" value={role} onChange={handleRole} id="role" label="Role">
            {roles.map((tp, idx) => (
              <MenuItem key={idx} value={tp}>
                {_.startCase(_.lowerCase(tp))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select sx={{ p: 1 }} labelId="status-select-label" value={status} onChange={handleStatus} id="status" label="Status">
            {statuses.map((tp, idx) => (
              <MenuItem key={idx} value={tp}>
                {_.startCase(_.lowerCase(tp))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mb: 2, minWidth: { md: 520 } }}>
          <Collapse in={!userImage} timeout={400} mountOnEnter unmountOnExit>
            <div className="container">
              <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the image here ...</p>
                ) : (
                  <p>Drag 'n' drop user's profile image here, or click to select it</p>
                )}
              </div>
            </div>
          </Collapse>
          <Collapse in={!!userImage} timeout={400} mountOnEnter unmountOnExit>
            <Alert
              severity="success"
              sx={{
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.08)",
                boxShadow: 1,
                p: 2,
                color: "text.primary",
                "& .MuiAlert-message": {
                  color: "inherit",
                  fontWeight: "bold",
                },
                "& .MuiAlert-icon": {
                  color: "inherit",
                },
                "&:hover": {
                  boxShadow: 3,
                },
              }}
              variant="outlined"
              onClose={() => setUserImage(null)}
            >
              {userImage?.name}
            </Alert>
          </Collapse>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={isDisabled} variant="contained">
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUser;
