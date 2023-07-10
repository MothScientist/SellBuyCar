import React from "react";
import "./mainRegistrationContainer.css";
function MainRegistrationContainer({ children, ...props }) {
  return (
    <div className="registrationMainWrapper">
      <div className="registrationMainContainer" {...props}>
        {children}
      </div>
    </div>
  );
}

export default MainRegistrationContainer;
