import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Animated, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import TextInputField from '@/components/textInputField';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  
  const inputRefs = useRef(Array(6).fill(null).map(() => React.createRef()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[0];
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError('');

    // Move to next input if value is entered
    if (text && index < 5) {
      (inputRefs.current[index + 1].current as any)?.focus?.();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      (inputRefs.current[index - 1].current as any)?.focus?.();
    }
  };

  const handleResendOtp = () => {
    if (timer === 0) {
      setTimer(60);
      // Add your resend OTP logic here
      console.log('Resending OTP...');
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all digits');
      return;
    }
    
    console.log('Verifying OTP:', otpString);
    router.push('/(auth)/reset-password');
  };

  // Add animation value
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  // Add entry animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-purple-200 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <ScrollView
            contentContainerStyle={{ padding: 20, flex: 1, justifyContent: 'center' }}

          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY }],
            }}
          >
            <Text className="text-3xl font-bold text-center text-purple-800 mb-4">Verify OTP</Text>
            <Text className="text-center text-purple-800/80 mb-12">
              Please enter the verification code sent to your email
            </Text>

            <View className="items-center mb-12">
              <View className="flex-row justify-between w-full  gap-x-4  ">
                {otp.map((digit, index) => (
                  <TextInput 
                    key={index}
                    //@ts-ignore
                    ref={inputRefs.current[index]}
                    className="text-center h-14 w-14 border-2 border-purple-500 font-medium text-lg rounded-lg"
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    returnKeyType={index === 5 ? 'done' : 'next'}
                    onSubmitEditing={() => {
                      if (index === 5) {
                        handleVerify();
                      } else {
                        (inputRefs.current[index + 1].current as any)?.focus?.();
                      }
                    }}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                   
                  />
                ))}
              </View>
            </View>

            {error && (
              <Animated.Text 
                className="text-red-500 text-center mb-4"
                style={{ opacity: fadeAnim }}
              >
                {error}
              </Animated.Text>
            )}

            <View className="items-center">
              <TouchableOpacity
                className="bg-purple-700 rounded-full py-4 px-8 w-64 shadow-lg"
                onPress={handleVerify}
                activeOpacity={0.8}
                style={{
                  elevation: 4,
                }}
              >
                <Text className="text-center text-white font-bold text-lg">Verify</Text>
              </TouchableOpacity>

              <View className="flex-row justify-center items-center mt-8">
                <Text className="text-purple-800">Didn't receive code? </Text>
                <TouchableOpacity 
                  onPress={handleResendOtp}
                  disabled={timer > 0}
                >
                  <Text className={`font-bold ${timer > 0 ? 'text-gray-500' : 'text-purple-700'}`}>
                    Resend {timer > 0 ? `(${timer}s)` : ''}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPVerification;