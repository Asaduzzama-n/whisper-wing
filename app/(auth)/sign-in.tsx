import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { router } from 'expo-router';
import TextInputField from '@/components/textInputField';
import { TextInput } from 'react-native';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  
  const passwordRef = useRef<TextInput>(null);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validateField = (key: keyof typeof formData) => {
    try {
      loginSchema.pick({ [key]: true } as any).parse({ [key]: formData[key] });
      setErrors(prev => ({ ...prev, [key]: '' }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(e => e.path[0] === key);
        if (fieldError) {
          setErrors(prev => ({ ...prev, [key]: fieldError.message }));
        }
      }
    }
  };

  const handleSubmit = () => {
    try {
      loginSchema.parse(formData);
      console.log('Form Submitted!', formData);
      router.push('/(root)');
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
    <SafeAreaView className="flex-1 bg-purple-300 ">
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
          <Text className="text-3xl font-bold text-center text-purple-800 mb-8">Welcome Back</Text>

          <TextInputField
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text:string) => handleChange('email', text)}
            onBlur={() => validateField('email')}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={errors.email}
          />

          <TextInputField
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text:string) => handleChange('password', text)}
            onBlur={() => validateField('password')}
            secureTextEntry={!showPassword}
            inputRef={passwordRef}
            returnKeyType="done"
            showToggle
            isVisible={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

          <TouchableOpacity 
            onPress={() => router.push('/(auth)/forgot-password')}
            className="self-end mb-6"
          >
            <Text className="text-purple-700">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-purple-700 rounded-full py-4 mb-6"
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text className="text-center text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-purple-800">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
              <Text className="text-purple-700 font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;