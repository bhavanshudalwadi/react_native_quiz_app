import { Button, ButtonText, View } from '@gluestack-ui/themed'
import React from 'react'
import { StyleSheet } from 'react-native'

const DefaultAdmin = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Button rounded="$full" w="$2/3" onPress={() => navigation.navigate('EditUser', { mode: 'ADD', id: null })}>
                <ButtonText>Add User</ButtonText>
            </Button>
            <Button rounded="$full" w="$2/3" mt="$5" onPress={() => navigation.navigate('UserList', { mode: 'PROFILE' })}>
                <ButtonText>View User Details</ButtonText>
            </Button>
            <Button rounded="$full" w="$2/3" mt="$5" onPress={() => navigation.navigate('AddQuestion')}>
                <ButtonText>Add Question</ButtonText>
            </Button>
            <Button rounded="$full" w="$2/3" mt="$5" onPress={() => navigation.navigate('UserList', { mode: 'REPORT' })}>
                <ButtonText>View Report</ButtonText>
            </Button>
        </View>
    )
}

export default DefaultAdmin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    }
})