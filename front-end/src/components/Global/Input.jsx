import Icon from "./Icon";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      className,
      label,
      icon,
      isError,
      error_message,
      inputProps,
      register,
      name,
      ...rest
    },
    ref
  ) => {
    return (
      <div {...rest} className={`group ` + className}>
        <label
          className={` group-focus-within:text-primaryColor text-fs-300 ${
            isError ? "text-mainRed" : "text-thirdColor"
          }`}
        >
          {label}
        </label>
        <div
          className={`bg-secondBgColor 
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline ${
                  label && "mt-1"
                } 
                ${
                  isError
                    ? "outline-mainRed outline bg-white"
                    : "bg-secondBgColor "
                } `}
        >
          {icon && (
            <Icon
              icon={icon}
              className={`shrink-0 group-focus-within:stroke-primaryColor ${
                isError ? "stroke-mainRed" : "stroke-thirdColor "
              }`}
            />
          )}
          {name ? (
            <input
              {...register(name)}
              {...inputProps}
              className={`disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor 
                ${
                  isError
                    ? "text-mainRed caret-mainRed"
                    : "text-secondaryColor caret-secondaryColor"
                }`}
            />
          ) : (
            <input
              {...inputProps}
              className={`disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor 
                ${
                  isError
                    ? "text-mainRed caret-mainRed"
                    : "text-secondaryColor caret-secondaryColor"
                }`}
            />
          )}
        </div>
        {isError && <p className="pt-2 text-mainRed"> {error_message}</p>}
      </div>
    );
  }
);

export default Input;
