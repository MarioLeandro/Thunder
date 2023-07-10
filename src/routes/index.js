import React, { useContext } from 'react';
import AuthContext from '../contexts/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { View } from 'react-native';
import { Spinner } from 'native-base';

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner color="violet.500" />
      </View>
    );
  }

  console.log(loading, signed);

  return <>{signed ? <AppRoutes /> : <AuthRoutes />}</>;
};
export default Routes;
