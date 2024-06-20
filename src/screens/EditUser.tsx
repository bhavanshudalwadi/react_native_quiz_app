import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, ButtonText, Image, Input, InputField, ScrollView } from '@gluestack-ui/themed'
import { launchImageLibrary as _launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { useUserContext } from '../contexts/userContextProvider';
let launchImageLibrary = _launchImageLibrary;

const PersonLogo = require('../assets/person-logo.png');

const EditUser = ({ navigation, route }: any) => {
    const [image, setImage] = useState<string>(PersonLogo);
    const [username, setUsername] = useState<string>("");
    const [phone_no, setPhoneNo] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { mode, id } = route.params
    const { insertUser, getUserDetails, user, setUser, updateUserDetails } = useUserContext()

    const handleAddUser = () => {
        if (insertUser({ username, phone_no, password, image })) {
            setImage(PersonLogo)
            setUsername("")
            setPhoneNo("")
            setPassword("")
        }
    }

    const handleUpdateUser = () => {
        if (updateUserDetails({ username, phone_no, password, image })) {
            navigation.goBack();
            setUser({
                id: -1,
                username: '',
                phone_no: '',
                password: '',
                image: PersonLogo
            })
        }
    }

    const openImagePicker = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, handleResponse);
    };

    const handleResponse = (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image picker error: ', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          setImage(imageUri);
        }
    };

    useEffect(() => {
        if(mode && mode != 'ADD') {
            getUserDetails(id)
        }else {
            setUser({
                id: -1,
                username: '',
                phone_no: '',
                password: '',
                image: PersonLogo
            })
        }
    }, [mode])

    useEffect(() => {
        setImage(user.image)
        setUsername(user.username)
        setPhoneNo(user.phone_no)
        setPassword(user.password)
    }, [user])

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.formImage} onPress={openImagePicker} disabled={mode && mode === 'VIEW'}>
                {image === PersonLogo ?
                <Image style={styles.formImage} alt='Upload Profile Image' source={image} />
                :<Image style={styles.formImage} alt='Upload Profile Image' source={{ uri: image }} />
                }
            </TouchableOpacity>
            <Input
                style={styles.formInput}
                size="lg"
                marginTop="$16"
                isReadOnly={mode && mode === 'VIEW'}
            >
                <InputField placeholder="Username" value={username} onChangeText={setUsername} />
            </Input>
            <Input
                style={styles.formInput}
                size="lg"
                marginTop="$6"
                isReadOnly={mode && mode === 'VIEW'}
            >
                <InputField placeholder="Phone No" value={phone_no} onChangeText={setPhoneNo} />
            </Input>
            <Input
                style={styles.formInput}
                size="lg"
                marginTop="$6"
                isReadOnly={mode && mode === 'VIEW'}
            >
                <InputField placeholder="Password" value={password} onChangeText={setPassword} />
            </Input>
            {mode && mode === 'ADD' ? 
                <Button rounded="$full" alignSelf='center' w="$2/3" mt="$20" onPress={handleAddUser}>
                    <ButtonText>Add User</ButtonText>
                </Button>
            :<></>}
            {mode && mode === 'EDIT' ? 
                <Button rounded="$full" alignSelf='center' w="$2/3" mt="$20" onPress={handleUpdateUser}>
                    <ButtonText>Update User</ButtonText>
                </Button>
            :<></>}
        </ScrollView>
    )
}

export default EditUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 32
    },
    formImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    formInput: {
        backgroundColor: '#fff'
    }
})