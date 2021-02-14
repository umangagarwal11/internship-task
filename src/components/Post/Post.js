import React, {useState} from 'react';

import {View, Text, TouchableWithoutFeedback} from 'react-native';

import Video from 'react-native-video';
import styles from './styles';



const post = (props) => {

  const [paused, setPaused] = useState(false);

  const onPlayPause = () => {
    setPaused(!paused);
  };

  return (
    <View style = {styles.container}>
      <TouchableWithoutFeedback onPress = {onPlayPause} >
        <Video
          source = {{uri: props.videoSrc}}
          style = {styles.video}
          resizeMode = {'cover'}
          repeat = {true}
          paused = {paused}
        />
      </ TouchableWithoutFeedback>
    </View>
  );
};

export default post;
