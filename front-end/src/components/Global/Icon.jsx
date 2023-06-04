import icons from '../../assets/icons.svg'

const Icon = ({ icon, className, ...rest }) => {
  return (
    <svg {...rest} className={`aspect-square w-6 ` + className}>
      <use xlinkHref={icons + '#' + icon}></use>
    </svg>
  )
}

export default Icon
