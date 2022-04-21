import { useState } from 'react';


export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return tokenString;
      };

    const [token, setToken] = useState(getToken());

    const saveToken = (tokenString) => {
      sessionStorage.setItem('token', tokenString);
      if(tokenString) {
      setToken(tokenString);
      } else if (!tokenString) {
        setToken(null);
      };
    };
  return {
    setToken: saveToken,
    token
  };
};
