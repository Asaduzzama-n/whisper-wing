import { View, FlatList } from 'react-native';
import React from 'react';

import { WIDTH } from '@/constants/screen';
import { dummyStories } from '@/lib/story.data';
import StoryCard from './storyCard';

const CARD_WIDTH = (WIDTH / 2) - 24;

const FeaturedStory = () => {
  return (
    <View className="flex-1 bg-purple-200 p-4">
      <FlatList
        data={dummyStories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item, index }) => (
          <StoryCard story={item} index={index} />
        )}
      />
    </View>
  );
};

export default FeaturedStory;
