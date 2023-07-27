import React, { useEffect } from "react";
import "./registrationPage.css";
import { Link, useNavigate  } from "react-router-dom";
import { useData } from "../RegistrationDataContext/RegistrationDataContext.js";
import ResultField from "./ResultField/ResultField.jsx";
import MainRegistrationContainer from "./MainRegistrationContainer/MainRegistrationContainer.jsx";
import Button from "../Button.jsx";

function RegistrationPageResult() {
  const { data } = useData();
  const navigate = useNavigate();
  const entries = data ? Object.entries(data) : "";
  
  const onSubmit = async () => {
    const phoneNumberFormated = data?.phoneNumber ? data?.phoneNumber.split(" ").join("") : null;

    const res = await fetch("/main/add_user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: data?.firstName,
        last_name: data?.lastName,
        email: data?.email,
        phone_number: phoneNumberFormated,
        DOB: data?.birthDate.split("-").reverse().join("."),
      }),
    });

    if (res.status === 200) {
      return navigate("/")
    }
    return null;
  };
  return (
    <>
      <MainRegistrationContainer>
        <div className="formWrapper">
          <p className="formTitle">Results</p>
          <div className="mainResultWrapper">
            {entries &&
              entries.map((entry) => {
                return (
                  <ResultField
                    key={entry[0]}
                    name={entry[0]}
                    value={entry[1]?.toString()}
                  />
                );
              })}
          </div>
          <Button href="/authentification" className="fillAgainLink">
            Fill again
          </Button>
          <Button className="glow-on-hover" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </MainRegistrationContainer>
    </>
  );
}

export default RegistrationPageResult;
