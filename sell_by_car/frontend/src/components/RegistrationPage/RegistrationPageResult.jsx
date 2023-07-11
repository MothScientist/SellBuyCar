import React, { useEffect } from "react";
import "./registrationPage.css";
import { Link } from "react-router-dom";
import { useData } from "../RegistrationDataContext/RegistrationDataContext.js";
import ResultField from "./ResultField/ResultField.jsx";
import MainRegistrationContainer from "./MainRegistrationContainer/MainRegistrationContainer.jsx";
import Button from "../Button.jsx";

function RegistrationPageResult() {
  const { data } = useData();
  if (!data?.hasPhone && data?.phoneNumber) {
    data.phoneNumber = "";
  }
  const entries = data ? Object.entries(data) : "";

  const onSubmit = async () => {
    const formData = new FormData();

    entries.forEach((entry) => {
      // console.log(entry[0]);
      if (entry[0] === "firstName") {
        formData.append(entry[0], entry[1]);
      }
      if (entry[0] === "lastName") {
        formData.append(entry[0], entry[1]);
      }
      if (entry[0] === "email") {
        formData.append(entry[0], entry[1]);
      }

      // formData.append(entry[0], entry[1]);
    });
    
    const res = await fetch("/main/add_user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
      }),
    });

    if (res.status === 200) {
      // Swal.fire("Yeah", "Data has posted")
      console.log("All good");
    }
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
