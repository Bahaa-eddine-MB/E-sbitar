import { useState } from "react";
import Icon from "./Icon";

const DropDownMenu = ({
  icon,
  title,
  list,
  label,
  className,
  iconColor,
  handleChange,
  isEdit,
  ...rest
}) => {
  const [text, setText] = useState(title);
  const [isOpne, setOpen] = useState(false);
  return (
    <div {...rest} className="text-thirdColor text-fs-300 relative">
      <div className="pb-2 ">{label}</div>
      <div className="bg-secondBgColor rounded-[10px]">
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpen(!isOpne);
          }}
          className={
            `text-fs-400   hover:opacity-60
         py-[14px] rounded-[10px]  min-w-[22.5rem] text-left flex px-[10px] justify-between ` +
            className
          }
        >
          <div className="flex gap-2">
            {icon && (
              <Icon
                icon={icon}
                className={
                  `shrink-0 group-focus-within:stroke-primaryColor ` + iconColor
                }
              />
            )}
            <span>{text}</span>
          </div>
          {isEdit && (
            <Icon
              icon={"arrow-down"}
              className={`shrink-0 group-focus-within:stroke-primaryColor ${iconColor} ${
                isOpne && "rotate-180"
              } transition-all duration-300`}
            />
          )}
        </button>
      </div>

      <div
        className={`shadow-md bg-secondBgColor absolute top-[90px] rounded-[10px] w-full grid transition-all z-10 duration-300 
                ${
                  isOpne && isEdit
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr] opacity-0 hidden "
                }`}
      >
        <div className="list-container max-h-52 scrollbar-thin scrollbar-thumb-rounded-custom scrollbar-thumb-primaryColor  scrollbar-track-bgColor  overflow-auto">
          <ul className="flex flex-col hover:opacity-100 text-fs-400">
            {list.map((element, index) => (
              <li
                onClick={() => {
                  setText(element);
                  setOpen(false);
                  handleChange(element);
                }}
                key={index}
                className="hover:bg-bgColor  w-full px-[15px] py-[14px] rounded-[10px] hover:cursor-pointer"
              >
                {element}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
