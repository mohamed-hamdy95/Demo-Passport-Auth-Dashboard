import Layout from "components/Layout/Layout";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import AddUser from "components/AddUser/AddUser";

import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import snackbar from "utils/snackbar";
import { snackbarErrorMsg } from "config/constants";
import EmptyState from "components/EmptyState/EmptyState";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddIcon from "@material-ui/icons/Add";
import axios from "config/axios";
import { TextField } from "@material-ui/core";
import _ from "lodash";
import WarningDialog from "components/WarningDialog/WarningDialog";

function Dashboard() {
  const [users, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [usersLoading, setUserLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const up600 = useMediaQuery("(min-width:600px)");
  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const handleSearch = (e) => {
    const val = e.target.value;
    setFilteredUsers(() =>
      users.filter(
        ({ email, name, status, role }) =>
          email?.includes(val) || name?.includes(val) || status?.includes(val) || role?.includes(val)
      )
    );
  };

  const handleDelete = async () => {
    try {
      setWarningDialogOpen(false);
      await axios.delete(`/users/${selectedUser}`);
      fetchUsers();
      snackbar.toast("User Deleted");
    } catch (error) {
      snackbar.error(snackbarErrorMsg);
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const {
        data: { users: usersList },
      } = await axios.get("/users");
      setUser(usersList);
      setFilteredUsers(usersList);
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    setUserLoading(true);
    fetchUsers();
  }, []);
  const ctaButton = (
    <Button
      variant="contained"
      size={up600 ? "large" : "small"}
      sx={{
        minWidth: "unset",
        py: 1,
        bgcolor: "#fff",
        color: "primary.main",
        ":hover": {
          bgcolor: "#fff",
        },
      }}
      onClick={() => setOpen(true)}
    >
      {up600 ? "Add User" : <AddIcon />}
    </Button>
  );

  return (
    <Layout cta={ctaButton}>
      <AddUser open={open} setOpen={setOpen} setUser={setUser} setUserLoading={setUserLoading} fetchUsers={fetchUsers} />
      {/* <h1>{uploading ? `Uploading ${uploadProgress}%` : 'Done'} </h1> */}

      {usersLoading && <CircularProgress color="primary" size={80} sx={{ mx: "auto" }} />}

      <Collapse in={!usersLoading && !!users?.length} timeout={500} mountOnEnter unmountOnExit>
        <div>
          <Paper>
            <TextField sx={{ m: 2, width: "25%" }} placeholder="Search Users..." onChange={handleSearch} />
            <List sx={{ width: "100%" }}>
              {filteredUsers.map(({ image, name, email, status, role, id }, i, arr) => (
                <ListItem key={id} divider={i < arr.length - 1}>
                  <ListItemAvatar>
                    <Avatar alt={name} src={image ? `${process.env.REACT_APP_BASE_URL.replace("/api", "")}${image}` : "empty"} />
                  </ListItemAvatar>
                  <ListItemText primary={name} secondary={email} sx={{ flex: 1 }} />
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: 1,
                    }}
                  >
                    <Typography variant="body2" component="div">
                      Role: {_.startCase(_.lowerCase(role))}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      flex: 1,
                    }}
                  >
                    <Chip label={_.startCase(_.lowerCase(status))} sx={{ m: 0.4 }} />
                  </Box>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(id);
                        setWarningDialogOpen(true);
                      }}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
          <WarningDialog
            open={warningDialogOpen}
            onClose={() => setWarningDialogOpen(false)}
            containedBtn="close"
            onProceed={() => handleDelete()}
            title="Remove User?"
            description="You are about to Remove a User, this action is irreversible."
            closeLabel="Cancel"
            proceedLabel="Yes, Remove!"
          />
        </div>
      </Collapse>
      <Collapse in={!usersLoading && users?.length === 0} timeout={700} mountOnEnter unmountOnExit>
        <div>
          <EmptyState size={24} paper message="You haven't added any users" />
        </div>
      </Collapse>
    </Layout>
  );
}

export default Dashboard;
