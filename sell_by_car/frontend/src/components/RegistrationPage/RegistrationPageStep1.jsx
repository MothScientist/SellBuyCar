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

function isLeapYear(year) {
  if (year % 4 != 0) {
    return false;
  } else if (year % 100 != 0) {
    return true;
  } else if (year % 400 != 0) {
    return false;
  } else {
    return true;
  }
}

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
  birthDate: yup
    .string()

    .max(new Date(), "Date cannot be in the future")
    .test(
      "valid-day-in-february",
      "Incorrect day in february",
      function (value) {
        const userDate = new Date(value);
        const month = userDate.getMonth();
        const day = userDate.getDate();
        //Is it february
        if (month === 2) {
          if (day > 29 || (day == 29 && !isLeapYear(userDate.getFullYear())))
            return false;
        }
        return true;
      }
    )
    .matches(
      /^((19|20)\d{2})[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/,
      "Incorrect date format"
    )
    .test(
      "over-16-and-under-120-yo",
      "You must be over 16 and under 120 y.o",
      function (value) {
        const currDate = new Date();
        const userDate = new Date(value);
        const yearDiff = currDate.getFullYear() - userDate.getFullYear();
        const monthDiff = currDate.getMonth() - userDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && currDate.getDate() < userDate.getDate())
        ) {
          return yearDiff - 1 >= 16 && yearDiff <= 120;
        }
        return yearDiff >= 16 && yearDiff <= 120;
      }
    )
    .required("Birth date is a required field"),
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
