import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useAuth = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated;
};

export default useAuth;