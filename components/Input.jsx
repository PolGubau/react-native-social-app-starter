import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const Input = ({
  label,
  placeholder,
  handleChange,
  value,
  className,
  keyboardType = "default",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${className}`}>
      <Text className="text-base text-gray-100 font-pmedium">{label}</Text>
      <View
        className={`w-full h-16 px-4 bg-black-100 border-2 border-black-200 focus:border-secondary items-center rounded-2xl flex-row `}
      >
        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          className={`flex-1 text-white font-psemibold text-base w-full`}
          keyboardType={keyboardType}
          placeholderTextColor={"#7b7b8b"}
          secureTextEntry={keyboardType === "password" && !showPassword}
        />

        {keyboardType === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
