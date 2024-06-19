import { Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ArrowRightIcon, Button, ButtonIcon, ButtonText, HStack, ImageBackground, Input, InputField, InputIcon, InputSlot, Link, LinkText, LockIcon, MailIcon, StatusBar, Text, View } from '@gluestack-ui/themed'
import { useAuthContext } from '../contexts/authProvider'

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuthContext();

  const handleLogin = () => {
    if(username.trim() != '' && password.trim() != '') {
      login({ username: username.trim(), password: password.trim() }, navigation);
    }else {
      Alert.alert('Invalid Inputs', 'Please enter valid login details')
    }
  }

  return (
    <>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="#eee"
      />
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.title}>Login</Text>
          <Text>Please sign in to continue.</Text>
          <Input
            variant="outline"
            size="lg"
            mt="$16"
          >
            <InputSlot pl="$3">
              <InputIcon as={MailIcon} />
            </InputSlot>
            <InputField placeholder="USERNAME" value={username} onChangeText={setUsername}/>
          </Input>
          <Input
            variant="outline"
            size="lg"
            mt="$6"
          >
            <InputSlot pl="$3">
              <InputIcon as={LockIcon} />
            </InputSlot>
            <InputField placeholder="PASSWORD" type='password' value={password} onChangeText={setPassword} />
          </Input>
          <View alignSelf='flex-end' mt="$10">
            <Button rounded="$full" onPress={handleLogin}>
              <ButtonText mr="$3">LOGIN</ButtonText>
              <ButtonIcon as={ArrowRightIcon} />
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 8
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center'
  }
})