import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { router } from 'expo-router';
import TextInputField from '@/components/textInputField';

const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Confirm password must be at least 8 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const confirmPasswordRef = useRef<TextInput>(null);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handleSubmit = () => {
    try {
      resetPasswordSchema.parse(formData);
      console.log('Password reset successful!');
      router.push('/(auth)/password-changed');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path.length) fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
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
             contentContainerStyle={{ padding: 20, flex: 1, justifyContent: 'center' }}


          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl font-bold text-center text-purple-800 mb-4">Reset Password</Text>
          <Text className="text-center text-purple-800/80 mb-8">
            Please enter your new password
          </Text>

          <TextInputField
            label="New Password"
            placeholder="Enter new password"
            value={formData.password}
            onChangeText={(text:string) => handleChange('password', text)}
            secureTextEntry={!showPassword}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            showToggle
            isVisible={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

          <TextInputField
            label="Confirm Password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChangeText={(text:string) => handleChange('confirmPassword', text)}
            secureTextEntry={!showConfirmPassword}
            inputRef={confirmPasswordRef}
            returnKeyType="done"
            showToggle
            isVisible={showConfirmPassword}
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            error={errors.confirmPassword}
          />

          <TouchableOpacity
            className="bg-purple-700 rounded-full py-4 mb-6 mt-4"
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text className="text-center text-white font-bold text-lg">Reset Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;