import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  ActivityIndicator,
} from 'react-native';
import { InputField, InputWrapper, AddImage, SubmitBtn, SubmitBtnText, StatusWrapper } from '../styles/AddPost';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const AddPostScreen = () => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    const uploadUri = image;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    const extension = fileName.split(".").pop();
    const name = fileName.split(".").slice(0, -1).join(".");
    fileName = name + Date.now() + "." + extension;

    setUploading(true);
    setTransferred(0);

    const task = storage().ref(fileName).putFile(uploadUri);

    try {
      await task;

      task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        setTransferred(
          Math.round(takeSnapShot.bytesTransferred / takeSnapShot.totalBytes) * 100
        );
      });

      setUploading(false);
      Alert.alert(
        "Image Uploaded!",
        "Your image has been successfully uploaded to the cloud"
      );
    } catch(e){
      console.log(e);
    }
    setImage(null);
  }

    return (
        <View style={styles.container}>
          <InputWrapper>
          {image != null ? <AddImage source={{uri: image}} /> : null}

            <InputField  
              placeholder="What's on your mind?"
              multiline
              numberOfLines={4}
            />
            {uploading ? (
              <StatusWrapper>
                <Text>{transferred} % Completed</Text>
                <ActivityIndicator size="large" color="#0000ff" />
              </StatusWrapper>
            ) : (
              <SubmitBtn onPress={submitPost}>
               <SubmitBtnText>Post</SubmitBtnText>
            </SubmitBtn>
            )}
            
          </InputWrapper>
          <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={ takePhotoFromCamera }>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
        </View>
    );
};


export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});