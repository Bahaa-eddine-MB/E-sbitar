import Lottie from 'lottie-react';
import not_found from '../assets/not-found.json';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie
        animationData={not_found}
        loop={true}
        className="h-2/3"
      />
    </div>
  );
};

export default NotFound;
