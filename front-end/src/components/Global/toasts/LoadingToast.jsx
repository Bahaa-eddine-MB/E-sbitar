import './index.css'
import LoadingAnimation from '../LoadingAnimation'

const LoadingToast = () => {
  return (
    <div className='fixed top-8 right-6 w-[28.125rem] flex p-1 rounded-lg shadow-[0_0_8px_rgba(0,0,0,.25)] 
        min-h-[5rem] bg-white z-50'>
      <div className='rounded-[4px] bg-primaryColor mr-3 w-[5px]'></div>
      <LoadingAnimation className='mr-5 self-center w-6 aspect-square scale-[5.5]' />
      <div className='text-fs-300 py-2 self-center grow'>
        <p className='text-primaryColor font-semibold'>Loading</p>
        <p className='text-thirdColor capitalize'>Please wait...</p>
      </div>
    </div>
  )
}

export default LoadingToast
