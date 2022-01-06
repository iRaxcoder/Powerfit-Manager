import React from "react";



export function CustomInput ({register, errors, errorMsg, name, ...rest}){
  return (
    <>
    <input {...register(name, {required: true })} {...rest} />
    {errors[name] && <p className="text-danger">{errorMsg}</p>}
    </>
  );
}

export function CustomSelect ({register, options, name, ...rest}) {
   return (
    <select {...register(name)} {...rest}>
      {options.map(value => (
        <option key={value} value={value}>
            {value}
        </option>
      ))}
    </select>
   );
}