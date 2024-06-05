import { useLocation } from 'react-router-dom';

const useQuery = () => {
    // console.log("QueryParams",useLocation().search)
    return new URLSearchParams(useLocation().search);
   
}

export default useQuery