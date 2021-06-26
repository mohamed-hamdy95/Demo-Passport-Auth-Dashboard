import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import LinearProgress from '@material-ui/core/LinearProgress';
import { logoutUser } from "redux/features/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import paths from "routes/paths";
import { useHistory } from "react-router";
import Uploading from "components/Uploading/Uploading";

function Layout({ children, cta }) {
  const dispatch = useDispatch();
  // const up600 = useMediaQuery('(min-width:600px)');
  const history = useHistory();
  const { pathname } = history.location;
  const routes = paths.filter(({ tab }) => !!tab);
  const { progress, isUploading } = useSelector((state) => state.upload);

  const navPath = [...routes].reverse().find((route) => pathname.includes(route.path))?.path || "/";
  const [value, setValue] = useState(navPath);

  useEffect(() => {
    if (navPath === value) return;
    setValue(navPath);
  }, [navPath, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(event.currentTarget.name);
  };

  return (
    <Box sx={{ minHeight: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            clone
            sx={{
              mr: "auto",
              ml: "5%",
              "& .MuiTabs-indicator": {
                backgroundColor: "#fff",
              },
              "& .MuiTab-root": {
                mx: 1,
                minWidth: "unset",
                fontWeight: "bold",
                color: "rgba(255,255,255,0.8)",
                "&.Mui-selected": {
                  color: "#fff",
                },
              },
            }}
          >
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              {routes.map(({ path, tab: { label, icon } }, i) => (
                <Tab
                  key={i}
                  label={label}
                  // icon={<Icon>{icon}</Icon>}
                  value={path}
                  name={path}
                />
              ))}
            </Tabs>
          </Box>
          {cta}
          <Button variant="outlined" color="inherit" sx={{ ml: "10%" }} onClick={() => dispatch(logoutUser())}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {isUploading && <Uploading progress={progress} />}
      {/* {isUploading && <LinearProgress variant="determinate" value={progress} color="secondary" />} */}
      <Box sx={{ display: "flex", flexDirection: "column", p: { lg: 8, md: 6, sm: 4, xs: 2 } }}>{children}</Box>
    </Box>
  );
}

export default Layout;
