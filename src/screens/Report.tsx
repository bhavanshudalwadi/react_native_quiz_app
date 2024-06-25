import { FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/userContextProvider'
import { Alert, AlertIcon, CheckCircleIcon, VStack, View, CloseCircleIcon, InfoIcon, Heading, Image, Text, AlertText } from '@gluestack-ui/themed'
import { HelpCircleIcon } from '@gluestack-ui/themed'
import { Icon } from '@gluestack-ui/themed'

const Report = ({ navigation, route }: any) => {
  const [report, setReport] = useState<any[]>()
  const { getResultDetails, results, getQuestionList, questions, setResults } = useUserContext()
  const { id } = route.params

  useEffect(() => {
    getQuestionList()
    if (id && id != '') {
      getResultDetails(id)
    }
    return () => { setResults([]); setReport([]); }
  }, [])

  useEffect(() => {
    if(questions.length > 0) {
      setReport(
        questions.filter((q: any) => {
          let result: any = results.find((r: any) => r.que_id === q.id);
          q.status = result!=undefined?result.status:2;
          return true;
        }
      ))
    }
  }, [results, questions])

  const icons = [CloseCircleIcon, CheckCircleIcon, InfoIcon];
  const actions: ("muted" | "success" | "error" | "warning" | "info")[] = ["error", "success", "muted"];

  return (
    <>
      <FlatList
        contentContainerStyle={styles.container}
        data={report}
        renderItem={({ item, index }) =>
          <Alert action={actions[item.status] ?? "muted"} rounded="$2xl" m="$2" elevation="$1">
            <AlertIcon as={icons[item.status] ?? InfoIcon} size="xl" mr="$3" />
            <VStack space="xs">
              <AlertText size='sm'>Question {index+1}</AlertText>
              <AlertText fontWeight="$bold" size='md' w="$80">{item.que}</AlertText>
            </VStack>
          </Alert>
        }
        keyExtractor={item => item.id}
      />
      {questions && questions.length <= 0 ?
        <View style={styles.notFoundContainer}>
          <Icon as={HelpCircleIcon} width={180} height={180} />
          <Heading size='lg' mt="$3">No Questions Found</Heading>
        </View>
      :<></>}
    </>
  )
}

export default Report

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  notFoundContainer: {
    top: '30%',
    left: '27%',
    position: 'absolute',
    alignItems: 'center'
  },
  imgNotFound: {
    width: 200,
    height: 200
  }
})