import React from 'react';
import Box from '@material-ui/core/Box';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from 'components/Login/Login';
import Typography from '@material-ui/core/Typography';

function AuthPage() {
  const { isAuth } = useSelector(state => state.auth);
  const location = useLocation();

  const loginFormHeader = (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Sign in
      </Typography>
    </>
  );

  if (isAuth) {
    return <Redirect to={{ pathname: '/', from: location.pathname }} />;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'primary.main',
      }}
    >
      <Login formHeader={loginFormHeader} />
    </Box>
  );
}

export default AuthPage;
