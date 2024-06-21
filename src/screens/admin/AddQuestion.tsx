import { Button, ButtonText, KeyboardAvoidingView } from '@gluestack-ui/themed';
import { ChevronDownIcon, Icon, Input, InputField, InputIcon, InputSlot, ScrollView, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text, Textarea, TextareaInput, View } from '@gluestack-ui/themed'
import React, { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { useAdminContext } from '../../contexts/adminContextProvider';

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [option_1, setOption1] = useState("");
  const [option_2, setOption2] = useState("");
  const [option_3, setOption3] = useState("");
  const [option_4, setOption4] = useState("");
  const [answer, setAnswer] = useState<any>(null);

  const { insertQuestion } = useAdminContext();

  const handleAddQuestion = () => {
    if(question.trim() != '' && option_1.trim() != '' && option_2.trim() != '' && option_3.trim() != '' && option_4.trim() != '' && answer != null && answer.trim() != '') {
      if (insertQuestion({ question: question.trim(), option_1: option_1.trim(), option_2: option_2.trim(), option_3: option_3.trim(), option_4: option_4.trim(), answer: answer.trim() })) {
        setQuestion("")
        setOption1("")
        setOption2("")
        setOption3("")
        setOption4("")
        setAnswer(null)
      }
    }else {
      Alert.alert('Invalid Inputs', 'Please enter valid question details')
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text size='lg'>Add Question</Text>
        <Textarea
          style={styles.formInput}
          size="lg"
          marginTop="$3"
        >
          <TextareaInput placeholder="Q. e.g. Who is the currant prime minister of india ?" value={question} onChangeText={setQuestion} />
        </Textarea>
        <Input
          style={styles.formInput}
          size="lg"
          marginTop="$6"
        >
          <InputSlot pl="$3">
            <Text size='lg'>A.</Text>
          </InputSlot>
          <InputField placeholder="e.g. Narendra Modi" value={option_1} onChange={(e) => setAnswer(null)} onChangeText={setOption1} />
        </Input>
        <Input
          style={styles.formInput}
          size="lg"
          marginTop="$4"
        >
          <InputSlot pl="$3">
            <Text size='lg'>B.</Text>
          </InputSlot>
          <InputField placeholder="e.g. Indira Gandhi" value={option_2} onChange={(e) => setAnswer(null)} onChangeText={setOption2} />
        </Input>
        <Input
          style={styles.formInput}
          size="lg"
          marginTop="$4"
        >
          <InputSlot pl="$3">
            <Text size='lg'>C.</Text>
          </InputSlot>
          <InputField placeholder="e.g. Atal Bihari Bajpay" value={option_3} onChange={(e) => setAnswer(null)} onChangeText={setOption3} />
        </Input>
        <Input
          style={styles.formInput}
          size="lg"
          marginTop="$4"
        >
          <InputSlot pl="$3">
            <Text size='lg'>D.</Text>
          </InputSlot>
          <InputField placeholder="e.g. Manmohan Singh" value={option_4} onChange={(e) => setAnswer(null)} onChangeText={setOption4} />
        </Input>
        <Select marginTop="$6" style={styles.formInput} selectedValue={answer} onValueChange={val => setAnswer(val)}>
          <SelectTrigger
            variant="outline"
            size="lg"
            disabled={
              option_1 === '' || option_2 === '' || option_3 === '' || option_4 === ''
            }
          >
            <SelectIcon width={40} height={30} ml={10}>
              <Text size='lg'>Ans.</Text>
            </SelectIcon>
            <SelectInput
              placeholder="Select Answer"
              // value={answer}
              onChangeText={setAnswer}
            />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label={option_1} value={option_1} />
              <SelectItem label={option_2} value={option_2} />
              <SelectItem label={option_3} value={option_3} />
              <SelectItem label={option_4} value={option_4} />
            </SelectContent>
          </SelectPortal>
        </Select>
        {/* <KeyboardAvoidingView behavior='position'> */}
        <Button rounded="$full" alignSelf='center' w="$2/3" mt="$10" onPress={handleAddQuestion}>
          <ButtonText>Add Question</ButtonText>
        </Button>
        {/* </KeyboardAvoidingView> */}
      </View>
    </ScrollView>
  )
}

export default AddQuestion

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
  formInput: {
    backgroundColor: '#fff'
  }
})