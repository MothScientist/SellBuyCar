import React from "react";
import "./registrationForm.css";
function RegistrationForm({ children, onSubmit, ...props }) {
  return (
    <form onSubmit={onSubmit} className="registrationForm" noValidate {...props}>
      {children}
    </form>
  );
}

export default RegistrationForm;
