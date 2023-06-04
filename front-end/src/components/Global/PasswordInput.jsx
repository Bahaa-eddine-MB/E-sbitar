import { useState, forwardRef } from "react";
import Icon from "./Icon";

const PasswordInput = forwardRef(
  (
    {
      className,
      label,
      isError,
      error_message,
      inputProps,
      register,
      name,
      ...rest
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => {
      setVisible((visible) => !visible);
    };
    return (
      <div {...rest} className={`group ` + className}>
        <label
          className={` group-focus-within:text-primaryColor  text-fs-300
            ${isError ? "text-mainRed" : "text-thirdColor"}`}
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
                }`}
        >
          <Icon
            icon="key"
            className={`group-focus-within:stroke-primaryColor
                shrink-0 ${isError ? "stroke-mainRed" : "stroke-thirdColor"}`}
          />
          {name ? (
            <input
              {...register(name)}
              autoComplete="new-password"
              type={visible ? "text" : "password"}
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
              autoComplete="new-password"
              type={visible ? "text" : "password"}
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

          <Icon
            icon={visible ? "eye-slash" : "eye"}
            className={`transition-all cursor-pointer group-focus-within:stroke-primaryColor
                shrink-0 hover:stroke-primaryColor ${
                  isError ? "stroke-mainRed" : "stroke-thirdColor"
                }`}
            onClick={toggleVisible}
          />
        </div>
        {isError && <p className="pt-2 text-mainRed"> {error_message}</p>}
      </div>
    );
  }
);

export default PasswordInput;
