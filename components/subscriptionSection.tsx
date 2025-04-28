import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { getImage } from '@/constants/image'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const SubscriptionSection = () => {
  return (
    <View className='relative overflow-hidden'>
      <Image 
      //@ts-ignore
      source={getImage.s3} className='w-full rounded-2xl h-54 '></Image>
      <View className='absolute top-4 left-4 right-4'>
        <Text className='text-white font-semibold text-3xl flex-wrap'>
          Unlock Unlimited Stories & Songs
        </Text>
        <Text className='text-white  text-lg flex-wrap'>
          Explore Beautiful Stories & Sooting Songs For Your Little One
        </Text>
        <TouchableOpacity
        
        >

            <MaterialCommunityIcons name='arrow-right' className='absolute right-0 -bottom-8 bg-purple-200/60 p-2 rounded-full' size={26} color='white'></MaterialCommunityIcons>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SubscriptionSection