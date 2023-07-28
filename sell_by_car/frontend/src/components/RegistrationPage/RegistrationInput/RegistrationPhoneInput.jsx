// import React, { forwardRef, useState } from "react";
// import classNames from "classnames";
// import "./registrationInput.css";
// import InputMask from "react-input-mask";
// import { countriesData } from "./countriesData.js";

// const RegistrationPhoneInput = forwardRef(function RegistrationPhoneInput(
//   {
//     placeholder,
//     onChange,
//     label,
//     type,
//     error,
//     helperText,
//     className,
//     ...props
//   },
//   ref
// ) {
//   const [selectedCountry, setSelectedCountry] = useState(countriesData[0]);
//   const handleCountryChange = (e) => {
//     const countryCode = e.target.value;
//     const country = countriesData.find((c) => c.code === countryCode);
//     setSelectedCountry(country);
//   };
//   let classes = classNames("registrationPhoneInput", className);
//   if (error) {
//     classes += " inputError";
//   }
//   return (
//     <div className="inputWrapper">
//       <select onChange={handleCountryChange} value={selectedCountry.code}>
//         {countriesData.map((country) => (
//           <option key={country.code} value={country.code}>
//             {country.name} ({country.code})
//           </option>
//         ))}
//       </select>
//       <InputMask
//         mask="+999 99 999 99"
//         value={""} // Установка начального значения для маски
//         maskChar={null}
//         ref={ref}
//         {...props}
//       >
//         {() => (
//           <input
//             type={type}
//             placeholder={placeholder}
//             label={label}
//             className={classes}

//           />
//         )}
//       </InputMask>
//       {error && <span className="inputErrorHelperText">{helperText}</span>}
//     </div>
//   );
// });

// export default RegistrationPhoneInput;
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Select from "react-select";
import { countriesData } from "./countriesData.js";
import "./registrationInput.css";
const RegistrationPhoneInput = ({ value, onChange, error }) => {
  const [selectedCountry, setSelectedCountry] = useState(countriesData[0]);

  const handleCountrySelect = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  useEffect(() => {
    if (selectedCountry) {
      onChange(selectedCountry.value);
    }
  }, [selectedCountry, onChange]);

  const getMaskByCountry = (countryCode) => {
    if (!countryCode) return "+9999 999 999 99 99";
    return countryCode + " 999 999 99 99";
  };

  let classes = "registrationInput";
  if (error) {
    classes += " inputError";
  }

  return (
    <div className="inputWrapper">
      <Select
        className="registrationSelectCounties"
        options={countriesData}
        value={selectedCountry}
        onChange={handleCountrySelect}
        placeholder="Select a country"
      />
      <InputMask
        className={classes}
        mask={getMaskByCountry(selectedCountry ? selectedCountry.value : null)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          selectedCountry
            ? `Enter phone number (${selectedCountry.value})`
            : "Enter phone number"
        }
      />
    </div>
  );
};

export default RegistrationPhoneInput;
