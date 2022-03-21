import { useState, useCallback } from "react";
//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    let validationMessage = target.validationMessage;

    if (
      (!value.match(/\d\d\/\d{4}/gi) ||
        value.length !== 7 ||
        target.validity.valueMissing) &&
      name === "ExpDate"
    ) {
      validationMessage = "Not correct ExpDate";
    }
    if (!(String(value).split("").length === 16) && name === "CardNumber") {
      validationMessage = "Not correct CardNumber";
    }
    if ((value < 1 || target.validity.valueMissing) && name === "Amount") {
      validationMessage = "Not correct Amount";
    }
    if (
      (!(String(value).split("").length === 3) ||
        target.validity.valueMissing) &&
      name === "Cvv"
    ) {
      validationMessage = "Not correct Cvv";
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return [values, handleChange, errors, isValid, resetForm];
}
