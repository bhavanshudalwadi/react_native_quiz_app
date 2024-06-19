import { Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, ButtonText, Card, Heading, View } from '@gluestack-ui/themed'
import { Text } from '@gluestack-ui/themed'
import { useUserContext } from '../../contexts/userContextProvider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Quiz = ({ navigation }: any) => {
    const [selectedAns, setSelectedAns] = useState<any>(null)
    const [currentQuestion, setCurrantQuestion] = useState<any>({
        id: -1,
        que: '',
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: '',
        ans: ''
    })

    const { getQuestionList, questions, addResultEntry } = useUserContext()

    useEffect(() => {
        getQuestionList()
    }, [])

    useEffect(() => {
        if (questions.length > 0) {
            setNextQuestion()
        }
    }, [questions])

    const handleNext = async () => {
        let user_id: any = null
        if (await AsyncStorage.getItem('user') != null) {
            user_id = JSON.parse(await AsyncStorage.getItem('user') ?? "").id;
        }
        addResultEntry(currentQuestion.id, user_id, (selectedAns === currentQuestion.ans ? 1 : 0))
        setSelectedAns(null)
        await addQuestionToAttempted(currentQuestion.id)
        setNextQuestion()
        // if (questionNo + 1 === questions.length) {
        //     setQuestionNo(0)
        //     setCurrantQuestion({
        //         id: -1,
        //         que: '',
        //         option_1: '',
        //         option_2: '',
        //         option_3: '',
        //         option_4: '',
        //         ans: ''
        //     })
            
        // } else {
        //     if (questionNo === questions.length) {
        //         setQuestionNo(0)
        //         setCurrantQuestion({
        //             id: -1,
        //             que: '',
        //             option_1: '',
        //             option_2: '',
        //             option_3: '',
        //             option_4: '',
        //             ans: ''
        //         })
        //     } else {
        //         setQuestionNo(questionNo + 1)
        //         setCurrantQuestion(questions[questionNo + 1])
        //     }
        // }
    }

    const handleAnswerSelect = (ans: string) => {
        setSelectedAns(ans)
    }

    const addQuestionToAttempted = async (que_id: number) => {
        let que_list = [];
        if (await AsyncStorage.getItem('attempted_questions') != null) {
            que_list = JSON.parse(await AsyncStorage.getItem('attempted_questions') ?? "");
            que_list.push(que_id);
        } else {
            que_list.push(que_id);
        }
        await AsyncStorage.setItem('attempted_questions', JSON.stringify(que_list));
    }

    const setNextQuestion = async () => {
        let flag = 0;
        if(await AsyncStorage.getItem('attempted_questions') != null) {
            for(let i=0; i<questions.length; i++) {
                if(!JSON.parse(await AsyncStorage.getItem('attempted_questions') ?? "").includes(questions[i].id)) {
                    setCurrantQuestion(questions[i])
                    flag = 1
                    break;
                }
            }
        }else {
            setCurrantQuestion(questions[0])
            flag = 1
        }
        if(flag === 0) {
            Alert.alert('Success', 'Wow!, You have attempted all questions.')
            setCurrantQuestion({
                id: -1,
                que: '',
                option_1: '',
                option_2: '',
                option_3: '',
                option_4: '',
                ans: ''
            })
            AsyncStorage.setItem('all_attempted', 'TRUE', () => navigation.navigate('Report'));
        }
    }

    return (
        <View style={styles.container}>
            <Card size="md" variant="elevated" m="$1">
                <Text size="md">Question</Text>
                <Heading mb="$1" size="md">
                    {currentQuestion.que}
                </Heading>
            </Card>
            <TouchableOpacity onPress={() => handleAnswerSelect(currentQuestion.option_1)}>
                <Card style={selectedAns != null ? (currentQuestion.ans === currentQuestion.option_1 ? styles.right : styles.wrong) : styles.default} size="md" variant="elevated" m="$1" mt="$10">
                    <Heading mb="$1" size="lg">
                        A. {currentQuestion.option_1}
                    </Heading>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAnswerSelect(currentQuestion.option_2)}>
                <Card style={selectedAns ? (currentQuestion.ans === currentQuestion.option_2 ? styles.right : styles.wrong) : styles.default} size="md" variant="elevated" m="$1" mt="$3">
                    <Heading mb="$1" size="lg">
                        B. {currentQuestion.option_2}
                    </Heading>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAnswerSelect(currentQuestion.option_3)}>
                <Card style={selectedAns ? (currentQuestion.ans === currentQuestion.option_3 ? styles.right : styles.wrong) : styles.default} size="md" variant="elevated" m="$1" mt="$3">
                    <Heading mb="$1" size="lg">
                        C. {currentQuestion.option_3}
                    </Heading>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAnswerSelect(currentQuestion.option_4)}>
                <Card style={selectedAns ? (currentQuestion.ans === currentQuestion.option_4 ? styles.right : styles.wrong) : styles.default} size="md" variant="elevated" m="$1" mt="$3">
                    <Heading mb="$1" size="lg">
                        D. {currentQuestion.option_4}
                    </Heading>
                </Card>
            </TouchableOpacity>
            {selectedAns ?
                <Button rounded="$full" alignSelf='center' w="$2/3" mt="$16" onPress={handleNext}>
                    <ButtonText>Next</ButtonText>
                </Button>
                : <></>}
        </View>
    )
}

export default Quiz

const styles = StyleSheet.create({
    container: {
        margin: 32
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
        borderWidth: 0,
    }
})