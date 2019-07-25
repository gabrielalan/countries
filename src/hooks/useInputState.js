import { useState } from 'react';

const createValidatorsReducer = value => (errorsList, validator) => {
  const result = validator(value);

  if (!!result) {
    errorsList.push(result);
  }

  return errorsList;
}

export default function useInputState(initialValue, validators = []) {
  const checkErrors = (value) => validators.reduce(createValidatorsReducer(value), []);

  const initialState = {
    value: initialValue,
    errors: checkErrors(initialValue),
    changed: false,
  };

  const [state, setState] = useState(initialState);

  const setValue = (value) =>
    setState({ value, changed: true, errors: checkErrors(value) });

  return [state, setValue];
}