import React, {useState, useEffect, useRef} from 'react';

import {View, FlatList, Dimensions} from 'react-native';

import axios from 'axios';

import Post from '../../components/Post/Post';

const home = () =>{

  const ref = useRef(null);

  const [page, nextPage] = useState(0);

  const [posts, newPosts] = useState([]);

  useEffect(() => {
    const resp = async ()=>{
      const a = await axios.post('https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed',{'page': page})
      newPosts(a.data)
      ref.current.scrollToIndex({index: 0});
    }
    resp();

  }, [page]);

  useEffect(() => {
    const resp = async ()=>{
      const a = await axios.post('https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed',{'page': 0})
      newPosts(a.data)
      ref.current.scrollToIndex({index: 0});
    }
    resp();
  }, []);

  return (
    <View>
      <FlatList
          data= {posts}
          ref = {ref}
          renderItem = {({item}) => <Post videoSrc = {item["playbackUrl"]}/>}
          showVerticalScrollIndicator = {false}
          snapToInterval = {Dimensions.get('window').height}
          snapToAlignment = {'start'}
          decelerationRate = {'fast'}
          keyExtractor = {item => item.id}
          onEndReached = {() => nextPage(page+1)}
      />
    </View>
  );
};

export default home;
