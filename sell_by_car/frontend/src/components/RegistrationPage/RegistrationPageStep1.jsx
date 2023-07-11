import React from "react";
import "./registrationPage.css";
import MainRegistrationContainer from "./MainRegistrationContainer/MainRegistrationContainer.jsx";
import RegistrationForm from "./RegistrationForm/RegistrationForm.jsx";
import RegistrationInput from "./RegistrationInput/RegistrationInput.jsx";
import Button from "../Button.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useData } from "../RegistrationDataContext/RegistrationDataContext.js";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
  birthDate: yup.string().required("Birth date is a required field"),
});

function RegistrationPageStep1() {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      birthDate: data?.birthDate,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    navigate("/authentification/step2");
    setValues(data);
  };
  return (
    <MainRegistrationContainer>
      <div className="formWrapper">
        <p className="formTitle">Step 1</p>
        <RegistrationForm onSubmit={handleSubmit(onSubmit)}>
          <div className="mainInputWrapper">
            <RegistrationInput
              id="firstName"
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
              label="First Name"
              placeholder="First Name"
              {...register("firstName")}
            />
            <RegistrationInput
              id="lastName"
              name="lastName"
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              label="Last Name"
              placeholder="Last Name"
              {...register("lastName")}
            />
            <RegistrationInput
              id="birthDate"
              name="birthDate"
              type="date"
              error={!!errors.birthDate}
              helperText={errors?.birthDate?.message}
              label="Birth Date"
              placeholder="Birth Date"
              {...register("birthDate")}
            />
          </div>
          <Button className="glow-on-hover" type="submit">
            Next
          </Button>
        </RegistrationForm>
      </div>
    </MainRegistrationContainer>
  );
}

export default RegistrationPageStep1;
