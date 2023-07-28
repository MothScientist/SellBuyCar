import React from "react";
import "./registrationPage.css";
import MainRegistrationContainer from "./MainRegistrationContainer/MainRegistrationContainer.jsx";
import RegistrationForm from "./RegistrationForm/RegistrationForm.jsx";
import RegistrationInput from "./RegistrationInput/RegistrationInput.jsx";
import Button from "../Button.jsx";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RegistrationCheckbox from "./RegistrationCheckbox/RegistrationCheckbox.jsx";
import parsePhoneNumber from "libphonenumber-js";
import { useData } from "../RegistrationDataContext/RegistrationDataContext.js";
import RegistrationPhoneInput from "./RegistrationInput/RegistrationPhoneInput.jsx";
import "./RegistrationInput/registrationInput.css";

const regex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(regex, "Email should have correct format")
    .required("Email is a required field"),
  phoneNumber: yup
    .string()
    .matches(
      /^\+\d{1,4}\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/,
      "Phone should have correct format"
    ),
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
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: data?.email,
      hasPhone: data?.hasPhone,
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
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <RegistrationPhoneInput
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.phoneNumber}
                    />
                    {errors.phoneNumber && (
                      <span className="inputErrorHelperText">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                  </>
                )}
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
