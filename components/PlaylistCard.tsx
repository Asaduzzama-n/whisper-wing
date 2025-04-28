import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons, Feather } from '@expo/vector-icons'

interface PlaylistCardProps {
  story: {
    id: string;
    title: string;
    language: string;
    duration: number; // in seconds
    image:any;
    totalPlayCount: number;
    storyText: string;
    audioFile: string;
  }
  onPlay: () => void
}



const PlaylistCard = ({ story, onPlay }: PlaylistCardProps) => {

  return (
    <TouchableOpacity 
      className="mb-4 overflow-hidden rounded-xl h-32"
      activeOpacity={0.9}
    >
      <ImageBackground
        source={ story.image }
        className="flex-1 "
        imageStyle={{ opacity: 0.9 }}
      >
        <View className="flex-1 bg-black/30 p-4 flex-row justify-between items-center">
          <View className="flex-1 pr-4">
            <Text className="text-white text-lg font-semibold" numberOfLines={1}>
              {story.title}
            </Text>
            <View className="flex-row items-center mt-2">
              <View className="flex-row items-center mr-4">
                <MaterialIcons name="access-time" size={16} color="white" />
                <Text className="text-white ml-1">{story.duration}</Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="eye" size={16} color="white" />
                <Text className="text-white ml-1">
                  {story.totalPlayCount}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            onPress={onPlay}
            className="bg-purple-600 w-12 h-12 rounded-full items-center justify-center"
          >
            <MaterialIcons name="play-arrow" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default PlaylistCard