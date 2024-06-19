import { Button, ButtonText, View } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { useUserContext } from '../../contexts/userContextProvider';

const DefaultUser = ({ navigation }: any) => {
    const [user_id, setUserId] = useState(null)

    const { resetQuiz } = useUserContext()

    const getUserId = async () => {
        if(AsyncStorage.getItem('user') != null) {
            setUserId(JSON.parse(await AsyncStorage.getItem('user') ?? "").id)
        }
    }

    const handleReset = async () => {
        if(user_id) {
            resetQuiz(user_id)
            await AsyncStorage.removeItem('attempted_questions')
            await AsyncStorage.removeItem('all_attempted')
        }
    }

    const handleStartQuiz = async () => {
        if(await AsyncStorage.getItem('all_attempted') != null) {
            Alert.alert('Info', 'You have attempted all questions.\nPlease reset quiz to play again.')
        }else {
            navigation.navigate('Quiz')
        }
    }

    useEffect(() => {
        getUserId();
    }, [])

    return (
        <View style={styles.container}>
            <Button rounded="$full" w="$2/3" onPress={() => navigation.navigate('EditUser', { mode: 'VIEW', id: user_id })}>
                <ButtonText>My Profile</ButtonText>
            </Button>
            <Button rounded="$full" w="$2/3" mt="$5" onPress={handleStartQuiz}>
                <ButtonText>Start Quiz</ButtonText>
            </Button>
            <Button rounded="$full" w="$2/3" mt="$5" onPress={() => navigation.navigate('Report', { mode: 'VIEW', id: user_id })}>
                <ButtonText>View Report</ButtonText>
            </Button>
            <Button rounded="$full" w="$2/3" mt="$5" onPress={handleReset}>
                <ButtonText>Reset Quiz</ButtonText>
            </Button>
        </View>
    )
}

export default DefaultUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    }
})