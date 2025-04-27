import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { router } from 'expo-router';
import TextInputField from '@/components/textInputField';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    try {
      forgotPasswordSchema.parse({ email });
      console.log('Reset email sent to:', email);
      router.push('/(auth)/otp');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-purple-200">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          contentContainerStyle={{ padding: 20, flex:1, justifyContent:'center' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl font-bold text-center text-purple-800 mb-4">Forgot Password</Text>
          <Text className="text-center text-purple-800/80 mb-8">
            Enter your email address and we'll send you a link to reset your password
          </Text>

          <TextInputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            returnKeyType="done"
            error={error}
          />

          <TouchableOpacity
            className="bg-purple-700 rounded-full py-4 mb-6 mt-4"
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text className="text-center text-white font-bold text-lg">Send Reset Link</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.back()}
            className="self-center"
          >
            <Text className="text-purple-700">Back to Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;