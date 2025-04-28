import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { getImage } from '@/constants/image'
import TextInputField from '@/components/textInputField'

const Profile = () => {
  const [storyLanguage, setStoryLanguage] = useState('English')
  const [systemLanguage, setSystemLanguage] = useState('English')
  const [isEditing, setIsEditing] = useState(false)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [activeLanguageType, setActiveLanguageType] = useState<'story' | 'system' | null>(null)

  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese']
  
  const [userData, setUserData] = useState({
    name: 'Luna Melody',
    email: 'luna@example.com',
    package: {
      name: 'Premium Package',
      validUntil: '2024-12-31',
      features: ['Unlimited Stories', 'Ad-free Experience', 'Offline Download']
    }
  })

  const handleLanguageSelect = (language: string) => {
    if (activeLanguageType === 'story') {
      setStoryLanguage(language)
    } else {
      setSystemLanguage(language)
    }
    setShowLanguageModal(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-purple-200">
      <ScrollView className="flex-1 px-6">
        {/* Profile Header */}
        <View className="items-center mt-8">
          <View className="relative">
            <Image
              //@ts-ignore
              source={getImage.onboardingImage2}
              className="w-32 h-32 rounded-full bg-purple-300"
            />
            <TouchableOpacity 
              className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full"
              activeOpacity={0.8}
            >
              <Feather name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Information */}
        <View className="mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-2xl font-bold text-purple-800">Profile Information</Text>
            <TouchableOpacity 
              onPress={() => setIsEditing(!isEditing)}
              className="bg-purple-600 p-2 rounded-full"
            >
              <Feather name={isEditing ? "check" : "edit-2"} size={20} color="white" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 mb-2">Name</Text>
            {isEditing ? (
              <TextInputField
                value={userData.name}
                onChangeText={(text: string) => setUserData({...userData, name: text})}
                className="bg-white rounded-xl p-4"
              />
            ) : (
              <View className="bg-white rounded-xl p-4">
                <Text className="text-lg text-purple-800">{userData.name}</Text>
              </View>
            )}
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 mb-2">Email</Text>
            <View className="bg-white rounded-xl p-4">
              <Text className="text-lg text-purple-800">{userData.email}</Text>
            </View>
          </View>

          {/* Language Settings */}
          <View className="mb-4">
            <Text className="text-gray-500 mb-2">Story Language</Text>
            <TouchableOpacity 
              className="bg-white rounded-xl p-4 flex-row justify-between items-center"
              onPress={() => {
                setActiveLanguageType('story')
                setShowLanguageModal(true)
              }}
            >
              <Text className="text-lg text-purple-800">{storyLanguage}</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#6B4E71" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-gray-500 mb-2">System Language</Text>
            <TouchableOpacity 
              className="bg-white rounded-xl p-4 flex-row justify-between items-center"
              onPress={() => {
                setActiveLanguageType('system')
                setShowLanguageModal(true)
              }}
            >
              <Text className="text-lg text-purple-800">{systemLanguage}</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#6B4E71" />
            </TouchableOpacity>
          </View>

          {/* Package Information */}
          <View className="mb-4">
            <Text className="text-gray-500 mb-2">Current Package</Text>
            <View className="bg-white rounded-xl p-4">
              <Text className="text-lg text-purple-800 font-semibold">{userData.package.name}</Text>
              <Text className="text-sm text-gray-500 mt-2">Valid until: {userData.package.validUntil}</Text>
              <View className="mt-3">
                {userData.package.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center mt-1">
                    <MaterialIcons name="check-circle" size={18} color="#6B4E71" />
                    <Text className="text-purple-800 ml-2">{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <Pressable 
          className="flex-1 " 
          onPress={() => setShowLanguageModal(false)}
        >
          <View className="flex-1 justify-end">
            <Pressable>
              <View className="bg-white rounded-t-3xl p-6">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-xl font-semibold text-purple-800">
                    Select Language
                  </Text>
                  <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                    <MaterialIcons name="close" size={24} color="#6B4E71" />
                  </TouchableOpacity>
                </View>
                {languages.map((language, index) => (
                  <TouchableOpacity
                    key={index}
                    className="py-3"
                    onPress={() => handleLanguageSelect(language)}
                  >
                    <Text className="text-lg text-purple-800">{language}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  )
}

export default Profile