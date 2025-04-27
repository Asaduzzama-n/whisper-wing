import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import React from 'react';

import { WebView } from 'react-native-webview';

import { Colors } from '@/constants/Colors';
import { getImage } from '@/constants/image';
import AntDesign from '@expo/vector-icons/AntDesign';
import StoryDetailsCard from '@/components/storyDetailsCard';
import FeaturedStory from '@/components/FeaturedStory';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View className='flex-1 bg-purple-200 '>
      {/* Header Section with Avatar and Search */}
      <View className='absolute top-0 left-0 right-0 z-10 py-12 px-6'>
        <View className='flex-row items-center justify-between my-6'>
          <View className='flex-row items-center'>
            <Image 
            //@ts-ignore
              source={getImage.onboardingImage2}
              className='w-16 h-16 rounded-full bg-purple-300'
            />
            <View className='ml-4'>
              <Text className='text-white text-lg'>Welcome, <Text className='text-xl font-semibold text-purple-200'>Luna</Text></Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View className='flex-row items-center justify-between my-5'>
          <View className="relative flex-1 mr-5">
            <TextInput
              keyboardType='web-search'
              placeholder='Search'
              placeholderTextColor={Colors.light.text}
              className='bg-white rounded-full px-6 py-3.5'
            />
            <View className="absolute inset-y-0 right-4 flex items-center justify-center">
              <AntDesign
                name="search1"
                size={20}
                color={Colors.light.text}
              />
            </View>
          </View>
          <TouchableOpacity className='bg-white rounded-full p-2.5 w-14 h-14 items-center justify-center'>
            <Image
              //@ts-ignore
              source={getImage.filter}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Video Preview Section */}
      <View className='flex-1'>
        <View className='w-full aspect-[16/9] overflow-hidden rounded-b-3xl'>
          <WebView
            originWhitelist={['*']}
            source={{ 
              html: `
                <html>
                  <body style="margin:0;padding:0;overflow:hidden;">
                    <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjhvemgzY29obTV2aTEwdmx0em96dnZiODN1d3BybjR2MDVudjhzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/33hWI6WFquLsyEe7mX/giphy.gif" 
                      style="width:100%;height:100%;object-fit:cover;" />
                  </body>
                </html>`
            }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Story Details */}
        <StoryDetailsCard></StoryDetailsCard>
        {/* Featured Story */}
        <View className='flex-1'>
          <View className='flex-row justify-between items-center mt-5 py-2 px-4'>
            <Text className='text-lg font-semibold text-purple-600'>Featured Story</Text>
            <Link className='text-md font-medium text-purple-600' href={'/(root)/(tabs)/playlist'}>View more</Link>
          </View>
          <FeaturedStory></FeaturedStory>
        </View>
      </View>
    </View>
  );
};

export default Home;
