import { Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, ButtonText, HStack, Text, Textarea, View } from '@gluestack-ui/themed'
import { Input } from '@gluestack-ui/themed'
import { InputField } from '@gluestack-ui/themed'
import { TextareaInput } from '@gluestack-ui/themed'
import { createStackNavigator } from '@react-navigation/stack'
import DefaultAdmin from './admin/DefaultAdmin'
import AddUser from './EditUser'
import ViewUsers from './admin/UserList'
import AddQuestion from './admin/AddQuestion'
import ViewReport from './Report'
import { AdminContextProvider } from '../contexts/adminContextProvider'
import UserList from './admin/UserList'
import { useAuthContext } from '../contexts/authProvider'

const Stack = createStackNavigator();

const Admin = ({ navigation }: any) => {
    const { logoutUser } = useAuthContext()

    const handleLogout = () => {
        logoutUser(navigation)
    }

    return (
        <AdminContextProvider>
            <Stack.Navigator initialRouteName='Default'>
                <Stack.Screen
                    name='Default'
                    component={DefaultAdmin}
                    options={{
                        headerTitle: "Dashboard",
                        headerRight: () => (
                            <Button
                                size="sm"
                                variant="outline"
                                action="negative"
                                mr="$3"
                                onPress={handleLogout}
                            >
                                <ButtonText>Logout</ButtonText>
                            </Button>
                        ),
                    }}
                />
                <Stack.Screen name='UserList' component={UserList} options={{ headerTitle: "Users" }} />
                <Stack.Screen name='AddQuestion' component={AddQuestion} options={{ headerTitle: "Add Question" }} />
            </Stack.Navigator>
        </AdminContextProvider>
    )
}

export default Admin

const styles = StyleSheet.create({

})