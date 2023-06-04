import Lottie from 'lottie-react'
import loading from '../../assets/loading.json'

const LoadingAnimation = (props) => {
  return <Lottie {...props} animationData={loading} loop={true} />
}

export default LoadingAnimation
