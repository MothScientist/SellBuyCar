import React, { forwardRef } from "react";
import classNames from "classnames";
import "./registrationInput.css";

const RegistrationInput = forwardRef(function RegistrationInput(
  { placeholder, onChange, label, type, error, helperText, className, ...props },
  ref
) {
  let classes = classNames("registrationInput", className);
  if (error) {
    classes += " inputError";
  }
  return (
    <div className="inputWrapper">
      <input
        placeholder={placeholder}
        label={label}
        className={classes}
        ref={ref}
        {...props}
        onChange = {onChange}
      />
      {error && <span className="inputErrorHelperText">{helperText}</span>}
    </div>
  );
});

export default RegistrationInput;
