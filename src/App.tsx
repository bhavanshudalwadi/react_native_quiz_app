import React from 'react'
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { AuthProvider } from './contexts/authProvider';
import { SafeAreaView, StyleSheet } from 'react-native';
import MainNavigator from './navigators/MainNavigator';
import { UserContextProvider } from './contexts/userContextProvider';

function App(): React.JSX.Element {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <UserContextProvider>
          <SafeAreaView style={{flex: 1}}>
            <MainNavigator />
          </SafeAreaView>
        </UserContextProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
