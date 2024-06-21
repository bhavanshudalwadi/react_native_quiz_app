import { View, Text, Alert } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import { loginUser } from '../db/databaseService'
import AsyncStorage from '@react-native-async-storage/async-storage'

const authContext = createContext<any>(null)

const AuthProvider = ({ children }: any) => {

  const login = async (loginDetails: any, navigation: any) => {
    const result = await loginUser(loginDetails.username, loginDetails.password)
    if(result && result.length > 0 && result[0].rows.length > 0) {
      await AsyncStorage.setItem('user', JSON.stringify(result[0].rows.item(0)));
      if(result[0].rows.item(0).username === "admin") {
        navigation.replace("Admin")
      }else {
        navigation.replace("Home")
      }
    }else {
      Alert.alert('Failed', 'Failed to login')
    }
  }

  const logoutUser = async (navigation: any) => {
    await AsyncStorage.removeItem('user', () => {
      // navigation.navigate("Login")
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    })
  }

  return (
    <authContext.Provider value={{ login, logoutUser }}>
      { children }
    </authContext.Provider>
  )
}

const useAuthContext = () => {
  if(!authContext) {
    console.error("authContext only can be used within authProvider")
    return null;
  }
  return useContext(authContext);
}

export { authContext, AuthProvider, useAuthContext }