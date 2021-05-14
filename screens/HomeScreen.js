import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import PostCard from "../components/PostCard";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {AuthContext} from '../navigation/AuthProvider';

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

const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
      .collection("posts")
      .orderBy("postTime", "desc")
      .get()
      .then((querySnapshot) => {
        //  console.log("Total Posts: ", querySnapshot.size);

        querySnapshot.forEach(doc => {
          const {pos, postImg, userId, postTime, likes, comments} = doc.data();
          list.push({
            id: doc.id,
            userId,
            userName: "Yash Vardhan",
            userImg: "https://yashvardhanportfolio.netlify.app/static/media/yash%20(2).ca34b90c.jpg",
            postTime: postTime,
            pos,
            postImg,
            liked: false,
            likes,
            comments
          });
        })
      })

      setPosts(list);

      if(loading) {
        setLoading(false);
      }

      console.log("Posts: ", list);

    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {

    fetchPosts();
  }, []);

  useEffect(() => {
     fetchPosts();
     setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId) => {
    Alert.alert(
      "Delete this post",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed!"),
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => deletePost(postId)
        }
      ],
      {cancelable: false}
    );
  }

  const deletePost = (postId) => {
    console.log("current post id: ", postId);

    firestore()
    .collection("posts")
    .doc(postId)
    .get()
    .then((documentSnapshot) => {
      if(documentSnapshot.exists) {
        const {postImg} = documentSnapshot.data();

        if(postImg !== null) {
          const storageRef = storage().refFromURL(postImg);
          const imageRef = storage().ref(storageRef.fullPath);

          imageRef
          .delete()
          .then(() => {
            console.log(`${postImg} has been deleted`)
            deleteFirestoreData(postId);
            setDeleted(true);
          })
          .catch((e) => {
            console.log("Error while deleting image", e);
          })
        } else {
          deleteFirestoreData(postId);
        }
      }
    })
  }

  const deleteFirestoreData = (postId) => {
     firestore()
     .collection("posts")
     .doc(postId)
     .delete()
     .then(() => {
       Alert.alert(
         "Post Deleted",
         "Your post has been deleted successfully!"
       );
     })
     .catch(e => console.log("Error deleting post", e))
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? 
        <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: "center"}}>
        <SkeletonPlaceholder>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
            <View style={{ marginLeft: 20 }}>
              <View style={{ width: 120, height: 20, borderRadius: 4 }} />
              <View
                style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
              />
            </View>
          </View>
          <View style={{marginTop: 10, marginBottom: 30}}>
            <View style={{width: 300, height: 20, borderRadius: 4}} />
            <View style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}} />
            <View style={{marginTop: 6, width: 340, height: 200, borderRadius: 4}} />
          </View>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: 60, height: 60, borderRadius: 50 }} />
            <View style={{ marginLeft: 20 }}>
              <View style={{ width: 120, height: 20, borderRadius: 4 }} />
              <View
                style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
              />
            </View>
          </View>
          <View style={{marginTop: 10, marginBottom: 30}}>
            <View style={{width: 300, height: 20, borderRadius: 4}} />
            <View style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}} />
            <View style={{marginTop: 6, width: 340, height: 200, borderRadius: 4}} />
          </View>
        </SkeletonPlaceholder>
        </ScrollView> 
        : 
      <Container>
        <FlatList 
         data={posts}
         renderItem={({item}) => <PostCard item={item} onDelete={handleDelete} 
           onPress={() => navigation.navigate("HomeProfile", {userId: item.userId})}
         />}
         keyExtractor={item => item.id} 
         showsVerticalScrollIndicator={false}
         />
     </Container> }
    </SafeAreaView>    
  );
};

export default HomeScreen;
