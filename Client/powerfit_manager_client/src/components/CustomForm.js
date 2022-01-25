import React, {Children, createElement } from "react";
import {useForm} from "react-hook-form"

export default function Form ({ children, onSubmit,...rest}){
  const { register, formState: { errors }, handleSubmit } = useForm();
    return (
           <form  {...rest} noValidate onSubmit={handleSubmit(onSubmit)}>
               {Children.map(children, child => {
              return child.props.name
                ? createElement(child.type, {
                  ...{
                    ...child.props,
                    register: register,
                    key: child.props.name,
                    errors: errors
                  }
                })
                : child;
            })}
           </form>
    );
}