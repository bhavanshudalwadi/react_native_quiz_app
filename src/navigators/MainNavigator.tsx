import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from '../contexts/authProvider';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Admin from '../screens/Admin';
import Login from '../screens/Login';
import Report from '../screens/Report';
import EditUser from '../screens/EditUser';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

                <Stack.Screen name="EditUser" component={EditUser} options={{ headerTitle: 'User Details' }} />
                <Stack.Screen name="Report" component={Report} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator