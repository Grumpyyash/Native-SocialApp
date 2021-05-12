import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from "../components/PostCard";

import { Container } from "../styles/FeedStyles";

const Posts = [
  {
    id: "1",
    userName: "Yash Vardhan",
    userImg: require("../assets/users/user-1.jpg"),
    postTime: "4 mins ago",
    post: "Hey there, this is my test for a post of my special app in react native",
    postImg: require("../assets/posts/post-img-1.jpg"),
    liked: true,
    likes: "14",
    comments: "5"
  },
  {
    id: "2",
    userName: "Yash Vardhan",
    userImg: require("../assets/users/user-2.jpg"),
    postTime: "4 mins ago",
    post: "Hey there, this is my test for a post of my special app in react native",
    postImg: require("../assets/posts/post-img-2.jpg"),
    liked: true,
    likes: "1",
    comments: "0"
  },
  {
    id: "3",
    userName: "Yash Vardhan",
    userImg: require("../assets/users/user-3.jpg"),
    postTime: "4 mins ago",
    post: "Hey there, this is my test for a post of my special app in react native",
    postImg: "none",
    liked: false,
    likes: "0",
    comments: "0"
  },
  {
    id: "4",
    userName: "Yash Vardhan",
    userImg: require("../assets/users/user-4.jpg"),
    postTime: "4 mins ago",
    post: "Hey there, this is my test for a post of my special app in react native",
    postImg: require("../assets/posts/post-img-4.jpg"),
    liked: true,
    likes: "12",
    comments: "3"
  }
]

const HomeScreen = () => {
  return (
    <Container>
        <FlatList 
         data={Posts}
         renderItem={({item}) => <PostCard item={item} />}
         keyExtractor={item => item.id} 
         showsVerticalScrollIndicator={false}
         />
    </Container>
  );
};

export default HomeScreen;
