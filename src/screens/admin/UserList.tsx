import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import { useAdminContext } from '../../contexts/adminContextProvider'
import { Card, Heading } from '@gluestack-ui/themed';
import { useUserContext } from '../../contexts/userContextProvider';

const UserList = ({ navigation, route }: any) => {
  const { mode } = route.params
  const { getUserList, users } = useAdminContext();
  const { user } = useUserContext();

  useEffect(() => {
    getUserList();
  }, [user])

  return (
      <FlatList
        contentContainerStyle={{marginHorizontal: 16}}
        data={users}
        renderItem={({item}) => 
          <TouchableOpacity onPress={() => navigation.navigate(mode && (mode === 'REPORT'?'Report':'EditUser'), { mode: 'EDIT', id: item.id })}>
            <Card size="md" variant="elevated" mt="$3" m="$1">
              <Heading size="md">
                {item.username}
              </Heading>
            </Card>
          </TouchableOpacity>
        }
        keyExtractor={(item) => item.id}
      />
  )
}

export default memo(UserList)

const styles = StyleSheet.create({})