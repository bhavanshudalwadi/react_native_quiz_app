import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DefaultUser from './user/DefaultUser';
import Quiz from './user/Quiz';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { useAuthContext } from '../contexts/authProvider';

const Stack = createStackNavigator();

const Home = ({ navigation }: any) => {
  const { logoutUser } = useAuthContext()

  const handleLogout = () => {
    logoutUser(navigation)
  }

  return (
    <Stack.Navigator initialRouteName='Default'>
      <Stack.Screen
        name='Default'
        component={DefaultUser}
        options={{
          headerTitle: "Quiz App",
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
      <Stack.Screen name='Quiz' component={Quiz} />
    </Stack.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 16
  }
})