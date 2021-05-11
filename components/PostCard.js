import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';

const PostCard = ({item}) => {
    return (
        <Card>
        <UserInfo>
          <UserImg source={require("../assets/users/user-3.jpg")} />
          <UserInfoText>
            <UserName>Yash Vardhan</UserName>
            <PostTime>4 hours ago</PostTime>
          </UserInfoText>          
        </UserInfo>
        <PostText>Hello! This is a sample text</PostText>
        <Divider />
        <InteractionWrapper>
          <Interaction>
            <Ionicons name="heart-outline" size={25} />
            <InteractionText>Like</InteractionText>
          </Interaction>
          <Interaction>
            <Ionicons name="md-chatbubble-outline" size={25} />
            <InteractionText>Comment</InteractionText>
          </Interaction>
        </InteractionWrapper>
      </Card>
    );
};

export default PostCard;