import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export async function authenticate({ login, password }) {
  let { data, status } = await api.post('/login', {
    email: login,
    password: password,
  });

  if (status === 200) {
    const { token, user } = data;

    await AsyncStorage.setItem('@ThunderAuth:token', token);
    await AsyncStorage.setItem('@ThunderAuth:user', JSON.stringify(user));

    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return { failed: (status ?? 400) > 300, ...data };
}

export async function isAuthenticated() {
  const user = await AsyncStorage.getItem('@ThunderAuth:user');
  const token = await AsyncStorage.getItem('@ThunderAuth:token');

  console.log(user, token);

  if (user && token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    return {
      token,
      user,
    };
  }

  return false;
}

export async function recoverUser() {
  const { data, status } = await api.get('/user/profile');

  await AsyncStorage.setItem('@ThunderAuth:user', JSON.stringify(data));

  return data;
}

export async function logout() {
  await AsyncStorage.removeItem('@ThunderAuth:token');
  await AsyncStorage.removeItem('@ThunderAuth:user');
}
