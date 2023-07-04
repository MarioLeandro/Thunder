import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import CustomToast from '../components/CustomToast';
import { isAuthenticated, logout as unauthenticate, authenticate } from '../services/auth';

import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    async function loadStoragedData() {
      api.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error?.response?.status === 401) {
            console.log('deslogado');
            logout();
            setUser(null);
            navigation.navigate('Login');
          }
          return error;
        }
      );

      let { user } = await isAuthenticated();

      user && setUser(JSON.parse(user));

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const logout = () => {
    unauthenticate();
    setUser(null);
  };

  const login = async (login, password) => {
    const { user, failed, message } = await authenticate({
      login,
      password,
    });
    if (failed || !user) {
      toast.show({
        placement: 'bottom',
        render: () => {
          return (
            <CustomToast
              description={
                typeof message === 'string' ? message : 'Ocorreu um erro durante a autenticação'
              }
              title={'Erro'}
              variant={'solid'}
              duration={1000}
              status={'danger'}
              placement={'top'}
            />
          );
        },
      });
      return;
    }

    console.log(user);
    setUser(user);
    toast.show({
      placement: 'bottom',
      render: () => {
        return (
          <CustomToast
            description={'Você conseguiu se conectar a ' + user.name}
            title={'Sucesso'}
            variant={'solid'}
            duration={1000}
            status={'success'}
          />
        );
      },
    });
    return;
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, signed: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
