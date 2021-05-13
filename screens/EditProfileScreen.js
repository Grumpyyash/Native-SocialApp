import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';

const EditProfileScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
        <Text></Text>
        <Button 
            title="Click Here!"
            onPress={() => alert("Button Clicked!")}
        />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  }
});