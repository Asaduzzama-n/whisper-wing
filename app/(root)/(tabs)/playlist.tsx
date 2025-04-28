import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PlaylistCard from '@/components/PlaylistCard'
import { dummyStories } from '@/lib/story.data'



export default function Playlist() {
  const handlePlay = (storyId: string) => {
    // Handle play functionality
    console.log('Playing story:', storyId)
  }

  return (
    <SafeAreaView className="flex-1 bg-purple-200">
      <ScrollView className="flex-1 px-4">
        <Text className="text-2xl font-bold text-purple-800 my-6">
          Your Stories
        </Text>
        
        {dummyStories.map(story => (
          <PlaylistCard
            key={story.id}
            story={story}
            onPlay={() => handlePlay(story.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}