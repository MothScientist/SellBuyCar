import React, { forwardRef } from "react";
import classNames from "classnames";
import "./registrationCheckbox.css";

const RegistrationCheckbox = forwardRef(function RegistrationCheckbox(
  { label, id, className, ...props },
  ref
) {
  let classes = classNames("registrationCheckbox", className);
  return (
    <>
      <input type="checkbox" className={classes} ref={ref} {...props} />
      <label for={id}>{label}</label>
    </>
  );
});

export default RegistrationCheckbox;
