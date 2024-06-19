import React, { useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { launchImageLibrary as _launchImageLibrary, launchCamera as _launchCamera, ImageLibraryOptions } from 'react-native-image-picker';
let launchImageLibrary = _launchImageLibrary;
let launchCamera = _launchCamera;

function ImagePickerDemo(): React.JSX.Element {
  const [selectedImage, setSelectedImage] = useState("file:///data/user/0/com.quiz_app/cache/rn_image_picker_lib_temp_0997b783-9a61-44ae-a319-837b01831e91.png");

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleResponse);
  };

  const handleResponse = (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      console.log(imageUri);
      setSelectedImage(imageUri);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="#fff"
      />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
        )}
        <View style={{ marginTop: 20 }}>
          <Button title="Choose from Device" onPress={openImagePicker} />
        </View>
        <View style={{ marginTop: 20, marginBottom: 50 }}>
          <Button title="Open Camera" onPress={handleCameraLaunch} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default ImagePickerDemo;
