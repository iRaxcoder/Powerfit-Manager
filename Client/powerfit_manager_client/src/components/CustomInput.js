import React from "react";
import AsyncSelect from 'react-select/async'
import makeAnimated from 'react-select/animated'

const animatedComponent= makeAnimated();

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

export const LiveCustomSelect = ({options,data, onChange, placeHolder, loadOptions}) => {
  return (
    <AsyncSelect
      value={data}
      onInputChange={onChange}
      placeholder={placeHolder}
      loadOptions={loadOptions}
      components={animatedComponent}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: '#558b23',
          primary: 'black',
        },
      })}
    />
  );
}


