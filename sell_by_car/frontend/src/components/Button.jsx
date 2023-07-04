import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

function Button({ children, href, onClick, className, disabled, active }) {
  const classes = classNames(className, { active });

  const onClickAction = (e) => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onClick(e);
    }
  };

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  } else {
    return (
      <button onClick={onClickAction} className={classes} disabled={disabled}>
        {children}
      </button>
    );
  }
}

export default Button;
