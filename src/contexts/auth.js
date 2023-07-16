import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import CustomToast from '../components/CustomToast';
import {
  isAuthenticated,
  logout as unauthenticate,
  authenticate,
  recoverUser,
} from '../services/auth';

import { useToast } from 'native-base';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [levelUp, setLevelUp] = useState(false);

  const toast = useToast();
  /*   const navigation = useNavigation();
   */
  useEffect(() => {
    async function loadStoragedData() {
      api.interceptors.response.use((response) => {
        if (response?.status === 401) {
          toast.show({
            placement: 'bottom',
            render: () => {
              return (
                <CustomToast
                  description={'Sua sessão expirou'}
                  title={'Erro'}
                  variant={'solid'}
                  duration={1000}
                  status={'danger'}
                />
              );
            },
          });
          return logout();
        }
        return response;
      });

      let { token } = await isAuthenticated();

      if (token) {
        recoverUser()
          .then((response) => {
            if (response.error) {
              logout();
            }
            setUser(response);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        logout();
        setLoading(false);
      }
    }

    if (levelUp) setLevelUp(false);

    loadStoragedData();
  }, [levelUp]);

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
            />
          );
        },
      });
      return;
    }

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
    <AuthContext.Provider value={{ login, logout, user, signed: !!user, loading, setLevelUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
