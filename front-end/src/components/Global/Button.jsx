const Button = ({ children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={
        `text-fs-400 text-white bg-primaryColor font-medium
         py-[14px] rounded-[10px] px-10 min-w-[22.5rem] text-center ` +
        className
      }
    >
      {children}
    </button>
  )
}

export default Button
