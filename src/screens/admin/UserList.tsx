import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import { useAdminContext } from '../../contexts/adminContextProvider'
import { Card, Heading, Icon, SearchIcon } from '@gluestack-ui/themed';
import { useUserContext } from '../../contexts/userContextProvider';
import { Image, Text } from '@gluestack-ui/themed';

const UserList = ({ navigation, route }: any) => {
  const { mode } = route.params
  const { getUserList, users } = useAdminContext();
  const { user } = useUserContext();

  useEffect(() => {
    getUserList();
  }, [user])

  return (
    <>
      <FlatList
        contentContainerStyle={styles.container}
        data={users}
        renderItem={({item}) => 
          <TouchableOpacity onPress={() => navigation.navigate(mode && (mode === 'REPORT'?'Report':'EditUser'), { mode: 'EDIT', id: item.id })}>
            <Card size="md" variant="elevated" m="$2">
              <Heading size="md">
                {item.username}
              </Heading>
            </Card>
          </TouchableOpacity>
        }
        keyExtractor={(item) => item.id}
      />
      {users && users.length <= 0 ?
        <View style={styles.notFoundContainer}>
          <Icon as={SearchIcon} width={180} height={180} />
          <Heading size='lg' mt="$3">No Users Found</Heading>
          <Text mt="$1" size='md'>Add user to get user list.</Text>
        </View>
      :<></>}
    </>
  )
}

export default memo(UserList)

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  notFoundContainer: {
    top: '25%',
    left: '28%',
    position: 'absolute',
    alignItems: 'center'
  },
  imgNotFound: {
    width: 200,
    height: 200
  }
})