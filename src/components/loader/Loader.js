import { useLoader } from '../../hooks/useLoader';
import './Loader.css';

const Loader = () => {
  const { loading } = useLoader();
  if (!loading) {
    return null;
  }
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;