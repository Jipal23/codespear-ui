// Logout.js
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Logout = () => {
  const { setLoggedIn } = useAuth();
  const history = useHistory();

  useEffect(() => {
    setLoggedIn(false);            // Clear auth context
    history.push('/');   // Redirect to home page
  }, [setLoggedIn, history]);

  return null;
};

export default Logout;
