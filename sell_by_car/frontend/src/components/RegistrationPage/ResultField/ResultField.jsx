import React from "react";
import "./resultField.css";
function ResultField({ name, value }) {
  return (
    <div className="resultField">
      <span>{name}:</span>
      <span>{value}</span>
    </div>
  );
}

export default ResultField;
