import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { startAuth } from "redux/features/auth.slice";
import useForm from "utils/hooks/useForm";
import Paper from "@material-ui/core/Paper";
import PasswordVisibility from "components/PasswordVisibility/PasswordVisibility";
import useStyles from "./styles";

const formFields = [
  { item: "email", label: "Email", type: "email" },
  { item: "password", label: "Password", type: "password" },
];

const validate = (name, val) => {
  const value = val.trim();
  const re = /\S+@\S+\.\S+/;
  const validEmail = re.test(value);
  switch (name) {
    case "email":
      return value.length < 1 ? `Enter your email address` : !validEmail ? "Please enter a valid email" : "";

    case "password":
      return value.length < 1 ? "Enter your password" : "";

    default:
      return "";
  }
};

function Login({ formHeader }) {
  const { fields, validation, handleChange, handleValidation, isSubmitDisabled, setValidation } = useForm(formFields, validate);
  const [showPassword, toggleShowPassword] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const errors = useSelector((state) => state.auth.errors);

  useEffect(() => {
    formFields.forEach((f) => {
      errors?.[f.item] &&
        setValidation((st) => ({
          ...st,
          [f.item]: errors[f.item],
        }));
    });
  }, [errors, setValidation]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isSubmitDisabled()) return;

    dispatch(startAuth({ fields }));
  };

  return (
    <Paper sx={{ py: 4, px: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {formHeader}
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        {formFields.map((f, i) => {
          return (
            <TextField
              key={i}
              margin="normal"
              id={f.item}
              value={fields[f.item]}
              onChange={handleChange}
              onBlur={handleValidation}
              className={clsx(classes.textField, classes[f.item])}
              label={f.label}
              type={f.type === "password" && showPassword ? "text" : f.type}
              name={f.item}
              fullWidth
              error={validation[f.item].length > 0}
              helperText={validation[f.item]}
              {...(f.type === "password" && {
                InputProps: {
                  endAdornment: (
                    <PasswordVisibility showPassword={showPassword} onClick={() => toggleShowPassword((st) => !st)} />
                  ),
                },
              })}
            />
          );
        })}
        <div className={classes.formActions}>
          <Button disabled={isSubmitDisabled()} type="submit" variant="contained" color="primary">
            Log in
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default Login;
