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
import RegistrationCheckbox from "./RegistrationCheckbox/RegistrationCheckbox.jsx";
import parsePhoneNumber from "libphonenumber-js";
import { useData } from "../RegistrationDataContext/RegistrationDataContext.js";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is a required field"),
});

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumber(value);
  if (!phoneNumber) {
    return value;
  }

  return phoneNumber.formatInternational();
};

function RegistrationPageStep2() {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: data?.email,
      hasPhone: data?.hasPhone,
      phoneNumber: data?.phoneNumber,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const hasPhone = watch("hasPhone");

  const onSubmit = (data) => {
    navigate("/authentification/result");
    setValues(data);
  };
  return (
    <MainRegistrationContainer>
      <div className="formWrapper">
        <p className="formTitle">Step 2</p>
        <RegistrationForm onSubmit={handleSubmit(onSubmit)}>
          <div className="mainInputWrapper">
            <RegistrationInput
              id="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label="Email"
              placeholder="Email"
              {...register("email")}
            />
            <RegistrationCheckbox
              id="hasPhone"
              label="Do you have a phone?"
              {...register("hasPhone")}
              defaultValues={data?.hasPhone}
              defaultChecked={data?.hasPhone}
            />
            {hasPhone && (
              <RegistrationInput
                id="phoneNumber"
                label="phoneNumber"
                placeholder="Phone Number"
                type="tel"
                {...register("phoneNumber")}
                onChange={(e) => {
                  e.target.value = normalizePhoneNumber(e.target.value);
                }}
              />
            )}
          </div>
          <Button className="glow-on-hover" type="submit">
            Next
          </Button>
        </RegistrationForm>
      </div>
    </MainRegistrationContainer>
  );
}

export default RegistrationPageStep2;
