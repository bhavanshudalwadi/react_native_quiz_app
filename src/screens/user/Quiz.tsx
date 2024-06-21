import { Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, ButtonText, Card, Heading, HelpCircleIcon, Icon, View, ScrollView } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { useUserContext } from '../../contexts/userContextProvider'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Quiz = ({ navigation }: any) => {
    const [user_id, setUserId] = useState(null)
    const [selectedAns, setSelectedAns] = useState<any>(null)
    const [currentQuestion, setCurrantQuestion] = useState<any>(null)

    const { getQuestionList, questions, addResultEntry } = useUserContext()

    const getUserId = async () => {
        if (await AsyncStorage.getItem('user') != null) {
            setUserId(JSON.parse(await AsyncStorage.getItem('user') ?? "").id)
        }
    }

    const initAttemptedQue = async () => {
        if (await AsyncStorage.getItem('attempted_questions') === null) {
            await AsyncStorage.setItem('attempted_questions', "[]")
        }
    }

    useEffect(() => {
        initAttemptedQue()
        getUserId()
        getQuestionList()

        return () => {
            setCurrantQuestion(null)
            setSelectedAns(null)
        }
    }, [])

    useEffect(() => {
        if (questions.length > 0 && user_id != null) {
            setNextQuestion()
        }
    }, [questions, user_id])

    const handleNext = async () => {
        if (user_id) {
            addResultEntry(currentQuestion.id, user_id, (selectedAns === currentQuestion.ans ? 1 : 0))
            setSelectedAns(null)
            await addQuestionToAttempted(currentQuestion.id)
            setNextQuestion()
        }
    }

    const handleAnswerSelect = (ans: string) => {
        setSelectedAns(ans)
    }

    const addQuestionToAttempted = async (que_id: number) => {
        let que_list = [];
        if (await AsyncStorage.getItem('attempted_questions') != null) {
            que_list = JSON.parse(await AsyncStorage.getItem('attempted_questions') ?? "");
            que_list.push({ user_id, que_id });
        } else {
            que_list.push({ user_id, que_id });
        }
        await AsyncStorage.setItem('attempted_questions', JSON.stringify(que_list));
    }

    const setNextQuestion = async () => {
        let flag = 0;
        if (await AsyncStorage.getItem('attempted_questions') != null && user_id != null) {
            for (let i = 0; i < questions.length; i++) {
                if (JSON.parse(await AsyncStorage.getItem('attempted_questions') ?? "").find((e: any) => e.que_id === questions[i].id && e.user_id === user_id) === undefined) {
                    setCurrantQuestion(questions[i])
                    flag = 1
                    break;
                }
            }
        }
        if (flag === 0) {
            setCurrantQuestion(null)
            navigation.navigate('Default', { mode: "VIEW_REPORT" })
        }
    }

    return (
        <>
            {currentQuestion === null ?
                <View style={styles.notFoundContainer}>
                    <Icon as={HelpCircleIcon} width={180} height={180} />
                    <Heading size='lg' mt="$3">No Questions Found</Heading>
                </View>
                :
                <ScrollView flex={1}>
                    <View style={styles.container}>
                        <Card size="md" variant="elevated" m="$1">
                            <Text size="md">Question</Text>
                            <Heading mb="$1" size="md">
                                {currentQuestion.que}
                            </Heading>
                        </Card>
                        <TouchableOpacity onPress={() => handleAnswerSelect(currentQuestion.option_1)} disabled={selectedAns != null}>
                            <Card style={selectedAns ? (currentQuestion.ans === currentQuestion.option_1 ? styles.right : styles.wrong) : styles.default} p="$0" variant="elevated" m="$1" mt="$8">
                                <View style={selectedAns && selectedAns === currentQuestion.option_1 ? styles.selected : styles.defaultSelected} m="$0" p="$2">
                                    <Heading mb="$1" size="lg">
                                        A. {currentQuestion.option_1}
                                    </Heading>
                                </View>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAnswerSelect(currentQuestion.option_2)} disabled={selectedAns != null}>
                            <Card style={selectedAns ? (currentQuestion.ans === currentQuestion.option_2 ? styles.right : styles.wrong) : styles.default} p="$0" variant="elevated" m="$1" mt="$3">
                                <View style={selectedAns && selectedAns === currentQuestion.option_2 ? styles.selected : styles.defaultSelected} m="$0" p="$2">
                                    <Heading mb="$1" size="lg">
                                        B. {currentQuestion.option_2}
                                    </Heading>
                                </View>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAnswerSelect(currentQuestion.option_3)} disabled={selectedAns != null}>
                            <Card style={selectedAns ? (currentQuestion.ans === currentQuestion.option_3 ? styles.right : styles.wrong) : styles.default} p="$0" variant="elevated" m="$1" mt="$3">
                                <View style={selectedAns && selectedAns === currentQuestion.option_3 ? styles.selected : styles.defaultSelected} m="$0" p="$2">
                                    <Heading mb="$1" size="lg">
                                        C. {currentQuestion.option_3}
                                    </Heading>
                                </View>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAnswerSelect(currentQuestion.option_4)} disabled={selectedAns != null}>
                            <Card style={selectedAns ? (currentQuestion.ans === currentQuestion.option_4 ? styles.right : styles.wrong) : styles.default} p="$0" variant="elevated" m="$1" mt="$3">
                                <View style={selectedAns && selectedAns === currentQuestion.option_4 ? styles.selected : styles.defaultSelected} m="$0" p="$2">
                                    <Heading mb="$1" size="lg">
                                        D. {currentQuestion.option_4}
                                    </Heading>
                                </View>
                            </Card>
                        </TouchableOpacity>
                        {selectedAns ?
                            <Button rounded="$full" alignSelf='center' w="$2/3" mt="$8" onPress={handleNext}>
                                <ButtonText>Next</ButtonText>
                            </Button>
                            : <></>}
                    </View>
                </ScrollView>
            }
        </>
    )
}

export default Quiz

const styles = StyleSheet.create({
    container: {
        margin: 32,
        flex: 1
    },
    right: {
        borderWidth: 2,
        borderColor: 'green'
    },
    wrong: {
        borderWidth: 2,
        borderColor: 'red'
    },
    default: {
        borderWidth: 2,
        borderColor: 'transparent'
    },
    selected: {
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 6,
        margin: 2
    },
    defaultSelected: {
        margin: 2,
        borderWidth: 2,
        borderColor: 'transparent'
    },
    notFoundContainer: {
        top: '25%',
        left: '25%',
        position: 'absolute',
        alignItems: 'center'
    },
    imgNotFound: {
        width: 200,
        height: 200
    }
})