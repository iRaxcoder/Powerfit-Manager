import React from "react";
import { useSelect } from 'react-select-search';

export const CustomInput = ({ register, errors, errorMsg, name, ...rest }) => {
  return (
    <>
      <input {...register(name, { required: true })} {...rest} />
      {errors[name] && <p className="text-danger">{errorMsg}</p>}
    </>
  );
}

export const SingleCustomInput = ({ ...rest }) => {
  return (
    <>
      <input {...rest} />
    </>
  );
}

export const CustomSelect = ({ register, options, focus, name, ...rest }) => {
  return (
    <>
      <select {...register(name)} {...rest}>
        {options.map(value => (
          <option key={value[focus]} value={value[focus]}>
            {value[focus]}
          </option>
        ))}
      </select>
    </>
  );
}

export const LiveCustomSelect = ({ options, value,search}) => {
  const [snapshot, valueProps, optionProps] = useSelect({
    options,
    value,
    search
  });
  return (
       <>
      <div>
        <button className="btn" {...valueProps}>{snapshot.displayValue}</button>
        {snapshot.focus && (
          <ul>
            {snapshot.options.map((option) => (
              <li key={option.ID_CLIENTE}>
                <button className="btn" {...optionProps} value={option.ID_CLIENTE}>{option.NOMBRE_CLIENTE +' '+ option.APELLIDOS}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
