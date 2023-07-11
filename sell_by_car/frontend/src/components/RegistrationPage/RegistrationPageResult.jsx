import React, { useEffect } from "react";
import "./registrationPage.css";
import { Link } from "react-router-dom";
import { useData } from "../RegistrationDataContext/RegistrationDataContext.js";
import ResultField from "./ResultField/ResultField.jsx";
import Button from "../Button.jsx";


function RegistrationPageResult() {
  const { data } = useData();
  const entries = data ? Object.entries(data) : "";


  const onSubmit = async () => {
    const formData = new FormData();

    entries.forEach(entry => {
        formData.append(entry[0], entry[1]);
    })

    const res = await fetch("http://AddresssEpta", {
        method: "POST",
        body: formData
    });

    if(res.status === 200){
        // Swal.fire("Yeah", "Data has posted")
        console.log("All good")
    }
  }
  return (
    <>
      {entries && entries.map((entry) => {
        return <ResultField key={entry[0]} name={entry[0]} value={entry[1].toString()} />;
      })}

      <Link to="/authentification">Start over</Link>
      <Button onClick={()=> {console.log("Hello durak")}}>Submit</Button>
    </>
  );
}

export default RegistrationPageResult;
