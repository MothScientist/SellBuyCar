import React from "react";
import "./resultField.css"
function ResultField({name, value}) {
    return ( <div>
        {name} : {value}
    </div> );
}

export default ResultField;