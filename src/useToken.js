import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
      }

    const [token, setToken] = useState(getToken());
    const [error, setError] = useState("");

    const saveToken = (userToken) => {
      sessionStorage.setItem('token', JSON.stringify(userToken));
      if(userToken.token === "You are logged in!") {
      setToken(userToken.token);
      } else {
        setError("Verifica credetiale!!")
      }
    }
    console.log("token::", token);
  return {
    setToken: saveToken,
    token
  }
}