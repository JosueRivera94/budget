import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import AuthContext from './auth-context';

const AuthProvider = (props) => {
  const [cookies, removeCookie] = useCookies(['auth_token']);
  const [currentUser, setCurrentUser] = useState({});
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  const register = (nombre, email, pass) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              email,
              pass,
              nombre,
            }),
          }
        );
        const data = await response.json();
        setCurrentUser(data.data[0]);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const login = (email, pass) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              email,
              pass,
            }),
          }
        );
        const data = await response.json();
        setCurrentUser(data.data[0]);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      setCurrentUser({});
      removeCookie('auth_token');
      resolve();
    });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      if (
        Object.entries(currentUser).length === 0 &&
        cookies.auth_token &&
        cookies.auth_token !== 'undefined'
      ) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND}/user_info`,
            {
              method: 'Post',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.auth_token}`,
              },
              credentials: 'include',
            }
          );
          const data = await response.json();
          setCurrentUser(data.data[0]);
        } catch (error) {
          console.log(error);
        }
      }
      setLoadingUserInfo(false);
    };
    getUserInfo();
  }, []);



  const authContext = {
    currentUser,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {!loadingUserInfo && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;