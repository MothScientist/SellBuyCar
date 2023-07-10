import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

function Button({ children, type, href, className, disabled, active, ...props}) {
  const classes = classNames(className, { active });

  // const onClickAction = (e) => {
  //   if (disabled) {
  //     e.preventDefault();
  //   } else {
  //     return onClick(e);
  //   }  
  // };

  if (href) {
    return (
      <Link to={href} className={classes} {...props}>
        {children}
      </Link>
    );
  } else {
    return (
      <button type={type} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
}

export default Button;
