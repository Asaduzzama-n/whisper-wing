import { View, Text, TextInput, TouchableOpacity, Keyboard, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import TextInputField from '@/components/textInputField';

const signUpSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone must be at least 10 digits' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Confirm password must be at least 8 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' })); // Clear error while typing
  };

  const validateField = (key: keyof typeof formData) => {
    try {
        //@ts-ignore
      const schema = z.object({ [key]: signUpSchema._def.shape()[key] });
      schema.parse({ [key]: formData[key] });
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

  const handleBlur = (key: keyof typeof formData) => {
    validateField(key);
  };

  const handleSubmit = () => {
    try {
      signUpSchema.parse(formData);

      if (!termsAccepted) {
        setErrors(prev => ({ ...prev, terms: 'You must accept the terms.' }));
        return;
      }

      console.log('Form Submitted!', formData);
      router.push('/(auth)/otp');

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
          contentContainerStyle={{ padding: 20, flex:1, justifyContent:'center' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-3xl font-bold text-center text-purple-800 mb-8">Create Account</Text>

          {/* Name Field */}
          <TextInputField
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(text:string) => handleChange('name', text)}
            onBlur={() => handleBlur('name')}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            error={errors.name}
          />

          {/* Email Field */}
          <TextInputField
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text:string) => handleChange('email', text)}
            onBlur={() => handleBlur('email')}
            keyboardType="email-address"
            inputRef={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current?.focus()}
            error={errors.email}
          />

          {/* Phone Field */}
          <TextInputField
            label="Phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(text:string) => handleChange('phone', text)}
            onBlur={() => handleBlur('phone')}
            keyboardType="phone-pad"
            inputRef={phoneRef}
            returnKeyType="next"
            onSubmitEditing={() => addressRef.current?.focus()}
            error={errors.phone}
          />

          {/* Address Field */}
          <TextInputField
            label="Address"
            placeholder="Enter your address"
            value={formData.address}
            onChangeText={(text:string) => handleChange('address', text)}
            onBlur={() => handleBlur('address')}
            inputRef={addressRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={errors.address}
          />

          {/* Password Field */}
          <TextInputField
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(text:string) => handleChange('password', text)}
            onBlur={() => handleBlur('password')}
            secureTextEntry={!showPassword}
            inputRef={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            showToggle
            isVisible={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

          {/* Confirm Password Field */}
          <TextInputField
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text:string) => handleChange('confirmPassword', text)}
            onBlur={() => handleBlur('confirmPassword')}
            secureTextEntry={!showConfirmPassword}
            inputRef={confirmPasswordRef}
            returnKeyType="done"
            showToggle
            isVisible={showConfirmPassword}
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            error={errors.confirmPassword}
          />

          {/* Terms and Conditions */}
          <TouchableOpacity
            className="flex-row items-center mb-4"
            onPress={() => {
              setTermsAccepted(prev => !prev);
              setErrors(prev => ({ ...prev, terms: '' }));
            }}
            activeOpacity={0.7}
          >
            <View className={`w-5 h-5 rounded border mr-2 ${termsAccepted ? 'bg-purple-700' : 'border-purple-700'}`}>
              {termsAccepted && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text className="text-purple-800">
              I agree to the <Text className="underline">Terms & Conditions</Text> and <Text className="underline">Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
          {errors.terms && <Text className="text-red-500 mb-4">{errors.terms}</Text>}

          {/* Submit Button */}
          <TouchableOpacity
            className="bg-purple-700 rounded-full py-4 mb-6"
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text className="text-center text-white font-bold text-lg">Create Account</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-purple-800">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
              <Text className="text-purple-700 font-bold">Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;


