import { View, Text, Alert } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import { addQuestion, getUsers } from '../db/databaseService'

const adminContext = createContext<any>(null)

const AdminContextProvider = ({ children }: any) => {
  const [users, setUsers] = useState<any[]>([])

  const getUserList = async () => {
    const result = await getUsers()
    if (result && result.length > 0) {
      let userList = [];
      for (let i = 0; i < result[0].rows.length; i++) {
        userList.push(result[0].rows.item(i))
      }
      setUsers(userList);
    } else {
      Alert.alert('Failed', 'Failed to get user list')
    }
  }

  const insertQuestion = async (que: any) => {
    const result = await addQuestion(que.question, que.option_1, que.option_2, que.option_3, que.option_4, que.answer)
    if (result && result.length > 0 && result[0].rowsAffected > 0) {
      Alert.alert('Success', 'Question added successful')
      return true
    } else {
      Alert.alert('Failed', 'Failed to add question')
      return false
    }
  }

  return (
    <adminContext.Provider value={{ getUserList, users, insertQuestion }}>
      {children}
    </adminContext.Provider>
  )
}

const useAdminContext = () => {
  if (!adminContext) {
    console.error("adminContext only can be used within AdminContextProvider")
    return null;
  }
  return useContext(adminContext);
}

export { adminContext, AdminContextProvider, useAdminContext }