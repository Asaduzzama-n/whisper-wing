import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

const TextInputField = ({
    label,
    placeholder,
    value,
    onChangeText,
    onBlur,
    keyboardType = 'default',
    inputRef,
    returnKeyType = 'next',
    onSubmitEditing,
    secureTextEntry = false,
    error,
    showToggle = false,
    isVisible = false,
    onToggle = () => {},
  }: any) => {
    return (
      <View className="mb-4">
        <Text className="text-lg font-medium text-purple-800 mb-2">{label}</Text>
        <View className="relative">
          <TextInput
            ref={inputRef}
            className="h-14 rounded-xl bg-white px-4"
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
          />
          {showToggle && (
            <TouchableOpacity className="absolute right-4 top-4" onPress={onToggle}>
              <Ionicons name={isVisible ? "eye-off" : "eye"} size={24} color="#6B4E71" />
            </TouchableOpacity>
          )}
        </View>
        {error && <Text className="text-red-500 mt-1">{error}</Text>}
      </View>
    );
  };
  

  export default TextInputField;