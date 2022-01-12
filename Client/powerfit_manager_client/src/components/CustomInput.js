import React from "react";


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


