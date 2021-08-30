import { useState } from 'react';

export default function useEventState(initialState, valueFromEvent = event => event.target.value) {
  const [state, setState] = useState(initialState);

  const onChange = event => {
    return setState(valueFromEvent(event));
  }

  return [state, onChange, setState];
}

export const numberOrEmptyStringFromEvent = event => {
  const { value } = event.target;
  const number = parseInt(value, 10);
  if (Number.isNaN(number)) {
    return '';
  }

  return number;
}

