import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text, Button, FlatList
} from 'react-native';
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
  } from '../styles/MessageStyles';

const Messages = [
    {
        id: "1",
        userName: "Yash Vardhan",
        userImg: require("../assets/users/user-1.jpg"),
        messageTime: "4 mins ago",
        messageText: "Hey there! This is my test message to check if everything is working"
    },
    {
        id: "2",
        userName: "John Doe",
        userImg: require("../assets/users/user-3.jpg"),
        messageTime: "4 mins ago",
        messageText: "Hey there! This is my test message to check if everything is working"
    },
    {
        id: "3",
        userName: "Johny Day",
        userImg: require("../assets/users/user-2.jpg"),
        messageTime: "4 mins ago",
        messageText: "Hey there! This is my test message to check if everything is working"
    },
    {
        id: "4",
        userName: "Seth Rollins",
        userImg: require("../assets/users/user-5.jpg"),
        messageTime: "4 mins ago",
        messageText: "Hey there! This is my test message to check if everything is working"
    },
    {
        id: "5",
        userName: "Roman Reigns",
        userImg: require("../assets/users/user-6.jpg"),
        messageTime: "4 mins ago",
        messageText: "Hey there! This is my test message to check if everything is working"
    },
]

const MessagesScreen = ({ navigation }) => {
    return (
        <Container>
        <FlatList 
          data={Messages}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};


export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});