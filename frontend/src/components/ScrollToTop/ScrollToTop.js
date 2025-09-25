import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children, setUpdateProduct }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
 

    // if (setUpdateProduct) {
    //   setUpdateProduct(null);
    // }
    // setUpdateProduct(null);
  }, [pathname]);

  return children || null;
};

export default ScrollToTop;