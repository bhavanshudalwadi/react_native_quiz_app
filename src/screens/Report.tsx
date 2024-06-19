import { FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/userContextProvider'
import { Alert, AlertIcon, CheckCircleIcon, VStack } from '@gluestack-ui/themed'
import { AlertText } from '@gluestack-ui/themed'
import { CloseCircleIcon } from '@gluestack-ui/themed'
import { InfoIcon } from '@gluestack-ui/themed'

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
          console.log(q.id, result);
          q.status = result!=undefined?result.status:2;
          return true;
        }
      ))
    }
  }, [results, questions])

  const icons = [CloseCircleIcon, CheckCircleIcon, InfoIcon];
  const actions: ("muted" | "success" | "error" | "warning" | "info")[] = ["error", "success", "muted"];

  return (
      <FlatList
        style={styles.container}
        data={report}
        renderItem={({ item, index }) =>
          <Alert action={actions[item.status] ?? "info"} rounded="$2xl" m="$2" elevation="$1">
            <AlertIcon as={icons[item.status] ?? InfoIcon} size="xl" mr="$3" />
            <VStack space="xs">
              <AlertText size='sm'>Question {index+1}</AlertText>
              <AlertText fontWeight="$bold" size='md'>{item.que}</AlertText>
            </VStack>
          </Alert>
        }
        keyExtractor={item => item.id}
      />
  )
}

export default Report

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10
  }
})