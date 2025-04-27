import { View, Text, Image, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { onboardingData } from '@/lib/onboarding.data'
import { Colors } from '@/constants/Colors'
import { WIDTH } from '@/constants/screen'
import { router } from 'expo-router'

const Welcome = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  // Animation for floating effect
  const translateY = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    // Start floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { 
      useNativeDriver: false,
      listener: (event: any) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / WIDTH)
        setCurrentIndex(index)
        if (index === onboardingData.length - 1) {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start()
        } else {
          fadeAnim.setValue(0)
        }
      }
    }
  )

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        
      <View className={`flex-1 bg-[#CCB8E0]`}>
        <Animated.FlatList
          data={onboardingData}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          pagingEnabled
          onScroll={onScroll}
          renderItem={({item}) => (
            <View style={{ width: WIDTH }} className="items-center justify-center px-4">
              <Animated.View style={{ transform: [{ translateY }] }}>
                <Image
                //@ts-ignore
                  source={item.image}
                  style={{
                    width: WIDTH * 0.8,
                    height: WIDTH * 0.8,
                    resizeMode: 'contain',
                    marginBottom: 40
                  }}
                />
              </Animated.View> 
              <Animated.Text 
                className="text-black text-center text-lg px-4 leading-7"
               
              >
                {item.content}
              </Animated.Text>
            </View>
          )}
        />
        
        {/* Animated Pagination Dots */}
        <View className="flex-row justify-center items-center gap-2 pb-10">
          {onboardingData.map((_, index) => {
            const inputRange = [
              (index - 1) * WIDTH,
              index * WIDTH,
              (index + 1) * WIDTH,
            ]
            
            const width = scrollX.interpolate({
              inputRange,
              outputRange: [16, 32, 16],
              extrapolate: 'clamp',
            })
            
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            })
            
            return (
              <Animated.View 
                key={index}
                className="h-3 rounded-full bg-[#52178D]"
                style={{
                  width,
                  opacity,
                }}
              />
            )
          })}
        </View>

        {/* Login/Signup Buttons */}
          {
            currentIndex === onboardingData.length - 1 && (
                <Animated.View 
                className="absolute bottom-20 left-0 right-0 p-4 items-center"
                style={{
                  opacity: fadeAnim,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    })
                  }]
                }}
              >
                <View className="flex-row gap-4 mb-6 ">
                  <TouchableOpacity 
                    className="bg-[#7B47AF] w-[150] h-[48] rounded-full items-center justify-center"
                    onPress={() => router.push('/sign-in')}
                  >
                    <Text className="text-white font-bold text-lg">Log In</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    className="bg-[#5A199B] w-[150] h-[48] rounded-full items-center justify-center"
                    onPress={() => router.push('/sign-up')}
                  >
                    <Text className="text-white font-bold text-lg">Sign Up</Text>
                  </TouchableOpacity>
                </View>
      
                <TouchableOpacity onPress={() => router.push('/(root)')}>
                  <Text className="text-[#52178D] text-lg underline font-medium my-2">
                    Continue As Guest
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )
          }
      </View>
    </GestureHandlerRootView>
  )
}

export default Welcome