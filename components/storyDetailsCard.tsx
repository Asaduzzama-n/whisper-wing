import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { getImage } from '@/constants/image'

const StoryDetailsCard = () => {
  return (
    <View className='px-4 mt-4'>
    <View className='bg-white/80 rounded-2xl overflow-hidden relative'>
      <Image
        //@ts-ignore
        source={getImage.onboardingImage2}
        className='h-56 w-full'
        resizeMode='cover'
      />
      <View className='absolute inset-0 bg-black/40' />
      
      {/* Play Button - Centered */}
      <TouchableOpacity 
        className='absolute inset-0 items-center justify-center'
        activeOpacity={0.8}
      >
        <View className='bg-purple-600 w-16 h-16 rounded-full items-center justify-center shadow-lg'>
          <AntDesign
            name='play' 
            size={30} 
            color="white"
          />
        </View>
      </TouchableOpacity>

      {/* Text Overlay */}
      <View className='absolute bottom-0 left-0 right-0 p-4'>
        <Text className='text-lg font-semibold text-white mb-1'>
          Goodnight Little Stars, Luna Melody
        </Text>
        <Text className='text-sm text-white/80'>
          04:25 Min
        </Text>
      </View>
    </View>
  </View>
  )
}

export default StoryDetailsCard