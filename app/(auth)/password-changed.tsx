import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const PasswordChanged = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  // Entry animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleBackToLogin = () => {
    router.push('/(auth)/sign-in');
  };

  return (
    <SafeAreaView className="flex-1 bg-purple-200">
      <View className="flex-1 items-center justify-center px-6">
        <Animated.View 
          className="items-center"
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <View className="w-24 h-24 bg-purple-700 rounded-full items-center justify-center mb-8">
            <Ionicons name="checkmark" size={48} color="white" />
          </View>

          <Text className="text-3xl font-bold text-purple-800 mb-4 text-center">
            Password Changed!
          </Text>
          
          <Text className="text-center text-purple-800/80 mb-12 text-lg">
            Your password has been changed successfully. Please use your new password to login.
          </Text>

          <TouchableOpacity
            className="bg-purple-700 rounded-full py-4 px-8 w-64 shadow-lg"
            onPress={handleBackToLogin}
            activeOpacity={0.8}
            style={{
              elevation: 4,
            }}
          >
            <Text className="text-center text-white font-bold text-lg">
              Back to Login
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default PasswordChanged;