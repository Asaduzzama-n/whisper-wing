import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { WIDTH } from '@/constants/screen';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Story } from '@/lib/story.data';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StoryCardProps {
  story: Story;
  index: number;
}

const CARD_WIDTH = (WIDTH / 2) - 24;

const StoryCard: React.FC<StoryCardProps> = ({ story, index }) => {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={{ width: CARD_WIDTH }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-purple-100 rounded-2xl p-2"
        style={{ height: CARD_WIDTH * 1.3 }}
      >
        <View className="flex-1 gap-y-5">
          <View>
            <Image
            className=' w-full rounded-lg'
            resizeMode='cover'
            source={story.image}
            ></Image>
          </View>
          <View>
            <Text className="text-md font-semibold text-purple-800" numberOfLines={2}>
              {story.title}
            </Text>
          </View>
            <Text className="text-xs font-medium text-gray-800">{story.language}</Text>
          <View className=" flex-row justify-between">
           <View className='flex-row gap-x-2'>
            <MaterialCommunityIcons name='clock-outline' size={16}></MaterialCommunityIcons>
            <Text className="text-xs text-purple-500">{Math.floor(story.duration / 60)} min</Text>
           </View>
            <Text className="text-xs text-purple-500">{story.totalPlayCount} plays</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default StoryCard;
